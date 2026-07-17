# BBP Ops Dashboard Prototype

Interactive concept prototype for role-based BBP Operations, Sales, Client Success, Thrive, and administration views.

## Included views

1. All Transactions
   - Gives BBP Operations and BBP Leadership a monthly ledger of revenue and refunds only; salaries and operating costs are excluded.
   - Shows transaction date, client name when available, product, amount, processor, and destination account.
   - Summarizes gross revenue, refunds, net revenue, and net received for each product.
   - Supports June/July switching, search, product and transaction-type filters, and date/amount sorting.
   - Uses fictional records modeled on the structure and product patterns of the supplied June revenue ledger.
2. Onboarding Completion Tracker
   - Tracks contract signing and Skool access independently from payment status.
   - Includes high-ticket Mentorship, Academy, and Thrive sales only.
   - Defaults to a combined Currently Onboarding view containing both normal and escalated incomplete records, with Complete as the only alternate view.
   - Shows client email and sale type as separate fields alongside closer, CSM, product, contract, Skool access, and status.
   - Keeps setter attribution in the sample data while showing the closer in the table.
   - Escalates to the client's closer as soon as either incomplete step crosses 24 hours.
   - Shows a dummy historic completed-client count alongside the current sample queue.
3. Payment Plan Tracker
   - Includes only fictional clients on payment plans.
   - Tracks client email, setter, closer, remaining balance, next payment date, days remaining, and overdue status.
   - Uses the status shortcut row instead of multiple overlapping dropdown filters.
4. Sales Invoice Cross-Checks
   - Calculates setter commission once at 5% of total signed contract value; later installments do not create additional setter commission.
   - Calculates closer commission at 10% of each payment actually collected in the selected month.
   - Shows the closer on setter entries and the setter on closer entries.
   - Makes Sales clients clickable without the initials badge used elsewhere.
   - Supports June/July switching, person-specific views, and local-only manual bonuses.
5. Thrive P&L
   - Totals Thrive payments received in the selected month.
   - Subtracts dummy salaries, tools/software costs, and calculated Stripe processing fees.
   - Calculates net income and Briony's 20% share.
   - Includes a filterable monthly ledger of all Thrive income, installments, refunds, Stripe fees, and net transaction movements for Thrive-authorized users.
6. Dashboard preview launcher
   - Opens on six fixed concepts: BBP Leadership, Operations, Sales Lead, Sales Manager, Customer Success, and Thrive.
   - Uses Shaan, Amela, Matt, Ali, Emily, and Briony as the representative preview personas, with no in-dashboard persona switcher.
   - Hides modules and scopes client or compensation data according to the working access model.
   - Keeps supporting team members inside the relevant workflows without exposing them as separate dashboard previews.
   - Demonstrates restricted financial values for John's technical-admin role.
   - Renumbers visible sidebar modules from 01 for every dashboard rather than preserving global module numbers.
7. Monthly invoice workflow
   - Routes every Sales breakdown through salesperson review, Amela review, Matt's final approval, and payment readiness.
   - Supports correction reasons, automatic closer enrollment bonuses, setter base pay, and refund clawbacks.
   - Uses four deliberate July examples: Whitney with the salesperson, Rachelle with Amela, Ali with Matt, and Robyn ready for Amela to move to payment.
   - Makes the current stage owner prominent and permits manual bonuses/adjustments only to the person responsible for the active review stage.
   - Opens a complete transaction editor from the three-dot action only for the current stage owner.
   - Highlights edited entries in yellow and gives Amela explicit approve/deny controls for submitted edits.
   - Lets Amela and Matt add documented refund clawbacks while preventing salespeople from adding them.
8. CSM Compensation
   - Shows Emily and Mikayleigh's effective July 1, 2026 rate cards and dummy qualified events.
   - Uses Mikayleigh's confirmed $1,500 monthly Thrive allocation in the Thrive P&L.
   - Lets Emily manually assign a qualified extension or ascension bonus to herself or Mikayleigh while the source process remains manual.
9. Admin & Access
   - Shows module scopes separately from sensitive-finance access.
   - Includes local-only add/remove-person actions and Matt's missing-setter assignment queue.
   - Gives Matt a second Sales Admin queue for commission invoices awaiting his final approval.

Onboarding, Payment Plans, and Sales Invoice Cross-Checks client names open a read-only client record with email, current product, lifetime value, closer, setter, initial sales date, and complete sample transaction history. All Transactions deliberately keeps names unlinked.

Onboarding supports search, a product filter, and two queue states. Payment Plans supports search and status shortcuts. Live timers refresh every minute.

## Safety boundary

- All names, dates, and amounts are dummy data.
- No BBP systems or repositories are connected.
- Interactive approvals, corrections, assignments, and admin changes affect in-memory prototype state only and are lost on refresh.
- The interface cannot send messages, modify a real record, or trigger payment.
- This is not an approved BBP process or production specification.

## Open locally

Open `index.html` in a browser, or run a simple local web server from this folder.
