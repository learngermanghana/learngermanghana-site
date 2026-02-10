"use client";

import React, { useMemo, useState } from "react";
import { FAQ_ENTRIES } from "@/data/faq";
import { SITE, SOCIAL_LINKS } from "@/lib/site";

type Msg = { from: "user" | "bot"; text?: string; node?: React.ReactNode };

type FlowStep = "intent" | "name" | "level" | "start" | "contactPreference" | "contactDetail" | "done";

type LeadState = {
  intent?: string;
  name?: string;
  level?: string;
  startTiming?: string;
  contactPreference?: "whatsapp" | "phone" | "email";
  contactValue?: string;
};

const WHATSAPP_BASE = `https://api.whatsapp.com/send?phone=${SITE.phoneIntl}&text=`;
const INTENT_OPTIONS = ["register", "placement-test", "exam-prep", "faq"] as const;

function parseIntentValue(text: string) {
  const normalized = text.trim().toLowerCase();
  if (INTENT_OPTIONS.includes(normalized as (typeof INTENT_OPTIONS)[number])) {
    return normalized;
  }

  if (normalized.includes("placement")) return "placement-test";
  if (normalized.includes("exam") || normalized.includes("goethe") || normalized.includes("telc")) {
    return "exam-prep";
  }
  if (normalized.includes("join") || normalized.includes("register") || normalized.includes("class")) {
    return "register";
  }
  if (normalized.includes("question") || normalized.includes("faq") || normalized.includes("ask")) {
    return "faq";
  }

  return null;
}

function findBestAnswer(message: string) {
  const text = message.toLowerCase().trim();

  let bestScore = 0;
  let best = null as (typeof FAQ_ENTRIES)[number] | null;

  for (const entry of FAQ_ENTRIES) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw.toLowerCase())) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 1 ? best : null;
}

function parseLevelValue(text: string) {
  const normalized = text.trim().toLowerCase();
  const knownLevels = ["a1", "a2", "b1", "b2", "c1", "not sure"];
  return knownLevels.includes(normalized) ? text.trim() : null;
}

function parseContactPreference(text: string): LeadState["contactPreference"] | null {
  const normalized = text.trim().toLowerCase();
  if (normalized === "whatsapp") return "whatsapp";
  if (normalized === "phone" || normalized === "phone call") return "phone";
  if (normalized === "email") return "email";
  return null;
}

function shouldTreatAsFaqInStep(step: FlowStep, text: string) {
  const normalized = text.trim().toLowerCase();

  if (step === "level" && parseLevelValue(normalized)) return false;
  if (step === "contactPreference" && parseContactPreference(normalized)) return false;

  const looksLikeQuestion =
    normalized.includes("?") ||
    /^(where|what|how|when|which|who|can|do|does|is|are)\b/.test(normalized) ||
    ["price", "fee", "cost", "location", "online", "register", "schedule", "intake"].some((kw) =>
      normalized.includes(kw),
    );

  return looksLikeQuestion;
}

function intentLabel(intent?: string) {
  switch (intent) {
    case "register":
      return "Registration";
    case "placement-test":
      return "Placement test";
    case "exam-prep":
      return "Exam prep";
    case "faq":
      return "General questions";
    default:
      return "Not selected";
  }
}

function buildWhatsAppUrl(lead: LeadState) {
  const lines = [
    "Hello Learn Language Education Academy 👋",
    "I just shared my details in the website chatbot.",
    "Please follow up with me.",
    `Intent: ${intentLabel(lead.intent)}`,
    `Name: ${lead.name ?? "Not shared"}`,
    `Level: ${lead.level ?? "Not shared"}`,
    `Start timing: ${lead.startTiming ?? "Not shared"}`,
    `Contact preference: ${lead.contactPreference ?? "Not shared"}`,
    `Contact detail: ${lead.contactValue ?? "Not shared"}`,
  ];

  return `${WHATSAPP_BASE}${encodeURIComponent(lines.join("\n"))}`;
}

function promptForCurrentStep(step: FlowStep) {
  if (step === "intent") return "What do you need today? Choose: Join classes, Placement test, Exam prep, or General question.";
  if (step === "name") return "What is your full name?";
  if (step === "level") return "What is your current level or target level?";
  if (step === "start") return "When would you like to start?";
  if (step === "contactPreference") return "How should we contact you? (WhatsApp, Phone call, or Email)";
  if (step === "contactDetail") return "Please share your contact detail so we can follow up.";
  return "You can ask another question.";
}

function optionsForStep(step: FlowStep) {
  if (step === "intent") {
    return [
      { value: "register", label: "Join classes" },
      { value: "placement-test", label: "Take placement test" },
      { value: "exam-prep", label: "Prepare for Goethe/TELC" },
      { value: "faq", label: "Ask a general question" },
    ];
  }

  if (step === "level") {
    return ["A1", "A2", "B1", "B2", "C1", "Not sure"].map((value) => ({ value, label: value }));
  }

  if (step === "start") {
    return [
      { value: "As soon as possible", label: "ASAP" },
      { value: "This month", label: "This month" },
      { value: "Next month", label: "Next month" },
      { value: "In 2-3 months", label: "In 2-3 months" },
      { value: "Not sure yet", label: "Not sure" },
    ];
  }

  if (step === "contactPreference") {
    return [
      { value: "whatsapp", label: "WhatsApp" },
      { value: "phone", label: "Phone call" },
      { value: "email", label: "Email" },
    ];
  }

  return [];
}

export default function FaqBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<FlowStep>("intent");
  const [lead, setLead] = useState<LeadState>({});

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      node: (
        <>
          👋 Hi! I can help you quickly and qualify your lead.
          <div className="mt-2">Let&apos;s start: what do you need today?</div>
        </>
      ),
    },
  ]);

  const quick = useMemo(() => optionsForStep(step), [step]);

  function addBotMessage(node: React.ReactNode) {
    setMsgs((m) => [...m, { from: "bot", node }]);
  }

  function addUserMessage(text: string) {
    setMsgs((m) => [...m, { from: "user", text }]);
  }

  function completeLeadToWhatsApp(nextLead: LeadState) {
    addBotMessage(
      <>
        ✅ Thanks — got it.
        <div className="mt-2">We now hand you directly to WhatsApp so we can reply faster.</div>
        <div className="mt-2">
          <a
            className="inline-flex rounded-lg px-3 py-2 ring-1 ring-black/10 hover:underline"
            href={buildWhatsAppUrl(nextLead)}
            target="_blank"
            rel="noreferrer"
          >
            Continue on WhatsApp
          </a>
        </div>
      </>,
    );
  }

  async function handleFlowAnswer(rawText: string) {
    const text = rawText.trim();
    if (!text) return;

    addUserMessage(text);

    if (step !== "intent" && step !== "done" && shouldTreatAsFaqInStep(step, text)) {
      const match = findBestAnswer(text);
      if (match) {
        addBotMessage(match.answer);
        addBotMessage(promptForCurrentStep(step));
        return;
      }
    }

    if (step === "intent") {
      const parsedIntent = parseIntentValue(text);
      if (!parsedIntent) {
        const match = findBestAnswer(text);
        if (match) {
          addBotMessage(match.answer);
          addBotMessage("If you want follow-up support, type: register, placement test, exam prep, or faq.");
          return;
        }

        addBotMessage("Please choose one intent first: Join classes, Placement test, Exam prep, or General question.");
        return;
      }

      const nextLead = { ...lead, intent: parsedIntent };
      setLead(nextLead);
      setStep("name");
      addBotMessage("Great — what is your full name?");
      return;
    }

    if (step === "name") {
      const nextLead = { ...lead, name: text };
      setLead(nextLead);
      setStep("level");
      addBotMessage("Thanks! What is your current level or target level?");
      return;
    }

    if (step === "level") {
      const parsedLevel = parseLevelValue(text);
      if (!parsedLevel) {
        addBotMessage("Please choose your level: A1, A2, B1, B2, C1, or Not sure.");
        return;
      }

      const nextLead = { ...lead, level: text };
      setLead(nextLead);
      setStep("start");
      addBotMessage("When would you like to start?");
      return;
    }

    if (step === "start") {
      const nextLead = { ...lead, startTiming: text };
      setLead(nextLead);
      setStep("contactPreference");
      addBotMessage("How should we contact you?");
      return;
    }

    if (step === "contactPreference") {
      const parsedPreference = parseContactPreference(text);
      if (!parsedPreference) {
        addBotMessage("Please choose WhatsApp, Phone call, or Email.");
        return;
      }

      const nextLead = {
        ...lead,
        contactPreference: parsedPreference,
      };
      setLead(nextLead);
      setStep("contactDetail");
      addBotMessage(
        parsedPreference === "email" ? "Please share your email address." : "Please share your phone/WhatsApp number.",
      );
      return;
    }

    if (step === "contactDetail") {
      const nextLead = { ...lead, contactValue: text };
      setLead(nextLead);
      setStep("done");
      completeLeadToWhatsApp(nextLead);
      return;
    }

    const match = findBestAnswer(text);
    if (match) {
      addBotMessage(match.answer);
      return;
    }

    addBotMessage(
      <>
        I can still answer quick FAQs.
        <div className="mt-2">Try keywords like fees, intake, location, online, or register.</div>
      </>,
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg">
          Help Bot
        </button>
      ) : (
        <div className="w-[340px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 ring-1 ring-black/5">
            <div className="font-semibold">Lead Assistant</div>
            <button onClick={() => setOpen(false)} className="text-sm hover:underline">
              Close
            </button>
          </div>

          {quick.length > 0 && step !== "contactDetail" && step !== "done" ? (
            <div className="px-3 py-2 flex gap-2 flex-wrap">
              {quick.map((q) => (
                <button
                  key={q.value}
                  onClick={() => {
                    void handleFlowAnswer(q.value);
                  }}
                  className="rounded-full px-3 py-1 text-sm ring-1 ring-black/10 hover:underline"
                >
                  {q.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="h-[320px] overflow-y-auto px-3 py-2 space-y-2">
            {msgs.map((m, idx) => (
              <div key={idx} className={m.from === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block max-w-[88%] rounded-2xl px-3 py-2 text-sm " +
                    (m.from === "user" ? "bg-black text-white" : "bg-neutral-100 text-black")
                  }
                >
                  {m.node ?? m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            className="flex gap-2 p-3 ring-1 ring-black/5"
            onSubmit={(e) => {
              e.preventDefault();
              void handleFlowAnswer(input);
              setInput("");
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step === "done" ? "Ask another question…" : "Type your answer…"}
              className="flex-1 rounded-xl px-3 py-2 ring-1 ring-black/10 outline-none"
            />
            <button className="rounded-xl bg-black px-3 py-2 text-white">Send</button>
          </form>

          <div className="px-3 pb-3 text-xs text-neutral-600">
            Follow us on{" "}
            <a className="font-semibold hover:underline" href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            ,{" "}
            <a className="font-semibold hover:underline" href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
            , and{" "}
            <a className="font-semibold hover:underline" href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
}
