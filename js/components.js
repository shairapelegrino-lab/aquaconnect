window.AQ = window.AQ || {};

(function () {
  var U = AQ.util;
  var I = AQ.icons;

  function statusBar(mode) {
    var cls = mode === 'sky' ? '' : ' sb-white';
    return '<div class="statusbar' + cls + '"><span class="sb-time">9:41</span>' + I.statusRight() + '</div>';
  }

  function bottomNav(active, opts) {
    opts = opts || {};
    var items = [
      { id: 'home', label: 'Home', icon: 'home', tab: 'home' },
      { id: 'alerts', label: 'Alerts', icon: 'bell', tab: 'alerts', badge: opts.unread },
      { id: 'bill', label: 'Bill', icon: 'receipt', tab: 'bill' },
      { id: 'more', label: 'More', icon: 'dots', tab: 'more' }
    ];
    var html = '<nav class="bottom-nav">';
    items.forEach(function (it) {
      html += '<button class="nav-item' + (active === it.id ? ' active' : '') + '" data-action="tab" data-tab="' + it.tab + '" aria-label="' + it.label + '">' +
        '<span class="nav-ico">' + I[it.icon](22) + (it.badge ? '<span class="nav-badge"></span>' : '') + '</span>' +
        it.label +
        '</button>';
    });
    return html + '</nav>';
  }

  function topBar(title, back) {
    return '<header class="topbar">' +
      '<span class="tb-left">' + (back ? '<button class="icon-btn" data-action="back" aria-label="Back">' + I.arrowLeft(22) + '</button>' : '') + '</span>' +
      '<h2>' + U.esc(title) + '</h2>' +
      '<span class="tb-right"></span>' +
      '</header>';
  }

  function overlay(type) {
    return '<div class="overlay" data-action="overlay-tap"><div class="sheet">' + sheetContent(type) + '</div></div>';
  }

  function sheetContent(type) {
    var S = AQ.state;
    var D = AQ.DATA;
    switch (type) {
      case 'account':
        return '<div class="grab"></div><h3>Account Information</h3>' +
          kv('Account No.', D.user.accountNo) +
          kv('Account Name', D.user.name) +
          kv('Meter No.', D.user.meterNo) +
          kv('Service Type', D.user.serviceType) +
          kv('Connection Status', D.user.status) +
          kv('Area', 'Barangay ' + D.user.area) +
          actions('<button class="btn btn-outline" data-action="close-sheet">Close</button>');

      case 'address':
        return '<div class="grab"></div><h3>Billing Address</h3>' +
          '<p class="sheet-note">This address is used for billing statements and service notices.</p>' +
          kv('Service Address', D.user.address) +
          kv('Area', 'Barangay ' + D.user.area) +
          kv('City', 'Butuan City') +
          actions('<button class="btn btn-outline" data-action="close-sheet">Close</button>');

      case 'notifications':
        return '<div class="grab"></div><h3>Notifications</h3>' +
          '<p class="sheet-note">Choose which alerts you want to receive.</p>' +
          switchRow('Service interruptions', 'interruptions') +
          switchRow('Bill reminders', 'reminders') +
          switchRow('Maintenance schedules', 'maintenance') +
          actions('<button class="btn btn-outline" data-action="close-sheet">Done</button>');

      case 'language':
        return '<div class="grab"></div><h3>Language</h3>' +
          ['English', 'Filipino', 'Cebuano'].map(function (l) {
            return '<button class="lang-row' + (S.language === l ? ' active' : '') + '" data-action="set-language" data-lang="' + l + '">' + l + '<span class="radio"></span></button>';
          }).join('') +
          actions('<button class="btn btn-outline" data-action="close-sheet">Close</button>');

      case 'help':
        return '<div class="grab"></div><h3>Help &amp; Support</h3>' +
          '<p class="sheet-note">We are available 24/7 for outages and billing concerns.</p>' +
          '<button class="help-link" data-action="help-call"><span class="l-ico">' + I.phone(21) + '</span>Call hotline &mdash; ' + D.help.hotline + '</button>' +
          '<button class="help-link" data-action="help-email"><span class="l-ico">' + I.mail(21) + '</span>' + D.help.email + '</button>' +
          '<button class="help-link" data-action="help-chat"><span class="l-ico">' + I.chat(21) + '</span>Chat with a live agent</button>' +
          actions('<button class="btn btn-outline" data-action="close-sheet">Close</button>');

      case 'logout':
        return '<div class="grab"></div><h3>Log Out</h3>' +
          '<p class="sheet-note">You will need to sign in again to check your bill and reports.</p>' +
          '<div class="sheet-actions row2">' +
          '<button class="btn btn-outline" data-action="close-sheet">Cancel</button>' +
          '<button class="btn btn-danger" data-action="do-logout">Log Out</button>' +
          '</div>';

      case 'receipt':
        return '<div class="grab"></div><h3>Payment Receipt</h3>' +
          '<div class="receipt-badge"><span class="rb-circle">' + I.check(34) + '</span>' +
          '<p class="rb-amount">' + U.peso(D.bill.amount) + '</p><p class="rb-status">Payment Received</p></div>' +
          kv('Paid On', D.bill.paidDate) +
          kv('Payment Method', D.bill.method) +
          kv('Reference No.', D.bill.reference) +
          kv('Billing Period', D.bill.period) +
          kv('Account No.', D.user.accountNo) +
          actions('<button class="btn btn-primary" data-action="receipt-pdf">' + I.download(19) + ' Download Receipt</button>' +
            '<button class="btn btn-outline" data-action="close-sheet">Close</button>');

      default:
        return '<div class="grab"></div><h3>Menu</h3>' + actions('<button class="btn btn-outline" data-action="close-sheet">Close</button>');
    }
  }

  function kv(k, v) {
    return '<div class="kv"><span class="k">' + U.esc(k) + '</span><span class="v">' + U.esc(v) + '</span></div>';
  }

  function switchRow(label, key) {
    var on = AQ.state.notifPrefs[key];
    return '<button class="switch-row" data-action="toggle-notif" data-key="' + key + '">' + U.esc(label) +
      '<span class="switch' + (on ? ' on' : '') + '"></span></button>';
  }

  function actions(inner) {
    return '<div class="sheet-actions">' + inner + '</div>';
  }

  AQ.components = { statusBar: statusBar, bottomNav: bottomNav, topBar: topBar, overlay: overlay };
})();
