document.addEventListener('DOMContentLoaded', () => {
    console.log("Nolly Building: Скрипт запущен");

    // 1. Плавный скролл Lenis
    try {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    } catch (e) {
        console.error("Ошибка Lenis:", e);
    }

    // 2. Анимации AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1200, once: false });
    }

    // 3. КАТАЛОГ (10 домов)
    const houses = [
        { name: "Eila Residence", type: "Древесный", price: "12 400 000", img: "assets/img/house1.jpg", desc: "Скандинавский уют из цельного бруса кедра." },
        { name: "Nordic Monolith", type: "Каменный", price: "18 100 000", img: "assets/img/house2.jpg", desc: "Брутальный минимализм из темного сланца." },
        { name: "Glass Ether", type: "Современный", price: "15 900 000", img: "assets/img/house3.jpg", desc: "Стеклянные стены, растворяющие интерьер в лесу." },
        { name: "Amber Lodge", type: "Древесный", price: "10 800 000", img: "assets/img/house4.jpg", desc: "Классическая эстетика альпийского шале." },
        { name: "Obsidian Rock", type: "Каменный", price: "21 500 000", img: "assets/img/house5.jpg", desc: "Крепость из базальта с винным погребом." },
        { name: "Skylight Loft", type: "Современный", price: "14 200 000", img: "assets/img/house6.jpg", desc: "Двухуровневое пространство с зенитной крышей." },
        { name: "Taiga Spirit", type: "Древесный", price: "13 600 000", img: "assets/img/house7.jpg", desc: "Массив лиственницы и натуральный камень." },
        { name: "Zen Garden", type: "Современный", price: "16 700 000", img: "assets/img/house8.jpg", desc: "Восточный минимализм с садом камней." },
        { name: "Iron Peak", type: "Каменный", price: "19 900 000", img: "assets/img/house9.jpg", desc: "Сочетание стали и гранита на склоне холма." },
        { name: "River Flow", type: "Современный", price: "17 500 000", img: "assets/img/house10.jpg", desc: "Обтекаемые формы над береговой линией." }
    ];

    const houseList = document.getElementById('house-list');
    if (houseList) {
        console.log("Контейнер для домов найден. Начинаю генерацию...");
        houseList.innerHTML = ''; // ОЧИСТКА
        houses.forEach((h, index) => {
            houseList.innerHTML += `
                <div class="house-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="house-img" style="background-image: url('${h.img}'); background-size: cover; background-position: center; background-color: #2a3d34; height: 280px; border-radius: 25px; margin-bottom: 20px;"></div>
                    <p style="opacity:0.5; font-size:0.7rem; text-transform:uppercase; font-weight: 800;">${h.type}</p>
                    <h3 style="margin:10px 0; font-weight: 800; font-size: 1.5rem;">${h.name}</h3>
                    <p style="font-size:0.9rem; opacity:0.8; height:50px; overflow:hidden;">${h.desc}</p>
                    <p class="price-tag" style="color: #C5A16F; font-weight: 800; font-size: 1.2rem; margin-top: 15px;">${h.price} ₽</p>
                </div>
            `;
        });
    } else {
        console.error("ОШИБКА: Элемент с id='house-list' не найден в HTML!");
    }

    // 4. Ипотечный калькулятор
    const pRange = document.getElementById('priceRange');
    const iRange = document.getElementById('initialRange');
    
    function updateCalc() {
        const priceLabel = document.getElementById('priceLabel');
        const initialLabel = document.getElementById('initialLabel');
        const monthlyResult = document.getElementById('monthlyResult');
        
        if (!pRange || !priceLabel) return;

        priceLabel.innerText = parseInt(pRange.value).toLocaleString();
        initialLabel.innerText = parseInt(iRange.value).toLocaleString();
        
        const monthly = (parseInt(pRange.value) - parseInt(iRange.value)) * 0.01 / (1 - Math.pow(1.01, -240));
        if (monthlyResult) monthlyResult.innerText = Math.round(monthly).toLocaleString() + ' ₽';
    }

    if (pRange && iRange) {
        pRange.addEventListener('input', updateCalc);
        iRange.addEventListener('input', updateCalc);
        updateCalc();
    }
});

// 5. КОНСТРУКТОР (Глобальные функции для кнопок)
let basePrice = 10000000;

window.selectOpt = function(btn) {
    console.log("Материал выбран:", btn.innerText);
    const parent = btn.parentElement;
    parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateTotal();
};

window.toggleAddon = function(btn) {
    console.log("Опция переключена:", btn.innerText);
    btn.classList.toggle('active');
    updateTotal();
};

function updateTotal() {
    let extra = 0;
    document.querySelectorAll('.opt-btn.active').forEach(btn => {
        const val = btn.getAttribute('data-add');
        if (val) extra += parseInt(val);
    });
    
    const targetPrice = basePrice + extra;
    animatePrice("final-price", targetPrice);
}

function animatePrice(id, end) {
    const obj = document.getElementById(id);
    if (!obj) return;
    const start = parseInt(obj.innerText.replace(/\s/g, '')) || 0;
    const duration = 600;
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

window.openQuiz = function() {
    alert("Квиз запущен! Ищем ваш идеальный дом.");
};
