// 1. Initialize Cart
let cart = [];
const cartCountElement = document.getElementById('cart-count');

// 2. Function to Add to Cart
function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price
    };
    
    // Add item to the array
    cart.push(item);
    
    // Update the UI
    updateCartUI();
    
    // Show Alert (Optional: Can be replaced with a nice Toast notification)
    alert(`${productName} has been added to your cart!`);
}

// 3. Update Cart Count Display
function updateCartUI() {
    cartCountElement.innerText = cart.length;
}

// 4. Adding Event Listeners to Buttons
// Indha logic products.html-la irukura ellaa buttons-kum work aagum
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.card button');

    addButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Card-kulla irukura h3 (Name) and p (Price)-ah fetch pannudhu
            const card = button.parentElement;
            const name = card.querySelector('h3').innerText;
            const price = card.querySelector('p').innerText;
            
            addToCart(name, price);
        });
    });
});