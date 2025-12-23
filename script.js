let count = 0;

function addRow(){
  count++;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${count}</td>
    <td><input></td>
    <td><input></td>
    <td><input type="number" value="1" oninput="calculate()"></td>
    <td><input type="number" oninput="calculate()"></td>
    <td><input type="number" value="0" oninput="calculate()"></td>
    <td class="amount">0.00</td>
    <td><button onclick="removeRow(this)">X</button></td>
  `;
  document.getElementById('items').appendChild(row);
}

function removeRow(btn){
  btn.closest('tr').remove();
  calculate();
}

function calculate(){
  let sub = 0, tax = 0;

  document.querySelectorAll('#items tr').forEach(row=>{
    let qty = +row.children[3].children[0].value || 0;
    let rate = +row.children[4].children[0].value || 0;
    let taxp = +row.children[5].children[0].value || 0;

    let amt = qty * rate;
    let t = amt * taxp / 100;

    row.querySelector('.amount').innerText = (amt + t).toFixed(2);

    sub += amt;
    tax += t;
  });

  let grand = sub + tax;

  document.getElementById('subTotal').innerText = sub.toFixed(2);
  document.getElementById('totalTax').innerText = tax.toFixed(2);
  document.getElementById('grandTotal').innerText = grand.toFixed(2);

  document.getElementById('amountWords').innerText =
    numberToWords(Math.round(grand)) + " Only";
}

function numberToWords(num){
  const a=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
  "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const b=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

  if(num===0) return "Zero";
  if(num<20) return a[num];
  if(num<100) return b[Math.floor(num/10)]+" "+a[num%10];
  if(num<1000) return a[Math.floor(num/100)]+" Hundred "+numberToWords(num%100);
  if(num<100000) return numberToWords(Math.floor(num/1000))+" Thousand "+numberToWords(num%1000);
  if(num<10000000) return numberToWords(Math.floor(num/100000))+" Lakh "+numberToWords(num%100000);
  return numberToWords(Math.floor(num/10000000))+" Crore "+numberToWords(num%10000000);
}

addRow();
