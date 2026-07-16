# BBP Ops Dashboard Prototype

Private, read-only concept prototype for Amela's Operations workspace.

## Included views

1. Onboarding Completion Tracker
   - Tracks contract signing and Skool access independently from payment status.
   - Keeps setter attribution in the sample data while showing the closer in the table.
   - Escalates to the client's closer as soon as either incomplete step crosses 24 hours.
   - Shows a dummy historic completed-client count alongside the current sample queue.
2. Payment Plan Tracker
   - Includes only fictional clients on payment plans.
   - Tracks remaining balance, next payment date, days remaining, and overdue status.
3. Sales Invoice Cross-Checks
   - Calculates setter commission at 5% and closer commission at 10% from payments received in the selected month.
   - Supports June/July switching, person-specific views, and local-only manual bonuses.
4. Thrive P&L
   - Totals Thrive payments received in the selected month.
   - Subtracts dummy salaries, tools/software costs, and calculated Stripe processing fees.
   - Calculates net income and Briony's 20% share.

Onboarding and Payment Plans support search, status filters, product filters, and sorting. Timers refresh every minute.

## Safety boundary

- All names, dates, and amounts are dummy data.
- No BBP systems or repositories are connected.
- The interface cannot send, edit, or trigger actions.
- The Add Bonus interaction changes only in-memory prototype state and is lost on refresh.
- This is not an approved BBP process or production specification.

## Open locally

Open `index.html` in a browser, or run a simple local web server from this folder.
