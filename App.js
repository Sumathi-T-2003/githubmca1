import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Components import (Ensure these files exist in your components folder)
import BillingForm from './components/BillingForm';
import BankSelector from './components/BankSelector';
import FileUpload from './components/FileUpload';

// Razorpay Compliance Links
const websiteUrl = "https://elaborate-cannoli-123120.netlify.app";
const termsLink = websiteUrl; 
const privacyLink = websiteUrl;
const refundLink = websiteUrl;

function App() {
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([{ name: '', price: '' }]);
    const [bank, setBank] = useState('');
    const [cardPhoto, setCardPhoto] = useState(null);
    const [scannerPhoto, setScannerPhoto] = useState(null);

    const totalAmount = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const downloadPDF = (paymentId) => {
        const doc = new jsPDF();
        doc.setFillColor(26, 115, 232);
        doc.circle(105, 25, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text("SS", 101, 27);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(22);
        doc.text("SS Grocery Store", 70, 50);
        
        doc.setFontSize(12);
        doc.text(`Customer Name: ${customerName}`, 14, 70);
        doc.text(`Date: ${new Date().toLocaleString()}`, 14, 78);
        doc.text(`Payment ID: ${paymentId || 'N/A'}`, 14, 86);
        doc.text(`Status: PAID (Online)`, 14, 94);

        autoTable(doc, {
            head: [['Item Name', 'Price (INR)']],
            body: items.map(item => [item.name, `Rs. ${item.price}`]),
            startY: 100,
            theme: 'grid',
            headStyles: { fillColor: [26, 115, 232] }
        });

        const finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(14);
        doc.text(`Total Amount: Rs. ${totalAmount}`, 14, finalY + 15);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Computer Generated Bill - SS Grocery Store", 14, finalY + 25);

        doc.save(`SS_Grocery_Bill_${customerName}.pdf`);
    };

    const handlePayment = async () => {
        const options = {
            key: "rzp_live_Rz4I3MbWqEHFIs", // Unga nijamaana LIVE KEY
            amount: totalAmount * 100,
            currency: "INR",
            name: "SS Grocery Mart",
            description: "Grocery Bill Payment",
            image: "logo.png",
            handler: function (response) {
                alert("Payment Successful!");
                downloadPDF(response.razorpay_payment_id);
            },
            prefill: {
                name: customerName,
                email: "customer@ssgrocery.com",
                contact: "9655675545"
            },
            theme: {
                color: "#1a73e8"
            }
        };

        if (window.Razorpay) {
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            alert("Razorpay is loading... Please check your internet.");
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: 'Arial' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', background: '#1a73e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>SS</div>
                <h2 style={{ color: '#1a73e8', marginTop: '10px' }}>SS Grocery Store</h2>
                <p style={{ color: '#666' }}>Owner: Sumathi</p>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold' }}>Customer Name:</label>
                <input 
                    type="text" 
                    placeholder="Enter Customer Name" 
                    style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
            </div>

            <BillingForm items={items} setItems={setItems} />
            <BankSelector setBank={setBank} />
            <FileUpload setCardPhoto={setCardPhoto} setScannerPhoto={setScannerPhoto} />

            <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 15px 0' }}>Total Payable: ₹{totalAmount}</h3>
                <button 
                    onClick={handlePayment}
                    style={{ background: '#27ae60', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', width: '100%' }}
                >
                    PAY & DOWNLOAD BILL
                </button>
            </div>

            {/* --- RAZORPAY COMPLIANCE FOOTER START --- */}
            <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '11px', color: '#888' }}>
                <div style={{ marginBottom: '10px' }}>
                    <a href={termsLink} style={{ margin: '0 5px', color: '#1a73e8', textDecoration: 'none' }}>Terms</a> | 
                    <a href={privacyLink} style={{ margin: '0 5px', color: '#1a73e8', textDecoration: 'none' }}>Privacy</a> | 
                    <a href={refundLink} style={{ margin: '0 5px', color: '#1a73e8', textDecoration: 'none' }}>Refund Policy</a>
                </div>
                <p style={{ margin: '2px 0' }}>SS Grocery Store | Contact: +91 9655675545</p>
                <p style={{ margin: '2px 0' }}>Email: customer@ssgrocery.com</p>
                <p style={{ margin: '2px 0' }}>Address: Thanjavur, Tamil Nadu</p>
            </div>
            {/* --- RAZORPAY COMPLIANCE FOOTER END --- */}
        </div>
    );
}

export default App;