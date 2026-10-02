import { useState, type ReactNode } from "react";
import { Bell, ChevronDown, Dumbbell, Menu, Search, UserRound, X, Zap } from "lucide-react";
import "../_group.css";

export const navMember = [
  ["Dashboard", "MemberDashboard"], ["Workout", "Workout"], ["Trainers", "Trainers"],
  ["Progress", "Progress"], ["Nutrition", "Nutrition"], ["AI Coach", "AIAssistant"],
];
export const navOwner = [["Overview", "OwnerDashboard"], ["Analytics", "Analytics"], ["Members", "AdminMembers"], ["Programs", "OwnerDashboard"]];
export const go = (page: string) => { window.location.href = `/__mockup/preview/repfi/${page}`; };

export function BrandMark({ light = false }: { light?: boolean }) {
  return <button onClick={() => go("Landing")} className="flex items-center gap-2.5 text-left">
    <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? "bg-[#d7f35c] text-[#20334a]" : "bg-[#20334a] text-[#d7f35c]"}`}><Dumbbell size={19} strokeWidth={2.5}/></span>
    <span className={`repfi-display text-[18px] font-bold tracking-[-.04em] ${light ? "text-white" : "text-[#20334a]"}`}>rep<span className={light ? "text-[#d7f35c]" : "text-[#0f6268]"}>fi</span></span>
  </button>;
}

export function Avatar({ initials = "AJ", tone = "bg-[#f39a64]" }: { initials?: string; tone?: string }) {
  return <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold text-[#20334a] ${tone}`}>{initials}</span>;
}

export function AppShell({ children, title, eyebrow, owner = false }: { children: ReactNode; title?: string; eyebrow?: string; owner?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<"notifications" | "profile" | null>(null);
  const items = owner ? navOwner : navMember;
  const current = window.location.pathname.split("/").pop() || "";
  return <div className="repfi-root min-h-[100dvh]">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] flex-col border-r border-[#dfe7e3] bg-[#20334a] px-5 py-6 text-white lg:flex">
      <BrandMark light />
      <div className="mt-11 rounded-2xl border border-white/10 bg-white/5 p-3">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#94b3b3]">{owner ? "Workspace" : "Your space"}</p>
        <button onClick={() => go(owner ? "MemberDashboard" : "OwnerDashboard")} className="mt-2 flex w-full items-center justify-between text-left">
          <span className="text-sm font-semibold">{owner ? "RepFit Fitness Center" : "Alex Johnson"}</span><ChevronDown size={14} className="text-[#d7f35c]"/>
        </button>
        <p className="mt-1 text-[11px] text-[#94b3b3]">{owner ? "Owner console" : "Member profile"}</p>
      </div>
      <nav className="mt-9 space-y-1">
        {items.map(([label, page]) => <button key={page + label} onClick={() => go(page)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${current === page ? "bg-[#d7f35c] font-bold text-[#20334a]" : "text-[#b7c8c9] hover:bg-white/10 hover:text-white"}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70"/>{label}
        </button>)}
      </nav>
      <div className="mt-auto rounded-2xl bg-[#0f6268] p-4">
        <Zap size={17} className="text-[#d7f35c]"/>
        <p className="mt-3 text-sm font-semibold">Train smarter.</p><p className="text-xs text-[#b8dfd8]">Your consistency is your edge.</p>
      </div>
    </aside>
    <div className="lg:pl-[236px]">
      <header className="sticky top-0 z-30 flex h-[74px] items-center justify-between border-b border-[#dfe7e3]/80 bg-[#f5f7f4]/90 px-4 backdrop-blur-xl sm:px-7">
        <div className="flex items-center gap-3"><button onClick={() => setMenu(true)} className="rounded-xl p-2 hover:bg-white lg:hidden"><Menu size={20}/></button><div className="hidden sm:block"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#0f6268]">{eyebrow || (owner ? "Owner console" : "Member area")}</p><h1 className="repfi-display text-lg font-bold">{title || "Good morning, Alex"}</h1></div></div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setPanel(panel === "notifications" ? null : "notifications")} className="relative rounded-xl p-2.5 hover:bg-white"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f39a64]"/></button>
          <button onClick={() => setPanel(panel === "profile" ? null : "profile")} className="flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-white"><Avatar initials={owner ? "RS" : "AJ"} tone={owner ? "bg-[#d7f35c]" : "bg-[#f39a64]"}/><span className="hidden text-xs font-bold sm:block">{owner ? "Rahul Sharma" : "Alex Johnson"}</span><ChevronDown size={14}/></button>
        </div>
        {panel && <div className="absolute right-4 top-[66px] w-64 rounded-2xl border border-[#dfe7e3] bg-[#fbfcfa] p-4 shadow-xl">
          {panel === "notifications" ? <><div className="flex items-center justify-between"><b className="text-sm">Notifications</b><span className="rounded-full bg-[#fff0e7] px-2 py-1 text-[10px] font-bold text-[#c66735]">2 new</span></div><p className="mt-4 text-xs text-[#70808c]">Rahul left feedback on your squat form.</p><p className="mt-3 text-xs text-[#70808c]">Your Pro renewal is in 12 days.</p></> : <><div className="flex items-center gap-3"><Avatar initials={owner ? "RS" : "AJ"} tone={owner ? "bg-[#d7f35c]" : "bg-[#f39a64]"}/><div><b className="text-sm">{owner ? "Rahul Sharma" : "Alex Johnson"}</b><p className="text-xs text-[#70808c]">{owner ? "Gym owner" : "Member since Jan 2024"}</p></div></div><button onClick={() => go(owner ? "MemberDashboard" : "OwnerDashboard")} className="mt-4 w-full rounded-xl bg-[#20334a] py-2.5 text-xs font-bold text-white">{owner ? "Switch to member view" : "Open owner view"}</button></>}
        </div>}
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8">{children}</main>
    </div>
    {menu && <div className="fixed inset-0 z-50 bg-[#20334a]/50 lg:hidden" onClick={() => setMenu(false)}><aside onClick={e => e.stopPropagation()} className="h-full w-[280px] bg-[#20334a] p-5 text-white"><div className="flex items-center justify-between"><BrandMark light/><button onClick={() => setMenu(false)}><X size={20}/></button></div><nav className="mt-12 space-y-2">{items.map(([label,page]) => <button key={page+label} onClick={() => go(page)} className="block w-full rounded-xl px-3 py-3 text-left text-sm text-[#c6d8d8] hover:bg-white/10">{label}</button>)}</nav></aside></div>}
  </div>;
}

export function SectionHeading({ kicker, title, action }: { kicker?: string; title: string; action?: ReactNode }) {
  return <div className="mb-5 flex items-end justify-between gap-4"><div>{kicker && <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#0f6268]">{kicker}</p>}<h2 className="repfi-display mt-1 text-xl font-bold tracking-[-.03em] sm:text-2xl">{title}</h2></div>{action}</div>;
}
export function Metric({ label, value, detail, accent = "lime" }: { label: string; value: string; detail: string; accent?: "lime"|"orange"|"teal" }) {
  const bg = accent === "orange" ? "bg-[#fff0e7]" : accent === "teal" ? "bg-[#e1f0ed]" : "bg-[#eff7c9]";
  return <div className={`repfi-card repfi-hover p-5 ${bg}`}><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#70808c]">{label}</p><p className="repfi-display mt-3 text-3xl font-bold">{value}</p><p className="mt-1 text-xs font-medium text-[#0f6268]">{detail}</p></div>;
}
export function Pill({ children, active = false }: { children: ReactNode; active?: boolean }) { return <span className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${active ? "bg-[#20334a] text-[#d7f35c]" : "bg-[#e9efea] text-[#70808c]"}`}>{children}</span>; }
export function ProgressBar({ value, color = "bg-[#0f6268]" }: { value: number; color?: string }) { return <div className="h-2 overflow-hidden rounded-full bg-[#e8eeea]"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }}/></div>; }
export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#20334a]/55 p-4"><div className="w-full max-w-md rounded-[24px] border border-[#dfe7e3] bg-[#fbfcfa] p-6 shadow-2xl"><div className="flex items-start justify-between"><h3 className="repfi-display text-xl font-bold">{title}</h3><button onClick={onClose} className="rounded-lg p-1 hover:bg-[#e9efea]"><X size={18}/></button></div>{children}</div></div>;
}
export function SearchBox({ value, onChange, placeholder = "Search" }: { value: string; onChange: (v:string)=>void; placeholder?: string }) {
  return <div className="flex items-center gap-2 rounded-xl border border-[#dfe7e3] bg-[#fbfcfa] px-3 py-2.5"><Search size={16} className="text-[#70808c]"/><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-[#9aa8aa]"/></div>;
}