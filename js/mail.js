document.addEventListener('DOMContentLoaded', () => {
    // 1. Плавный скролл
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 2. Анимации
    AOS.init({ duration: 1200 });

    // 3. Данные домов
    const houses = [
        { name: "Scandi Wood", type: "Древесный", price: "12 500 000", desc: "Минимализм из сибирского кедра." },
        { name: "Stone Peak", type: "Каменный", price: "18 900 000", desc: "Монолитная мощь и панорамный вид." },
        { name: "Glass Cube", type: "Современный", price: "15 200 000", desc: "Максимум света и открытых пространств." },
        { name: "Forest Villa", type: "Древесный", price: "11 800 000", desc: "Уютный дом, утопающий в хвое." },
        { name: "Brutal Rock", type: "Каменный", price: "19 500 000", desc: "Скала среди лесного массива." },
        { name: "Neo Loft", type: "Современный", price: "14 100 000", desc: "Индустриальный шик в гармонии с природой." }
    ];

    const houseList = document.getElementById('house-list');
    houses.forEach(h => {
        houseList.innerHTML += `
            <div class="house-card" data-aos="fade-up">
                <div class="house-img"></div>
                <p style="opacity:0.6; font-size: 0.8rem">${h.type}</p>
                <h3>${h.name}</h3>
                <p style="margin-bottom:20px">${h.desc}</p>
                <p class="price-tag">${h.price} ₽</p>
            </div>
        `;
    });

    // 4. Калькулятор
    const pRange = document.getElementById('priceRange');
    const iRange = document.getElementById('initialRange');
    
    function calc() {
        const p = parseInt(pRange.value);
        const i = parseInt(iRange.value);
        document.getElementById('priceLabel').innerText = p.toLocaleString();
        document.getElementById('initialLabel').innerText = i.toLocaleString();
        
        const monthly = (p - i) * 0.012 / (1 - Math.pow(1.012, -240));
        document.getElementById('monthlyResult').innerText = Math.round(monthly).toLocaleString() + ' ₽';
    }

    pRange.addEventListener('input', calc);
    iRange.addEventListener('input', calc);
    calc();
});

function openQuiz() {
    alert("Квиз: 1. Какой стиль вам ближе? 2. Количество спален? (В реальном проекте здесь будет модальное окно)");
}
