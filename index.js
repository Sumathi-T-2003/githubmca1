document.getElementById("scholarshipForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const income = document.getElementById("income").value;

  let message = "";

  if (income < 200000) {
    message = `✅ ${name}, You are eligible for the scholarship.`;
  } else {
    message = `❌ ${name}, You are not eligible due to high income.`;
  }

  document.getElementById("message").innerText = message;
});
