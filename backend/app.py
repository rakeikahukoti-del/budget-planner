from flask_cors import CORS
from flask import Flask, jsonify, request
from database import (
    get_transactions,
    add_transaction,
    delete_transaction,
    get_summary,
    get_category_summary,
)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Student Budget Planner API Running"


@app.route("/transactions")
def get_trans():
    return jsonify(get_transactions())


@app.route("/summary")
def summary():
    return jsonify(get_summary())


@app.route("/category-summary")
def category_summary():
    return jsonify(get_category_summary())


@app.route("/transactions", methods=["POST"])
def add_trans():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ["type", "name", "category", "amount", "date"]

    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({"error": f"Missing field: {field}"}), 400

    if data["type"] not in ["income", "expense"]:
        return jsonify({"error": "Incorrect transaction type"}), 400

    try:
        amount = float(data["amount"])

    except ValueError:
        return jsonify({"error": "Amount must be a valid number"}), 400

    if amount <= 0:
        return jsonify({"error": "Amount must be a positive number"}), 400


    add_transaction(
        data["type"],
        data["name"],
        data["category"],
        amount,
        data["date"]
    )

    return jsonify({
        "message": "Transaction added",
        "data": {
            "amount": amount,
            "category": data["category"],
            "date": data["date"],
            "name": data["name"],
            "type": data["type"]
        }
    }), 201


@app.route("/transactions/<int:transaction_id>", methods=["DELETE"])
def remove_trans(transaction_id):
    deleted = delete_transaction(transaction_id)

    if not deleted:
        return jsonify({"error": "Transaction not found"}), 404

    return jsonify({"message": "Transaction deleted"}), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=True)
