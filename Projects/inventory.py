products = []

def add_product():
    name = input("Product name: ")
    qty = int(input("Quantity: "))
    products.append({"name": name, "qty": qty})
    print("Product added!")

def view_products():
    print("\n--- Inventory ---")
    for p in products:
        print(p["name"], "-", p["qty"])

while True:
    print("\n1. Add Product")
    print("2. View Products")
    print("3. Exit")

    choice = input("Choose: ")

    if choice == "1":
        add_product()
    elif choice == "2":
        view_products()
    elif choice == "3":
        break