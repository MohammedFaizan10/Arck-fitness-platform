import { useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronDown, MoreHorizontal, Plus, Search, SlidersHorizontal, UserRound, Users } from "lucide-react";
import { AppShell, Metric, Modal, SectionHeading, SearchBox, go } from "./_shared/RepFiShared";
import "./_group.css";

type Member = {
  name: string;
  initials: string;
  email: string;
  plan: "Basic" | "Pro" | "Elite";
  trainer: string;
  joined: string;
  attendance: string;
  status: "Active" | "New" | "At risk";
  tone: string;
};

const seedMembers: Member[] = [
  { name: "Ananya Mehta", initials: "AM", email: "ananya.m@example.com", plan: "Pro", trainer: "Rahul Sharma", joined: "14 Apr 2024", attendance: "91%", status: "Active", tone: "bg-[#d7f35c]" },
  { name: "Kabir Singh", initials: "KS", email: "kabir.s@example.com", plan: "Basic", trainer: "Unassigned", joined: "13 Apr 2024", attendance: "68%", status: "New", tone: "bg-[#a9d6ce]" },
  { name: "Sara Thomas", initials: "ST", email: "sara.t@example.com", plan: "Elite", trainer: "Meera Kapoor", joined: "12 Apr 2024", attendance: "88%", status: "Active", tone: "bg-[#f39a64]" },
  { name: "Nikhil Rao", initials: "NR", email: "nikhil.r@example.com", plan: "Pro", trainer: "Rahul Sharma", joined: "10 Apr 2024", attendance: "46%", status: "At risk", tone: "bg-[#d8c5b9]" },
  { name: "Maya Iyer", initials: "MI", email: "maya.i@example.com", plan: "Pro", trainer: "Dev Malhotra", joined: "08 Apr 2024", attendance: "82%", status: "Active", tone: "bg-[#bfe0d5]" },
  { name: "Arjun Bedi", initials: "AB", email: "arjun.b@example.com", plan: "Basic", trainer: "Unassigned", joined: "04 Apr 2024", attendance: "57%", status: "At risk", tone: "bg-[#e8cf9f]" },
];

function statusClass(status: Member["status"]) {
  if (status === "At risk") return "bg-[#fff0e7] text-[#c66735]";
  if (status === "New") return "bg-[#e1f0ed] text-[#0f6268]";
  return "bg-[#eff7c9] text-[#537000]";
}

export function AdminMembers() {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState("All plans");
  const [status, setStatus] = useState("All status");
  const [members, setMembers] = useState(seedMembers);
  const [selected, setSelected] = useState<Member | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const filtered = useMemo(() => members.filter((member) => {
    const text = `${member.name} ${member.email} ${member.trainer}`.toLowerCase();
    return text.includes(query.toLowerCase())
      && (plan === "All plans" || member.plan === plan)
      && (status === "All status" || member.status === status);
  }), [members, plan, query, status]);

  const addDemoMember = () => {
    setMembers((current) => [
      { name: "Riya Nair", initials: "RN", email: "riya.n@example.com", plan: "Pro", trainer: "Unassigned", joined: "Today", attendance: "—", status: "New", tone: "bg-[#cbd8f0]" },
      ...current,
    ]);
    setAdded(true);
  };

  return (
    <AppShell owner title="Members" eyebrow="RepFit Fitness Center · Admin">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <button onClick={() => go("OwnerDashboard")} className="mb-4 flex items-center gap-2 text-xs font-bold text-[#0f6268] hover:text-[#20334a]">
            <ArrowLeft size={14} /> Back to overview
          </button>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#0f6268]">Member directory</p>
          <h2 className="repfi-display mt-2 text-3xl font-bold tracking-[-.05em] sm:text-4xl">Know every member.</h2>
          <p className="mt-2 max-w-xl text-sm text-[#70808c]">Search your community, review attendance, and keep every member moving forward.</p>
        </div>
        <button onClick={() => { setAddOpen(true); setAdded(false); }} className="flex items-center justify-center gap-2 rounded-xl bg-[#20334a] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f6268]">
          <Plus size={16} /> Add member
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Total members" value="1,248" detail="+8.4% this month" accent="lime" />
        <Metric label="Active this week" value="982" detail="78.7% of your community" accent="teal" />
        <Metric label="Needs attention" value="34" detail="Members below 50% attendance" accent="orange" />
      </div>

      <section className="repfi-card mt-8 overflow-hidden">
        <div className="border-b border-[#dfe7e3] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <SectionHeading kicker="Live directory" title={`${filtered.length} members showing`} />
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="min-w-[240px]"><SearchBox value={query} onChange={setQuery} placeholder="Search members" /></div>
              <label className="flex items-center gap-2 rounded-xl border border-[#dfe7e3] bg-[#fbfcfa] px-3 text-xs font-bold text-[#70808c]">
                <SlidersHorizontal size={15} />
                <select value={plan} onChange={(event) => setPlan(event.target.value)} className="bg-transparent py-2.5 outline-none">
                  {["All plans", "Basic", "Pro", "Elite"].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-[#dfe7e3] bg-[#fbfcfa] px-3 py-2.5 text-xs font-bold text-[#70808c] outline-none">
                {["All status", "Active", "New", "At risk"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[930px]">
            <div className="grid grid-cols-[1.6fr_1.25fr_.65fr_1.05fr_.65fr_.7fr_.45fr] gap-4 border-b border-[#dfe7e3] px-6 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#9aa8aa]">
              <span>Member</span><span>Trainer</span><span>Plan</span><span>Joined</span><span>Attendance</span><span>Status</span><span />
            </div>
            {filtered.length ? filtered.map((member) => (
              <div key={member.email} className="grid grid-cols-[1.6fr_1.25fr_.65fr_1.05fr_.65fr_.7fr_.45fr] items-center gap-4 border-b border-[#e9efea] px-6 py-4 text-sm transition hover:bg-[#f7faf5]">
                <button onClick={() => setSelected(member)} className="flex min-w-0 items-center gap-3 text-left">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[10px] font-bold text-[#20334a] ${member.tone}`}>{member.initials}</span>
                  <span className="min-w-0"><b className="block truncate">{member.name}</b><span className="mt-1 block truncate text-[11px] text-[#70808c]">{member.email}</span></span>
                </button>
                <span className="truncate text-xs text-[#70808c]">{member.trainer}</span>
                <span className="text-xs font-bold text-[#20334a]">{member.plan}</span>
                <span className="text-xs text-[#70808c]">{member.joined}</span>
                <span className={`text-xs font-bold ${member.attendance !== "—" && Number.parseInt(member.attendance) < 50 ? "text-[#c66735]" : "text-[#0f6268]"}`}>{member.attendance}</span>
                <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${statusClass(member.status)}`}>{member.status}</span>
                <button onClick={() => setSelected(member)} className="justify-self-end rounded-lg p-2 text-[#70808c] hover:bg-[#e9efea] hover:text-[#20334a]">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            )) : (
              <div className="grid place-items-center px-6 py-16 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eff7c9] text-[#537000]"><Search size={19} /></span>
                <p className="mt-4 font-bold">No members match those filters.</p>
                <button onClick={() => { setQuery(""); setPlan("All plans"); setStatus("All status"); }} className="mt-2 text-xs font-bold text-[#0f6268]">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dfe7e3] bg-[#e1f0ed] px-5 py-4 text-xs">
        <span className="flex items-center gap-2 font-bold text-[#0f6268]"><Users size={16} /> Member data is updated in this demo workspace.</span>
        <span className="text-[#70808c]">Showing {filtered.length} of {members.length} demo profiles</span>
      </div>

      {selected && <Modal title="Member profile" onClose={() => setSelected(null)}>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#e1f0ed] p-4">
          <span className={`grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-[#20334a] ${selected.tone}`}>{selected.initials}</span>
          <div><p className="font-bold">{selected.name}</p><p className="mt-1 text-xs text-[#70808c]">{selected.email}</p></div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-[#f5f7f4] p-3"><span className="text-[#70808c]">Plan</span><b className="mt-1 block">{selected.plan}</b></div>
          <div className="rounded-xl bg-[#f5f7f4] p-3"><span className="text-[#70808c]">Attendance</span><b className="mt-1 block">{selected.attendance}</b></div>
          <div className="rounded-xl bg-[#f5f7f4] p-3"><span className="text-[#70808c]">Trainer</span><b className="mt-1 block">{selected.trainer}</b></div>
          <div className="rounded-xl bg-[#f5f7f4] p-3"><span className="text-[#70808c]">Status</span><b className="mt-1 block">{selected.status}</b></div>
        </div>
        <button onClick={() => setSelected(null)} className="mt-5 w-full rounded-xl bg-[#20334a] py-3 text-sm font-bold text-white">Close profile</button>
      </Modal>}

      {addOpen && <Modal title={added ? "Member added" : "Add a new member"} onClose={() => setAddOpen(false)}>
        {added ? <><div className="mt-5 rounded-2xl bg-[#eff7c9] p-4"><div className="flex items-center gap-2 font-bold"><Check size={16} /> Riya Nair is ready for onboarding.</div><p className="mt-2 text-xs text-[#70808c]">The new demo profile now appears at the top of the directory.</p></div><button onClick={() => setAddOpen(false)} className="mt-5 w-full rounded-xl bg-[#20334a] py-3 text-sm font-bold text-white">Done</button></> : <><div className="mt-5 space-y-3"><input placeholder="Full name" className="w-full rounded-xl border border-[#dfe7e3] bg-[#f5f7f4] px-4 py-3 text-sm outline-none" /><input placeholder="Email address" className="w-full rounded-xl border border-[#dfe7e3] bg-[#f5f7f4] px-4 py-3 text-sm outline-none" /><div className="relative"><UserRound size={15} className="absolute left-4 top-3.5 text-[#70808c]" /><input placeholder="Assign trainer (optional)" className="w-full rounded-xl border border-[#dfe7e3] bg-[#f5f7f4] py-3 pl-10 pr-4 text-sm outline-none" /><ChevronDown size={15} className="absolute right-4 top-3.5 text-[#70808c]" /></div></div><button onClick={addDemoMember} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f6268] py-3 text-sm font-bold text-white"><Plus size={16} /> Create member</button></>}
      </Modal>}
    </AppShell>
  );
}