/**
 * دليلك للتعلم - Learn Guide
 * Main JavaScript File
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');

// ============================================
// Loading Screen - Disabled
// ============================================
// Loading screen removed as requested

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// ============================================
// Mobile Navigation
// ============================================
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks?.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('active');
  });
});

// ============================================
// Dark Mode
// ============================================
function initDarkMode() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    updateThemeIcon(false);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon(true);
  }
}

function updateThemeIcon(isDark) {
  if (themeToggle) {
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
  }
}

themeToggle?.addEventListener('click', toggleDarkMode);

// ============================================
// Scroll to Top Button
// ============================================
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// Active Navigation Highlight
// ============================================
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// Search Functionality
// ============================================
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  
  if (!searchInput) return;
  
  const articles = [
    { title: 'أساسيات البرمجة', url: 'lessons.html#programming', category: 'دروس' },
    { title: 'كيف تفهم أي درس بسرعة', url: 'lessons.html#understand', category: 'دروس' },
    { title: 'تعلم البرمجة', url: 'skills.html#programming', category: 'مهارات' },
    { title: 'مهارات التفكير', url: 'skills.html#thinking', category: 'مهارات' },
    { title: 'التعلم الذاتي', url: 'skills.html#self-learning', category: 'مهارات' },
    { title: 'طرق الدراسة الفعالة', url: 'tips.html#study-methods', category: 'نصائح' },
    { title: 'إدارة الوقت', url: 'tips.html#time-management', category: 'نصائح' },
    { title: 'تجنب المماطلة', url: 'tips.html#procrastination', category: 'نصائح' }
  ];
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      if (searchResults) searchResults.innerHTML = '';
      return;
    }
    
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
    
    if (searchResults) {
      if (filtered.length > 0) {
        searchResults.innerHTML = filtered.map(article => `
          <a href="${article.url}" class="search-result-item">
            <span class="search-result-title">${article.title}</span>
            <span class="search-result-category">${article.category}</span>
          </a>
        `).join('');
      } else {
        searchResults.innerHTML = '<div class="search-no-results">لا توجد نتائج</div>';
      }
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && searchResults) {
      searchResults.innerHTML = '';
    }
  });
}

// ============================================
// Like Button Functionality
// ============================================
function initLikeButtons() {
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('liked');
      const count = this.querySelector('.like-count');
      if (count) {
        let currentCount = parseInt(count.textContent) || 0;
        if (this.classList.contains('liked')) {
          count.textContent = currentCount + 1;
        } else {
          count.textContent = Math.max(0, currentCount - 1);
        }
      }
    });
  });
}

// ============================================
// Skills Animation
// ============================================
function initSkillsAnimation() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 200);
        skillsObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillsObserver.observe(bar));
}

// ============================================
// Tool Modals
// ============================================
function openToolModal(toolId) {
  const modal = document.getElementById(toolId + 'Modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeToolModal(toolId) {
  const modal = document.getElementById(toolId + 'Modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ============================================
// Calculator Tool
// ============================================
let calcExpression = '';
let calcDisplay = document.getElementById('calcDisplay');

function calcInput(value) {
  if (!calcDisplay) return;
  
  if (value === 'C') {
    calcExpression = '';
    calcDisplay.textContent = '0';
  } else if (value === '=') {
    try {
      calcExpression = eval(calcExpression).toString();
      calcDisplay.textContent = calcExpression;
    } catch {
      calcDisplay.textContent = 'خطأ';
      calcExpression = '';
    }
  } else {
    calcExpression += value;
    calcDisplay.textContent = calcExpression;
  }
}

// ============================================
// Timer Tool
// ============================================
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

function updateTimerDisplay() {
  const display = document.getElementById('timerDisplay');
  if (!display) return;
  
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;
  
  display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (timerRunning) return;
  
  timerRunning = true;
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

function setTimerPreset(minutes) {
  pauseTimer();
  timerSeconds = minutes * 60;
  updateTimerDisplay();
}

// ============================================
// Todo List Tool
// ============================================
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function renderTodos() {
  const list = document.getElementById('todoList');
  if (!list) return;
  
  if (todos.length === 0) {
    list.innerHTML = '<p class="empty-todos">لا توجد مهام. أضف مهمة جديدة!</p>';
    return;
  }
  
  list.innerHTML = todos.map((todo, index) => `
    <div class="todo-item">
      <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${index})">
        ${todo.completed ? '✓' : ''}
      </div>
      <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button class="todo-delete" onclick="deleteTodo(${index})">🗑</button>
    </div>
  `).join('');
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input?.value.trim();
  
  if (!text) return;
  
  todos.push({ text, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
  
  if (input) input.value = '';
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Allow Enter key to add todo
document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  todoInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
});

// ============================================
// Notes Tool
// ============================================
function saveNotes() {
  const textarea = document.getElementById('notesTextarea');
  if (!textarea) return;
  
  localStorage.setItem('notes', textarea.value);
  showNotification('تم حفظ الملاحظات بنجاح!');
}

function clearNotes() {
  const textarea = document.getElementById('notesTextarea');
  if (!textarea) return;
  
  if (confirm('هل أنت متأكد من حذف جميع الملاحظات؟')) {
    textarea.value = '';
    localStorage.removeItem('notes');
  }
}

function loadNotes() {
  const textarea = document.getElementById('notesTextarea');
  if (!textarea) return;
  
  textarea.value = localStorage.getItem('notes') || '';
}

// ============================================
// Quiz Tool
// ============================================
const quizQuestions = [
  {
    question: 'ما هي لغة البرمجة المستخدمة لإضافة التفاعل للمواقع؟',
    options: ['HTML', 'CSS', 'JavaScript', 'Python'],
    correct: 2
  },
  {
    question: 'ما هو أفضل وقت للدراسة بتركيز عالٍ؟',
    options: ['بعد الاستيقاظ مباشرة', 'قبل النوم', 'بعد تناول وجبة ثقيلة', 'في منتصف الليل'],
    correct: 0
  },
  {
    question: 'كم دقيقة يستغرق الدماغ للاستراحة بعد كل فترة دراسة؟',
    options: ['5 دقائق', '10 دقائق', '25 دقيقة', 'ساعة'],
    correct: 0
  },
  {
    question: 'ما هي تقنية (Pomodoro)؟',
    options: ['لغة برمجة', 'طريقة إدارة وقت', 'أداة تصميم', 'نوع من القهوة'],
    correct: 1
  },
  {
    question: 'أي من التالي يعتبر لغة ترميز وليس لغة برمجة؟',
    options: ['Python', 'Java', 'HTML', 'C++'],
    correct: 2
  }
];

let currentQuestion = 0;
let quizScore = 0;

function loadQuizQuestion() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  
  if (currentQuestion >= quizQuestions.length) {
    container.innerHTML = `
      <div class="quiz-score">نتيجتك: ${quizScore} من ${quizQuestions.length}</div>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
        ${quizScore === quizQuestions.length ? 'ممتاز! أحسنت!' : quizScore >= 3 ? 'جيد! يمكنك التحسن أكثر.' : 'حاول مرة أخرى!'}
      </p>
      <button class="btn btn-primary" onclick="restartQuiz()">إعادة المحاولة</button>
    `;
    return;
  }
  
  const q = quizQuestions[currentQuestion];
  container.innerHTML = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectAnswer(${i})">${opt}</div>
      `).join('')}
    </div>
    <div style="margin-top: 1.5rem; color: var(--text-secondary);">
      سؤال ${currentQuestion + 1} من ${quizQuestions.length}
    </div>
  `;
}

function selectAnswer(index) {
  const options = document.querySelectorAll('.quiz-option');
  const correct = quizQuestions[currentQuestion].correct;
  
  options.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === correct) {
      opt.classList.add('correct');
    } else if (i === index && i !== correct) {
      opt.classList.add('wrong');
    }
  });
  
  if (index === correct) {
    quizScore++;
  }
  
  setTimeout(() => {
    currentQuestion++;
    loadQuizQuestion();
  }, 1500);
}

function restartQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  loadQuizQuestion();
}

// ============================================
// Focus Mode Tool
// ============================================
let focusInterval = null;
let focusSeconds = 25 * 60;
let focusRunning = false;

function updateFocusDisplay() {
  const display = document.getElementById('focusTimer');
  if (!display) return;
  
  const minutes = Math.floor(focusSeconds / 60);
  const seconds = focusSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleFocus() {
  const btn = document.getElementById('focusBtn');
  
  if (focusRunning) {
    clearInterval(focusInterval);
    focusRunning = false;
    if (btn) btn.textContent = 'بدء التركيز';
  } else {
    focusRunning = true;
    if (btn) btn.textContent = 'إيقاف';
    focusInterval = setInterval(() => {
      if (focusSeconds > 0) {
        focusSeconds--;
        updateFocusDisplay();
      } else {
        clearInterval(focusInterval);
        focusRunning = false;
        if (btn) btn.textContent = 'بدء التركيز';
        showNotification('انتهى وقت التركيز! خذ استراحة قصيرة.');
        focusSeconds = 25 * 60;
        updateFocusDisplay();
      }
    }, 1000);
  }
}

// ============================================
// Login Form - Google Sheets Integration
// ============================================
function initLoginForm() {
  const form = document.getElementById('loginForm');
  const successMessage = document.getElementById('successMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const course = document.getElementById('course')?.value;
    const message = document.getElementById('message')?.value.trim();

    // Clear errors
    clearFieldError('name');
    clearFieldError('email');
    clearFieldError('phone');
    clearFieldError('course');

    let hasError = false;

    if (!name) {
      showFieldError('name', 'الرجاء إدخال الاسم');
      hasError = true;
    }

    if (!email || !isValidEmail(email)) {
      showFieldError('email', 'الرجاء إدخال بريد إلكتروني صحيح');
      hasError = true;
    }

    if (!phone) {
      showFieldError('phone', 'الرجاء إدخال رقم الهاتف');
      hasError = true;
    }

    if (!course) {
      showFieldError('course', 'الرجاء اختيار الكورس');
      hasError = true;
    }

    if (hasError) return;

    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'جاري الإرسال...';
    }

    // 🔥 مهم جدًا: أسماء الحقول مطابقة للـ Apps Script
    const formData = new FormData();
    formData.append('fullName', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('course', course);
    formData.append('message', message || '');

    fetch('https://script.google.com/macros/s/AKfycbzjlWeWU4O5TZh4gMgMwKyoTIBOyTX-9uvVQRwRzD076idilzaDBhbrYmM5IS71b0X0mA/exec', {
      method: 'POST',
      body: formData
    })
    .then(() => {
      form.style.display = 'none';
      if (successMessage) successMessage.classList.add('show');
      showNotification('تم الإرسال بنجاح! 🎉', 'success');
    })
    .catch(() => {
      showNotification('حدث خطأ أثناء الإرسال', 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'إرسال';
      }
    });
  });
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.style.borderColor = 'var(--error)';
  if (error) {
    error.textContent = message;
    error.classList.add('show');
  }
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.style.borderColor = '';
  if (error) error.classList.remove('show');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
    color: white;
    padding: 1rem 2rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    z-index: 3000;
    animation: slideDown 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  highlightActiveNav();
  initScrollReveal();
  initSearch();
  initLikeButtons();
  initSkillsAnimation();
  initLoginForm();
  loadNotes();
  renderTodos();
  loadQuizQuestion();
  updateTimerDisplay();
  updateFocusDisplay();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  }
`;
document.head.appendChild(style);
