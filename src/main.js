import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const phoneInputGroup = form.querySelector('.input-group:has(#whatsapp)');
  const whatsappInput = document.getElementById('whatsapp');
  
  const landingScreen = document.getElementById('landing-screen');
  const magicScreen = document.getElementById('magic-screen');

  // Input formatter to strip non-numeric
  whatsappInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    // Remove invalid styling if user starts fixing it
    if (phoneInputGroup.classList.contains('invalid')) {
      phoneInputGroup.classList.remove('invalid');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dob = document.getElementById('dob').value;
    const phone = whatsappInput.value;

    // Validate 10-digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      phoneInputGroup.classList.add('invalid');
      return;
    }

    // Trigger Analytics Tracking (via stubs in index.html)
    if (window.trackLead) {
      window.trackLead();
    }

    // Begin the magic transition
    // 1. Fade out main form
    landingScreen.classList.add('fade-out');
    
    setTimeout(() => {
      // 2. Show the authenticating spinner State
      magicScreen.classList.remove('hidden');
      
      // 3. Keep for exactly 3 seconds to build anticipation
      setTimeout(() => {
        // Redirect to Ganges site, appending dummy discount
        window.location.href = "https://www.ganges.world/?promo=DIASPORA25";
      }, 3000);
      
    }, 500); // 0.5s for fade out

  });
});
