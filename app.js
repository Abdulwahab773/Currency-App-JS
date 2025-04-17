const currencyToCountry = {
    USD: "us",
    AED: "ae",
    AFN: "af",
    ALL: "al",
    AMD: "am",
    ANG: "nl",
    AOA: "ao",
    ARS: "ar",
    AUD: "au",
    AWG: "aw",
    AZN: "az",
    BAM: "ba",
    BBD: "bb",
    BDT: "bd",
    BGN: "bg",
    BHD: "bh",
    BIF: "bi",
    BMD: "bm",
    BND: "bn",
    BOB: "bo",
    BRL: "br",
    BSD: "bs",
    BTN: "bt",
    BWP: "bw",
    BYN: "by",
    BZD: "bz",
    CAD: "ca",
    CDF: "cd",
    CHF: "ch",
    CLP: "cl",
    CNY: "cn",
    COP: "co",
    CRC: "cr",
    CUP: "cu",
    CVE: "cv",
    CZK: "cz",
    DJF: "dj",
    DKK: "dk",
    DOP: "do",
    DZD: "dz",
    EGP: "eg",
    ERN: "er",
    ETB: "et",
    EUR: "eu",
    FJD: "fj",
    FKP: "fk",
    FOK: "fo",
    GBP: "gb",
    GEL: "ge",
    GGP: "gg",
    GHS: "gh",
    GIP: "gi",
    GMD: "gm",
    GNF: "gn",
    GTQ: "gt",
    GYD: "gy",
    HKD: "hk",
    HNL: "hn",
    HRK: "hr",
    HTG: "ht",
    HUF: "hu",
    IDR: "id",
    ILS: "il",
    IMP: "im",
    INR: "in",
    IQD: "iq",
    IRR: "ir",
    ISK: "is",
    JEP: "je",
    JMD: "jm",
    JOD: "jo",
    JPY: "jp",
    KES: "ke",
    KGS: "kg",
    KHR: "kh",
    KID: "ki",
    KMF: "km",
    KRW: "kr",
    KWD: "kw",
    KYD: "ky",
    KZT: "kz",
    LAK: "la",
    LBP: "lb",
    LKR: "lk",
    LRD: "lr",
    LSL: "ls",
    LYD: "ly",
    MAD: "ma",
    MDL: "md",
    MGA: "mg",
    MKD: "mk",
    MMK: "mm",
    MNT: "mn",
    MOP: "mo",
    MRU: "mr",
    MUR: "mu",
    MVR: "mv",
    MWK: "mw",
    MXN: "mx",
    MYR: "my",
    MZN: "mz",
    NAD: "na",
    NGN: "ng",
    NIO: "ni",
    NOK: "no",
    NPR: "np",
    NZD: "nz",
    OMR: "om",
    PAB: "pa",
    PEN: "pe",
    PGK: "pg",
    PHP: "ph",
    PKR: "pk",
    PLN: "pl",
    PYG: "py",
    QAR: "qa",
    RON: "ro",
    RSD: "rs",
    RUB: "ru",
    RWF: "rw",
    SAR: "sa",
    SBD: "sb",
    SCR: "sc",
    SDG: "sd",
    SEK: "se",
    SGD: "sg",
    SHP: "sh",
    SLE: "sl",
    SLL: "sl",
    SOS: "so",
    SRD: "sr",
    SSP: "ss",
    STN: "st",
    SYP: "sy",
    SZL: "sz",
    THB: "th",
    TJS: "tj",
    TMT: "tm",
    TND: "tn",
    TOP: "to",
    TRY: "tr",
    TTD: "tt",
    TVD: "tv",
    TWD: "tw",
    TZS: "tz",
    UAH: "ua",
    UGX: "ug",
    UYU: "uy",
    UZS: "uz",
    VES: "ve",
    VND: "vn",
    VUV: "vu",
    WST: "ws",
    XAF: "cm",
    XCD: "ag",
    XCG: "cg",
    XDR: "int",
    XOF: "bj",
    XPF: "pf",
    YER: "ye",
    ZAR: "za",
    ZMW: "zm",
    ZWL: "zw"
};




let amount = document.getElementById("amount");
let from_currency = document.getElementById("from-currency");
let to_currency = document.getElementById("to-currency");
let display = document.getElementById("display");


async function getData() {
    try {
        let response = await axios(`https://v6.exchangerate-api.com/v6/c17d98857e0fe85965aa091d/latest/USD`);
        let data = await response.data.conversion_rates;

        for (let currency in data) {
            to_currency.innerHTML += `<option value="${currency}">${currency}</option>`;
            from_currency.innerHTML += `<option value="${currency}">${currency}</option>`;
        };

    } catch (err) { }
}

function updateFlags() {
    const fromFlag = document.getElementById("from-flag");
    const toFlag = document.getElementById("to-flag");

    const fromCode = currencyToCountry[from_currency.value];
    const toCode = currencyToCountry[to_currency.value];
    

    fromFlag.src = `https://flagcdn.com/24x18/${fromCode}.png`;
    toFlag.src = `https://flagcdn.com/24x18/${toCode}.png`;
};

from_currency.addEventListener('change', updateFlags);
to_currency.addEventListener('change', updateFlags);


async function convertCurrency() {
    try {
        let response = await axios(`https://v6.exchangerate-api.com/v6/c17d98857e0fe85965aa091d/pair/${from_currency.value}/${to_currency.value}`);
        let data = await response.data.conversion_rate;
        let result = data * amount.value;

        if (amount.value > 0) {
            display.innerHTML = `${amount.value} ${from_currency.value} = ${result.toFixed(2)} ${to_currency.value}`;
        } else {
            display.innerHTML = "Please Write The Amount...!!!"
        }

    } catch (err) { }
}

amount.addEventListener('input', () => {
    if (amount.value < 0) {
        amount.value = 1;
    }
});



function toggleTheme() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    icon.textContent = document.body.classList.contains('dark') ? '🌙' : '🌞';
};

window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        document.querySelector('footer').classList.add('show');
    } else {
        document.querySelector('footer').classList.remove('show');
    }
};

const ctx = document.getElementById('currencyChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
            label: 'Trend',
            data: [200, 210, 190, 220, 230],
            borderColor: '#1d2b64',
            backgroundColor: 'rgba(29, 43, 100, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

getData().then(updateFlags);