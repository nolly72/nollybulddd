document.addEventListener('DOMContentLoaded', () => {
    // 1. Плавный скролл Lenis (делает прокрутку "масляной")
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Инициализация анимаций появления при скролле
    AOS.init({ 
        duration: 1200, 
        once: false,
        mirror: true 
    });

    // 3. Каталог резиденций (Пути ведут в твою папку assets/img/)
    const houses = [
        { name: "Eila Residence", type: "Древесный", price: "12 400 000", img: "assets/img/house1.jpg", desc: "Скандинавский уют из цельного бруса кедра с террасой на закат." },
        { name: "Nordic Monolith", type: "Каменный", price: "18 100 000", img: "assets/img/house2.jpg", desc: "Брутальный минимализм из темного сланца и панорамного остекления." },
        { name: "Glass Ether", type: "Современный", price: "15 900 000", img: "assets/img/house3.jpg", desc: "Дом без границ: стеклянные стены, растворяющие интерьер в лесу." },
        { name: "Amber Lodge", type: "Древесный", price: "10 800 000", img: "assets/img/house4.jpg", desc: "Классическая эстетика альпийского шале в современной интерпретации." },
        { name: "Obsidian Rock", type: "Каменный", price: "21 500 000", img: "assets/img/house5.jpg", desc: "Крепость из базальта с подземным винным погребом и SPA-зоной." },
        { name: "Skylight Loft", type: "Современный", price: "14 200 000", img: "assets/img/house6.jpg", desc: "Двухуровневое пространство с зенитной крышей и открытой планировкой." },
        { name: "Taiga Spirit", type: "Древесный", price: "13 600 000", img: "assets/img/house7.jpg", desc: "Массив лиственницы и натуральный камень в отделке каминного зала." },
        { name: "Zen Garden", type: "Современный", price: "16 700 000", img: "assets/img/house8.jpg", desc: "Восточный минимализм с внутренним двориком и садом камней." },
        { name: "Iron Peak", type: "Каменный", price: "19 900 000", img: "assets/img/house9.jpg", desc: "Сочетание кортеновской стали и дикого гранита на склоне холма." },
        { name: "River Flow", type: "Современный", price: "17 500 000", img: "assets/img/house10.jpg", desc: "Обтекаемые формы и каскадные террасы над береговой линией." }
    ];

    const houseList = document.getElementById('house-list');
    if(houseList) {
        houses.forEach(h => {
            houseList.innerHTML += `
                <div class="house-card" data-aos="fade-up">
                    <div class="house-img" style="background-image: url('${h.img}'); background-size: cover; background-position: center; background-color: #2a3d34;"></div>
                    <p style="opacity:0.5; font-size:0.7rem; text-transform:uppercase; letter-spacing:1px">${h.type}</p>
                    <h3 style="font-family:Syne; margin:10px 0">${h.name}</h3>
                    <p style="font-size:0.9rem; opacity:0.8; height:60px; overflow:hidden">${h.desc}</p>
                    <p class="price-tag">${h.price} ₽</p>
                </div>
            `;
        });
    }

    // 4. Логика ипотечного калькулятора
    const pRange = document.getElementById('priceRange');
    const iRange = document.getElementById('initialRange');
    
    function updateCalc() {
        const p = parseInt(pRange.value);
        const i = parseInt(iRange.value);
        
        const priceLabel = document.getElementById('priceLabel');
        const initialLabel = document.getElementById('initialLabel');
        const monthlyResult = document.getElementById('monthlyResult');

        if(priceLabel) priceLabel.innerText = p.toLocaleString();
        if(initialLabel) initialLabel.innerText = i.toLocaleString();
        
        // Примерный расчет платежа (10% годовых на 20 лет)
        const monthly = (p - i) * 0.01 / (1 - Math.pow(1.01, -240));
        if(monthlyResult) monthlyResult.innerText = Math.round(monthly).toLocaleString() + ' ₽';
    }

    if(pRange && iRange) {
        pRange.oninput = updateCalc;
        iRange.oninput = updateCalc;
        updateCalc();
    }
});

// 5. Логика конструктора (Вынесена из DOMContentLoaded для доступа из HTML)
let basePrice = 10000000;

function selectOpt(btn) {
    // Групповой выбор (только одна кнопка активна)
    btn.parentElement.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateTotal();
}

function toggleAddon(btn) {
    // Множественный выбор (вкл/выкл)
    btn.classList.toggle('active');
    updateTotal();
}

function updateTotal() {
    let extra = 0;
    // Считаем все кнопки с классом active
    document.querySelectorAll('.opt-btn.active').forEach(btn => {
        const val = btn.getAttribute('data-add');
        if(val) extra += parseInt(val);
    });
    
    const targetPrice = basePrice + extra;
    animatePrice("final-price", targetPrice);
}

// Плавный пересчет цифр
function animatePrice(id, end) {
    const obj = document.getElementById(id);
    if(!obj) return;

    const start = parseInt(obj.innerText.replace(/\s/g, '')) || 0;
    const duration = 800;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Выход из анимации более плавный
        const current = Math.floor(ease * (end - start) + start);
        
        obj.innerText = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// 6. Квиз
function openQuiz() {
    alert("Квиз Nolly Building запущен! Мы подготовим персональное предложение на основе ваших ответов.");
}
