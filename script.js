const copy = {
  ar: {
    inviteLabel: 'دعوة زفاف',
    bride: 'شيدانور',
    groom: 'محمد صافي',
    mainDates: '15 & 17 أكتوبر 2026',
    brideFamily: 'شيدام وفقرالله شليك',
    groomFamily: 'أميرة ومحمد الدبك',
    ourDay: 'موعدنا معكم',
    twoMoments: 'فرحتان.. وقلب واحد',
    twoMomentsText: 'نلتقي أولاً في ليلة الحنّة، ثم نجتمع في عقد النكاح لنحتفل معاً ببداية فصل جديد من حياتنا.',
    hennaTitle: 'ليلة الحنّة',
    hennaDate: 'الخميس · 15 أكتوبر 2026',
    timeLabel: 'الوقت',
    placeLabel: 'المكان',
    womenOnly: 'الدعوة للنساء فقط',
    openMap: 'فتح الموقع',
    calendar: 'إضافة للتقويم',
    nikahTitle: 'عقد النكاح',
    nikahDate: 'السبت · 17 أكتوبر 2026',
    dontLate: 'يرجى عدم التأخر؛ مدة مراسم عقد النكاح 30 دقيقة فقط.',
    schedule: 'البرنامج',
    momentsTitle: 'موعدان لا ننساهما',
    remaining: 'حتى نلتقي',
    countTitle: 'بقي على عقد النكاح',
    days: 'يوم',
    hours: 'ساعة',
    minutes: 'دقيقة',
    seconds: 'ثانية',
    closingTitle: 'بانتظاركم بكل حب',
    closingText: 'حضوركم يضيف لفرحتنا معنى أجمل، ويسعدنا أن تشاركونا هذه اللحظات التي ستبقى في الذاكرة.'
  },
  tr: {
    inviteLabel: 'Düğün Davetiyesi',
    bride: 'Şeydanur',
    groom: 'Muhammed Safi',
    mainDates: '15 & 17 Ekim 2026',
    brideFamily: 'Çiğdem & Fakrullah Çelik',
    groomFamily: 'Amira & Muhammed Aldabk',
    ourDay: 'Buluşma zamanımız',
    twoMoments: 'İki güzel gün, tek bir hikâye',
    twoMomentsText: 'Önce kına gecemizde buluşuyor, ardından nikâh törenimizde hayatımızın yeni başlangıcını birlikte kutluyoruz.',
    hennaTitle: 'Kına Gecesi',
    hennaDate: 'Perşembe · 15 Ekim 2026',
    timeLabel: 'Saat',
    placeLabel: 'Mekân',
    womenOnly: 'Davet yalnızca kadınlara özeldir.',
    openMap: 'Konumu Aç',
    calendar: 'Takvime Ekle',
    nikahTitle: 'Nikâh Töreni',
    nikahDate: 'Cumartesi · 17 Ekim 2026',
    dontLate: 'Nikâh töreni yalnızca 30 dakika süreceği için lütfen geç kalmayınız.',
    schedule: 'Program',
    momentsTitle: 'Unutulmayacak iki buluşma',
    remaining: 'Buluşmamıza',
    countTitle: 'Nikâh törenine kalan',
    days: 'Gün',
    hours: 'Saat',
    minutes: 'Dakika',
    seconds: 'Saniye',
    closingTitle: 'Sizi sevgiyle bekliyoruz',
    closingText: 'Bu özel günlerimizde yanımızda olmanız mutluluğumuzu daha da anlamlı kılacak. Güzel anılarımızı birlikte biriktirmek dileğiyle.'
  }
};

const gate = document.querySelector('#languageGate');
const site = document.querySelector('#site');
const switcher = document.querySelector('#langSwitch');

function calUrl(title, start, end, details, location) {
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent(title) + '&dates=' + start + '/' + end +
    '&details=' + encodeURIComponent(details) + '&location=' + encodeURIComponent(location);
}

function applyLang(lang) {
  const d = copy[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = `${d.bride} & ${d.groom}`;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = d[el.dataset.i18n] || '');
  switcher.textContent = lang === 'ar' ? 'TR' : 'AR';
  switcher.dataset.lang = lang;
  document.querySelector('#hennaCal').href = calUrl(d.hennaTitle, '20261015T160000Z', '20261015T200000Z', d.womenOnly, 'The Nirvanas Hotel');
  document.querySelector('#nikahCal').href = calUrl(d.nikahTitle, '20261017T093000Z', '20261017T100000Z', d.dontLate, 'Fatih Belediyesi Evlendirme Dairesi');
  localStorage.setItem('weddingLang', lang);
}

function enter(lang) {
  applyLang(lang);
  gate.style.transition = 'opacity .55s ease,transform .55s ease';
  gate.style.opacity = '0';
  gate.style.transform = 'scale(1.03)';
  setTimeout(() => {
    gate.classList.add('hidden');
    site.classList.remove('hidden');
    requestAnimationFrame(() => document.querySelectorAll('.reveal').forEach((x, i) => { if (i < 1) x.classList.add('visible'); }));
  }, 520);
}

document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => enter(b.dataset.lang)));
switcher.addEventListener('click', () => applyLang(switcher.dataset.lang === 'ar' ? 'tr' : 'ar'));

const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: .13 });
document.querySelectorAll('.reveal').forEach(x => obs.observe(x));

function countdown() {
  const target = new Date('2026-10-17T12:30:00+03:00').getTime();
  const diff = Math.max(0, target - Date.now());
  const vals = [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1000) % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => document.getElementById(id).textContent = String(vals[i]).padStart(2, '0'));
}
countdown();
setInterval(countdown, 1000);
