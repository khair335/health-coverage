# Health Coverage Navigator (frontend)

React + Tailwind CSS app for the NJ MVP customer flow and agent demo screens.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Pages

| Route | Screen |
|---|---|
| `/` | Landing / home (S01) |
| `/location` | State & ZIP (S02) |
| `/household` | Household (S03) |
| `/income` | Income & coverage (S04) |
| `/eligibility-questions` | Eligibility factors (S05) |
| `/preferences` | Needs (S06) |
| `/care` | Doctors & prescriptions (S07) |
| `/paths` | Path summary (S08) |
| `/plans` | Plan comparison (S09) |
| `/recommendation` | Recommendation (S10) |
| `/assistance` | Charity / community (S11) |
| `/contact` | Agent handoff (S12) |
| `/confirmation` | Confirmation (S13) |
| `/agent` | Producer dashboard (S14) |
| `/agent/cases/:id` | Case detail (S15) |

Answers are saved in the browser (session storage). No backend.
