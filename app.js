const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const HISTORIC_COMPLETE_COUNT = 386;
const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const nowMinusHours = (hours) => new Date(Date.now() - hours * HOUR).toISOString();
const nowPlusDays = (days) => new Date(Date.now() + days * DAY).toISOString();

const onboardingClients = [
  {
    id: 1,
    name: "Maya Thompson",
    closer: "Robyn",
    setter: "Whitney",
    product: "Mentorship",
    saleAt: nowMinusHours(31),
    contract: { status: "sent", sentAt: nowMinusHours(30) },
    skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(27) },
  },
  {
    id: 2,
    name: "Daniel Foster",
    closer: "Ali",
    setter: "Rachelle",
    product: "Academy",
    saleAt: nowMinusHours(18),
    contract: { status: "signed", sentAt: nowMinusHours(17), completedAt: nowMinusHours(13) },
    skoolAccess: { status: "given", timerStartedAt: nowMinusHours(16), completedAt: nowMinusHours(14) },
  },
  {
    id: 3,
    name: "Priya Kapoor",
    closer: "Robyn",
    setter: "Whitney",
    product: "Thrive",
    saleAt: nowMinusHours(7),
    contract: { status: "sent", sentAt: nowMinusHours(6) },
    skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(5) },
  },
  {
    id: 4,
    name: "Marcus Reed",
    closer: "Ali",
    setter: "Rachelle",
    product: "Mentorship",
    saleAt: nowMinusHours(52),
    contract: { status: "signed", sentAt: nowMinusHours(50), completedAt: nowMinusHours(45) },
    skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(48) },
  },
  {
    id: 5,
    name: "Sofia Bennett",
    closer: "Ali",
    setter: "Whitney",
    product: "Academy",
    saleAt: nowMinusHours(3),
    contract: { status: "sent", sentAt: nowMinusHours(2.5) },
    skoolAccess: { status: "given", timerStartedAt: nowMinusHours(2), completedAt: nowMinusHours(1) },
  },
  {
    id: 6,
    name: "Noah Williams",
    closer: "Robyn",
    setter: "Rachelle",
    product: "Thrive",
    saleAt: nowMinusHours(42),
    contract: { status: "signed", sentAt: nowMinusHours(40), completedAt: nowMinusHours(35) },
    skoolAccess: { status: "given", timerStartedAt: nowMinusHours(39), completedAt: nowMinusHours(36) },
  },
  {
    id: 7,
    name: "Elena Rodriguez",
    closer: "Robyn",
    setter: "Whitney",
    product: "Mentorship",
    saleAt: nowMinusHours(28),
    contract: { status: "sent", sentAt: nowMinusHours(27) },
    skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(26) },
  },
  {
    id: 8,
    name: "Liam Chen",
    closer: "Ali",
    setter: "Rachelle",
    product: "Academy",
    saleAt: nowMinusHours(11),
    contract: { status: "signed", sentAt: nowMinusHours(10), completedAt: nowMinusHours(8) },
    skoolAccess: { status: "pending", timerStartedAt: nowMinusHours(9) },
  },
];

const paymentPlans = [
  { id: 101, name: "Maya Thompson", product: "Mentorship", balance: 4200, dueAt: nowPlusDays(-2) },
  { id: 102, name: "Priya Kapoor", product: "Thrive", balance: 1800, dueAt: nowPlusDays(4) },
  { id: 103, name: "Elena Rodriguez", product: "Mentorship", balance: 3100, dueAt: nowPlusDays(12) },
  { id: 104, name: "Owen Clarke", product: "Academy", balance: 1200, dueAt: nowPlusDays(-5) },
  { id: 105, name: "Aisha Grant", product: "Thrive", balance: 2400, dueAt: nowPlusDays(7) },
  { id: 106, name: "Caleb Turner", product: "Academy", balance: 800, dueAt: nowPlusDays(21) },
];

const receivedPayments = [
  { id: 201, receivedAt: "2026-07-02", client: "Maya Thompson", product: "Mentorship", type: "Full payment", amount: 5000, setter: "Whitney", closer: "Robyn" },
  { id: 202, receivedAt: "2026-07-05", client: "Priya Kapoor", product: "Thrive", type: "Plan installment", amount: 1800, setter: "Rachelle", closer: "Ali" },
  { id: 203, receivedAt: "2026-07-08", client: "Daniel Foster", product: "Academy", type: "Plan installment", amount: 1000, setter: "Whitney", closer: "Ali" },
  { id: 204, receivedAt: "2026-07-11", client: "Aisha Grant", product: "Thrive", type: "Plan installment", amount: 2400, setter: "Rachelle", closer: "Robyn" },
  { id: 205, receivedAt: "2026-07-14", client: "Noah Williams", product: "Thrive", type: "Full payment", amount: 8000, setter: "Whitney", closer: "Robyn" },
  { id: 206, receivedAt: "2026-07-15", client: "Caleb Turner", product: "Academy", type: "Plan installment", amount: 800, setter: "Rachelle", closer: "Ali" },
  { id: 207, receivedAt: "2026-06-03", client: "Elena Rodriguez", product: "Mentorship", type: "Full payment", amount: 5000, setter: "Whitney", closer: "Ali" },
  { id: 208, receivedAt: "2026-06-09", client: "Owen Clarke", product: "Academy", type: "Plan installment", amount: 1200, setter: "Rachelle", closer: "Robyn" },
  { id: 209, receivedAt: "2026-06-16", client: "Jordan Miles", product: "Thrive", type: "Full payment", amount: 9000, setter: "Whitney", closer: "Robyn" },
  { id: 210, receivedAt: "2026-06-22", client: "Aisha Grant", product: "Thrive", type: "Plan installment", amount: 2400, setter: "Rachelle", closer: "Ali" },
];

const thriveCosts = {
  "2026-07": { christina: 3500, mikayleigh: 3200, tools: 650 },
  "2026-06": { christina: 3400, mikayleigh: 3100, tools: 620 },
};

const teamMembers = [
  { name: "Whitney", role: "Setter", rate: 0.05 },
  { name: "Rachelle", role: "Setter", rate: 0.05 },
  { name: "Ali", role: "Closer", rate: 0.1 },
  { name: "Robyn", role: "Closer", rate: 0.1 },
];

const monthOptions = [
  { value: "2026-07", label: "July 2026" },
  { value: "2026-06", label: "June 2026" },
];

const state = {
  currentView: "onboarding",
  onboarding: { search: "", status: "all", product: "all", sort: "priority" },
  payments: { search: "", status: "all", product: "all", sort: "due" },
  commissions: { month: "2026-07", person: "Whitney", bonuses: {} },
  thrive: { month: "2026-07" },
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

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

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getOnboardingState(client) {
  const contractHours = hoursSince(client.contract.sentAt || client.saleAt);
  const skoolHours = hoursSince(client.skoolAccess.timerStartedAt);
  const contractIncomplete = client.contract.status !== "signed";
  const skoolIncomplete = client.skoolAccess.status !== "given";
  const escalated =
    (contractIncomplete && contractHours >= 24) ||
    (skoolIncomplete && skoolHours >= 24);
  const complete = !contractIncomplete && !skoolIncomplete;

  return {
    contractHours,
    skoolHours,
    contractIncomplete,
    skoolIncomplete,
    escalated,
    complete,
    category: complete ? "complete" : escalated ? "escalated" : "onboarding",
  };
}

function getPaymentState(plan) {
  const days = wholeDaysUntil(plan.dueAt);
  return {
    days,
    overdue: days < 0,
    dueSoon: days >= 0 && days <= 7,
    upcoming: days > 7,
  };
}

function pill(label, tone) {
  return `<span class="pill pill-${tone}">${label}</span>`;
}

function renderContract(client, clientState) {
  if (client.contract.status === "signed") {
    return `${pill("Signed", "success")}<span class="cell-secondary">Completed</span>`;
  }

  const escalated = clientState.contractIncomplete && clientState.contractHours >= 24;
  return `${pill("Sent · awaiting", escalated ? "danger" : "warning")}<span class="cell-secondary timer${escalated ? " is-danger-text" : ""}">${formatHours(clientState.contractHours)} elapsed</span>`;
}

function renderSkoolAccess(client, clientState) {
  if (client.skoolAccess.status === "given") {
    return `${pill("Granted", "success")}<span class="cell-secondary">Completed</span>`;
  }

  const escalated = clientState.skoolIncomplete && clientState.skoolHours >= 24;
  return `${pill("Not yet", escalated ? "danger" : "warning")}<span class="cell-secondary timer${escalated ? " is-danger-text" : ""}">${formatHours(clientState.skoolHours)} pending</span>`;
}

function renderMetrics(containerId, cards) {
  document.getElementById(containerId).innerHTML = cards
    .map(
      (card) => `
        <article class="metric-card ${card.className || ""}">
          <div class="metric-label">
            <span>${card.label}</span>
            <span class="metric-icon" aria-hidden="true">${card.icon}</span>
          </div>
          <p class="metric-value">${card.value}</p>
          <p class="metric-detail">${card.detail}</p>
        </article>`,
    )
    .join("");
}

function filterOnboarding() {
  const { search, status, product, sort } = state.onboarding;
  const term = search.trim().toLowerCase();

  return onboardingClients
    .map((client) => ({ client, clientState: getOnboardingState(client) }))
    .filter(({ client, clientState }) => {
      const matchesSearch = !term || `${client.name} ${client.closer}`.toLowerCase().includes(term);
      const matchesProduct = product === "all" || client.product === product;
      const matchesStatus = status === "all" || clientState.category === status;
      return matchesSearch && matchesProduct && matchesStatus;
    })
    .sort((a, b) => {
      if (sort === "oldest") return new Date(a.client.saleAt) - new Date(b.client.saleAt);
      if (sort === "newest") return new Date(b.client.saleAt) - new Date(a.client.saleAt);
      if (sort === "client") return a.client.name.localeCompare(b.client.name);
      if (a.clientState.escalated !== b.clientState.escalated) return a.clientState.escalated ? -1 : 1;
      if (a.clientState.complete !== b.clientState.complete) return a.clientState.complete ? 1 : -1;
      return new Date(a.client.saleAt) - new Date(b.client.saleAt);
    });
}

function renderOnboarding() {
  const rows = filterOnboarding();
  const allStates = onboardingClients.map(getOnboardingState);
  const escalatedCount = allStates.filter((item) => item.category === "escalated").length;
  const onboardingCount = allStates.filter((item) => item.category === "onboarding").length;

  renderMetrics("onboarding-metrics", [
    { label: "Complete", value: HISTORIC_COMPLETE_COUNT, detail: "Historic active clients fully onboarded", icon: "✓", className: "is-success" },
    { label: "In onboarding", value: onboardingCount, detail: "No incomplete step has crossed 24 hours", icon: "◎" },
    { label: "Needs attention / escalated", value: escalatedCount, detail: "Contract or Skool access crossed 24 hours", icon: "!", className: "is-danger" },
  ]);

  document.getElementById("onboarding-table-body").innerHTML = rows
    .map(({ client, clientState }) => {
      const overall = clientState.complete
        ? pill("Complete", "success")
        : clientState.escalated
          ? pill(`Escalated · ${client.closer}`, "danger")
          : pill("In onboarding", "warning");

      return `
        <tr class="${clientState.escalated ? "is-escalated" : ""}" data-client-id="${client.id}">
          <td class="client-cell"><span class="client-name"><span class="client-initials">${initials(client.name)}</span>${client.name}</span></td>
          <td><span class="cell-primary">${dateFormatter.format(new Date(client.saleAt))}</span><span class="cell-secondary">${formatHours(hoursSince(client.saleAt))} ago</span></td>
          <td><span class="cell-primary">${client.closer}</span></td>
          <td><span class="product-pill">${client.product}</span></td>
          <td>${renderContract(client, clientState)}</td>
          <td>${renderSkoolAccess(client, clientState)}</td>
          <td>${overall}</td>
        </tr>`;
    })
    .join("");

  document.getElementById("onboarding-empty").hidden = rows.length > 0;
  document.querySelector("#onboarding-view .table-scroll").hidden = rows.length === 0;
  document.getElementById("onboarding-showing").textContent = rows.length;
  document.getElementById("onboarding-total").textContent = onboardingClients.length;
  document.getElementById("onboarding-nav-count").textContent = escalatedCount;
  document.getElementById("escalated-quick-count").textContent = escalatedCount;
}

function filterPayments() {
  const { search, status, product, sort } = state.payments;
  const term = search.trim().toLowerCase();

  return paymentPlans
    .map((plan) => ({ plan, planState: getPaymentState(plan) }))
    .filter(({ plan, planState }) => {
      const matchesSearch = !term || plan.name.toLowerCase().includes(term);
      const matchesProduct = product === "all" || plan.product === product;
      const matchesStatus =
        status === "all" ||
        (status === "overdue" && planState.overdue) ||
        (status === "due-soon" && planState.dueSoon) ||
        (status === "upcoming" && planState.upcoming);
      return matchesSearch && matchesProduct && matchesStatus;
    })
    .sort((a, b) => {
      if (sort === "balance") return b.plan.balance - a.plan.balance;
      if (sort === "client") return a.plan.name.localeCompare(b.plan.name);
      return new Date(a.plan.dueAt) - new Date(b.plan.dueAt);
    });
}

function renderPayments() {
  const rows = filterPayments();
  const allStates = paymentPlans.map(getPaymentState);
  const overdueCount = allStates.filter((item) => item.overdue).length;
  const dueSoonCount = allStates.filter((item) => item.dueSoon).length;
  const remainingBalance = paymentPlans.reduce((total, plan) => total + plan.balance, 0);

  renderMetrics("payment-metrics", [
    { label: "Active plans", value: paymentPlans.length, detail: "Clients not paid in full", icon: "◎" },
    { label: "Overdue", value: overdueCount, detail: "Operations-owned follow-up", icon: "!", className: "is-danger" },
    { label: "Due within 7 days", value: dueSoonCount, detail: "Upcoming attention window", icon: "↗" },
    { label: "Remaining balance", value: CURRENCY.format(remainingBalance), detail: "Across dummy payment plans", icon: "$", className: "is-success" },
  ]);

  document.getElementById("payment-table-body").innerHTML = rows
    .map(({ plan, planState }) => {
      let timeLabel;
      let status;
      if (planState.overdue) {
        timeLabel = `${Math.abs(planState.days)} day${Math.abs(planState.days) === 1 ? "" : "s"} overdue`;
        status = pill("Overdue", "danger");
      } else if (planState.days === 0) {
        timeLabel = "Due today";
        status = pill("Due today", "warning");
      } else if (planState.dueSoon) {
        timeLabel = `${planState.days} day${planState.days === 1 ? "" : "s"} remaining`;
        status = pill("Due soon", "warning");
      } else {
        timeLabel = `${planState.days} days remaining`;
        status = pill("Upcoming", "info");
      }

      return `
        <tr class="${planState.overdue ? "is-escalated" : ""}" data-plan-id="${plan.id}">
          <td class="client-cell"><span class="client-name"><span class="client-initials">${initials(plan.name)}</span>${plan.name}</span></td>
          <td><span class="product-pill">${plan.product}</span></td>
          <td><span class="balance">${CURRENCY.format(plan.balance)}</span></td>
          <td><span class="cell-primary">${dateFormatter.format(new Date(plan.dueAt))}</span></td>
          <td><span class="timer ${planState.overdue ? "is-danger-text" : ""}">${timeLabel}</span></td>
          <td>${status}</td>
        </tr>`;
    })
    .join("");

  document.getElementById("payment-empty").hidden = rows.length > 0;
  document.querySelector("#payments-view .table-scroll").hidden = rows.length === 0;
  document.getElementById("payment-showing").textContent = rows.length;
  document.getElementById("payment-total").textContent = paymentPlans.length;
  document.getElementById("payments-nav-count").textContent = overdueCount;
  document.getElementById("overdue-quick-count").textContent = overdueCount;
}

function monthMatches(date, month) {
  return date.slice(0, 7) === month;
}

function selectedMember() {
  return teamMembers.find((member) => member.name === state.commissions.person);
}

function commissionPayments() {
  const member = selectedMember();
  const ownerField = member.role === "Setter" ? "setter" : "closer";
  return receivedPayments.filter(
    (payment) => monthMatches(payment.receivedAt, state.commissions.month) && payment[ownerField] === member.name,
  );
}

function renderPersonTabs() {
  document.getElementById("commission-person-tabs").innerHTML = teamMembers
    .map(
      (member) => `
        <button class="person-tab ${member.name === state.commissions.person ? "is-active" : ""}" data-person="${member.name}" type="button">
          <span>${member.name}</span>
          <small>${member.role} · ${Math.round(member.rate * 100)}%</small>
        </button>`,
    )
    .join("");

  document.querySelectorAll("[data-person]").forEach((button) => {
    button.addEventListener("click", () => {
      state.commissions.person = button.dataset.person;
      renderCommissions();
    });
  });
}

function renderCommissions() {
  const member = selectedMember();
  const payments = commissionPayments();
  const received = payments.reduce((total, payment) => total + payment.amount, 0);
  const earned = received * member.rate;
  const bonusKey = `${state.commissions.month}:${member.name}`;
  const bonus = state.commissions.bonuses[bonusKey] || 0;
  const monthLabel = monthOptions.find((month) => month.value === state.commissions.month).label;

  renderPersonTabs();
  renderMetrics("commission-metrics", [
    { label: "Payments received", value: CURRENCY.format(received), detail: `${payments.length} payment${payments.length === 1 ? "" : "s"} in ${monthLabel}`, icon: "$" },
    { label: "Commission rate", value: `${Math.round(member.rate * 100)}%`, detail: `${member.role} rate on received payments`, icon: "%" },
    { label: "Commission earned", value: CURRENCY.format(earned), detail: "Before manual bonuses", icon: "↗", className: "is-success" },
    { label: "Total owed", value: CURRENCY.format(earned + bonus), detail: bonus ? `${CURRENCY.format(bonus)} bonus included` : "No bonus added", icon: "+", className: bonus ? "is-highlight" : "" },
  ]);

  document.getElementById("commission-table-title").textContent = `${member.name} · ${monthLabel}`;
  document.getElementById("commission-table-body").innerHTML = payments
    .map(
      (payment) => `
        <tr>
          <td><span class="cell-primary">${dateFormatter.format(new Date(`${payment.receivedAt}T12:00:00`))}</span></td>
          <td class="client-cell"><span class="client-name"><span class="client-initials">${initials(payment.client)}</span>${payment.client}</span></td>
          <td><span class="product-pill">${payment.product}</span></td>
          <td><span class="cell-primary">${payment.type}</span></td>
          <td><span class="balance">${CURRENCY.format(payment.amount)}</span></td>
          <td>${Math.round(member.rate * 100)}%</td>
          <td><span class="balance commission-value">${CURRENCY.format(payment.amount * member.rate)}</span></td>
        </tr>`,
    )
    .join("");

  document.getElementById("commission-empty").hidden = payments.length > 0;
  document.querySelector("#commissions-view .table-scroll").hidden = payments.length === 0;
  document.getElementById("commission-footer-count").textContent = `${payments.length} received payment${payments.length === 1 ? "" : "s"} included`;
}

function addBonus() {
  const member = selectedMember();
  const monthLabel = monthOptions.find((month) => month.value === state.commissions.month).label;
  const response = window.prompt(`Add a bonus for ${member.name} in ${monthLabel}:`, "");
  if (response === null || response.trim() === "") return;

  const amount = Number(response.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(amount) || amount < 0) {
    window.alert("Enter a valid positive bonus amount.");
    return;
  }

  state.commissions.bonuses[`${state.commissions.month}:${member.name}`] = amount;
  renderCommissions();
}

function stripeFeesFor(payments) {
  return payments.reduce((total, payment) => total + payment.amount * 0.029 + 0.3, 0);
}

function renderThrive() {
  const month = state.thrive.month;
  const monthLabel = monthOptions.find((item) => item.value === month).label;
  const revenuePayments = receivedPayments.filter(
    (payment) => payment.product === "Thrive" && monthMatches(payment.receivedAt, month),
  );
  const revenue = revenuePayments.reduce((total, payment) => total + payment.amount, 0);
  const costs = thriveCosts[month];
  const stripeFees = stripeFeesFor(revenuePayments);
  const fixedCosts = costs.christina + costs.mikayleigh + costs.tools;
  const totalCosts = fixedCosts + stripeFees;
  const netIncome = revenue - totalCosts;
  const brionyShare = netIncome * 0.2;

  renderMetrics("thrive-metrics", [
    { label: "Thrive revenue", value: CURRENCY.format(revenue), detail: `Payments received in ${monthLabel}`, icon: "$", className: "is-success" },
    { label: "Program costs", value: CURRENCY.format(totalCosts), detail: "Salaries, tools, and Stripe fees", icon: "−" },
    { label: "Net income", value: CURRENCY.format(netIncome), detail: "Revenue less program costs", icon: "↗", className: "is-highlight" },
    { label: "Briony · 20%", value: CURRENCY.format(brionyShare), detail: "Owed from net income", icon: "%", className: "is-success" },
  ]);

  document.getElementById("thrive-revenue-total").textContent = CURRENCY.format(revenue);
  document.getElementById("thrive-revenue-list").innerHTML = revenuePayments
    .map(
      (payment) => `
        <div class="pnl-row">
          <div><strong>${payment.client}</strong><span>${dateFormatter.format(new Date(`${payment.receivedAt}T12:00:00`))} · ${payment.type}</span></div>
          <strong>${CURRENCY.format(payment.amount)}</strong>
        </div>`,
    )
    .join("");

  const costRows = [
    ["Christina's salary", costs.christina],
    ["Mikayleigh's salary", costs.mikayleigh],
    ["Tools / software", costs.tools],
    ["Stripe processing fees", stripeFees],
  ];
  document.getElementById("thrive-cost-total").textContent = CURRENCY.format(totalCosts);
  document.getElementById("thrive-cost-list").innerHTML = costRows
    .map(
      ([label, amount]) => `
        <div class="pnl-row">
          <div><strong>${label}</strong><span>${label === "Stripe processing fees" ? "2.9% + $0.30 per received payment" : "Dummy placeholder amount"}</span></div>
          <strong>−${CURRENCY.format(amount)}</strong>
        </div>`,
    )
    .join("");
  document.getElementById("thrive-net-income").textContent = CURRENCY.format(netIncome);
  document.getElementById("thrive-briony-share").textContent = CURRENCY.format(brionyShare);
}

function setView(view) {
  const titles = {
    onboarding: "Onboarding completion",
    payments: "Payment plan tracker",
    commissions: "Sales invoice cross-checks",
    thrive: "Thrive P&L",
  };
  state.currentView = view;
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTarget === view);
  });
  document.querySelectorAll("[data-view]").forEach((section) => {
    const active = section.dataset.view === view;
    section.classList.toggle("is-active", active);
    section.hidden = !active;
  });
  document.getElementById("page-title").textContent = titles[view];
}

function syncQuickFilters(group, value) {
  document.querySelectorAll(`[data-${group}-quick]`).forEach((button) => {
    button.classList.toggle("is-active", button.dataset[`${group}Quick`] === value);
  });
}

function populateMonthSelect(selectId) {
  document.getElementById(selectId).innerHTML = monthOptions
    .map((month) => `<option value="${month.value}">${month.label}</option>`)
    .join("");
}

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.viewTarget;
    setView(view);
    window.location.hash = view;
  });
});

window.addEventListener("hashchange", () => {
  const view = window.location.hash.slice(1);
  if (["onboarding", "payments", "commissions", "thrive"].includes(view)) setView(view);
});

document.getElementById("onboarding-search").addEventListener("input", (event) => {
  state.onboarding.search = event.target.value;
  renderOnboarding();
});
document.getElementById("onboarding-status-filter").addEventListener("change", (event) => {
  state.onboarding.status = event.target.value;
  syncQuickFilters("onboarding", event.target.value);
  renderOnboarding();
});
document.getElementById("onboarding-product-filter").addEventListener("change", (event) => {
  state.onboarding.product = event.target.value;
  renderOnboarding();
});
document.getElementById("onboarding-sort").addEventListener("change", (event) => {
  state.onboarding.sort = event.target.value;
  renderOnboarding();
});
document.querySelectorAll("[data-onboarding-quick]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.onboardingQuick;
    state.onboarding.status = value;
    document.getElementById("onboarding-status-filter").value = value;
    syncQuickFilters("onboarding", value);
    renderOnboarding();
  });
});

document.getElementById("payment-search").addEventListener("input", (event) => {
  state.payments.search = event.target.value;
  renderPayments();
});
document.getElementById("payment-status-filter").addEventListener("change", (event) => {
  state.payments.status = event.target.value;
  syncQuickFilters("payment", event.target.value);
  renderPayments();
});
document.getElementById("payment-product-filter").addEventListener("change", (event) => {
  state.payments.product = event.target.value;
  renderPayments();
});
document.getElementById("payment-sort").addEventListener("change", (event) => {
  state.payments.sort = event.target.value;
  renderPayments();
});
document.querySelectorAll("[data-payment-quick]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.paymentQuick;
    state.payments.status = value;
    document.getElementById("payment-status-filter").value = value;
    syncQuickFilters("payment", value);
    renderPayments();
  });
});

document.getElementById("commission-month").addEventListener("change", (event) => {
  state.commissions.month = event.target.value;
  renderCommissions();
});
document.getElementById("thrive-month").addEventListener("change", (event) => {
  state.thrive.month = event.target.value;
  renderThrive();
});
document.getElementById("add-bonus-button").addEventListener("click", addBonus);

function refreshTimers() {
  renderOnboarding();
  renderPayments();
  document.getElementById("onboarding-refreshed").textContent = "just now";
  document.getElementById("payments-refreshed").textContent = "just now";
}

populateMonthSelect("commission-month");
populateMonthSelect("thrive-month");
document.getElementById("commission-month").value = state.commissions.month;
document.getElementById("thrive-month").value = state.thrive.month;
renderOnboarding();
renderPayments();
renderCommissions();
renderThrive();
const initialView = new URLSearchParams(window.location.search).get("view") || window.location.hash.slice(1);
setView(["onboarding", "payments", "commissions", "thrive"].includes(initialView) ? initialView : "onboarding");
setInterval(refreshTimers, 60 * 1000);
