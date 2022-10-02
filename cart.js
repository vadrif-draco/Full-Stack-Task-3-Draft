
let products = [];

const addProduct = function () {
    const productName = document.getElementById("product-name").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    let err = validateInputs(productName, price, quantity)

    if (err != "") {
        alert(err);
        return;
    }
    const product = {
        productName: productName,
        price: price,
        quantity: quantity,
        getTotal: function () {
            return this.price * this.quantity;
        },
    };
    products.push(product);

    display();
};

const display = function () {
    displayProducts();
    displaySubTotal();
    displayShipping();
    displayTotal();
};

const displayProducts = function () {
    document.getElementById("products").innerHTML = "";
    products.forEach((p, i) => {
        document.getElementById("products").innerHTML += `
        <tr>
            
            <td>
                <img src="img/${p.productName}.jpg" alt="" style="width: 50px"/>
                ${p.productName}
            </td>
            
            <td>
                EGP
                ${p.price}
            </td>

            <td class="qtycontrol">
                <div>
                    <div>
                        <button class="light" onclick="decQuantity(${i})"><i class="fa fa-minus"></i></button>
                    </div>
                    <input type="text" value="${p.quantity}"/>
                    <div>
                        <button class="light" onclick="incQuantity(${i})"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </td>
            
            <td>
                EGP
                ${p.getTotal()}
            </td>
            
            <td>
                <button class="danger-btn" onclick="remove(${i})">
                    <i class="fa fa-times"></i>
                </button>
            </td>
            
        </tr>`;
    });
};

const displaySubTotal = function () {
    document.getElementById("sub-total").innerHTML = `EGP ${calculateSubTotal()}`;
};

const displayShipping = function () {
    let shipping = calculateShipping();
    document.getElementById("shipping").innerHTML = `EGP ${shipping}`;
};

const calculateSubTotal = function () {
    let total = 0;
    products.forEach((p) => {
        total += p.getTotal();
    });
    return total;
};

const displayTotal = function () {
    let total = calculateSubTotal() + calculateShipping();
    document.getElementById("total").innerHTML = `EGP ${total}`;
};

const calculateShipping = function () {
    return Math.round(calculateSubTotal() * 0.1);
};

const validateInputs = function (productName, price, quantity) {
    if (productName == "") return "Please enter product name"
    if (isNaN(price) || isNaN(quantity)) return "Please enter a valid price/quantity number"
    if (!(price > 0) || quantity < 1) return "Please enter a valid price/quantity amount"
    return ""
};

const decQuantity = function (i) {
    if (products[i].quantity > 1) {
        products[i].quantity -= 1;
        display();
    }
};

const incQuantity = function (i) {
    products[i].quantity = Number(products[i].quantity) + 1;
    display();
};

const remove = function (i) {
    if (confirm("Are you sure?")) {
        products.splice(i, 1);
        display();
    }
};