import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "data" / "budget.db"


def get_db_connection():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row

    return connection

def create_tables():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL
    )
    """)

    connection.commit()
    connection.close()


def add_transaction(type, name, category, amount, date):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO transactions (type, name, category, amount, date)
        VALUES (?, ?, ?, ?, ?)
    """, (type, name, category, amount, date))

    connection.commit()
    connection.close()


def delete_transaction(transaction_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM transactions WHERE id = ?", (transaction_id,))
    deleted = cursor.rowcount > 0

    connection.commit()
    connection.close()

    return deleted


def get_transactions():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM transactions ORDER BY date DESC, id DESC")

    rows = cursor.fetchall()
    connection.close()

    return [dict(row) for row in rows]

def get_summary():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT SUM(amount) FROM transactions WHERE type = 'income'")
    total_income = cursor.fetchone()[0] or 0


    cursor.execute("SELECT SUM(amount) FROM transactions WHERE type = 'expense'")
    total_expense = cursor.fetchone()[0] or 0

    balance = total_income - total_expense
    connection.close()

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "remaining_balance": balance
    }

def get_category_summary():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT category, SUM(amount) AS total
        FROM transactions
        WHERE type = 'expense'
        GROUP BY category
        ORDER BY total DESC
    """)

    rows = cursor.fetchall()
    connection.close()

    return [dict(row) for row in rows]



create_tables()
