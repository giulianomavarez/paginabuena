// ============================================
// FORM STATE MANAGEMENT
// ============================================

const formState = {
  email: '',
  password: '',
  country: '',
  phone: '',
  currentStep: 1
};

// ============================================
// STEP NAVIGATION
// ============================================

function goToStep(step) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(el => {
    el.style.display = 'none';
  });

  // Show selected step
  const stepElement = document.getElementById(`step${step}`);
  if (stepElement) {
    stepElement.style.display = 'block';
    formState.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================

function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('toggleBtn');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.innerHTML = '<i class="ri-eye-line"></i>';
  } else {
    passwordInput.type = 'password';
    toggleBtn.innerHTML = '<i class="ri-eye-off-line"></i>';
  }
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{6,}$/;
  return phoneRegex.test(phone);
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
}

// ============================================
// STEP 2: LOGIN HANDLER
// ============================================

function handleLogin(event) {
  event.preventDefault();
  clearErrors();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = document.getElementById('submitBtn');

  let isValid = true;

  // Validate email
  if (!email) {
    document.getElementById('emailError').textContent = '⚠ El correo es requerido';
    document.getElementById('email').classList.add('error');
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = '⚠ Por favor ingresa un correo válido';
    document.getElementById('email').classList.add('error');
    isValid = false;
  }

  // Validate password
  if (!password) {
    document.getElementById('passwordError').textContent = '⚠ La contraseña es requerida';
    document.getElementById('password').classList.add('error');
    isValid = false;
  } else if (!validatePassword(password)) {
    document.getElementById('passwordError').textContent = '⚠ La contraseña debe tener al menos 6 caracteres';
    document.getElementById('password').classList.add('error');
    isValid = false;
  }

  if (!isValid) return;

  // Store credentials
  formState.email = email;
  formState.password = password;

  // Simulate server request
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    // Save data (mock)
    console.log('Login data:', { email, password });
    
    // Send to server would happen here
    // await sendLoginData(email, password);
    
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    
    // Move to next step
    goToStep(3);
  }, 1500);
}

// ============================================
// STEP 3: PHONE VERIFICATION HANDLER
// ============================================

function handlePhone(event) {
  event.preventDefault();
  clearErrors();

  const country = document.getElementById('country').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const phoneSubmitBtn = document.getElementById('phoneSubmitBtn');

  let isValid = true;

  // Validate country
  if (!country) {
    document.getElementById('phoneError').textContent = '⚠ Debes seleccionar un país';
    isValid = false;
  }

  // Validate phone
  if (!phone) {
    document.getElementById('phoneError').textContent = '⚠ El teléfono es requerido';
    document.getElementById('phone').classList.add('error');
    isValid = false;
  } else if (!validatePhone(phone)) {
    document.getElementById('phoneError').textContent = '⚠ Ingresa un número de teléfono válido';
    document.getElementById('phone').classList.add('error');
    isValid = false;
  }

  if (!isValid) return;

  // Store phone data
  formState.country = country;
  formState.phone = country + phone;

  // Simulate server request
  phoneSubmitBtn.classList.add('loading');
  phoneSubmitBtn.disabled = true;

  setTimeout(() => {
    // Save data (mock)
    console.log('Phone data:', { country, phone });
    
    // Send to server would happen here
    // await sendPhoneData(country + phone);
    
    phoneSubmitBtn.classList.remove('loading');
    phoneSubmitBtn.disabled = false;
    
    // Show success
    goToSuccess();
  }, 1500);
}

// ============================================
// SUCCESS SCREEN
// ============================================

function goToSuccess() {
  document.querySelectorAll('.form-step').forEach(el => {
    el.style.display = 'none';
  });
  
  document.getElementById('success').style.display = 'block';

  // Simulate redirect after 3 seconds
  setTimeout(() => {
    // In real implementation:
    // window.location.href = '/dashboard';
    console.log('Form completed with data:', formState);
    alert('¡Verificación completada! Datos guardados:\n\nEmail: ' + formState.email + '\nTeléfono: ' + formState.phone);
  }, 3000);
}

// ============================================
// AUTO-DETECT COUNTRY ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Auto-detect country from IP (optional)
  const countrySelect = document.getElementById('country');
  
  // Detect country using geolocation API
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      const countryCodeMap = {
        'AR': '+54', 'BO': '+591', 'BR': '+55', 'CL': '+56', 'CO': '+57',
        'CR': '+506', 'CU': '+53', 'DO': '+1', 'EC': '+593', 'SV': '+503',
        'GT': '+502', 'HN': '+504', 'MX': '+52', 'NI': '+505', 'PA': '+507',
        'PY': '+595', 'PE': '+51', 'PR': '+1', 'UY': '+598', 'VE': '+58'
      };
      
      if (data.country_code && countryCodeMap[data.country_code]) {
        countrySelect.value = countryCodeMap[data.country_code];
      }
    })
    .catch(error => console.log('Geolocation not available'));

  // Prevent form submission on Enter in non-form fields
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && this.type !== 'submit') {
        e.preventDefault();
      }
    });
  });

  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function() {
    // Remove non-numeric characters
    this.value = this.value.replace(/[^\d\s\-\+\(\)]/g, '');
  });
});

// ============================================
// ERROR HANDLING & FEEDBACK
// ============================================

window.addEventListener('error', function(event) {
  console.error('Error:', event.error);
  // In production, send to error tracking service
});

// Add smooth transitions for form steps
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .form-step {
      animation: slideUp 0.4s ease-out;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});
