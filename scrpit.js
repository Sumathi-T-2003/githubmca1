// Function to handle form submission via Blockchain
document.addEventListener("DOMContentLoaded", function() {
    const invoiceForm = document.querySelector('form');
    
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', function() {
            // Button click aanathum 'Processing...' nu kaatta
            const submitBtn = document.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerText = "Uploading to Blockchain...";
                submitBtn.disabled = true;
            }
        });
    }
});

// Optional: Console-la check panna
console.log("Blockchain GST System - Script Loaded Successfully!");