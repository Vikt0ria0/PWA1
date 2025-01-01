// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}

// DOM Elements
const passwordForm = document.getElementById('passwordForm');
const passwordList = document.getElementById('passwordList');
const generatePasswordBtn = document.getElementById('generatePassword');
const passwordInput = document.getElementById('password');

// Generate random password
function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

generatePasswordBtn.addEventListener('click', () => {
  passwordInput.value = generatePassword();
});

// Save password to Local Storage
function savePassword(service, login, password) {
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwords.push({ service, login, password });
  localStorage.setItem('passwords', JSON.stringify(passwords));
  displayPasswords();
}

// Display saved passwords
function displayPasswords() {
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwordList.innerHTML = '';
  passwords.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${entry.service} | ${entry.login} | ${entry.password}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deletePassword(index));
    li.appendChild(deleteBtn);
    passwordList.appendChild(li);
  });
}

// Delete password
function deletePassword(index) {
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwords.splice(index, 1);
  localStorage.setItem('passwords', JSON.stringify(passwords));
  displayPasswords();
}

// Handle form submission
passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const service = e.target.service.value;
  const login = e.target.login.value;
  const password = e.target.password.value;
  savePassword(service, login, password);
  passwordForm.reset();
});

// Initialize
displayPasswords();
