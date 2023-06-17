async function sendEmailInput() {
  const emailInput = document.querySelector('input[name="emailInput"]').value;
  await chrome.runtime.sendMessage({ action: 'emailInput', input: emailInput });
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#email-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    sendEmailInput();
  });
});
