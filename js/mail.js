document.addEventListener('DOMContentLoaded', () => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 2. AOS Animations
    AOS.init({ duration: 1200, once: false });

    // 3. Дома (Каталог)
    const houses = [
        { name: "Eila Residence", type: "Древесный", price: "12 400 000", img: "assets/img/house1.jpg", desc: "Минимализм из кедра." },
        { name: "Nordic Monolith", type: "Каменный", price: "18 100 000", img: "assets/img/house2.jpg", desc: "Брутальный сланец." },
        { name: "Glass Ether", type: "Современный", price: "15 900 000", img: "assets/img/house3.jpg", desc: "Стекло и свет." }
        // Добавь остальные 7 домов по аналогии
    ];

    const houseList = document.getElementById('house-list');
    if(houseList) {
        houses.forEach(h => {
            houseList.innerHTML += `
                <div class="house-card" data-aos="fade-up">
                    <div class="house-img" style="background-image: url('${h.img}'); background-size: cover; background-position: center;"></div>
                    <p style="opacity:0.6; font-size:0.7rem; font-weight:700; text-transform:uppercase">${h.type}</p>
                    <h3 style="margin:10px 0; font-weight:800">${h.name}</h3>
                    <p style="font-size:0.9rem; opacity:0.8; margin-bottom:15px">${h.desc}</p>
                    <p class="price-tag">${h.price} ₽</p>
                </div>
            `;
        });
    }

    // 4. Калькулятор
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

    if(pRange) {
        pRange.oninput = updateCalc;
        iRange.oninput = updateCalc;
        updateCalc();
    }
});

// 5. КОНСТРУКТОР (Рабочая логика)
let basePrice = 10000000;

function selectOpt(btn) {
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
    // Считаем все активные кнопки
    document.querySelectorAll('.opt-btn.active').forEach(btn => {
        extra += parseInt(btn.getAttribute('data-add') || 0);
    });
    
    const finalTotal = basePrice + extra;
    animatePrice("final-price", finalTotal);
}

function animatePrice(id, end) {
    const obj = document.getElementById(id);
    const start = parseInt(obj.innerText.replace(/\s/g, '')) || 0;
    const duration = 800;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * (end - start) + start);
        obj.innerText = current.toLocaleString('ru-RU');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function openQuiz() { alert("Квиз Nolly запущен!"); }
