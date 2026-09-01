# Student Budget Planner

A simple full-stack budget tracker for students: log income and expenses, see a
running balance, and view spending broken down by category.

- **Backend:** Flask + SQLite (`backend/`)
- **Frontend:** React + Vite (`frontend/`)

## Features

- Add income/expense transactions (name, category, amount, date)
- Delete transactions
- Live summary of total income, total expenses, and remaining balance
- Spending breakdown by category

## Project structure

```
backend/
  app.py            # Flask API routes
  database.py        # SQLite access layer
  requirements.txt
frontend/
  src/
    App.jsx           # Top-level layout & data fetching
    components/        # SummaryCards, TransactionForm, TransactionList, CategoryBreakdown
data/
  budget.db           # SQLite database (created automatically, gitignored)
```

## Getting started

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

The API runs at `http://127.0.0.1:5050`. The SQLite database is created
automatically at `data/budget.db` on first run.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` (Vite's default) and talks to the
backend at `http://127.0.0.1:5050`. Run both servers at the same time in
separate terminals.

## API reference

| Method | Route                | Description                              |
| ------ | --------------------- | ----------------------------------------- |
| GET    | `/transactions`       | List all transactions                     |
| POST   | `/transactions`       | Add a transaction                         |
| DELETE | `/transactions/<id>`  | Delete a transaction                      |
| GET    | `/summary`            | Total income, expenses, and balance       |
| GET    | `/category-summary`   | Total expenses grouped by category        |

`POST /transactions` expects JSON:

```json
{
  "type": "expense",
  "name": "Textbook",
  "category": "Education",
  "amount": 45.99,
  "date": "2026-09-01"
}
```

`type` must be `"income"` or `"expense"`, and `amount` must be a positive number.

## Possible next steps

- Persist transactions per user (auth + multi-user support)
- Editable transactions instead of delete-and-recreate
- Date-range filtering and monthly trend charts
- Deploy the backend and serve the built frontend from it
