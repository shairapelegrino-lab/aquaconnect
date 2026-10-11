window.AQ = window.AQ || {};

(function () {
  var U = AQ.util;
  var I = AQ.icons;
  var C = AQ.components;

  function bill() {
    var D = AQ.DATA;
    var B = D.bill;
    return '<div class="screen">' +
      C.topBar('My Bill') +
      '<div class="screen-pad">' +
      '<div class="card bill-card">' +
      '<div class="row-between">' +
      '<div><p class="label">Account No.</p><p class="value-strong">' + U.esc(D.user.accountNo) + '</p></div>' +
      '<button class="icon-btn" data-action="copy-acct" aria-label="Copy account number">' + I.copy(19) + '</button>' +
      '</div>' +
      '<hr>' +
      '<p class="label">Billing Period</p><p class="value-strong">' + U.esc(B.period) + '</p>' +
      '<hr>' +
      '<p class="label">Total Amount Due</p>' +
      '<div class="row-between mt4"><span class="amount">' + U.peso(B.amount) + '</span>' +
      '<span class="pill pill-green">' + I.check(14) + B.status + '</span></div>' +
      '<p class="muted small due">Due Date: ' + U.esc(B.dueDate) + '</p>' +
      '</div>' +
      '<div class="btn-stack">' +
      '<button class="btn btn-primary" data-action="bill-details">View Bill Details</button>' +
      '<button class="btn btn-outline" data-action="bill-pdf">' + I.download(19) + ' Download PDF</button>' +
      '<button class="btn btn-outline" data-action="bill-pay">' + I.card(19) + ' Pay Now</button>' +
      '</div>' +
      '<p class="watermark">Statements are issued every 25th of the month.</p>' +
      '</div></div>';
  }

  function billDetails() {
    var D = AQ.DATA;
    var B = D.bill;
    var R = B.readings;
    return '<div class="screen">' +
      C.topBar('Bill Details', true) +
      '<div class="screen-pad">' +
      '<div class="card bill-card">' +
      '<p class="value-strong">Meter Reading</p>' +
      kv('Previous Reading', R.prev.toLocaleString() + ' m\u00B3') +
      kv('Present Reading', R.present.toLocaleString() + ' m\u00B3') +
      kv('Consumption', R.consumption + ' m\u00B3') +
      '</div>' +
      '<div class="card bill-card">' +
      '<p class="value-strong">Charges Breakdown</p>' +
      B.charges.map(function (c) { return kv(c.label, U.peso(c.amount)); }).join('') +
      '<div class="kv total"><span class="k">Total Amount Due</span><span class="v">' + U.peso(B.amount) + '</span></div>' +
      '</div>' +
      '<div class="card bill-card">' +
      '<div class="row-between"><span class="label">Payment Status</span><span class="pill pill-green">' + I.check(14) + B.status + '</span></div>' +
      '<p class="muted small due">Paid on ' + U.esc(B.paidDate) + ' &bull; ' + U.esc(B.method) + ' &bull; Ref ' + U.esc(B.reference) + '</p>' +
      '</div>' +
      '<button class="btn btn-outline btn-block" data-action="bill-pdf">' + I.download(19) + ' Download PDF</button>' +
      '</div></div>';
  }

  function kv(k, v) {
    return '<div class="kv"><span class="k">' + U.esc(k) + '</span><span class="v">' + U.esc(v) + '</span></div>';
  }

  function report() {
    var S = AQ.state;
    var R = S.report;
    var D = AQ.DATA;
    if (R.submitted) {
      return '<div class="screen">' +
        '<div class="success-view">' +
        '<span class="big-check">' + I.check(44) + '</span>' +
        '<h2>Report Submitted</h2>' +
        '<p class="ref">Reference No. <b>' + U.esc(R.ref) + '</b></p>' +
        '<p class="note">Our team will verify your report and respond within 24 hours. You can track updates in Alerts.</p>' +
        '<button class="btn btn-primary" data-action="back-home">Back to Home</button>' +
        '</div></div>';
    }
    return '<div class="screen">' +
      C.topBar('Report Issue', true) +
      '<div class="screen-pad">' +
      '<p class="section-label first">What kind of issue are you experiencing?</p>' +
      '<div class="issue-list">' +
      D.issueTypes.map(function (t) {
        return '<button class="issue-item' + (R.type === t.id ? ' active' : '') + '" data-action="issue-type" data-type="' + t.id + '">' +
          '<span class="issue-ico ' + t.tone + '">' + I[t.icon](20) + '</span>' + U.esc(t.label) +
          '<span class="chk">' + I.check(20) + '</span>' +
          '</button>';
      }).join('') +
      '</div>' +
      '<p class="section-label">Location</p>' +
      '<div class="select-wrap has-pin">' + I.pin(17) +
      '<select class="input" data-model="report.location" aria-label="Location">' +
      '<option value="">Select your location</option>' +
      D.barangays.map(function (b) {
        return '<option value="' + U.esc(b.name) + '"' + (R.location === b.name ? ' selected' : '') + '>Barangay ' + U.esc(b.name) + '</option>';
      }).join('') +
      '</select></div>' +
      '<p class="section-label">Add details (optional)</p>' +
      '<textarea class="input" placeholder="e.g. specific area, time, or photos" data-model="report.details">' + U.esc(R.details) + '</textarea>' +
      '<div class="photo-row" id="photoChips">' + photoChips() + '</div>' +
      '<button class="btn btn-outline btn-block mt10" data-action="add-photos">' + I.camera(20) + ' Add photos (optional)</button>' +
      '<input type="file" id="photoInput" accept="image/*" multiple hidden>' +
      '<button class="btn btn-primary btn-block mt16" data-action="submit-report"' + (S.reportBusy ? ' disabled' : '') + '>' + (S.reportBusy ? '<span class="spinner"></span>Submitting\u2026' : 'Submit Report') + '</button>' +
      '</div></div>';
  }

  function photoChips() {
    return AQ.state.report.photos.map(function (p, i) {
      return '<span class="photo-chip"><span>' + U.esc(p) + '</span><button data-action="remove-photo" data-idx="' + i + '" aria-label="Remove photo">' + I.x(14) + '</button></span>';
    }).join('');
  }

  function chartSvg(data) {
    var W = 330, H = 192;
    var left = 34, right = 326, top = 14, bottom = 162;
    var plotW = right - left, plotH = bottom - top;
    var lines = '';
    for (var v = 0; v <= data.yMax; v += data.yStep) {
      var y = bottom - (v / data.yMax) * plotH;
      lines += '<line x1="' + left + '" y1="' + y + '" x2="' + right + '" y2="' + y + '" stroke="#DCEAF5" stroke-width="1" stroke-dasharray="' + (v === 0 ? '0' : '3 4') + '"/>';
      lines += '<text x="' + (left - 8) + '" y="' + (y + 3.5) + '" text-anchor="end" font-size="10.5" fill="#8CA6BC">' + v + '</text>';
    }
    var n = data.values.length;
    var slot = plotW / n;
    var barW = Math.min(26, slot * 0.52);
    var bars = '';
    data.values.forEach(function (val, i) {
      var h = (val / data.yMax) * plotH;
      var x = left + slot * i + (slot - barW) / 2;
      var y = bottom - h;
      bars += '<rect class="bar" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW + '" height="' + h.toFixed(1) + '" rx="4" fill="#1E7FD0" style="animation-delay:' + (i * 55) + 'ms"><title>' + data.labels[i] + ': ' + val + ' ' + data.unit + '</title></rect>';
      bars += '<text x="' + (left + slot * i + slot / 2) + '" y="' + (bottom + 18) + '" text-anchor="middle" font-size="10.5" fill="#56728C">' + data.labels[i] + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Water usage bar chart">' + lines + bars + '</svg>';
  }

  function usage() {
    var S = AQ.state;
    var data = AQ.DATA.usage[S.usageRange];
    return '<div class="screen">' +
      C.topBar('Water Usage', true) +
      '<div class="screen-pad">' +
      '<div class="segment">' +
      '<button class="' + (S.usageRange === 'monthly' ? 'active' : '') + '" data-action="usage-range" data-range="monthly">Monthly</button>' +
      '<button class="' + (S.usageRange === 'yearly' ? 'active' : '') + '" data-action="usage-range" data-range="yearly">Yearly</button>' +
      '</div>' +
      '<div class="card chart-card mt12">' +
      '<p class="chart-year">' + U.esc(data.title) + '</p>' +
      chartSvg(data) +
      '</div>' +
      '<div class="card avg-card">' +
      '<p class="label">Average Usage</p>' +
      '<p class="avg-num">' + U.esc(data.average) + '</p>' +
      '<p class="muted small mt2">' + U.esc(data.sub) + '</p>' +
      '</div>' +
      '<div class="tip-card"><span class="tip-ico">' + I.leaf(22) + '</span><p>' + U.esc(data.tip) + '</p></div>' +
      '</div></div>';
  }

  function profile() {
    var D = AQ.DATA;
    var S = AQ.state;
    return '<div class="screen">' +
      C.topBar('Profile') +
      '<div class="screen-pad">' +
      '<div class="profile-head">' +
      '<span class="avatar">' + I.person(44) + '</span>' +
      '<h3>' + U.esc(D.user.name) + '</h3>' +
      '<p>' + U.esc(D.user.email) + '</p>' +
      '</div>' +
      '<div class="list-card">' +
      row('account', 'info', 'Account Information') +
      row('address', 'homeAddr', 'Billing Address') +
      row('notifications', 'bell', 'Notifications') +
      row('language', 'globe', 'Language', S.language) +
      row('help', 'help', 'Help &amp; Support') +
      '<button class="list-row danger" data-action="open-sheet" data-sheet="logout"><span class="l-ico">' + I.logout(21) + '</span>Log Out</button>' +
      '</div>' +
      '<p class="watermark">AquaConnect v1.0 &bull; Butuan City Water District</p>' +
      '</div></div>';
  }

  function row(sheet, icon, label, value) {
    return '<button class="list-row" data-action="open-sheet" data-sheet="' + sheet + '">' +
      '<span class="l-ico">' + I[icon](21) + '</span>' + label +
      (value ? '<span class="l-value">' + U.esc(value) + '</span>' : '') +
      '<span class="chev">' + I.chevron(18) + '</span>' +
      '</button>';
  }

  AQ.screens = AQ.screens || {};
  AQ.screens.bill = bill;
  AQ.screens.billDetails = billDetails;
  AQ.screens.report = report;
  AQ.screens.usage = usage;
  AQ.screens.profile = profile;
  AQ.refreshPhotoChips = function () {
    var el = document.getElementById('photoChips');
    if (el) el.innerHTML = photoChips();
  };
})();
