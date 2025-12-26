const snowContainer = document.getElementById('snow');

function createSnowflake() {
  const snowflake = document.createElement('span');
  snowflake.classList.add('snowflake');
  snowflake.innerText = '❄';
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.animationDuration = 2 + Math.random() * 3 + 's';
  snowflake.style.fontSize = 10 + Math.random() * 20 + 'px';
  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 5000);
}

setInterval(createSnowflake, 200);
