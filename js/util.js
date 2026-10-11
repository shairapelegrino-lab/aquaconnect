window.AQ = window.AQ || {};

AQ.util = (function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function peso(n) {
    return '\u20B1' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function pesoShort(n) {
    return '\u20B1' + n.toFixed(2);
  }

  function pad(n, len) {
    var s = String(n);
    while (s.length < len) s = '0' + s;
    return s;
  }

  function refNumber(prefix) {
    return prefix + '-2026-' + pad(Math.floor(Math.random() * 9000) + 1000, 4);
  }

  function downloadBlob(filename, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function downloadText(filename, text, mime) {
    downloadBlob(filename, new Blob([text], { type: mime || 'text/plain' }));
  }

  function pdfEscape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  function buildPdf(lines) {
    var ops = [];
    lines.forEach(function (ln, i) {
      var size = ln.size || 11;
      var gray = ln.gray == null ? 0.12 : ln.gray;
      var y = 800 - i * 22;
      ops.push('BT /F1 ' + size + ' Tf ' + gray + ' ' + gray + ' ' + gray + ' rg 56 ' + y + ' Td (' + pdfEscape(ln.text) + ') Tj ET');
    });
    var stream = ops.join('\n');
    var objs = [];
    objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objs[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
    objs[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>';
    objs[4] = '<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream';
    objs[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
    var pdf = '%PDF-1.4\n';
    var offsets = [0];
    for (var i = 1; i < objs.length; i++) {
      offsets[i] = pdf.length;
      pdf += i + ' 0 obj\n' + objs[i] + '\nendobj\n';
    }
    var xref = pdf.length;
    pdf += 'xref\n0 ' + objs.length + '\n0000000000 65535 f \n';
    for (var j = 1; j < objs.length; j++) {
      pdf += pad(offsets[j], 10) + ' 00000 n \n';
    }
    pdf += 'trailer\n<< /Size ' + objs.length + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    return pdf;
  }

  function billPdf() {
    var B = AQ.DATA.bill;
    var U = AQ.DATA.user;
    var lines = [
      { text: 'AquaConnect', size: 20 },
      { text: 'Butuan City Water District (BCWD) - eStatement', size: 10, gray: 0.45 },
      { text: ' ' },
      { text: 'Account No: ' + U.accountNo },
      { text: 'Account Name: ' + U.name },
      { text: 'Service Address: ' + U.address },
      { text: 'Meter No: ' + U.meterNo + '   Service Type: ' + U.serviceType },
      { text: ' ' },
      { text: 'Billing Period: ' + B.period, size: 12 },
      { text: 'Due Date: ' + B.dueDate },
      { text: ' ' },
      { text: 'Meter Reading', size: 13 },
      { text: 'Previous: ' + B.readings.prev + ' m3' },
      { text: 'Present: ' + B.readings.present + ' m3' },
      { text: 'Consumption: ' + B.readings.consumption + ' m3' },
      { text: ' ' },
      { text: 'Charges', size: 13 }
    ];
    B.charges.forEach(function (c) {
      lines.push({ text: '  ' + c.label + '   PHP ' + c.amount.toFixed(2) });
    });
    lines.push({ text: ' ' });
    lines.push({ text: 'TOTAL AMOUNT: PHP ' + B.amount.toFixed(2), size: 14 });
    lines.push({ text: 'Status: ' + B.status.toUpperCase() + (B.paidDate ? ' on ' + B.paidDate : '') });
    if (B.status === 'Paid') lines.push({ text: 'Payment: ' + B.method + ' - Ref ' + B.reference });
    lines.push({ text: ' ' });
    lines.push({ text: 'Thank you for paying on time. Your water. Our priority.', size: 10, gray: 0.45 });
    return AQ.util.buildPdf(lines);
  }

  function receiptPdf() {
    var B = AQ.DATA.bill;
    var U2 = AQ.DATA.user;
    var lines = [
      { text: 'AquaConnect', size: 20 },
      { text: 'Butuan City Water District (BCWD) - eReceipt', size: 10, gray: 0.45 },
      { text: ' ' },
      { text: 'PAYMENT RECEIVED', size: 14 },
      { text: ' ' },
      { text: 'Amount Paid: PHP ' + B.amount.toFixed(2), size: 13 },
      { text: 'Paid On: ' + B.paidDate },
      { text: 'Payment Method: ' + B.method },
      { text: 'Reference No: ' + B.reference },
      { text: ' ' },
      { text: 'Account No: ' + U2.accountNo },
      { text: 'Account Name: ' + U2.name },
      { text: 'Billing Period: ' + B.period },
      { text: 'Due Date: ' + B.dueDate },
      { text: ' ' },
      { text: 'This is a system-generated receipt. No signature required.', size: 10, gray: 0.45 },
      { text: 'Your water. Our priority.', size: 10, gray: 0.45 }
    ];
    return buildPdf(lines);
  }

  return { esc: esc, peso: peso, pesoShort: pesoShort, refNumber: refNumber, downloadText: downloadText, downloadBlob: downloadBlob, buildPdf: buildPdf, billPdf: billPdf, receiptPdf: receiptPdf };
})();
