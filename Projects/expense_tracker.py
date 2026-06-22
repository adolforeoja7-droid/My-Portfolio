expenses = []

def add_expense():
    name = input("Expense name: ")
    amount = float(input("Amount: "))
    expenses.append({"name": name, "amount": amount})
    print("Expense added!")

def view_expenses():
    print("\n--- Expenses ---")
    total = 0
    for e in expenses:
        print(e["name"], "-", e["amount"])
        total += e["amount"]
    print("Total:", total)

while True:
    print("\n1. Add Expense")
    print("2. View Expenses")
    print("3. Exit")

    choice = input("Choose: ")

    if choice == "1":
        add_expense()
    elif choice == "2":
        view_expenses()
    elif choice == "3":
        break