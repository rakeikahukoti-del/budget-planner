function TransactionList({ transactions, onDeleteTransaction }) {

    if (transactions.length === 0) {
        return (
            <div className="transaction-list">
                <h2>Transactions</h2>
                <p className="empty-state">No transactions yet</p>
            </div>
        )
    }

    return (
        <div className="transaction-list">
            <h2>Transactions</h2>

            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id} className={`transaction-row transaction-row--${transaction.type}`}>
                        <div className="transaction-row__details">
                            <span className="transaction-row__name">{transaction.name}</span>
                            <span className="transaction-row__meta">
                                {transaction.category} &middot; {transaction.date}
                            </span>
                        </div>

                        <span className="transaction-row__amount">
                            {transaction.type === "income" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                        </span>

                        <button
                            type="button"
                            className="transaction-row__delete"
                            aria-label={`Delete ${transaction.name}`}
                            onClick={() => onDeleteTransaction(transaction.id)}
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList
