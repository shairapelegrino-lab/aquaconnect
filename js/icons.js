window.AQ = window.AQ || {};

AQ.icons = (function () {
  function svg(inner, size, viewBox) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="' + (viewBox || '0 0 24 24') +
      '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }

  var I = {
    arrowLeft: function (s) { s = s || 22; return svg('<path d="M15 5l-7 7 7 7"/>', s); },
    chevron: function (s) { s = s || 20; return svg('<path d="M9 6l6 6-6 6"/>', s); },
    bell: function (s) { s = s || 22; return svg('<path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9"/><path d="M13.8 20.5a2.1 2.1 0 0 1-3.6 0"/>', s); },
    receipt: function (s) { s = s || 22; return svg('<path d="M6 2.8h12V21l-3-1.7-3 1.7-3-1.7L6 21z"/><path d="M9.2 8h5.6M9.2 12h5.6"/>', s); },
    wrench: function (s) { s = s || 22; return svg('<path d="M14.9 6.2a4.4 4.4 0 0 0-5.8 5.6L3.6 17.3a2 2 0 0 0 0 2.8l.3.3a2 2 0 0 0 2.8 0l5.5-5.5a4.4 4.4 0 0 0 5.6-5.8l-2.7 2.7-2.4-.6-.6-2.4z"/>', s); },
    chart: function (s) { s = s || 22; return svg('<path d="M5.5 20V11M12 20V4.5M18.5 20v-6"/>', s); },
    home: function (s) { s = s || 22; return svg('<path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.6v-6h-4.8v6H5a1 1 0 0 1-1-1z"/>', s); },
    dots: function (s) { s = s || 22; return svg('<circle cx="5" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.7" fill="currentColor" stroke="none"/>', s); },
    search: function (s) { s = s || 19; return svg('<circle cx="11" cy="11" r="6.8"/><path d="M20.3 20.3 16 16"/>', s); },
    pin: function (s) { s = s || 17; return svg('<path d="M12 21.5S5.5 16 5.5 10.8a6.5 6.5 0 1 1 13 0C18.5 16 12 21.5 12 21.5z"/><circle cx="12" cy="10.7" r="2.4"/>', s); },
    copy: function (s) { s = s || 19; return svg('<rect x="9" y="9" width="11.5" height="11.5" rx="2.4"/><path d="M5.5 15V5.6a2 2 0 0 1 2-2H16"/>', s); },
    download: function (s) { s = s || 20; return svg('<path d="M12 3.5V15m0 0 4.2-4.2M12 15 7.8 10.8M4.5 20h15"/>', s); },
    card: function (s) { s = s || 20; return svg('<rect x="2.6" y="5.2" width="18.8" height="13.6" rx="2.6"/><path d="M2.6 10h18.8"/>', s); },
    eye: function (s) { s = s || 20; return svg('<path d="M2.2 12S5.8 5.7 12 5.7 21.8 12 21.8 12 18.2 18.3 12 18.3 2.2 12 2.2 12z"/><circle cx="12" cy="12" r="2.7"/>', s); },
    eyeOff: function (s) { s = s || 20; return svg('<path d="M4 4l16 16"/><path d="M9.9 5.9A9.8 9.8 0 0 1 12 5.7c6.2 0 9.8 6.3 9.8 6.3a17 17 0 0 1-3.3 4"/><path d="M6.1 7.9A15.8 15.8 0 0 0 2.2 12S5.8 18.3 12 18.3a9.5 9.5 0 0 0 3.6-.7"/><path d="M10.2 10.3a2.5 2.5 0 0 0 3.5 3.5"/>', s); },
    person: function (s) { s = s || 40; return svg('<circle cx="12" cy="8.2" r="3.9"/><path d="M4.4 20.6c1.5-3.9 4.6-5.5 7.6-5.5s6.1 1.6 7.6 5.5"/>', s); },
    info: function (s) { s = s || 21; return svg('<circle cx="12" cy="12" r="8.8"/><path d="M12 11.2v4.6"/><path d="M12 8h.01"/>', s); },
    homeAddr: function (s) { s = s || 21; return svg('<path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.6v-6h-4.8v6H5a1 1 0 0 1-1-1z"/>', s); },
    globe: function (s) { s = s || 21; return svg('<circle cx="12" cy="12" r="8.8"/><path d="M3.2 12h17.6M12 3.2c2.6 2.7 2.6 15 0 17.6M12 3.2c-2.6 2.7-2.6 15 0 17.6"/>', s); },
    help: function (s) { s = s || 21; return svg('<circle cx="12" cy="12" r="8.8"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.3 2.4c-.7.3-.9.8-.9 1.6"/><path d="M12 16.6h.01"/>', s); },
    logout: function (s) { s = s || 21; return svg('<path d="M9.5 21H5.4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.1"/><path d="M16 16.8 20.8 12 16 7.2"/><path d="M20.5 12H9.8"/>', s); },
    warning: function (s) { s = s || 20; return svg('<path d="M10.4 4.1 2.6 17.6a1.9 1.9 0 0 0 1.6 2.9h15.6a1.9 1.9 0 0 0 1.6-2.9L13.6 4.1a1.9 1.9 0 0 0-3.2 0z"/><path d="M12 9.4v4.4"/><path d="M12 17.1h.01"/>', s); },
    xCircle: function (s) { s = s || 20; return svg('<circle cx="12" cy="12" r="8.8"/><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>', s); },
    checkCircle: function (s) { s = s || 22; return svg('<circle cx="12" cy="12" r="8.8"/><path d="M8.2 12.4l2.7 2.7 5-5.6"/>', s); },
    check: function (s) { s = s || 18; return svg('<path d="M4.8 12.8l4.6 4.6L19.2 7"/>', s); },
    x: function (s) { s = s || 16; return svg('<path d="M6 6l12 12M18 6 6 18"/>', s); },
    plus: function (s) { s = s || 20; return svg('<path d="M12 5.5v13M5.5 12h13"/>', s); },
    minus: function (s) { s = s || 16; return svg('<path d="M5.5 12h13"/>', s); },
    droplet: function (s) { s = s || 20; return svg('<path d="M12 3.2s6.2 6.6 6.2 11a6.2 6.2 0 0 1-12.4 0c0-4.4 6.2-11 6.2-11z"/>', s); },
    leaf: function (s) { s = s || 21; return svg('<path d="M20.2 3.8C12 3.5 5.6 7 5.6 13.2a5.8 5.8 0 0 0 1 3.2C8.7 12.9 12.4 10 16.4 9.1c-3.2 1.7-6.7 4.5-8.6 9.1a5.7 5.7 0 0 0 3.5 1.1c6.2 0 8.9-7.6 8.9-15.5z"/>', s); },
    camera: function (s) { s = s || 20; return svg('<path d="M4.2 8h2.9l1.6-2.2h6.6L16.9 8h2.9a1.2 1.2 0 0 1 1.2 1.2v9.6a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 18.8V9.2A1.2 1.2 0 0 1 4.2 8z"/><circle cx="12" cy="13.4" r="3.1"/>', s); },
    clock: function (s) { s = s || 17; return svg('<circle cx="12" cy="12" r="8.8"/><path d="M12 7.2v5l3 1.8"/>', s); },
    phone: function (s) { s = s || 21; return svg('<path d="M5.2 4h3l1.8 4.6-2.3 1.5a12.5 12.5 0 0 0 6.2 6.2l1.5-2.3L20 15.8v3a2 2 0 0 1-2.2 2A16.2 16.2 0 0 1 3.2 6.2 2 2 0 0 1 5.2 4z"/>', s); },
    mail: function (s) { s = s || 21; return svg('<rect x="3" y="5.2" width="18" height="13.6" rx="2.4"/><path d="M3.6 6.6 12 12.6l8.4-6"/>', s); },
    chat: function (s) { s = s || 21; return svg('<path d="M12 3.2a8.8 8.8 0 0 1 0 17.6H4.4l1.7-3.2A8.8 8.8 0 0 1 12 3.2z"/><path d="M8.4 10.6h7.2M8.4 14h4.4"/>', s); },
    gift: function (s) { s = s || 20; return svg('<rect x="4" y="8" width="16" height="12" rx="1.6"/><path d="M12 8v12M4 12h16"/><path d="M12 8s-1-4-3.4-4A2.1 2.1 0 0 0 8.6 8zM12 8s1-4 3.4-4a2.1 2.1 0 0 1 0 4z"/>', s); },
    userCheck: function (s) { s = s || 20; return svg('<circle cx="10" cy="8" r="3.6"/><path d="M3.6 20c1.3-3.4 4-4.9 6.4-4.9 1 0 2 .2 2.9.7"/><path d="M15.4 17.6l1.9 1.9 3.4-3.7"/>', s); }
  };

  function logo(h) {
    var size = h || 112;
    return '<img class="logo-img" src="assets/logo.png" width="' + size + '" height="' + size + '" alt="AquaConnect logo">';
  }

  function statusRight() {
    return '<span class="sb-right">' +
      '<svg width="18" height="12" viewBox="0 0 18 12" fill="#16324b"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4.6" y="5" width="3" height="7" rx="1"/><rect x="9.2" y="2.6" width="3" height="9.4" rx="1"/><rect x="13.8" y="0" width="3" height="12" rx="1"/></svg>' +
      '<svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="#16324b" stroke-width="2" stroke-linecap="round"><path d="M1.4 4.2a10.4 10.4 0 0 1 14.2 0"/><path d="M4.2 7.4a6.4 6.4 0 0 1 8.6 0"/><circle cx="8.5" cy="10.4" r="1" fill="#16324b" stroke="none"/></svg>' +
      '<svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.6" y="1" width="20" height="10" rx="3" fill="none" stroke="#16324b" stroke-opacity="0.45" stroke-width="1.4"/><rect x="2.4" y="2.8" width="14" height="6.4" rx="1.7" fill="#16324b"/><path d="M22.8 4.4v3.2c1-.3 1.6-.8 1.6-1.6s-.6-1.3-1.6-1.6z" fill="#16324b" fill-opacity="0.5"/></svg>' +
      '</span>';
  }

  function google() {
    return '<svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C37 40.9 44 36 44 24c0-1.3-.1-2.7-.4-3.9z"/></svg>';
  }

  return Object.assign({ logo: logo, statusRight: statusRight, google: google }, I);
})();
