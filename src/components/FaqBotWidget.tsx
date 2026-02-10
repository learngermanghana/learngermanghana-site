"use client";

import React, { useMemo, useState } from "react";
import { FAQ_ENTRIES } from "@/data/faq";
import { CTA, SOCIAL_LINKS, WHATSAPP_LINK } from "@/lib/site";

type Msg = { from: "user" | "bot"; text?: string; node?: React.ReactNode };

type BotCommand = "restart";

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

function parseBotCommand(text: string): BotCommand | null {
  const normalized = text.trim().toLowerCase();
  if (["restart", "start over", "reset"].includes(normalized)) return "restart";
  return null;
}
const FAQ_QUICK_OPTIONS = [
  { value: "How do I enroll?", label: "How do I enroll?" },
  { value: "How much are the fees?", label: "Fees" },
  { value: "When do classes start?", label: "Start dates" },
  { value: "Can I learn online?", label: "Online options" },
];

export default function FaqBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      node: (
        <>
          👋 Hi! I can help with quick FAQs.
          <div className="mt-2">Ask a question about fees, schedule, location, online classes, or registration.</div>
          <div className="mt-1 text-xs text-neutral-500">Tip: type restart anytime to clear the chat.</div>
        </>
      ),
    },
  ]);

  const quick = useMemo(() => FAQ_QUICK_OPTIONS, []);

  function resetFlow() {
    setMsgs([
      {
        from: "bot",
        node: (
          <>
            👋 Hi! I can help with quick FAQs.
            <div className="mt-2">Ask a question about fees, schedule, location, online classes, or registration.</div>
            <div className="mt-1 text-xs text-neutral-500">Tip: type restart anytime to clear the chat.</div>
          </>
        ),
      },
    ]);
  }

  function addBotMessage(node: React.ReactNode) {
    setMsgs((m) => [...m, { from: "bot", node }]);
  }

  function addUserMessage(text: string) {
    setMsgs((m) => [...m, { from: "user", text }]);
  }

  async function handleFlowAnswer(rawText: string) {
    const text = rawText.trim();
    if (!text) return;

    addUserMessage(text);

    const command = parseBotCommand(text);
    if (command === "restart") {
      resetFlow();
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
        <div className="mt-2 flex flex-wrap gap-2">
          <a className="inline-flex rounded-lg px-3 py-2 ring-1 ring-black/10 hover:underline" href={CTA.help.href}>
            Open contact page
          </a>
          <a
            className="inline-flex rounded-lg px-3 py-2 ring-1 ring-black/10 hover:underline"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
          >
            Talk on WhatsApp
          </a>
        </div>
      </>,
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg" aria-label="Open FAQ help chat">
          Help Bot
        </button>
      ) : (
        <div className="w-[340px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 ring-1 ring-black/5">
            <div>
              <div className="font-semibold">FAQ Assistant</div>
              <div className="text-xs text-neutral-500">Instant answers to common questions</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-sm hover:underline">
              Close
            </button>
          </div>

          {quick.length > 0 ? (
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

          <div className="px-3 py-2 text-[11px] text-neutral-500">Use quick chips below or type your question. Type restart to clear.</div>

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
              placeholder="Type your question…"
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
