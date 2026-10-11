window.AQ = window.AQ || {};

(function () {
  var U = AQ.util;
  var I = AQ.icons;

  function greeting() {
    var h = new Date().getHours();
    return h < 12 ? 'Good Morning,' : h < 18 ? 'Good Afternoon,' : 'Good Evening,';
  }

  function home() {
    var S = AQ.state;
    var D = AQ.DATA;
    var unread = !S.alertsRead;
    return '<div class="screen">' +
      '<header class="home-head">' +
      '<div><p class="greet">' + greeting() + '</p><h2 class="name">' + U.esc(D.user.name) + '</h2>' +
      '<p class="loc">' + I.pin(15) + ' Butuan City</p></div>' +
      '<button class="icon-btn bell-wrap" data-action="tab" data-tab="alerts" aria-label="Alerts">' + I.bell(23) + (unread ? '<span class="badge-dot"></span>' : '') + '</button>' +
      '</header>' +
      '<button class="availability-card" data-action="go-availability">' +
      '<p class="ac-title">Water Availability</p>' +
      '<div class="ac-row">' +
      '<span class="status-ico on-blue">' + I.checkCircle(24) + '</span>' +
      '<div class="ac-text"><p class="ac-status">Normal</p><p class="ac-sub">in your area</p></div>' +
      '<span class="chev">' + I.chevron(22) + '</span>' +
      '</div></button>' +
      '<nav class="menu">' +
      menuItem('tab', 'alerts', 'bell', 'Alerts', 'View latest advisories') +
      menuItem('go-bill', null, 'receipt', 'My Bill', 'Check and pay your bill') +
      menuItem('go-report', null, 'wrench', 'Report Issue', 'Low pressure / no water') +
      menuItem('go-usage', null, 'chart', 'Water Usage', 'View your usage history') +
      '</nav>' +
      '<p class="watermark"><b>AquaConnect</b> &mdash; Your water. Our priority.</p>' +
      '</div>';
  }

  function menuItem(action, tab, icon, title, sub) {
    return '<button class="menu-item" data-action="' + action + '"' + (tab ? ' data-tab="' + tab + '"' : '') + '>' +
      '<span class="menu-ico">' + I[icon](22) + '</span>' +
      '<span class="menu-text"><span class="t">' + U.esc(title) + '</span><span class="s">' + U.esc(sub) + '</span></span>' +
      '<span class="chev">' + I.chevron() + '</span>' +
      '</button>';
  }

  function mapSvg() {
    return '<svg viewBox="0 0 360 198" role="img" aria-label="Map of Butuan City">' +
      '<rect width="360" height="198" fill="#E9F1E8"/>' +
      '<rect x="14" y="16" width="86" height="46" rx="9" fill="#D8EAD9"/>' +
      '<rect x="248" y="20" width="98" height="52" rx="9" fill="#D8EAD9"/>' +
      '<rect x="262" y="118" width="84" height="44" rx="9" fill="#D8EAD9"/>' +
      '<path d="M-8 152 C 54 136, 118 172, 196 150 S 330 122, 368 140 L 368 205 L -8 205 Z" fill="#BFE0F5"/>' +
      '<path d="M-8 152 C 54 136, 118 172, 196 150 S 330 122, 368 140" fill="none" stroke="#9CCDEC" stroke-width="2.4"/>' +
      '<g stroke="#FFFFFF" stroke-linecap="round">' +
      '<path d="M0 74 H360" stroke-width="8"/>' +
      '<path d="M112 0 V198" stroke-width="8"/>' +
      '<path d="M226 0 V198" stroke-width="6"/>' +
      '<path d="M0 26 H360" stroke-width="4.4"/>' +
      '<path d="M58 74 V198" stroke-width="4"/>' +
      '<path d="M300 74 V198" stroke-width="4"/>' +
      '</g>' +
      '<g stroke="#DCE6DA" stroke-width="2">' +
      '<path d="M0 50 H360"/><path d="M0 98 H360"/><path d="M0 124 H360"/>' +
      '<path d="M172 0 V198"/><path d="M340 0 V198"/>' +
      '</g>' +
      '<g fill="#DDE8DC">' +
      '<rect x="126" y="30" width="34" height="26" rx="5"/>' +
      '<rect x="176" y="30" width="40" height="26" rx="5"/>' +
      '<rect x="126" y="86" width="36" height="30" rx="5"/>' +
      '<rect x="180" y="84" width="34" height="32" rx="5"/>' +
      '<rect x="240" y="90" width="42" height="26" rx="5"/>' +
      '<rect x="70" y="88" width="30" height="30" rx="5"/>' +
      '</g>' +
      '<g transform="translate(180 92)">' +
      '<path d="M0 26 C -9 14 -16 9 -16 0 a16 16 0 1 1 32 0 c0 9 -7 14 -16 26z" fill="#1173C4" stroke="#FFFFFF" stroke-width="3.4"/>' +
      '<circle cx="0" cy="-0.5" r="5.6" fill="#FFFFFF"/>' +
      '</g>' +
      '</svg>';
  }

  function availability() {
    var S = AQ.state;
    var selected = S.selectedArea ? AQ.DATA.barangays.filter(function (b) { return b.name === S.selectedArea; })[0] : null;
    var st = AQ.DATA.statusCopy[selected ? selected.status : 'normal'];
    var sub = selected
      ? st.sub.replace('your area', 'Barangay ' + selected.name).replace('this area', 'Barangay ' + selected.name)
      : st.sub;
    var icoCls = st.tone === 'normal' ? 'ok' : st.tone === 'low' ? 'warn' : 'bad';
    return '<div class="screen">' +
      AQ.components.topBar('Water Availability', true) +
      '<div class="screen-pad">' +
      '<div class="map-card">' + mapSvg() + '<div class="map-label">Butuan City</div>' +
      '<div class="map-zoom" aria-hidden="true"><span>+</span><span>\u2212</span></div></div>' +
      '<div class="status-card tone-' + st.tone + '">' +
      '<span class="status-ico ' + icoCls + '">' + I[st.icon](22) + '</span>' +
      '<div><p class="sc-label">Water Availability</p>' +
      '<p class="sc-status">' + st.label + ' <span class="muted small">' + (selected ? 'in Barangay ' + U.esc(selected.name) : 'in your area') + '</span></p>' +
      '<p class="sc-sub">' + U.esc(sub) + '</p></div>' +
      '</div>' +
      '<p class="section-label">Tap to check other areas:</p>' +
      '<div class="search-wrap">' + I.search(19) +
      '<input class="input" placeholder="Search barangay or area" data-live="availabilitySearch" value="' + U.esc(S.availabilitySearch) + '">' +
      '</div>' +
      (S.selectedArea ? '<a class="link-center" style="margin:0 0 10px" data-action="reset-area">Show my area status</a>' : '') +
      '<div class="area-list" id="areaList">' + areaItems() + '</div>' +
      '</div></div>';
  }

  function areaItems() {
    var S = AQ.state;
    var q = S.availabilitySearch.trim().toLowerCase();
    var list = AQ.DATA.barangays.filter(function (b) { return !q || b.name.toLowerCase().indexOf(q) !== -1; });
    if (!list.length) return '<p class="empty-note">No barangay or area found for \u201C' + U.esc(S.availabilitySearch) + '\u201D.</p>';
    return list.map(function (b) {
      var st = AQ.DATA.statusCopy[b.status];
      return '<button class="area-item' + (S.selectedArea === b.name ? ' active' : '') + '" data-action="select-area" data-area="' + U.esc(b.name) + '">' +
        '<span class="ai-name">' + U.esc(b.name) + '</span>' +
        '<span class="ai-check">' + I.check(18) + '</span>' +
        '<span class="status-pill p-' + st.tone + '"><i></i>' + st.label + '</span>' +
        '</button>';
    }).join('');
  }

  function alerts() {
    var S = AQ.state;
    var filters = [
      { id: 'all', label: 'All' },
      { id: 'interruptions', label: 'Interruptions' },
      { id: 'restoration', label: 'Restoration' }
    ];
    var list = AQ.DATA.alerts.filter(function (a) {
      if (S.alertsFilter === 'all') return true;
      if (S.alertsFilter === 'interruptions') return a.kind === 'interruption' || a.kind === 'maintenance';
      return a.kind === 'restoration';
    });
    var cards = list.length ? list.map(function (a) {
      var k = AQ.DATA.alertKind[a.kind];
      return '<article class="alert-card">' +
        '<span class="a-ico k-' + k.tone + '">' + I[k.icon](20) + '</span>' +
        '<div><p class="a-title">' + U.esc(a.title) + '</p>' +
        '<p class="a-area">' + I.pin(14) + U.esc(a.area) + '</p>' +
        '<p class="a-when">' + U.esc(a.date) + ' &bull; ' + U.esc(a.time) + '</p>' +
        '<p class="a-body">' + U.esc(a.body) + '</p></div>' +
        '</article>';
    }).join('') : '<p class="empty-note">No alerts in this category right now.</p>';
    return '<div class="screen">' +
      AQ.components.topBar('Alerts') +
      '<div class="chips">' + filters.map(function (f) {
        return '<button class="chip' + (S.alertsFilter === f.id ? ' active' : '') + '" data-action="alerts-filter" data-filter="' + f.id + '">' + f.label + '</button>';
      }).join('') + '</div>' +
      '<div class="alert-list">' + cards + '</div>' +
      '</div>';
  }

  AQ.screens = AQ.screens || {};
  AQ.screens.home = home;
  AQ.screens.availability = availability;
  AQ.screens.alerts = alerts;
  AQ.refreshAreaList = function () {
    var el = document.getElementById('areaList');
    if (el) el.innerHTML = areaItems();
  };
})();
