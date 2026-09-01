import { useState, useEffect, useCallback } from "react"
import SummaryCards from "./components/SummaryCards"
import TransactionForm from "./components/TransactionForm"
import TransactionList from "./components/TransactionList"
import CategoryBreakdown from "./components/CategoryBreakdown"
import "./App.css"

const API_BASE_URL = "http://127.0.0.1:5050"

function App() {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    remaining_balance: 0,
  })
  const [categories, setCategories] = useState([])
  const [loadError, setLoadError] = useState(null)

  const fetchAll = useCallback(async () => {
    try {
      const [transactionsRes, summaryRes, categoryRes] = await Promise.all([
        fetch(`${API_BASE_URL}/transactions`),
        fetch(`${API_BASE_URL}/summary`),
        fetch(`${API_BASE_URL}/category-summary`),
      ])

      setTransactions(await transactionsRes.json())
      setSummary(await summaryRes.json())
      setCategories(await categoryRes.json())
      setLoadError(null)
    } catch {
      setLoadError("Couldn't reach the Student Budget Planner API. Is the backend running?")
    }
  }, [])

  async function createTransaction(transaction) {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to add transaction")
    }

    await fetchAll()
  }

  async function deleteTransaction(id) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      await fetchAll()
    }
  }

  useEffect(() => {
    // Initial data load on mount; fetchAll's own setState calls happen
    // after the network request resolves, not synchronously in this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll()
  }, [fetchAll])

  return (
    <main>
      <h1>Student Budget Planner</h1>

      {loadError && <p className="form-error">{loadError}</p>}

      <section>
        <SummaryCards summary={summary} />
      </section>

      <section className="layout-grid">
        <TransactionForm onAddTransaction={createTransaction} />
        <CategoryBreakdown categories={categories} />
      </section>

      <section>
        <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
      </section>
    </main>
  )
}

export default App
