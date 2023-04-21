// date
let date = new Date();
// date
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
// full date
let fdate = `${day + 1}-${month}-${year}`;
// month name
const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "إبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
// date in html
mday.innerHTML = day;
mmo.innerHTML = monthNames[month - 1];
myear.innerHTML = year;
// footer
fyear.innerHTML = year;
// api hijri
let api = {};

async function getHijri() {
  await fetch(`https://api.aladhan.com/v1/gToH/${fdate}`)
    .then((data) => data.json())
    .then((data) => data.data.hijri)
    .then((data) => {
      api = {
        day: data.day,
        month: data.month.ar,
        year: data.year,
        holiday: data.holidays[0],
        holidayt: data.holidays[1],
      };
    });
  // hijri
  hday.innerHTML = api.day;
  hmo.innerHTML = api.month;
  hyear.innerHTML = api.year;
  // nav
  if (api.month == "رَمَضان" && api.day <= 18) {
    nav.innerHTML = "رَمَضان كريم";
  } else if (api.month == "رَمَضان" && api.day > 18) {
    nav.innerHTML = "العشر الأواخر";
  } else if (api.holiday == "Ashura") {
    nav.innerHTML = "عاشوراء مباركة";
  } else if (api.holiday == "Eid-ul-Adha") {
    nav.innerHTML = "عيد الأضحي المبارك";
  } else if (api.holiday == "Hajj" && api.holidayt != "Arafa") {
    nav.innerHTML = "حج مبارك";
  } else if (api.holidayt == "Arafa") {
    nav.innerHTML = "عرفات";
  } else if (api.holiday == "Eid-ul-Fitr") {
    nav.innerHTML = "عيد فطر مبارك";
  }
  setTimeout(() => {
    load.style.display = "none";
  }, 2000);
}

getHijri();
