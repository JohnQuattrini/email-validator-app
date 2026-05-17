const form = document.getElementById('userForm');

/* =========================
   FORM + USER LOGIC
========================= */

if (form) {

  const message = document.getElementById('message');
  const userList = document.getElementById('userList');
  const loadBtn = document.getElementById('loadUsers');

  // -------------------------
  // CREATE USER (POST /users)
  // -------------------------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      message.textContent = 'Please enter a valid email address.';
      return;
    }

    const response = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = 'User registered successfully!';
      form.reset();

      // update UI immediately
      loadUsers();
      loadChart();

    } else {
      message.textContent = 'Error creating user.';
      console.error(data);
    }
  });

  // -------------------------
  // LOAD USERS (GET /users)
  // -------------------------
  async function loadUsers() {
    const response = await fetch('/users');
    const data = await response.json();

    userList.innerHTML = '';

    data.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.email;
      userList.appendChild(li);
    });

    // update chart when users load
    loadChart();
  }

  loadBtn.addEventListener('click', loadUsers);
}


/* =========================
   CHART.JS LOGIC
========================= */

async function loadChart() {

  const response = await fetch('/users');
  const users = await response.json();

  let gmail = 0;
  let yahoo = 0;
  let outlook = 0;
  let other = 0;

  users.forEach(user => {
    const email = user.email.toLowerCase();

    if (email.includes('gmail.com')) gmail++;
    else if (email.includes('yahoo.com')) yahoo++;
    else if (email.includes('outlook.com')) outlook++;
    else other++;
  });

  const ctx = document.getElementById('emailChart');

  // prevent duplicate charts by destroying existing instance
  if (window.emailChartInstance) {
    window.emailChartInstance.destroy();
  }

  window.emailChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Gmail', 'Yahoo', 'Outlook', 'Other'],
      datasets: [{
        label: 'Registered Users',
        data: [gmail, yahoo, outlook, other]
      }]
    }
  });
}


/* =========================
   RANDOM USER API
========================= */

const randomUserButton = document.getElementById('randomUserButton');

if (randomUserButton) {
  randomUserButton.addEventListener('click', async () => {

    const response = await fetch('/random-user');
    const data = await response.json();

    const user = data.results[0];

    document.getElementById('randomUser').innerHTML = `
      <h3>Sample User</h3>
      <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Country:</strong> ${user.location.country}</p>
      <img src="${user.picture.medium}" alt="User Picture">
    `;
  });
}


/* =========================
   TYPED.JS (HOME PAGE ONLY)
========================= */

document.addEventListener('DOMContentLoaded', () => {

  const typedElement = document.getElementById('typed-text');

  if (typedElement && typeof Typed !== 'undefined') {

    new Typed('#typed-text', {
      strings: [
    'Email Validation System.',
    'User Registration Platform.',
    'Data Visualization Dashboard.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

  }

});

document.addEventListener('DOMContentLoaded', () => {
  loadChart();
});