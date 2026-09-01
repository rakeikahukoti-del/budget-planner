function CategoryBreakdown({ categories }) {
    if (categories.length === 0) {
        return null
    }

    const highest = Math.max(...categories.map((category) => category.total))

    return (
        <div className="category-breakdown">
            <h2>Spending by Category</h2>

            <ul>
                {categories.map((category) => (
                    <li key={category.category} className="category-row">
                        <div className="category-row__label">
                            <span>{category.category}</span>
                            <span>${category.total.toFixed(2)}</span>
                        </div>
                        <div className="category-row__bar">
                            <div
                                className="category-row__bar-fill"
                                style={{ width: `${(category.total / highest) * 100}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryBreakdown
