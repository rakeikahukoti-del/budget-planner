import { useState } from "react"

const initialFormData = {
    type: "expense",
    name: "",
    category: "",
    amount: "",
    date: ""
}

function TransactionForm({ onAddTransaction }) {
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null)

    function handleChange(event) {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)

        try {
            await onAddTransaction(formData)
            setFormData(initialFormData)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <h2>Add Transaction</h2>

            {error && <p className="form-error">{error}</p>}

            <div className="form-field">
                <label htmlFor="type">Type</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g. Textbook, Part-time job"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="category">Category</label>
                <input
                    id="category"
                    type="text"
                    name="category"
                    placeholder="e.g. Groceries, Rent, Wages"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="number"
                    name="amount"
                    min="0.01"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <button type="submit">
                    Add Transaction
                </button>
            </div>
        </form>
    )
}

export default TransactionForm
