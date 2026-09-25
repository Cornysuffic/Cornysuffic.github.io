(function () {
  const form = document.getElementById('booking-form');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('submit-btn');
 
  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // stop the default redirect-to-FormSubmit page

        // Bail out quietly if the honeypot was filled in (bot)
    if (form._honey.value) return;
 
    status.textContent = '';
    status.className = 'form-status';
    btn.disabled = true;
    btn.textContent = 'Sending…';
 
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
 
      if (res.ok) {
        form.reset();
        status.textContent = "Thanks — I'll get back to you soon.";
        status.classList.add('ok');
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong sending that. Please email contact@scottishtutors.co.uk directly.';
      status.classList.add('error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send enquiry';
    }
  });
})();