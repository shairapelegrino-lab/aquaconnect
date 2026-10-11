window.AQ = window.AQ || {};

(function () {
  var U = AQ.util;
  var C = AQ.components;

  var state = {
    auth: false,
    authRoute: 'welcome',
    tab: 'home',
    stack: [],
    alertsFilter: 'all',
    alertsRead: false,
    selectedArea: null,
    availabilitySearch: '',
    usageRange: 'monthly',
    sheet: null,
    form: {
      login: { identifier: '', password: '' },
      signup: { name: '', email: '', password: '' }
    },
    passwordVisible: false,
    loginError: '',
    loginBusy: false,
    signupError: '',
    signupBusy: false,
    report: { type: null, location: '', details: '', photos: [], submitted: false, ref: '' },
    reportBusy: false,
    notifPrefs: { interruptions: true, reminders: true, maintenance: true },
    language: 'English',
    focusSelector: null
  };
  AQ.state = state;

  var TAB_SCREENS = { home: 'home', alerts: 'alerts', bill: 'bill', more: 'profile' };

  function currentScreen() {
    if (state.stack.length) return state.stack[state.stack.length - 1];
    if (!state.auth) return state.authRoute;
    return TAB_SCREENS[state.tab];
  }

  var lastCur = null;

  function render() {
    var app = document.getElementById('app');
    var cur = currentScreen();
    var animCls = cur === lastCur ? ' no-anim' : '';
    lastCur = cur;
    var showNav = state.auth && state.stack.length === 0;
    app.innerHTML =
      '<div class="phone' + (cur === 'welcome' ? ' sky' : '') + '">' +
      '<div class="island" aria-hidden="true"></div>' +
      C.statusBar(cur === 'welcome' ? 'sky' : 'white') +
      '<div class="viewport">' +
      '<main class="screen' + animCls + '" id="screenHost">' + (AQ.screens[cur] ? AQ.screens[cur]() : '<p class="empty-note">Screen not found.</p>') + '</main>' +
      (showNav ? C.bottomNav(state.tab, { unread: !state.alertsRead }) : '') +
      '</div>' +
      (state.sheet ? C.overlay(state.sheet) : '') +
      '<div class="toast-wrap" id="toastWrap"></div>' +
      '</div>' +
      '<p class="desk-caption"><b>AquaConnect</b> &middot; Know. Plan. Report. &middot; Butuan City</p>';
    if (state.focusSelector) {
      var el = document.querySelector(state.focusSelector);
      if (el) el.focus();
      state.focusSelector = null;
    }
  }

  function showToast(msg, icon) {
    var wrap = document.getElementById('toastWrap');
    if (!wrap) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = (icon && AQ.icons[icon] ? '<span class="t-ico">' + AQ.icons[icon](16) + '</span>' : '') + '<span>' + U.esc(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(function () {
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 280);
    }, 2300);
  }

  function setPath(path, value) {
    var parts = path.split('.');
    var obj = state;
    for (var i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
    obj[parts[parts.length - 1]] = value;
  }

  function finishLogin(message) {
    state.auth = true;
    state.loginBusy = false;
    state.signupBusy = false;
    state.loginError = '';
    state.signupError = '';
    state.tab = 'home';
    state.stack = [];
    render();
    showToast(message || 'Welcome back, Juan!', 'check');
  }

  function doLogin() {
    var f = state.form.login;
    if (!f.identifier.trim() || !f.password.trim()) {
      state.loginError = 'Please enter your email or mobile number and password.';
      render();
      return;
    }
    state.loginError = '';
    state.loginBusy = true;
    render();
    setTimeout(function () { finishLogin('Logged in successfully.'); }, 900);
  }

  function doSignup() {
    var f = state.form.signup;
    if (!f.name.trim() || !f.email.trim() || !f.password.trim()) {
      state.signupError = 'Please fill in your name, email, and password.';
      render();
      return;
    }
    if (f.password.trim().length < 6) {
      state.signupError = 'Password must be at least 6 characters.';
      render();
      return;
    }
    state.signupError = '';
    state.signupBusy = true;
    render();
    setTimeout(function () { finishLogin('Account created. Welcome to AquaConnect!'); }, 1000);
  }

  function switchTab(tab) {
    state.tab = tab;
    state.stack = [];
    if (tab === 'alerts') state.alertsRead = true;
    render();
  }

  function push(screen) {
    state.stack.push(screen);
    render();
  }

  function back() {
    if (state.stack.length) {
      state.stack.pop();
      render();
    }
  }

  function logout() {
    state.auth = false;
    state.authRoute = 'welcome';
    state.tab = 'home';
    state.stack = [];
    state.sheet = null;
    state.form.login = { identifier: '', password: '' };
    state.alertsRead = false;
    state.selectedArea = null;
    render();
    showToast('You have been logged out.');
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
    ta.remove();
  }

  function addPhotos(input) {
    var files = Array.prototype.slice.call(input.files || []);
    files.forEach(function (file) {
      if (state.report.photos.length >= 3) return;
      state.report.photos.push(file.name);
    });
    if (files.length + state.report.photos.length > 3 || state.report.photos.length >= 3) {
      showToast('Up to 3 photos per report.');
    }
    AQ.refreshPhotoChips();
  }

  function submitReport() {
    if (!state.report.type) { showToast('Please choose the kind of issue.', 'warning'); return; }
    if (!state.report.location) { showToast('Please select your location.', 'warning'); return; }
    state.reportBusy = true;
    render();
    setTimeout(function () {
      state.reportBusy = false;
      state.report.submitted = true;
      state.report.ref = U.refNumber('BCWD-RPT');
      render();
    }, 900);
  }

  function handleAction(action, el, e) {
    switch (action) {
      case 'go-login':
        state.authRoute = 'login';
        state.loginError = '';
        render();
        break;
      case 'go-signup':
        state.authRoute = 'signup';
        state.signupError = '';
        render();
        break;
      case 'toggle-password':
        state.passwordVisible = !state.passwordVisible;
        state.focusSelector = '[name=password]';
        render();
        break;
      case 'login':
        doLogin();
        break;
      case 'login-google':
        state.loginBusy = true;
        render();
        setTimeout(function () { finishLogin('Signed in with Google.'); }, 700);
        break;
      case 'signup':
        doSignup();
        break;
      case 'forgot':
        showToast('Password reset link sent to your registered email.', 'mail');
        break;
      case 'tab':
        switchTab(el.getAttribute('data-tab'));
        break;
      case 'go-bill':
        switchTab('bill');
        break;
      case 'go-availability':
        push('availability');
        break;
      case 'go-usage':
        push('usage');
        break;
      case 'go-report':
        push('report');
        break;
      case 'back':
        back();
        break;
      case 'select-area': {
        var area = el.getAttribute('data-area');
        state.selectedArea = state.selectedArea === area ? null : area;
        render();
        break;
      }
      case 'reset-area':
        state.selectedArea = null;
        render();
        break;
      case 'alerts-filter':
        state.alertsFilter = el.getAttribute('data-filter');
        render();
        break;
      case 'copy-acct':
        copyText(AQ.DATA.user.accountNo);
        showToast('Account number copied to clipboard.', 'copy');
        break;
      case 'bill-pdf':
        U.downloadText('AquaConnect-Bill-July-2026.pdf', U.billPdf(), 'application/pdf');
        showToast('Bill PDF downloaded.', 'download');
        break;
      case 'receipt-pdf':
        U.downloadText('AquaConnect-Receipt-July-2026.pdf', U.receiptPdf(), 'application/pdf');
        showToast('Receipt downloaded.', 'download');
        break;
      case 'bill-pay':
        state.sheet = 'receipt';
        render();
        break;
      case 'bill-details':
        push('billDetails');
        break;
      case 'issue-type':
        state.report.type = el.getAttribute('data-type');
        render();
        break;
      case 'add-photos':
        var input = document.getElementById('photoInput');
        if (input) input.click();
        break;
      case 'remove-photo':
        state.report.photos.splice(Number(el.getAttribute('data-idx')), 1);
        AQ.refreshPhotoChips();
        break;
      case 'submit-report':
        submitReport();
        break;
      case 'back-home':
        state.report = { type: null, location: '', details: '', photos: [], submitted: false, ref: '' };
        state.stack = [];
        switchTab('home');
        showToast('Thank you for helping improve the service.', 'check');
        break;
      case 'usage-range':
        state.usageRange = el.getAttribute('data-range');
        render();
        break;
      case 'open-sheet':
        state.sheet = el.getAttribute('data-sheet');
        render();
        break;
      case 'close-sheet':
        state.sheet = null;
        render();
        break;
      case 'overlay-tap':
        if (e.target.closest('.sheet')) return;
        state.sheet = null;
        render();
        break;
      case 'toggle-notif':
        var key = el.getAttribute('data-key');
        state.notifPrefs[key] = !state.notifPrefs[key];
        render();
        break;
      case 'set-language':
        state.language = el.getAttribute('data-lang');
        render();
        showToast('Language set to ' + state.language + '.');
        break;
      case 'help-call':
        copyText(AQ.DATA.help.hotline);
        showToast('Hotline ' + AQ.DATA.help.hotline + ' copied to clipboard.', 'phone');
        break;
      case 'help-email':
        copyText(AQ.DATA.help.email);
        showToast('Support email copied to clipboard.', 'mail');
        break;
      case 'help-chat':
        showToast('Connecting you to a live agent\u2026 (demo).', 'chat');
        break;
      case 'do-logout':
        logout();
        break;
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    handleAction(el.getAttribute('data-action'), el, e);
  });

  document.addEventListener('input', function (e) {
    var el = e.target;
    var model = el.getAttribute('data-model');
    if (model) { setPath(model, el.value); return; }
    if (el.getAttribute('data-live') === 'availabilitySearch') {
      state.availabilitySearch = el.value;
      AQ.refreshAreaList();
    }
  });

  document.addEventListener('change', function (e) {
    var el = e.target;
    var model = el.getAttribute('data-model');
    if (model) setPath(model, el.value);
    if (el.id === 'photoInput') addPhotos(el);
  });

  function boot() {
    var m = /[?&]screen=([a-z-]+)/.exec(location.search);
    if (m && (m[1] === 'login' || m[1] === 'signup' || m[1] === 'welcome')) {
      state.authRoute = m[1];
    }
    render();
  }

  AQ.render = render;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
