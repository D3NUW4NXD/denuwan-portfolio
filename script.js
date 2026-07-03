(function(){
  const NAME = "DENUWAN";

  const nameTextEl = document.getElementById('loaderNameText');
  const statusEl = document.getElementById('loaderStatus');
  const fillEl = document.getElementById('loaderFill');
  const pctEl = document.getElementById('loaderPct');
  const loaderNameEl = document.getElementById('loaderName');
  const loader = document.getElementById('loader');
  const navEl = document.querySelector('nav');
  const navMark = document.querySelector('nav .mark');

  const statuses = [
    "INITIALIZING SYSTEM...",
    "LOADING ASSETS...",
    "DECRYPTING PROFILE...",
    "COMPILING INTERFACE...",
    "ACCESS GRANTED"
  ];

  let i = 0;

  function typeName(){
    if(i <= NAME.length){
      nameTextEl.textContent = NAME.slice(0, i);
      i++;
      setTimeout(typeName, 90);
    }
  }

  typeName();

  let statusIdx = 0;

  const statusTimer = setInterval(() => {
    statusIdx = (statusIdx + 1) % statuses.length;
    statusEl.innerHTML = '<span class="prompt-c">&gt;</span> ' + statuses[statusIdx];
  }, 480);

  let pct = 0;

  const progTimer = setInterval(() => {
    pct += Math.random() * 14 + 6;

    if(pct >= 100){
      pct = 100;
      clearInterval(progTimer);
      clearInterval(statusTimer);
      statusEl.innerHTML = '<span class="prompt-c">&gt;</span> ACCESS GRANTED';
      setTimeout(finishLoad, 450);
    }

    fillEl.style.width = pct + '%';
    pctEl.textContent = Math.floor(pct) + '%';
  }, 220);

  function finishLoad(){
    navEl.classList.add('mark-visible');
    navMark.style.opacity = '0';

    const nameRect = loaderNameEl.getBoundingClientRect();
    const markRect = navMark.getBoundingClientRect();

    const markFontSize = parseFloat(getComputedStyle(navMark).fontSize);
    const nameFontSize = parseFloat(getComputedStyle(loaderNameEl).fontSize);
    const scale = markFontSize / nameFontSize;

    const dx = markRect.left - nameRect.left;
    const dy = (markRect.top + markRect.height / 2) - (nameRect.top + nameRect.height / 2);

    document.body.classList.add('loader-collapsing');

    requestAnimationFrame(() => {
      loaderNameEl.style.transition = 'transform 0.65s cubic-bezier(.65,0,.35,1)';
      loaderNameEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    });

    setTimeout(() => {
      document.body.classList.add('loader-fade');
      navMark.style.transition = 'opacity 0.25s ease';
      navMark.style.opacity = '1';
    }, 620);

    setTimeout(() => {
      loader.classList.add('loader-hide');
      document.body.classList.remove('no-scroll');
    }, 1150);
  }
})();

const start = Date.now();
const upEl = document.getElementById('uptime');

function pad(n){
  return String(n).padStart(2, '0');
}

setInterval(() => {
  const s = Math.floor((Date.now() - start) / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  upEl.textContent = `${pad(h)}:${pad(m)}:${pad(sec)}`;
}, 1000);

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
    }
  });
}, {
  threshold:0.15
});

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('*').forEach((el) => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

const aiChatToggle = document.getElementById('aiChatToggle');
const aiChatBox = document.getElementById('aiChatBox');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatForm = document.getElementById('aiChatForm');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatMessages = document.getElementById('aiChatMessages');

const aiChatWidget = document.querySelector('.ai-chat-widget');

aiChatToggle.addEventListener('click', () => {
  aiChatBox.classList.toggle('open');
  aiChatWidget.classList.toggle('chat-open', aiChatBox.classList.contains('open'));
});

aiChatClose.addEventListener('click', () => {
  aiChatBox.classList.remove('open');
  aiChatWidget.classList.remove('chat-open');
});

aiChatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userText = aiChatInput.value.trim();

  if(userText === ''){
    return;
  }

  addMessage(userText, 'user');
  aiChatInput.value = '';

  setTimeout(() => {
    const reply = getAssistantReply(userText);
    addMessage(reply, 'bot');
  }, 500);
});

function addMessage(text, sender){
  const message = document.createElement('div');
  message.className = `ai-message ${sender}`;
  message.textContent = text;

  aiChatMessages.appendChild(message);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

function getAssistantReply(message){
  const text = message.toLowerCase();

  if(text.includes('hello') || text.includes('hi') || text.includes('hey')){
    return "Hey, welcome to Denuwan’s portfolio. You can ask me about his skills, education, projects, or contact details.";
  }

  if(text.includes('name') || text.includes('who')){
    return "This portfolio belongs to D.M. Chathura Denuwan, a Software Engineering undergraduate and creative developer from Sri Lanka.";
  }

  if(text.includes('education') || text.includes('study') || text.includes('degree') || text.includes('hnd')){
    return "Denuwan has completed the Pearson BTEC Level 5 HND in Computing and is currently following the BEng (Hons) Software Engineering Top-up.";
  }

  if(text.includes('skill') || text.includes('tech') || text.includes('language')){
    return "His skills include HTML, CSS, JavaScript, C#, .NET, WinForms, SQL Server, OOP, UI/UX design, and creative media production.";
  }

  if(text.includes('project') || text.includes('work')){
    return "His selected projects include SmartMed Pharmacy ERP, GameBalance, Leo Club Website, and this Cyberpunk Portfolio System.";
  }

  if(text.includes('smartmed')){
    return "SmartMed Pharmacy ERP is a C# WinForms and SQL Server based pharmacy management system with OOP, authentication, role management, and database features.";
  }

  if(text.includes('gamebalance')){
    return "GameBalance is a student productivity and balance-focused web app project with dashboard-style features.";
  }

  if(text.includes('leo')){
    return "The Leo Club Website is a modern frontend website project created with HTML, CSS, and JavaScript.";
  }

  if(text.includes('contact') || text.includes('email') || text.includes('hire')){
    return "You can contact Denuwan through the contact section of this portfolio, GitHub, X, or his personal website.";
  }

  if(text.includes('location') || text.includes('country')){
    return "Denuwan is based in Sri Lanka.";
  }

  return "I can help you learn about Denuwan’s education, skills, projects, and contact details. Try asking: What are his skills?";
}