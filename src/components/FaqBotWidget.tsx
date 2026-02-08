"use client";

import React, { useMemo, useState } from "react";
import { FAQ_ENTRIES } from "@/data/faq";
import { SOCIAL_LINKS, WHATSAPP_LINK } from "@/lib/site";

type Msg = { from: "user" | "bot"; text?: string; node?: React.ReactNode };

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

export default function FaqBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      node: (
        <>
          👋 Hi! I can answer quick questions.
          <div className="mt-2">
            Try: <b>fees</b>, <b>intake</b>, <b>location</b>, <b>online</b>, <b>register</b>
          </div>
        </>
      ),
    },
  ]);

  const quick = useMemo(() => ["fees", "intake", "location", "online", "register"], []);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;

    setMsgs((m) => [...m, { from: "user", text: t }]);

    const match = findBestAnswer(t);
    if (match) {
      setMsgs((m) => [...m, { from: "bot", node: match.answer }]);
    } else {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          node: (
            <>
              Sorry, I didn’t catch that. Try: <b>fees</b>, <b>intake</b>, <b>location</b>, <b>online</b>, <b>register</b>.
              <div className="mt-2">
                <a
                  className="inline-flex rounded-lg px-3 py-2 ring-1 ring-black/10 hover:underline"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="mt-2 text-sm text-neutral-600">
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
            </>
          ),
        },
      ]);
    }

    setInput("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg"
        >
          Help Bot
        </button>
      ) : (
        <div className="w-[320px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 ring-1 ring-black/5">
            <div className="font-semibold">Quick Answers</div>
            <button onClick={() => setOpen(false)} className="text-sm hover:underline">
              Close
            </button>
          </div>

          <div className="px-3 py-2 flex gap-2 flex-wrap">
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full px-3 py-1 text-sm ring-1 ring-black/10 hover:underline"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="h-[280px] overflow-y-auto px-3 py-2 space-y-2">
            {msgs.map((m, idx) => (
              <div key={idx} className={m.from === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
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
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              className="flex-1 rounded-xl px-3 py-2 ring-1 ring-black/10 outline-none"
            />
            <button className="rounded-xl bg-black px-3 py-2 text-white">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
