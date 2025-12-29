let cart = JSON.parse(localStorage.getItem('FreshMart_Cart')) || [];
let orders = JSON.parse(localStorage.getItem('FreshMart_Orders')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderOrders();

    // Event Delegation for Add to Cart
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-to-cart-btn')) {
            const card = e.target.parentElement;
            const name = card.querySelector('h3').innerText;
            const price = parseFloat(card.querySelector('p').innerText.replace('₹', ''));
            
            cart.push({ id: Date.now(), name, price });
            saveCart();
            alert(name + " added to cart!");
        }
    });

    // Modal Control
    const modal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.querySelector('.close-btn');

    if(cartBtn) cartBtn.onclick = (e) => { e.preventDefault(); renderCart(); modal.style.display="block"; };
    if(closeBtn) closeBtn.onclick = () => modal.style.display="none";
});

function saveCart() {
    localStorage.setItem('FreshMart_Cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalDisp = document.getElementById('total-amount');
    container.innerHTML = cart.length === 0 ? "<p>Cart empty!</p>" : "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button class="remove-btn" onclick="removeItem(${item.id})">Delete Item</button>
            </div>`;
    });
    totalDisp.innerText = total.toFixed(2);
}

function checkout() {
    if(cart.length === 0) return alert("Add items!");
    const dDate = new Date(); dDate.setDate(dDate.getDate() + 2);
    const newOrder = {
        id: Date.now(),
        items: [...cart],
        delivery: dDate.toDateString(),
        total: cart.reduce((s, i) => s + i.price, 0)
    };
    orders.push(newOrder);
    localStorage.setItem('FreshMart_Orders', JSON.stringify(orders));
    cart = [];
    saveCart();
    alert("Order Placed!");
    location.reload();
}

function renderOrders() {
    const list = document.getElementById('orders-list');
    if(!list) return;
    list.innerHTML = orders.length === 0 ? "<p>No active orders.</p>" : "";
    orders.forEach(order => {
        list.innerHTML += `
            <div class="card" style="text-align:left; border-left:5px solid #2ecc71; margin-bottom:10px;">
                <h4>Order #${order.id}</h4>
                <p>Delivery: ${order.delivery}</p>
                <p>Total: ₹${order.total}</p>
                <button class="remove-btn" onclick="deleteOrder(${order.id})">Cancel/Delete Order</button>
            </div>`;
    });
}

function deleteOrder(id) {
    if(confirm("Delete this order?")) {
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('FreshMart_Orders', JSON.stringify(orders));
        renderOrders();
    }
}