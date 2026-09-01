function formatCurrency(value) {
    return `$${Number(value || 0).toFixed(2)}`
}

function SummaryCards({ summary }) {
    const { total_income = 0, total_expense = 0, remaining_balance = 0 } = summary

    return (
        <div className="summary-cards">
            <div className="summary-card summary-card--income">
                <h3>Income</h3>
                <p>{formatCurrency(total_income)}</p>
            </div>
            <div className="summary-card summary-card--expense">
                <h3>Expenses</h3>
                <p>{formatCurrency(total_expense)}</p>
            </div>
            <div className={`summary-card summary-card--balance ${remaining_balance < 0 ? "is-negative" : ""}`}>
                <h3>Balance</h3>
                <p>{formatCurrency(remaining_balance)}</p>
            </div>
        </div>
    )
}

export default SummaryCards
