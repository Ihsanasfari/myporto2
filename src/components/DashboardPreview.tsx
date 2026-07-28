"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, FileText, Send, Settings2 } from "lucide-react";

const chatMessages = [
  { from: "user", text: "Summarize the payment terms in this contract." },
  {
    from: "ai",
    text: "Payment is due within 30 days of invoice. A 1.5% late fee applies after the due date. See clause 4.2."
  }
];

const barHeights = [42, 68, 55, 80, 62, 90, 74];

export default function DashboardPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-gray-200/40 to-accent-soft/30 blur-3xl" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="glass-strong relative overflow-hidden rounded-card bg-surface/90 shadow-lift"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
            <Bot size={10} />
            contract-iq.app
          </span>
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-3 flex flex-col gap-3 border-r border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-500">
                AI Assistant
              </span>
              <Settings2 size={12} className="text-gray-500" />
            </div>

            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.5, duration: 0.4 }}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${
                  message.from === "user"
                    ? "self-end bg-accent-soft text-gray-900"
                    : "self-start border border-border bg-gray-100 text-gray-500"
                }`}
              >
                {message.text}
              </motion.div>
            ))}

            <div className="mt-auto flex items-center gap-2 rounded-lg border border-border bg-gray-100 px-3 py-2">
              <span className="flex-1 text-[10px] text-gray-500">
                Ask about this document...
              </span>
              <Send size={11} className="text-gray-700" />
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-3 p-4">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
              <FileText size={11} />
              Analytics
            </div>

            <div className="rounded-lg border border-border bg-gray-100 p-3">
              <p className="text-[9px] text-gray-500">Documents processed</p>
              <p className="font-display text-lg font-semibold text-foreground">
                1,284
              </p>
              <p className="text-[9px] text-gray-600">+18% this month</p>
            </div>

            <div className="flex h-20 items-end gap-1.5 rounded-lg border border-border bg-gray-100 p-3">
              {barHeights.map((height, index) => (
                <motion.div
                  key={index}
                  initial={
                    prefersReducedMotion
                      ? { height: `${height}%` }
                      : { height: 0 }
                  }
                  animate={{ height: `${height}%` }}
                  transition={{
                    delay: 1 + index * 0.08,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-accent to-accent-soft"
                />
              ))}
            </div>

            <div className="rounded-lg border border-border bg-gray-100 p-3">
              <p className="text-[9px] text-gray-500">Avg. response time</p>
              <p className="font-display text-lg font-semibold text-foreground">
                1.2s
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
