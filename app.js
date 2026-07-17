const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const HISTORIC_COMPLETE_COUNT = 386;
const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const TRANSACTION_CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const nowMinusHours = (hours) => new Date(Date.now() - hours * HOUR).toISOString();
const nowPlusDays = (days) => new Date(Date.now() + days * DAY).toISOString();

const moduleMeta = {
  transactions: { title: "All transactions", workspace: "Revenue visibility" },
  onboarding: { title: "Onboarding completion", workspace: "Client onboarding" },
  payments: { title: "Payment plan tracker", workspace: "Operations workspace" },
  commissions: { title: "Sales invoice cross-checks", workspace: "Sales compensation" },
  thrive: { title: "Thrive P&L", workspace: "Thrive workspace" },
  csm: { title: "Member Success compensation", workspace: "Client Success workspace" },
  admin: { title: "People, access, and exceptions", workspace: "Administration" },
};

const people = [
  { id: "amela", name: "Amela Tufo", shortName: "Amela", role: "Operations Manager", department: "Operations", workspace: "BBP Operations", scope: "All BBP", modules: ["transactions", "onboarding", "payments", "commissions", "thrive", "csm", "admin"], finance: true, systemAdmin: true },
  { id: "john", name: "John", shortName: "John", role: "Automation Specialist", department: "Operations", workspace: "BBP Operations", scope: "Operations", modules: ["onboarding", "payments", "admin"], finance: false, systemAdmin: true },
  { id: "shaan", name: "Shaan Kassam", shortName: "Shaan", role: "Founder & CEO", department: "Leadership", workspace: "BBP Leadership", scope: "All BBP", modules: ["transactions", "thrive", "admin"], finance: true, systemAdmin: true },
  { id: "zion", name: "Zion Kim", shortName: "Zion", role: "Fractional COO", department: "Leadership", workspace: "BBP Leadership", scope: "All BBP", modules: ["transactions", "thrive", "admin"], finance: true, systemAdmin: true },
  { id: "emily", name: "Emily Hall", shortName: "Emily", role: "Director of Member Success", department: "Client Success", workspace: "BBP Customer Success", scope: "All onboarding & CSM", modules: ["onboarding", "csm"], finance: true, departmentHead: true },
  { id: "mikayleigh", name: "Mikayleigh", shortName: "Mikayleigh", role: "Member Success", department: "Client Success", workspace: "BBP Client Success", scope: "All onboarding; own pay", modules: ["onboarding", "csm"], finance: true },
  { id: "matt", name: "Matt McCaffer", shortName: "Matt", role: "Head of Sales", department: "Sales", workspace: "BBP Sales Lead", scope: "All Sales", modules: ["commissions", "admin"], finance: true, departmentHead: true },
  { id: "whitney", name: "Whitney", shortName: "Whitney", role: "Setter", department: "Sales", workspace: "BBP Sales", scope: "Own invoice", modules: ["commissions"], finance: true },
  { id: "rachelle", name: "Rachelle", shortName: "Rachelle", role: "Setter", department: "Sales", workspace: "BBP Sales", scope: "Own invoice", modules: ["commissions"], finance: true },
  { id: "robyn", name: "Robyn", shortName: "Robyn", role: "Closer", department: "Sales", workspace: "BBP Sales", scope: "Assigned onboarding & own invoice", modules: ["onboarding", "commissions"], finance: true },
  { id: "ali", name: "Ali", shortName: "Ali", role: "Sales Manager", department: "Sales", workspace: "BBP Sales Manager", scope: "Assigned onboarding & own invoice", modules: ["onboarding", "commissions"], finance: true },
  { id: "briony", name: "Briony McKenzie", shortName: "Briony", role: "Thrive Program Lead", department: "Thrive", workspace: "BBP Thrive", scope: "All Thrive", modules: ["thrive"], finance: true, departmentHead: true },
];

const salesMembers = [
  { name: "Whitney", role: "Setter", rate: 0.05, base: 2000 },
  { name: "Rachelle", role: "Setter", rate: 0.05, base: 1500 },
  { name: "Ali", role: "Closer", rate: 0.1, base: 0 },
  { name: "Robyn", role: "Closer", rate: 0.1, base: 0 },
];

const monthOptions = [
  { value: "2026-07", label: "July 2026" },
  { value: "2026-06", label: "June 2026" },
];

const onboardingClients = [
  { id: 1, name: "Maya Thompson", email: "maya.thompson@example.com", closer: "Robyn", setter: "Whitney", csm: "Emily", saleType: "New sale", product: "Mentorship", saleAt: nowMinusHours(31), contract: { status: "sent", sentAt: nowMinusHours(30) }, skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(27) } },
  { id: 2, name: "Daniel Foster", email: "daniel.foster@example.com", closer: "Ali", setter: "Rachelle", csm: "Mikayleigh", saleType: "New sale", product: "Academy", saleAt: nowMinusHours(18), contract: { status: "signed", sentAt: nowMinusHours(17), completedAt: nowMinusHours(13) }, skoolAccess: { status: "given", timerStartedAt: nowMinusHours(16), completedAt: nowMinusHours(14) } },
  { id: 3, name: "Priya Kapoor", email: "priya.kapoor@example.com", closer: "Robyn", setter: null, csm: "Emily", saleType: "New sale", product: "Thrive", saleAt: nowMinusHours(7), contract: { status: "sent", sentAt: nowMinusHours(6) }, skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(5) } },
  { id: 4, name: "Marcus Reed", email: "marcus.reed@example.com", closer: "Ali", setter: "Rachelle", csm: "Emily", saleType: "New sale", product: "Mentorship", saleAt: nowMinusHours(52), contract: { status: "signed", sentAt: nowMinusHours(50), completedAt: nowMinusHours(45) }, skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(48) } },
  { id: 5, name: "Sofia Bennett", email: "sofia.bennett@example.com", closer: null, setter: null, csm: "Mikayleigh", saleType: "Extension", product: "Academy", saleAt: nowMinusHours(29), contract: { status: "sent", sentAt: nowMinusHours(28) }, skoolAccess: { status: "given", timerStartedAt: nowMinusHours(27), completedAt: nowMinusHours(26) } },
  { id: 6, name: "Noah Williams", email: "noah.williams@example.com", closer: "Robyn", setter: "Rachelle", csm: "Mikayleigh", saleType: "New sale", product: "Thrive", saleAt: nowMinusHours(42), contract: { status: "signed", sentAt: nowMinusHours(40), completedAt: nowMinusHours(35) }, skoolAccess: { status: "given", timerStartedAt: nowMinusHours(39), completedAt: nowMinusHours(36) } },
  { id: 7, name: "Elena Rodriguez", email: "elena.rodriguez@example.com", closer: "Robyn", setter: "Whitney", csm: "Emily", saleType: "New sale", product: "Mentorship", saleAt: nowMinusHours(28), contract: { status: "sent", sentAt: nowMinusHours(27) }, skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(26) } },
  { id: 8, name: "Liam Chen", email: "liam.chen@example.com", closer: "Ali", setter: "Rachelle", csm: "Mikayleigh", saleType: "New sale", product: "Academy", saleAt: nowMinusHours(11), contract: { status: "signed", sentAt: nowMinusHours(10), completedAt: nowMinusHours(8) }, skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(9) } },
];

const paymentPlans = [
  { id: 101, name: "Maya Thompson", email: "maya.thompson@example.com", product: "Mentorship", setter: "Whitney", closer: "Robyn", balance: 4200, dueAt: nowPlusDays(-2) },
  { id: 102, name: "Priya Kapoor", email: "priya.kapoor@example.com", product: "Thrive", setter: null, closer: "Robyn", balance: 1800, dueAt: nowPlusDays(4) },
  { id: 103, name: "Elena Rodriguez", email: "elena.rodriguez@example.com", product: "Mentorship", setter: "Whitney", closer: "Ali", balance: 3100, dueAt: nowPlusDays(12) },
  { id: 104, name: "Owen Clarke", email: "owen.clarke@example.com", product: "Academy", setter: "Rachelle", closer: "Robyn", balance: 1200, dueAt: nowPlusDays(-5) },
  { id: 105, name: "Aisha Grant", email: "aisha.grant@example.com", product: "Thrive", setter: "Rachelle", closer: "Ali", balance: 2400, dueAt: nowPlusDays(7) },
  { id: 106, name: "Caleb Turner", email: "caleb.turner@example.com", product: "Academy", setter: "Whitney", closer: "Ali", balance: 800, dueAt: nowPlusDays(21) },
];

const julyRobynEnrollments = [
  ["Maya Thompson", "Mentorship", 5000, "Whitney"],
  ["Aisha Grant", "Thrive", 1750, "Rachelle"],
  ["Noah Williams", "Thrive", 3500, "Whitney"],
  ["Grace Lee", "Academy", 1787, "Whitney"],
  ["Harper Stone", "Mentorship", 2500, "Rachelle"],
  ["Jordan Miles", "Thrive", 1000, "Whitney"],
  ["Camila Brooks", "Academy", 997, "Rachelle"],
  ["Ethan Cole", "Mentorship", 3000, "Whitney"],
  ["Nina Patel", "Thrive", 3500, "Rachelle"],
  ["Leo Martin", "Academy", 900, null],
].map(([client, product, amount, setter], index) => ({
  id: 300 + index,
  receivedAt: `2026-07-${String(index + 2).padStart(2, "0")}`,
  client,
  product,
  type: index % 3 === 0 ? "Paid in full" : "First installment",
  amount,
  contractValue: index % 3 === 0 ? amount : { Mentorship: 5000, Academy: 1787, Thrive: 3500 }[product],
  setter,
  closer: "Robyn",
  firstPayment: true,
}));

const julyAliExtraEnrollments = [
  ["Olivia Grant", "Mentorship", 2500, "Whitney"],
  ["Lucas Moore", "Academy", 997, "Rachelle"],
  ["Isla Cooper", "Thrive", 1750, "Whitney"],
  ["Mason Bell", "Mentorship", 5000, "Rachelle"],
  ["Chloe Ward", "Academy", 1787, "Whitney"],
  ["Theo Young", "Thrive", 3500, "Rachelle"],
  ["Mia Scott", "Mentorship", 1500, "Whitney"],
].map(([client, product, amount, setter], index) => ({
  id: 400 + index,
  receivedAt: `2026-07-${String(index + 6).padStart(2, "0")}`,
  client,
  product,
  type: index % 3 === 0 ? "Paid in full" : "First installment",
  amount,
  contractValue: index % 3 === 0 ? amount : { Mentorship: 5000, Academy: 1787, Thrive: 3500 }[product],
  setter,
  closer: "Ali",
  firstPayment: true,
}));

const receivedPayments = [
  ...julyRobynEnrollments,
  ...julyAliExtraEnrollments,
  { id: 201, receivedAt: "2026-07-05", client: "Priya Kapoor", product: "Thrive", type: "First installment", amount: 1750, contractValue: 3500, setter: "Rachelle", closer: "Ali", firstPayment: true },
  { id: 202, receivedAt: "2026-07-08", client: "Daniel Foster", product: "Academy", type: "Plan installment", amount: 500, setter: "Whitney", closer: "Ali", firstPayment: false },
  { id: 203, receivedAt: "2026-07-15", client: "Caleb Turner", product: "Academy", type: "First installment", amount: 997, contractValue: 997, setter: "Rachelle", closer: "Ali", firstPayment: true },
  { id: 204, receivedAt: "2026-07-16", client: "Tara Singh", product: "Mentorship", type: "Program ascension", amount: 2000, contractValue: 3000, setter: "Whitney", closer: "Ali", firstPayment: true },
  { id: 206, receivedAt: "2026-07-13", client: "Hannah Price", product: "Thrive", type: "Refund", amount: -1750, setter: "Rachelle", closer: "Robyn", firstPayment: false, status: "Refunded" },
  { id: 207, receivedAt: "2026-06-03", client: "Elena Rodriguez", product: "Mentorship", type: "Paid in full", amount: 5000, contractValue: 5000, setter: "Whitney", closer: "Ali", firstPayment: true },
  { id: 208, receivedAt: "2026-06-09", client: "Owen Clarke", product: "Academy", type: "Plan installment", amount: 600, setter: "Rachelle", closer: "Robyn", firstPayment: false },
  { id: 209, receivedAt: "2026-06-16", client: "Jordan Miles", product: "Thrive", type: "Paid in full", amount: 3500, contractValue: 3500, setter: "Whitney", closer: "Robyn", firstPayment: true },
  { id: 210, receivedAt: "2026-06-22", client: "Aisha Grant", product: "Thrive", type: "Plan installment", amount: 1750, setter: "Rachelle", closer: "Ali", firstPayment: false },
];

const revenueTransactions = [
  { id: "jul-01", date: "2026-07-01", client: "Jordan Lee", product: "Desensitization Blueprint", amount: 27, processor: "Stripe", account: "Stripe Clearing" },
  { id: "jul-02", date: "2026-07-01", client: "Riley Morgan", product: "Accelerator", amount: 47, processor: "Stripe", account: "Stripe Clearing" },
  { id: "jul-03", date: "2026-07-02", client: "Ava Carter", product: "Mentorship", amount: 5000, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-04", date: "2026-07-02", client: null, product: "Shaan AI", amount: 20, processor: "Skool", account: "Chase Checking" },
  { id: "jul-05", date: "2026-07-03", client: "Mia Patel", product: "Thrive", amount: 3500, processor: "SamCart", account: "SamCart Clearing" },
  { id: "jul-06", date: "2026-07-03", client: "Owen Clarke", product: "Academy", amount: 1787, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-07", date: "2026-07-04", client: "Leo Martin", product: "Continuity", amount: 197, processor: "PayPal", account: "PayPal Bank" },
  { id: "jul-08", date: "2026-07-05", client: "Isla Cooper", product: "Mentorship", amount: 1850, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-09", date: "2026-07-06", client: "Nora James", product: "Shaan AI", amount: 20, processor: "Skool", account: "Chase Checking" },
  { id: "jul-10", date: "2026-07-07", client: "Jordan Lee", product: "Desensitization Blueprint", amount: -27, processor: "Stripe", account: "Stripe Clearing" },
  { id: "jul-11", date: "2026-07-08", client: "Theo Young", product: "Thrive", amount: 1750, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-12", date: "2026-07-09", client: "Chloe Ward", product: "Academy", amount: 997, processor: "SamCart", account: "SamCart Clearing" },
  { id: "jul-13", date: "2026-07-10", client: "Mason Bell", product: "Mentorship", amount: 2500, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-14", date: "2026-07-10", client: "Sofia Bennett", product: "Accelerator", amount: 47, processor: "PayPal", account: "PayPal Bank" },
  { id: "jul-15", date: "2026-07-11", client: "Ethan Cole", product: "Desensitization Blueprint", amount: 27, processor: "Stripe", account: "Stripe Clearing" },
  { id: "jul-16", date: "2026-07-12", client: "Hannah Price", product: "Thrive", amount: -1750, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-17", date: "2026-07-13", client: "Camila Brooks", product: "Academy", amount: 500, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jul-18", date: "2026-07-14", client: "Daniel Foster", product: "Mentorship", amount: 1850, processor: "SamCart", account: "SamCart Clearing" },
  { id: "jul-19", date: "2026-07-15", client: null, product: "Shaan AI", amount: 140, processor: "Skool", account: "Chase Checking" },
  { id: "jul-20", date: "2026-07-16", client: "Grace Lee", product: "Continuity", amount: 197, processor: "PayPal", account: "PayPal Bank" },
  { id: "jun-01", date: "2026-06-01", client: "Taylor Reed", product: "Desensitization Blueprint", amount: 27, processor: "Stripe", account: "Stripe Clearing" },
  { id: "jun-02", date: "2026-06-01", client: "Morgan Blake", product: "Mentorship", amount: 5000, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jun-03", date: "2026-06-02", client: "Alex Rivers", product: "Shaan AI", amount: 20, processor: "Stripe", account: "Stripe Clearing (BBP2)" },
  { id: "jun-04", date: "2026-06-03", client: "Casey Hart", product: "Continuity", amount: 175, processor: "PayPal", account: "PayPal Bank" },
  { id: "jun-05", date: "2026-06-04", client: null, product: "Shaan AI", amount: 139.23, processor: "Skool", account: "Chase Checking" },
  { id: "jun-06", date: "2026-06-09", client: "Jamie Fox", product: "Accelerator", amount: 47, processor: "PayPal", account: "PayPal Bank" },
  { id: "jun-07", date: "2026-06-11", client: "Sam Lane", product: "Mentorship", amount: 5000, processor: "PayPal", account: "PayPal Bank" },
  { id: "jun-08", date: "2026-06-16", client: "Drew Cole", product: "Thrive", amount: 3500, processor: "Stripe", account: "Stripe Clearing (BBP4)" },
  { id: "jun-09", date: "2026-06-18", client: "Avery Woods", product: "Academy", amount: 997, processor: "SamCart", account: "SamCart Clearing" },
  { id: "jun-10", date: "2026-06-22", client: "Parker Stone", product: "Mentorship", amount: 3000, processor: "PayPal", account: "PayPal Bank" },
  { id: "jun-11", date: "2026-06-24", client: "Quinn Baker", product: "Mentorship", amount: 3000, processor: "PayPal", account: "PayPal Bank" },
  { id: "jun-12", date: "2026-06-25", client: "Taylor Reed", product: "Desensitization Blueprint", amount: -27, processor: "Stripe", account: "Stripe Clearing" },
  { id: "jun-13", date: "2026-06-30", client: "Reese Adams", product: "Continuity", amount: 197, processor: "PayPal", account: "PayPal Bank" },
];

const transactionProducts = ["Mentorship", "Academy", "Thrive", "Continuity", "Accelerator", "Desensitization Blueprint", "Shaan AI"];

const thriveCosts = {
  "2026-07": { christina: 3500, mikayleigh: 1500, tools: 650 },
  "2026-06": { christina: 3400, mikayleigh: 1500, tools: 620 },
};

const csmEvents = [
  { id: 501, month: "2026-07", date: "2026-07-04", person: "Emily", client: "Taylor Reed", event: "Mentorship renewal", amount: 150, program: "Mentorship" },
  { id: 502, month: "2026-07", date: "2026-07-09", person: "Emily", client: "Morgan Blake", event: "Thrive ascension", amount: 175, program: "Thrive" },
  { id: 503, month: "2026-07", date: "2026-07-12", person: "Emily", client: "Jamie Fox", event: "Referral became paying client", amount: 250, program: "Mentorship" },
  { id: 504, month: "2026-07", date: "2026-07-06", person: "Mikayleigh", client: "Alex Rivers", event: "Academy renewal", amount: 50, program: "Academy" },
  { id: 505, month: "2026-07", date: "2026-07-11", person: "Mikayleigh", client: "Casey Hart", event: "Academy → Thrive ascension", amount: 200, program: "Thrive" },
  { id: 506, month: "2026-07", date: "2026-07-14", person: "Mikayleigh", client: "Sam Lane", event: "Thrive referral", amount: 250, program: "Thrive" },
  { id: 507, month: "2026-06", date: "2026-06-08", person: "Emily", client: "Drew Cole", event: "Mentorship renewal", amount: 150, program: "Mentorship" },
  { id: 508, month: "2026-06", date: "2026-06-15", person: "Mikayleigh", client: "Avery Woods", event: "Mentorship → Thrive ascension", amount: 200, program: "Thrive" },
];

const csmRateCards = {
  Emily: [
    ["Base compensation", "$8,000 / month"],
    ["Mentorship renewal", "$150 when Emily closes"],
    ["Thrive ascension", "$175 when Emily closes"],
    ["Qualified referral", "$250"],
    ["Quarterly Excellence", "$2,000–$2,500 by scorecard"],
  ],
  Mikayleigh: [
    ["Base compensation", "$4,000 / month"],
    ["BBP / Thrive allocation", "$2,500 / $1,500"],
    ["Renewals", "$50–$125"],
    ["Ascensions", "$150–$200"],
    ["Qualified referrals", "$100–$250"],
    ["Quarterly accelerator", "$1,000 · criteria pending"],
  ],
};

const invoiceStates = {
  "2026-07:Whitney": { status: "awaiting_salesperson", note: "The generated breakdown is unlocked for Whitney's review, bonuses, and corrections." },
  "2026-07:Rachelle": { status: "awaiting_amela", note: "Rachelle submitted the invoice. It is unlocked for Amela's review and corrections." },
  "2026-07:Ali": { status: "awaiting_matt", note: "Amela approved the breakdown. It is unlocked for Matt's final review and corrections." },
  "2026-07:Robyn": { status: "ready_for_payment", note: "Final Sales approval completed by Matt." },
  "2026-06:Whitney": { status: "paid", note: "Paid on July 8, 2026." },
  "2026-06:Rachelle": { status: "paid", note: "Paid on July 8, 2026." },
  "2026-06:Ali": { status: "paid", note: "Paid on July 8, 2026." },
  "2026-06:Robyn": { status: "paid", note: "Paid on July 8, 2026." },
};

const state = {
  persona: "amela",
  currentView: "transactions",
  transactions: { month: "2026-07", search: "", product: "all", type: "all", sort: "newest" },
  onboarding: { search: "", status: "active", product: "all" },
  payments: { search: "", status: "all" },
  commissions: {
    month: "2026-07",
    person: "Whitney",
    manualAdjustments: {},
    clawbacks: {},
    transactionEdits: {
      "2026-07:Rachelle:201": { status: "pending", editedBy: "Rachelle", reason: "Approved Thrive transfer reduced the final contract value.", values: { contractValue: 3200 } },
      "2026-07:Rachelle:203": { status: "pending", editedBy: "Rachelle", reason: "Closer attribution needs correction before approval.", values: { closer: "Robyn" } },
    },
  },
  csm: { month: "2026-07", person: "Emily" },
  thrive: { month: "2026-07", transactionFilter: "all" },
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function currentPerson() {
  return people.find((person) => person.id === state.persona);
}

function selectedSalesMember() {
  return salesMembers.find((member) => member.name === state.commissions.person);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function hoursSince(isoDate) {
  return Math.max(0, (Date.now() - new Date(isoDate).getTime()) / HOUR);
}

function wholeDaysUntil(isoDate) {
  return Math.ceil((new Date(isoDate).getTime() - Date.now()) / DAY);
}

function formatHours(hours) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.floor((hours - wholeHours) * 60);
  return `${wholeHours}h ${String(minutes).padStart(2, "0")}m`;
}

function monthMatches(date, month) {
  return date.slice(0, 7) === month;
}

function pill(label, tone) {
  return `<span class="pill pill-${tone}">${escapeHtml(label)}</span>`;
}

function renderMetrics(containerId, cards) {
  document.getElementById(containerId).innerHTML = cards.map((card) => `
    <article class="metric-card ${card.className || ""}">
      <div class="metric-label"><span>${card.label}</span><span class="metric-icon" aria-hidden="true">${card.icon}</span></div>
      <p class="metric-value">${card.value}</p>
      <p class="metric-detail">${card.detail}</p>
    </article>`).join("");
}

function monthTransactions() {
  return revenueTransactions.filter((transaction) => monthMatches(transaction.date, state.transactions.month));
}

function filteredTransactions() {
  const { search, product, type, sort } = state.transactions;
  const term = search.trim().toLowerCase();
  return monthTransactions().filter((transaction) => {
    const searchValue = `${transaction.client || ""} ${transaction.product} ${transaction.processor} ${transaction.account}`.toLowerCase();
    const productMatch = product === "all" || transaction.product === product;
    const typeMatch = type === "all" || (type === "revenue" && transaction.amount > 0) || (type === "refund" && transaction.amount < 0);
    return (!term || searchValue.includes(term)) && productMatch && typeMatch;
  }).sort((a, b) => {
    if (sort === "oldest") return a.date.localeCompare(b.date);
    if (sort === "amount") return Math.abs(b.amount) - Math.abs(a.amount);
    return b.date.localeCompare(a.date);
  });
}

function renderTransactions() {
  const monthRows = monthTransactions();
  const rows = filteredTransactions();
  const revenue = monthRows.filter((transaction) => transaction.amount > 0).reduce((total, transaction) => total + transaction.amount, 0);
  const refunds = Math.abs(monthRows.filter((transaction) => transaction.amount < 0).reduce((total, transaction) => total + transaction.amount, 0));
  const net = revenue - refunds;
  renderMetrics("transaction-metrics", [
    { label: "Total revenue", value: TRANSACTION_CURRENCY.format(revenue), detail: `${monthRows.filter((transaction) => transaction.amount > 0).length} successful revenue transactions`, icon: "↗", className: "is-success" },
    { label: "Total refunds", value: TRANSACTION_CURRENCY.format(refunds), detail: `${monthRows.filter((transaction) => transaction.amount < 0).length} refunds returned to clients`, icon: "↙", className: "is-danger" },
    { label: "Net after refunds", value: TRANSACTION_CURRENCY.format(net), detail: "Revenue less refunds · costs excluded", icon: "$", className: "is-highlight" },
  ]);

  document.getElementById("transaction-product-breakdown").innerHTML = transactionProducts.map((product) => {
    const productRows = monthRows.filter((transaction) => transaction.product === product);
    const total = productRows.reduce((sum, transaction) => sum + transaction.amount, 0);
    return `<article class="product-total"><span>${escapeHtml(product)}</span><strong>${TRANSACTION_CURRENCY.format(total)}</strong><small>${productRows.length} transaction${productRows.length === 1 ? "" : "s"}</small></article>`;
  }).join("");

  document.getElementById("transaction-table-body").innerHTML = rows.map((transaction) => {
    const refund = transaction.amount < 0;
    const client = transaction.client
      ? `<span class="client-name"><span class="client-initials">${initials(transaction.client)}</span>${escapeHtml(transaction.client)}</span>`
      : '<span class="cell-primary">Name unavailable</span><span class="cell-secondary">No purchaser name supplied</span>';
    return `<tr class="${refund ? "transaction-refund" : ""}">
      <td><span class="cell-primary">${dateFormatter.format(new Date(`${transaction.date}T12:00:00`))}</span></td>
      <td class="client-cell">${client}</td>
      <td><span class="product-pill">${escapeHtml(transaction.product)}</span></td>
      <td><span class="transaction-amount ${refund ? "is-refund" : "is-revenue"}">${TRANSACTION_CURRENCY.format(transaction.amount)}</span><span class="cell-secondary">${refund ? "Refund" : "Revenue"}</span></td>
      <td><span class="cell-primary">${escapeHtml(transaction.processor)}</span></td>
      <td><span class="cell-primary">${escapeHtml(transaction.account)}</span></td>
    </tr>`;
  }).join("");
  document.getElementById("transaction-showing").textContent = rows.length;
  document.getElementById("transaction-total").textContent = monthRows.length;
  document.getElementById("transaction-empty").hidden = rows.length > 0;
}

function getOnboardingState(client) {
  const contractHours = hoursSince(client.contract.sentAt || client.saleAt);
  const skoolHours = hoursSince(client.skoolAccess.timerStartedAt);
  const contractIncomplete = client.contract.status !== "signed";
  const skoolIncomplete = client.skoolAccess.status !== "given";
  const escalated = (contractIncomplete && contractHours >= 24) || (skoolIncomplete && skoolHours >= 24);
  const complete = !contractIncomplete && !skoolIncomplete;
  const escalationOwner = client.closer || client.csm;
  return { contractHours, skoolHours, contractIncomplete, skoolIncomplete, escalated, complete, escalationOwner, category: complete ? "complete" : escalated ? "escalated" : "onboarding" };
}

function onboardingScope() {
  const person = currentPerson();
  if (["robyn", "ali"].includes(person.id)) return onboardingClients.filter((client) => client.closer === person.shortName);
  return onboardingClients;
}

function renderContract(client, clientState) {
  if (client.contract.status === "signed") return `${pill("Signed", "success")}<span class="cell-secondary">Completed</span>`;
  const escalated = clientState.contractIncomplete && clientState.contractHours >= 24;
  return `${pill("Sent · awaiting", escalated ? "danger" : "warning")}<span class="cell-secondary timer${escalated ? " is-danger-text" : ""}">${formatHours(clientState.contractHours)} elapsed</span>`;
}

function renderSkoolAccess(client, clientState) {
  if (client.skoolAccess.status === "given") return `${pill("Granted", "success")}<span class="cell-secondary">Completed</span>`;
  const escalated = clientState.skoolIncomplete && clientState.skoolHours >= 24;
  return `${pill("Not yet", escalated ? "danger" : "warning")}<span class="cell-secondary timer${escalated ? " is-danger-text" : ""}">${formatHours(clientState.skoolHours)} pending</span>`;
}

function filterOnboarding() {
  const { search, status, product } = state.onboarding;
  const term = search.trim().toLowerCase();
  return onboardingScope().map((client) => ({ client, clientState: getOnboardingState(client) })).filter(({ client, clientState }) => {
    const searchValue = `${client.name} ${client.email} ${client.closer || ""} ${client.csm}`.toLowerCase();
    const viewMatch = status === "complete" ? clientState.complete : !clientState.complete;
    return (!term || searchValue.includes(term)) && (product === "all" || client.product === product) && viewMatch;
  }).sort((a, b) => {
    if (a.clientState.escalated !== b.clientState.escalated) return a.clientState.escalated ? -1 : 1;
    return new Date(a.client.saleAt) - new Date(b.client.saleAt);
  });
}

function clientProfileButton(client) {
  return `<button class="client-profile-link" type="button" data-client-profile="${escapeHtml(client.name)}"><span class="client-initials">${initials(client.name)}</span><span>${escapeHtml(client.name)}</span></button>`;
}

function renderOnboarding() {
  const scoped = onboardingScope();
  const rows = filterOnboarding();
  const allStates = scoped.map(getOnboardingState);
  const escalatedCount = allStates.filter((item) => item.category === "escalated").length;
  const onboardingCount = allStates.filter((item) => item.category === "onboarding").length;
  const isCloser = ["robyn", "ali"].includes(currentPerson().id);
  renderMetrics("onboarding-metrics", [
    { label: "Currently onboarding", value: onboardingCount + escalatedCount, detail: "All incomplete high-ticket onboarding", icon: "◎" },
    { label: "Escalated", value: escalatedCount, detail: isCloser ? "Assigned to you" : "Included in currently onboarding", icon: "!", className: "is-danger" },
    { label: "Complete", value: isCloser ? allStates.filter((item) => item.complete).length : HISTORIC_COMPLETE_COUNT, detail: isCloser ? "Assigned sample clients complete" : "Historic clients fully onboarded", icon: "✓", className: "is-success" },
  ]);
  document.getElementById("onboarding-table-body").innerHTML = rows.map(({ client, clientState }) => {
    const status = clientState.complete ? pill("Complete", "success") : clientState.escalated ? `${pill(`Escalated · ${clientState.escalationOwner}`, "danger")}<span class="cell-secondary">${client.closer ? "Closer notified" : "CSM is primary owner"}</span>` : pill("In onboarding", "warning");
    return `<tr class="${clientState.escalated ? "is-escalated" : ""}">
      <td class="client-cell">${clientProfileButton(client)}</td>
      <td><span class="cell-primary">${escapeHtml(client.email)}</span></td>
      <td><span class="cell-primary">${dateFormatter.format(new Date(client.saleAt))}</span></td>
      <td><span class="cell-primary">${escapeHtml(client.saleType)}</span></td>
      <td><span class="cell-primary">${client.closer || "No closer"}</span></td>
      <td><span class="cell-primary">${client.csm}</span></td>
      <td><span class="product-pill">${client.product}</span></td>
      <td>${renderContract(client, clientState)}</td><td>${renderSkoolAccess(client, clientState)}</td><td>${status}</td>
    </tr>`;
  }).join("");
  document.getElementById("onboarding-empty").hidden = rows.length > 0;
  document.querySelector("#onboarding-view .table-scroll").hidden = rows.length === 0;
  document.getElementById("onboarding-showing").textContent = rows.length;
  document.getElementById("onboarding-total").textContent = state.onboarding.status === "complete" ? allStates.filter((item) => item.complete).length : onboardingCount + escalatedCount;
  document.getElementById("onboarding-nav-count").textContent = escalatedCount;
  document.getElementById("active-onboarding-quick-count").textContent = onboardingCount + escalatedCount;
}

function getPaymentState(plan) {
  const days = wholeDaysUntil(plan.dueAt);
  return { days, overdue: days < 0, dueSoon: days >= 0 && days <= 7, upcoming: days > 7 };
}

function filterPayments() {
  const { search, status } = state.payments;
  const term = search.trim().toLowerCase();
  return paymentPlans.map((plan) => ({ plan, planState: getPaymentState(plan) })).filter(({ plan, planState }) => {
    const statusMatch = status === "all" || (status === "overdue" && planState.overdue) || (status === "due-soon" && planState.dueSoon) || (status === "upcoming" && planState.upcoming);
    const searchValue = `${plan.name} ${plan.email} ${plan.product} ${plan.setter || ""} ${plan.closer || ""}`.toLowerCase();
    return (!term || searchValue.includes(term)) && statusMatch;
  }).sort((a, b) => new Date(a.plan.dueAt) - new Date(b.plan.dueAt));
}

function renderPayments() {
  const rows = filterPayments();
  const allStates = paymentPlans.map(getPaymentState);
  const overdueCount = allStates.filter((item) => item.overdue).length;
  const dueSoonCount = allStates.filter((item) => item.dueSoon).length;
  const showMoney = currentPerson().finance;
  const remainingBalance = paymentPlans.reduce((total, plan) => total + plan.balance, 0);
  renderMetrics("payment-metrics", [
    { label: "Active plans", value: paymentPlans.length, detail: "Clients not paid in full", icon: "◎" },
    { label: "Overdue", value: overdueCount, detail: "Operations-owned follow-up", icon: "!", className: "is-danger" },
    { label: "Due within 7 days", value: dueSoonCount, detail: "Upcoming attention window", icon: "↗" },
    { label: "Remaining balance", value: showMoney ? CURRENCY.format(remainingBalance) : "Restricted", detail: showMoney ? "Across dummy payment plans" : "Financial amounts hidden for this role", icon: "$", className: showMoney ? "is-success" : "" },
  ]);
  document.getElementById("payment-table-body").innerHTML = rows.map(({ plan, planState }) => {
    const timeLabel = planState.overdue ? `${Math.abs(planState.days)} days overdue` : planState.days === 0 ? "Due today" : `${planState.days} days remaining`;
    const status = planState.overdue ? pill("Overdue", "danger") : planState.dueSoon ? pill("Due soon", "warning") : pill("Upcoming", "info");
    return `<tr class="${planState.overdue ? "is-escalated" : ""}"><td class="client-cell">${clientProfileButton(plan)}</td><td><span class="cell-primary">${escapeHtml(plan.email)}</span></td><td><span class="product-pill">${plan.product}</span></td><td><span class="cell-primary">${plan.setter || "Unassigned"}</span></td><td><span class="cell-primary">${plan.closer || "Unassigned"}</span></td><td><span class="balance">${showMoney ? CURRENCY.format(plan.balance) : "••••"}</span></td><td>${dateFormatter.format(new Date(plan.dueAt))}</td><td><span class="timer ${planState.overdue ? "is-danger-text" : ""}">${timeLabel}</span></td><td>${status}</td></tr>`;
  }).join("");
  document.getElementById("payment-empty").hidden = rows.length > 0;
  document.querySelector("#payments-view .table-scroll").hidden = rows.length === 0;
  document.getElementById("payment-showing").textContent = rows.length;
  document.getElementById("payment-total").textContent = paymentPlans.length;
  document.getElementById("payments-nav-count").textContent = overdueCount;
  document.getElementById("overdue-quick-count").textContent = overdueCount;
}

function clientHistory(name, product, saleAt) {
  const ledgerRows = revenueTransactions.filter((transaction) => transaction.client === name).map((transaction) => ({
    id: transaction.id,
    date: transaction.date,
    product: transaction.product,
    type: transaction.amount < 0 ? "Refund" : "Payment received",
    amount: transaction.amount,
  }));
  const salesRows = receivedPayments.filter((transaction) => transaction.client === name).map((transaction) => ({
    id: `sales-${transaction.id}`,
    date: transaction.receivedAt,
    product: transaction.product,
    type: transaction.type,
    amount: transaction.amount,
  }));
  const clawbackRows = Object.values(state.commissions.clawbacks).flat().filter((transaction) => transaction.client === name).map((transaction) => ({ id: transaction.id, date: transaction.receivedAt, product: transaction.product, type: "Refund clawback", amount: transaction.amount }));
  const combined = [...ledgerRows, ...salesRows, ...clawbackRows];
  if (!combined.some((transaction) => transaction.product === product)) {
    const standardAmounts = { Mentorship: 5000, Academy: 1787, Thrive: 3500 };
    combined.push({ id: `profile-${name}`, date: new Date(saleAt).toISOString().slice(0, 10), product, type: "Initial payment", amount: standardAmounts[product] || 0 });
  }
  return combined.sort((a, b) => b.date.localeCompare(a.date));
}

function clientEmail(name) {
  const known = onboardingClients.find((client) => client.name === name)?.email || paymentPlans.find((client) => client.name === name)?.email;
  if (known) return known;
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "")}@example.com`;
}

function openClientProfile(name) {
  const onboarding = onboardingClients.find((client) => client.name === name);
  const plan = paymentPlans.find((client) => client.name === name);
  const sales = receivedPayments.find((client) => client.client === name);
  const ledger = revenueTransactions.find((client) => client.client === name);
  const clawback = Object.values(state.commissions.clawbacks).flat().find((client) => client.client === name);
  if (!onboarding && !plan && !sales && !ledger && !clawback) return;
  const source = onboarding || plan || (sales ? { name, email: clientEmail(name), product: sales.product } : ledger ? { name, email: clientEmail(name), product: ledger.product } : { name, email: clawback.email || clientEmail(name), product: clawback.product });
  const product = source.product;
  const saleAt = onboarding?.saleAt || (sales ? `${sales.receivedAt}T12:00:00` : ledger ? `${ledger.date}T12:00:00` : clawback ? `${clawback.receivedAt}T12:00:00` : nowMinusHours(24 * 60));
  const history = clientHistory(name, product, saleAt);
  const lifetimeValue = history.reduce((total, transaction) => total + transaction.amount, 0);
  const firstTransaction = [...history].sort((a, b) => a.date.localeCompare(b.date))[0];
  const initialSaleDate = firstTransaction?.date || new Date(saleAt).toISOString().slice(0, 10);
  const closer = onboarding?.closer ?? plan?.closer ?? sales?.closer ?? clawback?.closer ?? null;
  const setter = onboarding?.setter ?? plan?.setter ?? sales?.setter ?? clawback?.setter ?? null;
  document.getElementById("client-modal-content").innerHTML = `
    <div class="client-modal-heading">
      <div class="client-modal-avatar">${initials(name)}</div>
      <div><p>Read-only client record</p><h2 id="client-modal-title">${escapeHtml(name)}</h2><span>${escapeHtml(source.email || clientEmail(name))}</span></div>
    </div>
    <div class="client-fact-grid">
      <article><span>Current product</span><strong>${escapeHtml(product)}</strong></article>
      <article><span>Lifetime value</span><strong>${TRANSACTION_CURRENCY.format(lifetimeValue)}</strong></article>
      <article><span>Closer</span><strong>${escapeHtml(closer || "Not assigned")}</strong></article>
      <article><span>Setter</span><strong>${escapeHtml(setter || "Not assigned")}</strong></article>
      <article><span>Initial sales date</span><strong>${dateFormatter.format(new Date(`${initialSaleDate}T12:00:00`))}</strong></article>
    </div>
    <div class="client-history-heading"><div><p class="section-kicker">Complete purchase history</p><h3>All client transactions</h3></div><span>${history.length} transaction${history.length === 1 ? "" : "s"}</span></div>
    <div class="client-history-scroll"><table class="client-history-table"><thead><tr><th>Date</th><th>Product</th><th>Transaction</th><th>Amount</th></tr></thead><tbody>${history.map((transaction) => `<tr><td>${dateFormatter.format(new Date(`${transaction.date}T12:00:00`))}</td><td><span class="product-pill">${escapeHtml(transaction.product)}</span></td><td>${escapeHtml(transaction.type)}</td><td><span class="transaction-amount ${transaction.amount < 0 ? "is-refund" : "is-revenue"}">${TRANSACTION_CURRENCY.format(transaction.amount)}</span></td></tr>`).join("")}</tbody></table></div>
    <p class="client-modal-note">Client facts and transaction history are read-only in this prototype.</p>`;
  document.getElementById("client-modal").hidden = false;
  document.body.classList.add("modal-open");
  document.querySelector(".client-modal-close").focus();
}

function closeClientProfile() {
  document.getElementById("client-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

function accessibleSalesMembers() {
  const person = currentPerson();
  if (["whitney", "rachelle", "robyn", "ali"].includes(person.id)) return salesMembers.filter((member) => member.name === person.shortName);
  return salesMembers;
}

function commissionPayments() {
  const member = selectedSalesMember();
  const ownerField = member.role === "Setter" ? "setter" : "closer";
  return receivedPayments.map(effectiveCommissionPayment).filter((payment) => monthMatches(payment.receivedAt, state.commissions.month)
    && payment[ownerField] === member.name
    && (member.role !== "Setter" || (payment.firstPayment && payment.amount > 0)));
}

function transactionEditKey(paymentId) {
  return `${invoiceKey()}:${paymentId}`;
}

function transactionEdit(paymentId) {
  return state.commissions.transactionEdits[transactionEditKey(paymentId)];
}

function effectiveCommissionPayment(payment) {
  const edit = transactionEdit(payment.id);
  return edit && edit.status !== "denied" ? { ...payment, ...edit.values } : { ...payment };
}

function commissionClawbacks() {
  return state.commissions.clawbacks[invoiceKey()] || [];
}

function commissionEntries() {
  return [...commissionPayments(), ...commissionClawbacks()];
}

function commissionBasis(payment, member) {
  if (payment.isClawback) return payment.amount;
  return member.role === "Setter" ? (payment.contractValue ?? payment.amount) : payment.amount;
}

function pendingInvoiceEdits() {
  const prefix = `${invoiceKey()}:`;
  return Object.entries(state.commissions.transactionEdits).filter(([key, edit]) => key.startsWith(prefix) && edit.status === "pending");
}

function canAddClawback() {
  const workflow = invoiceState();
  const person = currentPerson();
  return (person.id === "amela" && ["awaiting_amela", "ready_for_payment"].includes(workflow.status))
    || (person.id === "matt" && workflow.status === "awaiting_matt");
}

function canReviewTransactionEdit(edit) {
  if (!edit || edit.status !== "pending" || currentPerson().id !== "amela") return false;
  return ["awaiting_amela", "ready_for_payment"].includes(invoiceState().status) && edit.editedBy !== "Amela Tufo";
}

function closerEnrollmentCount(member) {
  if (member.role !== "Closer") return 0;
  return receivedPayments.filter((payment) => monthMatches(payment.receivedAt, state.commissions.month) && payment.closer === member.name && payment.firstPayment && payment.amount > 0).length;
}

function closerBonus(member) {
  const count = closerEnrollmentCount(member);
  return member.role === "Closer" && count >= 10 ? 500 * (1 + Math.floor((count - 10) / 5)) : 0;
}

function renderPersonTabs() {
  const members = accessibleSalesMembers();
  if (!members.some((member) => member.name === state.commissions.person)) state.commissions.person = members[0].name;
  document.getElementById("commission-person-tabs").innerHTML = members.map((member) => `<button class="person-tab ${member.name === state.commissions.person ? "is-active" : ""}" data-person="${member.name}" type="button"><span>${member.name}</span><small>${member.role} · ${Math.round(member.rate * 100)}%</small></button>`).join("");
  document.querySelectorAll("[data-person]").forEach((button) => button.addEventListener("click", () => { state.commissions.person = button.dataset.person; renderCommissions(); }));
}

function invoiceKey() {
  return `${state.commissions.month}:${state.commissions.person}`;
}

function invoiceState() {
  if (!invoiceStates[invoiceKey()]) invoiceStates[invoiceKey()] = { status: "awaiting_salesperson", note: "Generated breakdown is ready for salesperson review." };
  return invoiceStates[invoiceKey()];
}

function invoiceStageDetails(status, personName) {
  const details = {
    awaiting_salesperson: { stage: "Stage 1", owner: personName, title: `With ${personName}`, detail: "Initial review · unlocked for bonuses and corrections" },
    awaiting_amela: { stage: "Stage 2", owner: "Amela", title: "With Amela", detail: "Operations review · unlocked for corrections" },
    awaiting_matt: { stage: "Stage 3", owner: "Matt", title: "With Matt", detail: "Final Sales approval · unlocked for corrections" },
    ready_for_payment: { stage: "Stage 4", owner: "Amela", title: "With Amela · ready for payment", detail: "All reviews complete · payment action available" },
    paid: { stage: "Complete", owner: "Amela", title: "Paid", detail: "Workflow complete · audit history retained" },
  };
  return details[status];
}

function canEditCurrentInvoice() {
  const person = currentPerson();
  const workflow = invoiceState();
  return (workflow.status === "awaiting_salesperson" && person.shortName === state.commissions.person)
    || (workflow.status === "awaiting_amela" && person.id === "amela")
    || (workflow.status === "awaiting_matt" && person.id === "matt");
}

function renderInvoiceWorkflow(totalOwed) {
  const workflow = invoiceState();
  const statusLabels = { awaiting_salesperson: "Awaiting salesperson", awaiting_amela: "Awaiting Amela", awaiting_matt: "Awaiting Matt", ready_for_payment: "Ready for payment", paid: "Paid" };
  const steps = [
    ["awaiting_salesperson", "Salesperson review"], ["awaiting_amela", "Amela review"], ["awaiting_matt", "Matt final approval"], ["ready_for_payment", "Payment ready"], ["paid", "Paid"],
  ];
  const currentIndex = steps.findIndex(([key]) => key === workflow.status);
  document.getElementById("invoice-heading").textContent = `${state.commissions.person} · ${monthOptions.find((item) => item.value === state.commissions.month).label} · ${CURRENCY.format(totalOwed)}`;
  document.getElementById("invoice-status").innerHTML = pill(statusLabels[workflow.status], workflow.status === "paid" ? "success" : workflow.status === "ready_for_payment" ? "info" : "warning");
  document.getElementById("invoice-steps").innerHTML = steps.map(([, label], index) => `<div class="approval-step ${index < currentIndex || workflow.status === "paid" ? "is-complete" : index === currentIndex ? "is-current" : ""}"><span>${index < currentIndex || workflow.status === "paid" ? "✓" : index + 1}</span><strong>${label}</strong></div>`).join("");
  document.getElementById("invoice-note").innerHTML = `<strong>Audit note</strong><p>${escapeHtml(workflow.note)}</p>`;
  const person = currentPerson();
  const actions = [];
  const pendingReviews = pendingInvoiceEdits().filter(([, edit]) => edit.editedBy !== "Amela Tufo");
  if (workflow.status === "awaiting_salesperson" && person.shortName === state.commissions.person) {
    actions.push(["sales-approve", "Approve breakdown", "primary"], ["sales-correct", "Request a correction", "secondary"]);
  }
  if (workflow.status === "awaiting_amela" && person.id === "amela" && pendingReviews.length === 0) actions.push(["amela-approve", "Approve breakdown", "primary"], ["amela-return", "Return for correction", "secondary"]);
  if (workflow.status === "awaiting_matt" && person.id === "matt") actions.push(["matt-approve", "Give final Sales approval", "primary"]);
  if (workflow.status === "ready_for_payment" && person.id === "amela" && pendingReviews.length === 0) actions.push(["mark-paid", "Mark as paid", "primary"]);
  const waitingMessage = pendingReviews.length ? `<span class="review-required-note">Review ${pendingReviews.length} highlighted transaction edit${pendingReviews.length === 1 ? "" : "s"} before advancing.</span>` : "";
  document.getElementById("invoice-actions").innerHTML = waitingMessage || (actions.length ? actions.map(([action, label, style]) => `<button class="${style === "primary" ? "action-button" : "secondary-button"}" data-invoice-action="${action}" type="button">${label}</button>`).join("") : `<span class="read-only-note">Only the person responsible for the current step can make changes or advance the invoice.</span>`);
  document.querySelectorAll("[data-invoice-action]").forEach((button) => button.addEventListener("click", () => advanceInvoice(button.dataset.invoiceAction)));
}

function advanceInvoice(action) {
  const workflow = invoiceState();
  if (action === "sales-approve") { workflow.status = "awaiting_amela"; workflow.note = `${state.commissions.person} approved the generated breakdown without changes.`; }
  if (action === "sales-correct") {
    const reason = window.prompt("Explain the requested change. This reason will be retained in the audit history:", "");
    if (!reason || !reason.trim()) return;
    workflow.status = "awaiting_amela"; workflow.note = `${state.commissions.person} requested a correction: ${reason.trim()}`;
  }
  if (action === "amela-approve") { workflow.status = "awaiting_matt"; workflow.note = "Amela reviewed and approved the full breakdown."; }
  if (action === "amela-return") { workflow.status = "awaiting_salesperson"; workflow.note = "Amela returned the breakdown to the salesperson for correction."; }
  if (action === "matt-approve") { workflow.status = "ready_for_payment"; workflow.note = "Matt provided final Sales approval. Invoice returned to Amela for payment."; }
  if (action === "mark-paid") { workflow.status = "paid"; workflow.note = `Marked paid by Amela on ${dateFormatter.format(new Date())}.`; }
  renderCommissions();
}

function renderCommissions() {
  renderPersonTabs();
  const member = selectedSalesMember();
  const payments = commissionEntries();
  payments.sort((a, b) => Number(transactionEdit(b.id)?.status === "pending") - Number(transactionEdit(a.id)?.status === "pending"));
  const basisTotal = payments.reduce((total, payment) => total + commissionBasis(payment, member), 0);
  const commission = payments.reduce((total, payment) => total + commissionBasis(payment, member) * member.rate, 0);
  const enrollmentBonus = closerBonus(member);
  const manualEntry = state.commissions.manualAdjustments[invoiceKey()] || { amount: 0, reason: "", addedBy: "" };
  const manualAdjustment = manualEntry.amount;
  const totalOwed = member.base + commission + enrollmentBonus + manualAdjustment;
  const monthLabel = monthOptions.find((month) => month.value === state.commissions.month).label;
  const person = currentPerson();
  const stage = invoiceStageDetails(invoiceState().status, member.name);
  document.getElementById("commission-scope-banner").className = `scope-banner stage-banner stage-${invoiceState().status}`;
  document.getElementById("commission-scope-banner").innerHTML = `<span class="stage-number">${stage.stage}</span><div><strong>${stage.title}</strong><span>${stage.detail}</span></div>${pill(`Current owner · ${stage.owner}`, invoiceState().status === "ready_for_payment" ? "info" : "warning")}`;
  renderMetrics("commission-metrics", [
    { label: member.role === "Setter" ? "Contract value" : "Cash received", value: CURRENCY.format(basisTotal), detail: member.role === "Setter" ? `${payments.filter((payment) => !payment.isClawback).length} signed contracts · no later installments` : `${payments.length} attributed payment entries`, icon: "$" },
    { label: "Base compensation", value: CURRENCY.format(member.base), detail: member.base ? "Monthly Sales base" : "No base pay for closers", icon: "=" },
    { label: member.role === "Closer" ? "Enrollment bonus" : "Commission earned", value: CURRENCY.format(member.role === "Closer" ? enrollmentBonus : commission), detail: member.role === "Closer" ? `${closerEnrollmentCount(member)} first-payment enrollments` : "5% of total signed contract value", icon: "+", className: "is-highlight" },
    { label: "Total invoice", value: CURRENCY.format(totalOwed), detail: `${CURRENCY.format(commission)} commission${manualAdjustment ? ` · ${CURRENCY.format(manualAdjustment)} adjustment` : ""}`, icon: "↗", className: "is-success" },
  ]);
  document.getElementById("commission-table-title").textContent = `${member.name} · ${monthLabel}`;
  document.getElementById("commission-table-subtitle").textContent = member.role === "Setter" ? "One commission entry per signed contract. Later installments are excluded." : "Each successfully collected payment and refund is included in the selected month.";
  document.getElementById("commission-date-heading").textContent = member.role === "Setter" ? "Contract date" : "Payment received";
  document.getElementById("commission-counterpart-heading").textContent = member.role === "Setter" ? "Closer" : "Setter";
  document.getElementById("commission-type-heading").textContent = member.role === "Setter" ? "Entry type" : "Payment type";
  document.getElementById("commission-basis-heading").textContent = member.role === "Setter" ? "Contract value" : "Amount received";
  document.getElementById("commission-table-body").innerHTML = payments.map((payment) => {
    const edit = transactionEdit(payment.id);
    const basis = commissionBasis(payment, member);
    const edited = edit && edit.status !== "denied";
    const rowClass = payment.amount < 0 ? "is-escalated" : edited ? "is-edited" : edit?.status === "denied" ? "is-edit-denied" : "";
    const editStatus = edit?.status === "pending" ? `${pill("Pending review", "warning")}<span class="cell-secondary">Edited by ${escapeHtml(edit.editedBy)}</span>` : edit?.status === "approved" ? `${pill("Edit approved", "success")}<span class="cell-secondary">Edited by ${escapeHtml(edit.editedBy)}</span>` : edit?.status === "denied" ? pill("Edit denied", "neutral") : '<span class="cell-secondary">Original</span>';
    const reviewActions = canReviewTransactionEdit(edit) ? `<button class="compact-review-button approve" data-review-edit="approve" data-review-payment="${payment.id}" type="button">Approve</button><button class="compact-review-button deny" data-review-edit="deny" data-review-payment="${payment.id}" type="button">Deny</button>` : "";
    const editAction = canEditCurrentInvoice() && !payment.isClawback ? `<button class="row-menu-button" data-edit-payment="${payment.id}" type="button" aria-label="Edit ${escapeHtml(payment.client)} transaction" title="Edit transaction">•••</button>` : "";
    return `<tr class="${rowClass}"><td>${dateFormatter.format(new Date(`${payment.receivedAt}T12:00:00`))}</td><td class="client-cell"><button class="commission-client-link" type="button" data-client-profile="${escapeHtml(payment.client)}">${escapeHtml(payment.client)}</button><span class="cell-secondary">${escapeHtml(payment.email || clientEmail(payment.client))}</span></td><td>${escapeHtml(member.role === "Setter" ? (payment.closer || "Unassigned") : (payment.setter || "Unassigned"))}</td><td><span class="product-pill">${escapeHtml(payment.product)}</span></td><td>${escapeHtml(payment.isClawback ? "Refund clawback" : member.role === "Setter" ? "Signed contract" : payment.type)}${member.role === "Setter" && !payment.isClawback ? '<span class="cell-secondary">One-time setter commission</span>' : ""}</td><td><span class="balance">${CURRENCY.format(basis)}</span></td><td>${Math.round(member.rate * 100)}%</td><td><span class="balance commission-value">${CURRENCY.format(basis * member.rate)}</span></td><td>${editStatus}</td><td><div class="row-actions">${reviewActions}${editAction}</div></td></tr>`;
  }).join("");
  const breakdownRows = [
    ["Base compensation", member.base],
    [`${Math.round(member.rate * 100)}% commission on ${member.role === "Setter" ? "contract value" : "collected cash"}`, commission],
    ...(member.role === "Closer" ? [[`Automatic enrollment bonus · ${closerEnrollmentCount(member)} sales`, enrollmentBonus]] : []),
    ...(manualAdjustment ? [[`Manual adjustment · ${manualEntry.reason}`, manualAdjustment]] : []),
  ];
  document.getElementById("commission-invoice-breakdown").innerHTML = `<div class="breakdown-heading"><div><strong>Invoice breakdown</strong><span>Automatic and manually reviewed items</span></div>${canEditCurrentInvoice() ? '<button class="row-menu-button" data-add-invoice-item type="button" aria-label="Add bonus or adjustment" title="Add bonus or adjustment">•••</button>' : ""}</div><div class="breakdown-lines">${breakdownRows.map(([label, amount]) => `<span><em>${escapeHtml(label)}</em><strong>${CURRENCY.format(amount)}</strong></span>`).join("")}<span class="breakdown-total"><em>Total invoice</em><strong>${CURRENCY.format(totalOwed)}</strong></span></div>`;
  document.getElementById("commission-empty").hidden = payments.length > 0;
  document.querySelector("#commissions-view .table-scroll").hidden = payments.length === 0;
  document.getElementById("commission-footer-count").textContent = member.role === "Setter" ? `${payments.length} contract and clawback entries included` : `${payments.length} received payment and clawback entries included`;
  document.getElementById("add-bonus-button").hidden = true;
  document.getElementById("add-clawback-button").hidden = !canAddClawback();
  document.querySelectorAll("[data-edit-payment]").forEach((button) => button.addEventListener("click", () => openCommissionEntryEditor(button.dataset.editPayment)));
  document.querySelectorAll("[data-review-edit]").forEach((button) => button.addEventListener("click", () => reviewTransactionEdit(button.dataset.reviewPayment, button.dataset.reviewEdit)));
  document.querySelectorAll("[data-add-invoice-item]").forEach((button) => button.addEventListener("click", addBonus));
  renderInvoiceWorkflow(totalOwed);
}

function openCommissionEntryEditor(paymentId) {
  if (!canEditCurrentInvoice()) return;
  const payment = commissionEntries().find((item) => String(item.id) === String(paymentId));
  if (!payment) return;
  const member = selectedSalesMember();
  document.getElementById("commission-entry-mode").value = "edit";
  document.getElementById("commission-entry-id").value = payment.id;
  document.getElementById("commission-entry-kicker").textContent = `${invoiceStageDetails(invoiceState().status, member.name).stage} · ${currentPerson().name}`;
  document.getElementById("commission-entry-title").textContent = `Edit ${payment.client}'s entry`;
  document.getElementById("commission-entry-context").textContent = member.role === "Setter" ? "Setter commission is calculated from contract value, not installments." : "Closer commission is calculated from cash received in the month.";
  document.getElementById("commission-entry-date").value = payment.receivedAt;
  document.getElementById("commission-entry-client").value = payment.client;
  document.getElementById("commission-entry-email").value = payment.email || clientEmail(payment.client);
  document.getElementById("commission-entry-product").value = payment.product;
  document.getElementById("commission-entry-type").value = payment.type;
  document.getElementById("commission-entry-amount").value = Math.abs(payment.amount);
  document.getElementById("commission-entry-contract").value = Math.abs(payment.contractValue ?? payment.amount);
  document.getElementById("commission-entry-contract").closest("label").hidden = false;
  document.getElementById("commission-entry-contract").required = true;
  document.getElementById("commission-entry-setter").value = payment.setter || "";
  document.getElementById("commission-entry-closer").value = payment.closer || "";
  document.getElementById("commission-entry-reason").value = "";
  document.getElementById("commission-entry-submit").textContent = currentPerson().id === "amela" ? "Save reviewed edit" : "Save proposed edit";
  document.getElementById("commission-entry-modal").hidden = false;
  document.body.classList.add("modal-open");
}

function openClawbackEditor() {
  if (!canAddClawback()) return;
  document.getElementById("commission-entry-mode").value = "clawback";
  document.getElementById("commission-entry-id").value = "";
  document.getElementById("commission-entry-kicker").textContent = `Refund adjustment · ${currentPerson().name}`;
  document.getElementById("commission-entry-title").textContent = "Add a commission clawback";
  document.getElementById("commission-entry-context").textContent = "Record the refunded sale. The commission reversal is calculated at this person's configured rate.";
  document.getElementById("commission-entry-form").reset();
  document.getElementById("commission-entry-mode").value = "clawback";
  document.getElementById("commission-entry-date").value = new Date().toISOString().slice(0, 10);
  document.getElementById("commission-entry-type").value = "Refund";
  document.getElementById("commission-entry-contract").value = "0";
  document.getElementById("commission-entry-contract").closest("label").hidden = true;
  document.getElementById("commission-entry-contract").required = false;
  document.getElementById("commission-entry-submit").textContent = "Add clawback";
  document.getElementById("commission-entry-modal").hidden = false;
  document.body.classList.add("modal-open");
}

function closeCommissionEntryEditor() {
  document.getElementById("commission-entry-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

function saveCommissionEntry(event) {
  event.preventDefault();
  const mode = document.getElementById("commission-entry-mode").value;
  const member = selectedSalesMember();
  const values = {
    receivedAt: document.getElementById("commission-entry-date").value,
    client: document.getElementById("commission-entry-client").value.trim(),
    email: document.getElementById("commission-entry-email").value.trim(),
    product: document.getElementById("commission-entry-product").value,
    type: document.getElementById("commission-entry-type").value.trim(),
    amount: Number(document.getElementById("commission-entry-amount").value),
    contractValue: Number(document.getElementById("commission-entry-contract").value),
    setter: document.getElementById("commission-entry-setter").value || null,
    closer: document.getElementById("commission-entry-closer").value || null,
  };
  const reason = document.getElementById("commission-entry-reason").value.trim();
  if (!reason) return;
  if (mode === "clawback") {
    const clawback = { ...values, id: `clawback-${Date.now()}`, amount: -Math.abs(values.amount), contractValue: -Math.abs(values.amount), type: "Refund clawback", isClawback: true, firstPayment: false, addedBy: currentPerson().name, reason };
    if (member.role === "Setter") clawback.setter = member.name;
    else clawback.closer = member.name;
    if (!state.commissions.clawbacks[invoiceKey()]) state.commissions.clawbacks[invoiceKey()] = [];
    state.commissions.clawbacks[invoiceKey()].push(clawback);
    invoiceState().note = `${currentPerson().name} added a ${CURRENCY.format(Math.abs(clawback.amount))} refund clawback for ${clawback.client}.`;
  } else {
    const paymentId = document.getElementById("commission-entry-id").value;
    const original = commissionEntries().find((item) => String(item.id) === String(paymentId));
    if (original?.amount < 0) values.amount = -Math.abs(values.amount);
    state.commissions.transactionEdits[transactionEditKey(paymentId)] = { status: currentPerson().id === "amela" ? "approved" : "pending", editedBy: currentPerson().name, reason, values };
    invoiceState().note = `${currentPerson().name} edited ${values.client}'s entry: ${reason}`;
  }
  closeCommissionEntryEditor();
  renderCommissions();
}

function reviewTransactionEdit(paymentId, decision) {
  const edit = transactionEdit(paymentId);
  if (!canReviewTransactionEdit(edit)) return;
  edit.status = decision === "approve" ? "approved" : "denied";
  edit.reviewedBy = currentPerson().name;
  invoiceState().note = `Amela ${decision === "approve" ? "approved" : "denied"} ${edit.editedBy}'s edit: ${edit.reason}`;
  renderCommissions();
}

function addBonus() {
  if (!canEditCurrentInvoice()) return;
  const response = window.prompt(`Add a bonus or adjustment for ${state.commissions.person}:`, "");
  if (response === null || response.trim() === "") return;
  const amount = Number(response.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(amount)) return window.alert("Enter a valid amount.");
  const reason = window.prompt("Reason for this bonus or adjustment:", "Manual bonus");
  if (!reason || !reason.trim()) return;
  state.commissions.manualAdjustments[invoiceKey()] = { amount, reason: reason.trim(), addedBy: currentPerson().name };
  invoiceState().note = `${currentPerson().name} added ${CURRENCY.format(amount)}: ${reason.trim()}`;
  renderCommissions();
}

function stripeFeesFor(payments) {
  return payments.reduce((total, payment) => total + (payment.amount > 0 ? payment.amount * 0.029 + 0.3 : 0), 0);
}

function renderThrive() {
  const month = state.thrive.month;
  const monthLabel = monthOptions.find((item) => item.value === month).label;
  const revenuePayments = receivedPayments.filter((payment) => payment.product === "Thrive" && monthMatches(payment.receivedAt, month));
  const revenue = revenuePayments.reduce((total, payment) => total + payment.amount, 0);
  const costs = thriveCosts[month];
  const stripeFees = stripeFeesFor(revenuePayments);
  const fixedCosts = costs.christina + costs.mikayleigh + costs.tools;
  const totalCosts = fixedCosts + stripeFees;
  const netIncome = revenue - totalCosts;
  const brionyShare = Math.max(0, netIncome * 0.2);
  renderMetrics("thrive-metrics", [
    { label: "Thrive revenue", value: CURRENCY.format(revenue), detail: `Collected in ${monthLabel}`, icon: "$", className: "is-success" },
    { label: "Program costs", value: CURRENCY.format(totalCosts), detail: "Salaries, tools, and Stripe", icon: "−" },
    { label: "Net income", value: CURRENCY.format(netIncome), detail: "Revenue less confirmed costs", icon: "↗", className: "is-highlight" },
    { label: "Briony · 20%", value: CURRENCY.format(brionyShare), detail: "20% of positive net income", icon: "%", className: "is-success" },
  ]);
  document.getElementById("thrive-revenue-total").textContent = CURRENCY.format(revenue);
  document.getElementById("thrive-revenue-list").innerHTML = revenuePayments.map((payment) => `<div class="pnl-row"><div><strong>${payment.client}</strong><span>${dateFormatter.format(new Date(`${payment.receivedAt}T12:00:00`))} · ${payment.type}</span></div><strong>${CURRENCY.format(payment.amount)}</strong></div>`).join("") || '<div class="pnl-row"><div><strong>No Thrive payments</strong><span>Nothing collected in this sample month.</span></div></div>';
  const costRows = [["Christina's salary", costs.christina, "Placeholder pending confirmed rate"], ["Mikayleigh's Thrive allocation", costs.mikayleigh, "$1,500 confirmed monthly allocation"], ["Tools / software", costs.tools, "Placeholder"], ["Stripe processing fees", stripeFees, "2.9% + $0.30 dummy fee model"]];
  document.getElementById("thrive-cost-total").textContent = CURRENCY.format(totalCosts);
  document.getElementById("thrive-cost-list").innerHTML = costRows.map(([label, amount, note]) => `<div class="pnl-row"><div><strong>${label}</strong><span>${note}</span></div><strong>−${CURRENCY.format(amount)}</strong></div>`).join("");
  document.getElementById("thrive-net-income").textContent = CURRENCY.format(netIncome);
  document.getElementById("thrive-briony-share").textContent = CURRENCY.format(brionyShare);

  const ledgerTransactions = revenuePayments.filter((payment) => state.thrive.transactionFilter === "all"
    || (state.thrive.transactionFilter === "income" && payment.amount >= 0)
    || (state.thrive.transactionFilter === "refunds" && payment.amount < 0))
    .sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
  document.getElementById("thrive-transaction-body").innerHTML = ledgerTransactions.map((payment) => {
    const fee = payment.amount > 0 ? payment.amount * 0.029 + 0.3 : 0;
    const net = payment.amount > 0 ? payment.amount - fee : payment.amount;
    const refund = payment.amount < 0;
    return `<tr class="${refund ? "is-escalated" : ""}">
      <td>${dateFormatter.format(new Date(`${payment.receivedAt}T12:00:00`))}</td>
      <td class="client-cell"><span class="client-name"><span class="client-initials">${initials(payment.client)}</span>${escapeHtml(payment.client)}</span></td>
      <td><span class="cell-primary">${escapeHtml(payment.type)}</span><span class="cell-secondary">${refund ? "Money returned to client" : payment.type.includes("installment") ? "Payment plan collection" : "Collected revenue"}</span></td>
      <td><span class="balance">${CURRENCY.format(payment.amount)}</span></td>
      <td><span class="balance">${fee ? `−${CURRENCY.format(fee)}` : "$0"}</span><span class="cell-secondary">${refund ? "No new processing fee" : "Dummy Stripe calculation"}</span></td>
      <td><span class="balance ${refund ? "is-danger-text" : "commission-value"}">${CURRENCY.format(net)}</span></td>
      <td>${pill(refund ? "Refunded" : "Settled", refund ? "danger" : "success")}</td>
    </tr>`;
  }).join("");
  document.getElementById("thrive-transaction-count").textContent = `${ledgerTransactions.length} transaction${ledgerTransactions.length === 1 ? "" : "s"} shown for ${monthLabel}`;
  document.getElementById("thrive-transaction-empty").hidden = ledgerTransactions.length > 0;
  document.querySelector("#thrive-view .thrive-ledger-card .table-scroll").hidden = ledgerTransactions.length === 0;
}

function accessibleCsmPeople() {
  const person = currentPerson();
  if (person.id === "mikayleigh") return ["Mikayleigh"];
  if (person.id === "emily") return ["Emily", "Mikayleigh"];
  return ["Emily", "Mikayleigh"];
}

function renderCsm() {
  const available = accessibleCsmPeople();
  if (!available.includes(state.csm.person)) state.csm.person = available[0];
  document.getElementById("csm-person-tabs").innerHTML = available.map((name) => `<button class="person-tab ${name === state.csm.person ? "is-active" : ""}" data-csm-person="${name}" type="button"><span>${name}</span><small>${name === "Emily" ? "Director of Member Success" : "Member Success"}</small></button>`).join("");
  document.querySelectorAll("[data-csm-person]").forEach((button) => button.addEventListener("click", () => { state.csm.person = button.dataset.csmPerson; renderCsm(); }));
  const name = state.csm.person;
  document.getElementById("assign-csm-event-button").hidden = currentPerson().id !== "emily";
  const events = csmEvents.filter((event) => event.person === name && event.month === state.csm.month);
  const eventTotal = events.reduce((total, event) => total + event.amount, 0);
  const base = name === "Emily" ? 8000 : 4000;
  const quarterly = state.csm.month === "2026-06" ? (name === "Emily" ? 2250 : 1000) : 0;
  renderMetrics("csm-metrics", [
    { label: "Monthly base", value: CURRENCY.format(base), detail: name === "Mikayleigh" ? "$2,500 BBP · $1,500 Thrive" : "$96,000 annual reference", icon: "=" },
    { label: "Qualified event bonuses", value: CURRENCY.format(eventTotal), detail: `${events.length} recorded event${events.length === 1 ? "" : "s"}`, icon: "+", className: "is-success" },
    { label: "Quarterly bonus", value: CURRENCY.format(quarterly), detail: state.csm.month === "2026-06" ? "Dummy Q2 award" : "Not due in selected month", icon: "◆", className: quarterly ? "is-highlight" : "" },
    { label: "Total compensation", value: CURRENCY.format(base + eventTotal + quarterly), detail: "Prototype calculation", icon: "↗", className: "is-success" },
  ]);
  document.getElementById("csm-event-total").textContent = CURRENCY.format(eventTotal);
  document.getElementById("csm-event-list").innerHTML = events.map((event) => `<div class="pnl-row"><div><strong>${escapeHtml(event.event)}</strong><span>${escapeHtml(event.client)} · ${dateFormatter.format(new Date(`${event.date}T12:00:00`))}${event.source ? ` · ${escapeHtml(event.source)}` : ""}</span></div><strong>${CURRENCY.format(event.amount)}</strong></div>`).join("") || '<div class="pnl-row"><div><strong>No qualified events</strong><span>No dummy events in the selected month.</span></div></div>';
  document.getElementById("csm-rate-title").textContent = `${name}'s rate card`;
  document.getElementById("csm-rate-list").innerHTML = csmRateCards[name].map(([label, value]) => `<div class="pnl-row"><div><strong>${label}</strong></div><strong>${value}</strong></div>`).join("");
}

function assignCsmEvent() {
  if (currentPerson().id !== "emily") return;
  const assigneeResponse = window.prompt("Assign this event to Emily or Mikayleigh:", state.csm.person);
  if (!assigneeResponse) return;
  const assignee = assigneeResponse.trim().toLowerCase() === "emily" ? "Emily" : assigneeResponse.trim().toLowerCase().startsWith("mik") ? "Mikayleigh" : null;
  if (!assignee) return window.alert("Enter Emily or Mikayleigh.");
  const eventOptions = assignee === "Emily" ? [
    { label: "Mentorship extension / renewal", amount: 150, program: "Mentorship" },
    { label: "Thrive ascension", amount: 175, program: "Thrive" },
  ] : [
    { label: "Academy extension / renewal", amount: 50, program: "Academy" },
    { label: "Mentorship extension / renewal", amount: 100, program: "Mentorship" },
    { label: "Thrive Momentum extension / renewal", amount: 125, program: "Thrive" },
    { label: "Academy → Mentorship ascension", amount: 150, program: "Mentorship" },
    { label: "Academy → Thrive ascension", amount: 200, program: "Thrive" },
    { label: "Mentorship → Thrive ascension", amount: 200, program: "Thrive" },
  ];
  const optionResponse = window.prompt(`Choose the event number:\n${eventOptions.map((option, index) => `${index + 1}. ${option.label} — ${CURRENCY.format(option.amount)}`).join("\n")}`, "1");
  if (!optionResponse) return;
  const option = eventOptions[Number(optionResponse) - 1];
  if (!option) return window.alert("Choose one of the listed event numbers.");
  const client = window.prompt("Client name:", "");
  if (!client || !client.trim()) return;
  csmEvents.push({
    id: Date.now(),
    month: state.csm.month,
    date: `${state.csm.month}-15`,
    person: assignee,
    client: client.trim(),
    event: option.label,
    amount: option.amount,
    program: option.program,
    source: "Assigned manually by Emily",
  });
  state.csm.person = assignee;
  renderCsm();
}

function assignmentExceptions() {
  return onboardingClients.filter((client) => !client.setter);
}

function renderAdmin() {
  const person = currentPerson();
  const exceptions = assignmentExceptions();
  const fullAdmin = person.systemAdmin;
  const commissionApprovals = Object.entries(invoiceStates).filter(([, value]) => value.status === "awaiting_matt");
  document.getElementById("admin-section-kicker").textContent = person.id === "matt" ? "Sales administration" : "Prototype administration";
  document.getElementById("admin-section-title").textContent = person.id === "matt" ? "Assignments and commission approvals" : "People, access, and exceptions";
  renderMetrics("admin-metrics", fullAdmin ? [
    { label: "People configured", value: people.length, detail: "Prototype personas", icon: "◎" },
    { label: "System admins", value: people.filter((item) => item.systemAdmin).length, detail: "Amela, John, Shaan, Zion", icon: "◆" },
    { label: "Restricted finance", value: people.filter((item) => !item.finance).length, detail: "Admin rights separated from money access", icon: "$" },
    { label: "Assignment exceptions", value: exceptions.length, detail: "Awaiting Matt", icon: "!", className: exceptions.length ? "is-danger" : "is-success" },
  ] : [
    { label: "Missing setter", value: exceptions.length, detail: "Sales awaiting your assignment", icon: "!", className: exceptions.length ? "is-danger" : "is-success" },
    { label: "Commission approvals", value: commissionApprovals.length, detail: "Reviewed by Amela and awaiting you", icon: "✓", className: commissionApprovals.length ? "is-highlight" : "is-success" },
  ]);
  document.querySelector("#admin-view .admin-grid").classList.toggle("is-sales-admin", !fullAdmin);
  const accessCard = document.querySelector("#admin-view .admin-grid > .table-card:first-child");
  accessCard.hidden = !fullAdmin;
  document.getElementById("add-person-button").hidden = !fullAdmin;
  document.getElementById("admin-access-body").innerHTML = fullAdmin ? people.map((item) => `<tr><td class="client-cell"><span class="client-name"><span class="client-initials">${initials(item.name)}</span>${item.name}</span><span class="cell-secondary">${item.role}</span></td><td>${item.department}</td><td>${item.scope}</td><td><span class="module-list">${item.modules.map((module) => `<span>${moduleMeta[module].title}</span>`).join("") || "No modules"}</span></td><td>${pill(item.finance ? "Permitted" : "Restricted", item.finance ? "success" : "danger")}</td><td>${item.id.startsWith("prototype-") ? `<button class="secondary-button compact-button" data-remove-person="${item.id}" type="button">Remove</button>` : '<span class="cell-secondary">Configured</span>'}</td></tr>`).join("") : "";
  document.getElementById("assignment-exceptions").innerHTML = exceptions.map((client) => `<div class="exception-item"><div><strong>${client.name}</strong><span>${client.product} · ${client.saleType} · ${client.closer || "No closer"}</span></div><div>${pill("Matt to assign", "warning")}<button class="secondary-button compact-button" data-assign-setter="${client.id}" type="button">Assign setter</button></div></div>`).join("") || '<div class="empty-inline">No missing setter assignments.</div>';
  const approvalCard = document.getElementById("commission-approval-queue-card");
  approvalCard.hidden = person.id !== "matt";
  document.getElementById("commission-approval-queue").innerHTML = commissionApprovals.map(([key, value]) => {
    const [month, name] = key.split(":");
    const label = monthOptions.find((item) => item.value === month)?.label || month;
    return `<div class="exception-item"><div><strong>${name}</strong><span>${label} · Amela review complete</span></div><div>${pill("Awaiting Matt", "warning")}<button class="action-button compact-button" data-open-approval="${name}" data-approval-month="${month}" type="button">Review invoice</button></div></div>`;
  }).join("") || '<div class="empty-inline">No Sales commissions are waiting for Matt.</div>';
  document.querySelectorAll("[data-assign-setter]").forEach((button) => button.addEventListener("click", () => assignSetter(Number(button.dataset.assignSetter))));
  document.querySelectorAll("[data-open-approval]").forEach((button) => button.addEventListener("click", () => {
    state.commissions.person = button.dataset.openApproval;
    state.commissions.month = button.dataset.approvalMonth;
    document.getElementById("commission-month").value = state.commissions.month;
    renderCommissions();
    setView("commissions");
  }));
  document.querySelectorAll("[data-remove-person]").forEach((button) => button.addEventListener("click", () => removePrototypePerson(button.dataset.removePerson)));
  document.getElementById("admin-nav-count").textContent = exceptions.length;
}

function assignSetter(clientId) {
  const client = onboardingClients.find((item) => item.id === clientId);
  const setter = window.prompt(`Assign ${client.name} to Whitney or Rachelle:`, "Whitney");
  if (!setter || !["Whitney", "Rachelle"].includes(setter.trim())) return window.alert("Enter Whitney or Rachelle.");
  client.setter = setter.trim();
  renderAdmin();
}

function addPrototypePerson() {
  const name = window.prompt("Person's name:", "");
  if (!name || !name.trim()) return;
  const role = window.prompt("Role:", "Team member");
  people.push({ id: `prototype-${Date.now()}`, name: name.trim(), shortName: name.trim().split(" ")[0], role: role?.trim() || "Team member", department: "Unassigned", workspace: "BBP", scope: "No access assigned", modules: ["admin"], finance: false, systemAdmin: false });
  renderAdmin();
}

function removePrototypePerson(personId) {
  const index = people.findIndex((person) => person.id === personId);
  if (index === -1) return;
  people.splice(index, 1);
  renderAdmin();
}

function setView(view) {
  const person = currentPerson();
  const allowedView = person.modules.includes(view) ? view : person.modules[0];
  state.currentView = allowedView;
  document.querySelectorAll("[data-view-target]").forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === allowedView));
  document.querySelectorAll("[data-view]").forEach((section) => { const active = section.dataset.view === allowedView; section.classList.toggle("is-active", active); section.hidden = !active; });
  const mattAdmin = allowedView === "admin" && person.id === "matt";
  document.getElementById("page-title").textContent = mattAdmin ? "Sales admin" : moduleMeta[allowedView].title;
  document.getElementById("workspace-eyebrow").textContent = mattAdmin ? "Sales administration" : moduleMeta[allowedView].workspace;
}

function renderAccessShell() {
  const person = currentPerson();
  const themeByDepartment = {
    Operations: "operations",
    "Client Success": "client-success",
    Sales: "sales",
    Thrive: "thrive",
    Leadership: "leadership",
  };
  document.body.dataset.theme = themeByDepartment[person.department] || "neutral";
  document.getElementById("workspace-name").textContent = person.workspace;
  document.getElementById("workspace-subtitle").textContent = person.id === "amela" ? `${person.name} · AT` : person.name;
  document.getElementById("topbar-avatar").textContent = initials(person.name);
  let visibleIndex = 0;
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    const allowed = person.modules.includes(button.dataset.viewTarget);
    button.hidden = !allowed;
    if (allowed) {
      visibleIndex += 1;
      button.querySelector(".nav-icon").textContent = String(visibleIndex).padStart(2, "0");
    }
  });
  const ownSales = ["whitney", "rachelle", "robyn", "ali"].includes(person.id);
  document.getElementById("sales-nav-label").textContent = ownSales ? "My Sales Invoice" : "Sales Invoice Cross-Checks";
  document.getElementById("sales-nav-subtitle").textContent = ownSales ? "Review and submit" : "Monthly commissions";
  document.getElementById("admin-nav-label").textContent = person.id === "matt" ? "Sales Assignments" : "Admin & Access";
  document.getElementById("admin-nav-subtitle").textContent = person.id === "matt" ? "Resolve missing setters" : "People and exceptions";
}

function renderAll() {
  renderAccessShell();
  renderTransactions();
  renderOnboarding();
  renderPayments();
  renderCommissions();
  renderThrive();
  renderCsm();
  renderAdmin();
  setView(state.currentView);
}

function launchPrototype(personaId, requestedView = null) {
  const person = people.find((candidate) => candidate.id === personaId);
  if (!person) return;
  state.persona = personaId;
  state.currentView = requestedView && person.modules.includes(requestedView) ? requestedView : person.modules[0];
  document.getElementById("prototype-launcher").hidden = true;
  document.getElementById("app-shell").hidden = false;
  window.scrollTo({ top: 0, behavior: "auto" });
  renderAll();
}

function showLauncher() {
  document.getElementById("app-shell").hidden = true;
  document.getElementById("prototype-launcher").hidden = false;
  document.body.dataset.theme = "neutral";
  window.history.replaceState(null, "", window.location.pathname);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function populateMonthSelect(selectId) {
  document.getElementById(selectId).innerHTML = monthOptions.map((month) => `<option value="${month.value}">${month.label}</option>`).join("");
}

function syncQuickFilters(group, value) {
  document.querySelectorAll(`[data-${group}-quick]`).forEach((button) => button.classList.toggle("is-active", button.dataset[`${group}Quick`] === value));
}

document.querySelectorAll("[data-view-target]").forEach((button) => button.addEventListener("click", () => { setView(button.dataset.viewTarget); window.location.hash = button.dataset.viewTarget; }));
document.querySelectorAll("[data-launch-persona]").forEach((button) => button.addEventListener("click", () => launchPrototype(button.dataset.launchPersona)));
document.getElementById("launcher-back").addEventListener("click", showLauncher);
document.getElementById("transaction-month").addEventListener("change", (event) => { state.transactions.month = event.target.value; renderTransactions(); });
document.getElementById("transaction-search").addEventListener("input", (event) => { state.transactions.search = event.target.value; renderTransactions(); });
document.getElementById("transaction-product-filter").addEventListener("change", (event) => { state.transactions.product = event.target.value; renderTransactions(); });
document.getElementById("transaction-type-filter").addEventListener("change", (event) => { state.transactions.type = event.target.value; renderTransactions(); });
document.getElementById("transaction-sort").addEventListener("change", (event) => { state.transactions.sort = event.target.value; renderTransactions(); });
document.getElementById("onboarding-search").addEventListener("input", (event) => { state.onboarding.search = event.target.value; renderOnboarding(); });
document.getElementById("onboarding-product-filter").addEventListener("change", (event) => { state.onboarding.product = event.target.value; renderOnboarding(); });
document.querySelectorAll("[data-onboarding-quick]").forEach((button) => button.addEventListener("click", () => { state.onboarding.status = button.dataset.onboardingQuick; syncQuickFilters("onboarding", state.onboarding.status); renderOnboarding(); }));
document.getElementById("payment-search").addEventListener("input", (event) => { state.payments.search = event.target.value; renderPayments(); });
document.querySelectorAll("[data-payment-quick]").forEach((button) => button.addEventListener("click", () => { state.payments.status = button.dataset.paymentQuick; syncQuickFilters("payment", state.payments.status); renderPayments(); }));
document.getElementById("commission-month").addEventListener("change", (event) => { state.commissions.month = event.target.value; renderCommissions(); });
document.getElementById("thrive-month").addEventListener("change", (event) => { state.thrive.month = event.target.value; renderThrive(); });
document.getElementById("thrive-transaction-filter").addEventListener("change", (event) => { state.thrive.transactionFilter = event.target.value; renderThrive(); });
document.getElementById("csm-month").addEventListener("change", (event) => { state.csm.month = event.target.value; renderCsm(); });
document.getElementById("add-bonus-button").addEventListener("click", addBonus);
document.getElementById("add-clawback-button").addEventListener("click", openClawbackEditor);
document.getElementById("commission-entry-form").addEventListener("submit", saveCommissionEntry);
document.querySelectorAll("[data-close-commission-modal]").forEach((button) => button.addEventListener("click", closeCommissionEntryEditor));
document.getElementById("assign-csm-event-button").addEventListener("click", assignCsmEvent);
document.getElementById("add-person-button").addEventListener("click", addPrototypePerson);
document.addEventListener("click", (event) => {
  const clientButton = event.target.closest("[data-client-profile]");
  if (clientButton) openClientProfile(clientButton.dataset.clientProfile);
});
document.querySelectorAll("[data-close-client-modal]").forEach((button) => button.addEventListener("click", closeClientProfile));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!document.getElementById("client-modal").hidden) closeClientProfile();
  if (!document.getElementById("commission-entry-modal").hidden) closeCommissionEntryEditor();
});
window.addEventListener("hashchange", () => { const view = window.location.hash.slice(1); if (moduleMeta[view] && currentPerson().modules.includes(view)) setView(view); });

const query = new URLSearchParams(window.location.search);
const initialPersona = query.get("persona");
const initialSalesperson = query.get("salesperson");
if (salesMembers.some((member) => member.name === initialSalesperson)) state.commissions.person = initialSalesperson;
populateMonthSelect("transaction-month");
populateMonthSelect("commission-month");
populateMonthSelect("thrive-month");
populateMonthSelect("csm-month");
document.getElementById("transaction-month").value = state.transactions.month;
document.getElementById("commission-month").value = state.commissions.month;
document.getElementById("thrive-month").value = state.thrive.month;
document.getElementById("csm-month").value = state.csm.month;
const initialView = query.get("view") || window.location.hash.slice(1);
if (moduleMeta[initialView]) state.currentView = initialView;
const launcherPersonas = ["shaan", "amela", "matt", "ali", "emily", "briony"];
if (launcherPersonas.includes(initialPersona)) launchPrototype(initialPersona, state.currentView);
setInterval(() => { renderOnboarding(); renderPayments(); }, 60 * 1000);
