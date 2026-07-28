import type { ProjectMockup as MockupType } from "@/types";
import {
  BarChart3,
  Bot,
  CalendarClock,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Send,
  Sparkles,
  User
} from "lucide-react";

function AiChatMockup() {
  return (
    <div className="flex h-full gap-2 p-4 text-[9px]">
      <div className="flex w-2/3 flex-col gap-2">
        <div className="flex items-center gap-1.5 text-gray-500">
          <Bot size={10} />
          <span>Contract IQ</span>
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg bg-accent/30 px-2.5 py-1.5 text-foreground">
          What are the termination clauses?
        </div>
        <div className="max-w-[90%] rounded-lg border border-border bg-gray-100 px-2.5 py-1.5 text-gray-500">
          Either party may terminate with 60 days written notice per clause
          9.1...
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-md border border-border bg-gray-100 px-2 py-1.5 text-gray-500">
          <span className="flex-1">Ask anything...</span>
          <Send size={9} className="text-gray-700" />
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-1.5 rounded-lg border border-border bg-gray-100 p-2">
        <div className="flex items-center gap-1 text-gray-500">
          <FileText size={9} />
          <span>contract.pdf</span>
        </div>
        <div className="h-1.5 w-full rounded bg-gray-200" />
        <div className="h-1.5 w-5/6 rounded bg-gray-200" />
        <div className="h-1.5 w-full rounded bg-accent/40" />
        <div className="h-1.5 w-4/6 rounded bg-gray-200" />
        <div className="h-1.5 w-5/6 rounded bg-gray-200" />
        <div className="h-1.5 w-3/6 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function CrmMockup() {
  const bars = [55, 75, 45, 85, 65, 92];
  return (
    <div className="flex h-full flex-col gap-2 p-4 text-[9px]">
      <div className="flex items-center gap-1.5 text-gray-500">
        <LayoutDashboard size={10} />
        <span>Sales Dashboard</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Revenue", "Deals", "Win rate"].map((label, index) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-gray-100 p-2"
          >
            <p className="text-gray-500">{label}</p>
            <p className="text-xs font-semibold text-foreground">
              {["$48.2k", "127", "64%"][index]}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        <div className="flex flex-1 items-end gap-1 rounded-lg border border-border bg-gray-100 p-2">
          {bars.map((height, index) => (
            <div
              key={index}
              style={{ height: `${height}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-gray-400 to-gray-300"
            />
          ))}
        </div>
        <div className="flex w-1/3 flex-col gap-1.5 rounded-lg border border-border bg-gray-100 p-2">
          <BarChart3 size={9} className="text-gray-500" />
          <div className="h-1.5 w-full rounded bg-gray-200" />
          <div className="h-1.5 w-4/6 rounded bg-gray-400" />
          <div className="h-1.5 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

function BookingMockup() {
  const slots = Array.from({ length: 12 });
  return (
    <div className="flex h-full flex-col gap-2 p-4 text-[9px]">
      <div className="flex items-center justify-between text-gray-500">
        <span className="flex items-center gap-1.5">
          <CalendarClock size={10} />
          Book a table
        </span>
        <span className="rounded bg-accent-soft px-1.5 py-0.5 text-gray-600">
          Live availability
        </span>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-1.5">
        {slots.map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded-md border text-[8px] ${
              [2, 5, 7].includes(index)
                ? "border-accent bg-accent-soft text-gray-600"
                : [1, 9].includes(index)
                  ? "border-border bg-gray-100 text-gray-500/50 line-through"
                  : "border-border bg-gray-100 text-gray-500"
            }`}
          >
            {`${14 + Math.floor(index / 4)}:${index % 4 === 0 ? "00" : index % 4 === 1 ? "15" : index % 4 === 2 ? "30" : "45"}`}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center rounded-md bg-accent-soft py-1.5 font-medium text-gray-600">
        Confirm booking — Table 4
      </div>
    </div>
  );
}

function PortfolioMockup() {
  return (
    <div className="flex h-full flex-col gap-2 p-4 text-[9px]">
      <div className="flex items-center justify-between text-gray-500">
        <span className="flex items-center gap-1.5">
          <User size={10} />
          ihsan.dev
        </span>
        <span className="flex items-center gap-1 rounded border border-border bg-gray-100 px-1.5 py-0.5">
          <Sparkles size={8} className="text-gray-700" />
          Ctrl K
        </span>
      </div>
      <div className="flex flex-col gap-1.5 py-1">
        <div className="h-2.5 w-4/5 rounded bg-gradient-to-r from-accent-soft to-gray-300" />
        <div className="h-1.5 w-3/5 rounded bg-gray-200" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {["Chat UI", "Dashboards", "Bookings", "Systems"].map((label) => (
          <div
            key={label}
            className="flex flex-col justify-between rounded-lg border border-border bg-gray-100 p-2"
          >
            <MessageSquare size={9} className="text-gray-700" />
            <span className="text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockups: Record<MockupType, () => React.JSX.Element> = {
  "ai-chat": AiChatMockup,
  crm: CrmMockup,
  booking: BookingMockup,
  portfolio: PortfolioMockup
};

export default function ProjectMockup({
  type,
  accent
}: {
  type: MockupType;
  accent: string;
}) {
  const Mockup = mockups[type];

  return (
    <div
      aria-hidden="true"
      className="relative h-56 overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(ellipse at top left, ${accent}55, transparent 65%)`
        }}
      />
      <div className="relative flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
      </div>
      <div className="relative h-[calc(100%-2rem)]">
        <Mockup />
      </div>
    </div>
  );
}
