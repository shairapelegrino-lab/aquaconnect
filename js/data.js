window.AQ = window.AQ || {};

AQ.DATA = {
  user: {
    name: 'Juan Dela Cruz',
    email: 'juan@email.com',
    accountNo: 'BCWD-2026-12345',
    meterNo: 'MTR-8841209',
    area: 'Libertad',
    address: '123 Rizal St., Barangay Libertad, Butuan City',
    serviceType: 'Residential',
    status: 'Active'
  },

  bill: {
    period: 'July 2026',
    amount: 486.75,
    status: 'Paid',
    dueDate: 'Jul 25, 2026',
    paidDate: 'Jul 20, 2026',
    method: 'GCash',
    reference: '0031 2245 8871',
    readings: { prev: 1425, present: 1450, consumption: 25 },
    charges: [
      { label: 'Basic Charge', amount: 250.0 },
      { label: 'Consumption (25 m\u00B3 \u00D7 \u20B18.00)', amount: 200.0 },
      { label: 'Environmental Fee', amount: 25.0 },
      { label: 'Maintenance Fee', amount: 11.75 }
    ]
  },

  barangays: [
    { name: 'Libertad', status: 'normal' },
    { name: 'Doongan', status: 'normal' },
    { name: 'Bancasi', status: 'low' },
    { name: 'San Vicente', status: 'normal' },
    { name: 'Dagohoy', status: 'normal' },
    { name: 'Villa Kananga', status: 'normal' },
    { name: 'Ampayon', status: 'normal' },
    { name: 'Mahogany', status: 'normal' },
    { name: 'Jamboree', status: 'normal' },
    { name: 'Baan KM 3', status: 'normal' }
  ],

  statusCopy: {
    normal: { label: 'Normal', sub: 'Water supply is currently available in your area.', tone: 'normal', icon: 'checkCircle' },
    low: { label: 'Low Pressure', sub: 'Water supply may be limited in some parts of this area.', tone: 'low', icon: 'warning' },
    interrupted: { label: 'Interrupted', sub: 'Water supply is temporarily unavailable in this area.', tone: 'interrupted', icon: 'xCircle' }
  },

  alerts: [
    {
      id: 'a1',
      kind: 'maintenance',
      title: 'Planned Maintenance',
      area: 'Bancasi Area',
      date: 'Aug 13, 2026',
      time: '8:00 AM \u2013 5:00 PM',
      body: 'Scheduled maintenance works may affect water supply.'
    },
    {
      id: 'a2',
      kind: 'interruption',
      title: 'Water Interruption',
      area: 'Doongan Area',
      date: 'Aug 12, 2026',
      time: '9:00 AM \u2013 2:00 PM',
      body: 'Due to pipe repair works.'
    },
    {
      id: 'a3',
      kind: 'restoration',
      title: 'Restoration Update',
      area: 'Libertad Area',
      date: 'Aug 16, 2026',
      time: '6:00 PM',
      body: 'Water supply has been restored.'
    }
  ],

  alertKind: {
    maintenance: { icon: 'warning', tone: 'maintenance' },
    interruption: { icon: 'xCircle', tone: 'interruption' },
    restoration: { icon: 'checkCircle', tone: 'restoration' }
  },

  usage: {
    monthly: {
      title: '2026',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      values: [28, 30, 27, 31, 26, 28.5, 25.1],
      yMax: 40,
      yStep: 10,
      unit: 'm\u00B3',
      average: '28 m\u00B3',
      tip: 'Your usage is 12% lower than last month.',
      sub: 'Average monthly consumption for 2026'
    },
    yearly: {
      title: 'Yearly Comparison',
      labels: ['2022', '2023', '2024', '2025', '2026'],
      values: [348, 339, 331, 326, 196],
      yMax: 400,
      yStep: 100,
      unit: 'm\u00B3',
      average: '308 m\u00B3',
      tip: 'Your yearly usage is trending lower since 2022.',
      sub: '2026 is year-to-date (Jan \u2013 Jul)'
    }
  },

  issueTypes: [
    { id: 'pressure', label: 'Low Water Pressure', icon: 'droplet', tone: 't-blue' },
    { id: 'no-supply', label: 'No Water Supply', icon: 'xCircle', tone: 't-red' },
    { id: 'leak', label: 'Leak / Pipe Damage', icon: 'wrench', tone: 't-blue' },
    { id: 'other', label: 'Other', icon: 'plus', tone: 't-blue' }
  ],

  help: {
    hotline: '1-800-AQ-WATER',
    email: 'support@aquaconnect.ph'
  }
};
