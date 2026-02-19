const productsContainer = document.querySelector("#products"),
cartContainer = document.querySelector("#cart-items"),
totalEl = document.querySelector("#total"),
checkOut = document.querySelector("#checkout");

const products = [
    {
        id: 1,
        name: "SHOES 1",
        price: 86,
        iamge: "Images/shoes-1.png"
    },
    {
        id: 2,
        name: "SHOES 2",
        price: 123,
        iamge: "Images/shoes-2.png"
    },
    {
        id: 3,
        name: "SHOES 3",
        price: 130,
        iamge: "Images/shoes-3.png"
    },
    {
        id: 4,
        name: "SHOES 4",
        price: 150,
        iamge: "Images/shoes-4.png"
    },
    {
        id: 5,
        name: "SHOES 5",
        price: 200,
        iamge: "Images/shoes-5.png"
    },
]

let cart = []

const renderProducts = () => {
    productsContainer.innerHTML = ""
    products.forEach((p, index) => {
        productsContainer.innerHTML += `
        <div class="glass product">
            <img src="${p.iamge}" />
            <div class="product-content">
                <h3>${p.name}</h3>
                <p class="price">$ ${p.price}</p>
                <button class="btn-primary" onclick="addToCart(${p.id})">ADD TO CART</button>
            </div>
        </div>
        `
    })
}

const addToCart = (id) => {
    const item = products.find(p => p.id === id)
    const existing = cart.find(p => p.id === id)
    if (existing) {
        existing.qty++;
    }
    else {
        cart.push({...item, qty: 1})
    }
    renderCart()
}

const renderCart = () => {
    cartContainer.innerHTML = ""
    let total = 0
    cart.forEach((item, index) => {
        total += item.price * item.qty
        cartContainer.innerHTML += `
        <div class="cart-item">
            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>$ ${item.price} × ${item.qty}</p>
            </div>
            <div class="qty-controls">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        </div>
        `
    })
    totalEl.textContent = `$ ${total}`
}

const changeQty = (id, delta) => {
    const item = cart.find(c => c.id === id);
    if (!item) {
        return
    }

    item.qty += delta;

    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id)
    }

    renderCart();
}

checkOut.addEventListener("click", () => {
    if (cart.length === 0) {
        return alert("Cart Is Empty")
    }
    alert("Order placed successfully!")
    cart = []
    renderCart()

})

renderProducts()