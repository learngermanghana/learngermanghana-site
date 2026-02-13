"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { findFaqAnswer } from "@/lib/faqBot";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

const defaultPrompts = [
  "How do I enroll?",
  "Do all learning modes cost the same?",
  "Can I start at B2?",
  "Where are my receipts?",
  "When do classes start?",
  "How long is each class level?",
];

type BotMessage = {
  role: "user" | "bot";
  content: React.ReactNode;
};

const whatsappIntentKeywords = [
  "price",
  "pricing",
  "fees",
  "cost",
  "location",
  "where are you",
  "register",
  "registration",
  "sign up",
  "sign-up",
  "enroll",
  "next class",
  "intake",
  "start date",
  "schedule",
];

function shouldShowWhatsAppTeamPrompt(keywords: string[]) {
  return keywords.some((keyword) => {
    const normalized = keyword.toLowerCase().trim();
    return whatsappIntentKeywords.includes(normalized);
  });
}

export function FAQChatBot() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<BotMessage[]>([]);

  const suggestions = useMemo(
    () =>
      defaultPrompts.filter(
        (prompt) =>
          !history.some((item) => item.role === "user" && typeof item.content === "string" && item.content === prompt),
      ),
    [history],
  );

  const handleSubmit = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const answer = findFaqAnswer(trimmed);
    const nextHistory: BotMessage[] = [
      ...history,
      { role: "user", content: trimmed },
      {
        role: "bot",
        content: answer ? (
          <>
            {answer.answer}
            {shouldShowWhatsAppTeamPrompt(answer.keywords) && (
              <div className="mt-2">
                Need direct help from our team? Chat on{" "}
                <a className="font-semibold hover:underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                .
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              Automated reply: no match found. Try keywords like <b>fees</b>, <b>intake</b>, <b>location</b>, <b>online</b>,
              or <b>register</b>.
            </div>
          </>
        ),
      },
    ];

    setHistory(nextHistory);
    setMessage("");
  };

  return (
    <Container>
      <section className="my-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-neutral-900">Automated Quick Answers</h2>
          <p className="text-sm text-neutral-600">
            Automated replies for enrollment, class formats, payments, or certificates. For full support, visit{" "}
            <a
              className="font-semibold text-brand-950 hover:underline"
              href={LINKS.falowen}
              target="_blank"
              rel="noreferrer"
            >
              Falowen
            </a>{" "}
            or chat on{" "}
            <a
              className="font-semibold text-brand-950 hover:underline"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            . Call now: <a className="font-semibold text-brand-950 hover:underline" href="tel:+233205706589">+{SITE.phoneIntl}</a>
            .
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            {history.length === 0 ? (
              <div>
                Automated help for quick questions. Choose a prompt below or type your own.
              </div>
            ) : (
              <ul className="space-y-3">
                {history.map((item, index) => (
                  <li
                    key={`${item.role}-${index}`}
                    className={item.role === "user" ? "text-neutral-900" : "text-neutral-700"}
                  >
                    <span className="block text-xs uppercase tracking-wide text-neutral-500">
                      {item.role === "user" ? "You" : "Automated reply"}
                    </span>
                    <span className="block">{item.content}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSubmit(prompt)}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(message);
            }}
          >
            <label className="sr-only" htmlFor="faq-chat-input">
              Ask a question
            </label>
            <input
              id="faq-chat-input"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-2xl border border-black/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-950/20"
            />
            <button
              type="submit"
              className="rounded-2xl bg-brand-950 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Ask
            </button>
          </form>

          <div className="text-xs text-neutral-500">
            Still have questions? Reach out on{" "}
            <a className="font-semibold hover:underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            , or call now: <a className="font-semibold hover:underline" href="tel:+233205706589">+{SITE.phoneIntl}</a>.
          </div>
        </div>
      </section>
    </Container>
  );
}
