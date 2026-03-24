document.addEventListener('DOMContentLoaded', () => {
    // 1. Плавный скролл
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 2. Анимации
    AOS.init({ duration: 1200, once: false });

    // 3. Каталог домов
    const houses = [
        { name: "Scandi Wood", type: "Древесный", price: "12 500 000", desc: "Эко-резиденция из кедра." },
        { name: "Stone Peak", type: "Каменный", price: "18 900 000", desc: "Монолитная мощь в горах." },
        { name: "Glass Cube", type: "Современный", price: "15 200 000", desc: "Панорамное остекление." },
        { name: "Forest Villa", type: "Древесный", price: "11 800 000", desc: "Уют в глубине леса." },
        { name: "Brutal Rock", type: "Каменный", price: "19 500 000", desc: "Дикий камень и брутализм." },
        { name: "Neo Loft", type: "Современный", price: "14 100 000", desc: "Индустриальный шик." }
    ];

    const houseList = document.getElementById('house-list');
    houses.forEach(h => {
        houseList.innerHTML += `
            <div class="house-card" data-aos="fade-up">
                <div class="house-img"></div>
                <p style="opacity:0.5; font-size:0.7rem; text-transform:uppercase">${h.type}</p>
                <h3 style="font-family:Syne; margin:10px 0">${h.name}</h3>
                <p style="font-size:0.9rem; opacity:0.8">${h.desc}</p>
                <p class="price-tag">${h.price} ₽</p>
            </div>
        `;
    });

    // 4. Ипотека
    const pRange = document.getElementById('priceRange');
    const iRange = document.getElementById('initialRange');
    
    function updateCalc() {
        const p = parseInt(pRange.value);
        const i = parseInt(iRange.value);
        document.getElementById('priceLabel').innerText = p.toLocaleString();
        document.getElementById('initialLabel').innerText = i.toLocaleString();
        const monthly = (p - i) * 0.01 / (1 - Math.pow(1.01, -240));
        document.getElementById('monthlyResult').innerText = Math.round(monthly).toLocaleString() + ' ₽';
    }
    pRange.oninput = updateCalc;
    iRange.oninput = updateCalc;
    updateCalc();
});

// Конструктор
let basePrice = 10000000;
function selectOpt(btn, group) {
    btn.parentElement.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateTotal();
}
function toggleAddon(btn) {
    btn.classList.toggle('active');
    updateTotal();
}
function updateTotal() {
    let extra = 0;
    document.querySelectorAll('.opt-btn.active').forEach(b => extra += parseInt(b.dataset.add));
    const final = basePrice + extra;
    const el = document.getElementById('final-price');
    // Анимация цены
    const start = parseInt(el.innerText.replace(/\s/g, ''));
    let current = start;
    const step = (final - start) / 20;
    const interval = setInterval(() => {
        current += step;
        el.innerText = Math.round(current).toLocaleString();
        if (Math.abs(current - final) < Math.abs(step)) {
            el.innerText = final.toLocaleString();
            clearInterval(interval);
        }
    }, 30);
}

function openQuiz() {
    alert("Квиз запущен! Мы подберем идеальный дом Nolly для вас.");
}
