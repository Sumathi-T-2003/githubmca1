from flask import Flask, render_template, request
from web3 import Web3
import json

app = Flask(__name__)

# 1. Connection (Ganache port 7545)
ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

# 2. Smart Contract Address
contract_address = "0x975469A56BB1216F4ec46E986B054B4a28A6F8B5"

# 3. ABI Definition
abi = json.loads('''
[
    {"inputs": [{"internalType": "string", "name": "_num", "type": "string"},{"internalType": "string", "name": "_vendor", "type": "string"},{"internalType": "uint256", "name": "_amt", "type": "uint256"},{"internalType": "uint256", "name": "_tax", "type": "uint256"}],"name": "createInvoice","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [{"internalType": "string", "name": "_num", "type": "string"}],"name": "getInvoice","outputs": [{"internalType": "string", "name": "invoiceNumber", "type": "string"},{"internalType": "string", "name": "vendorName", "type": "string"},{"internalType": "uint256", "name": "amount", "type": "uint256"},{"internalType": "bool", "name": "exists", "type": "bool"}],"stateMutability": "view","type": "function"}
]
''')

contract = web3.eth.contract(address=contract_address, abi=abi)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add_invoice', methods=['POST'])
def add_invoice():
    try:
        num = request.form['inv_num'].upper()
        vendor = request.form['vendor']
        # Box-la type pannaalum, dropdown-la select pannaalum indha 'amount' variable-ku value vandhurum
        amt = int(request.form['amount'])
        
        # 18% GST Calculation
        gst_amt = int(amt * 0.18)
        total_amt = amt + gst_amt
        
        tx_hash = contract.functions.createInvoice(num, vendor, total_amt, gst_amt).transact({
            'from': web3.eth.accounts[0]
        })
        
        return render_template('index.html', result=f"✅ Success! Base: ₹{amt} | GST(18%): ₹{gst_amt} | Total: ₹{total_amt}")
    except Exception as e:
        return render_template('index.html', result=f"❌ Error: {str(e)}")

@app.route('/verify_invoice', methods=['POST'])
def verify_invoice():
    try:
        num = request.form['inv_num'].upper()
        data = contract.functions.getInvoice(num).call()
        if data[3] == True:
            return render_template('index.html', result=f"🛡️ Verified! Vendor: {data[1]} | Total (with GST): ₹{data[2]}")
        else:
            return render_template('index.html', result="⚠️ Invoice not found!")
    except Exception as e:
        return render_template('index.html', result=f"❌ Error: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)