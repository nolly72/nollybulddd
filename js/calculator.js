// --- Ипотечный калькулятор ---
function initMortgage() {
    const pRange = document.getElementById('priceRange');
    const iRange = document.getElementById('initialRange');
    if (!pRange || !iRange) return;

    const updateCalc = () => {
        const priceLabel = document.getElementById('priceLabel');
        const initialLabel = document.getElementById('initialLabel');
        const monthlyResult = document.getElementById('monthlyResult');

        const price = parseInt(pRange.value);
        const initial = parseInt(iRange.value);

        if (priceLabel) priceLabel.innerText = price.toLocaleString('ru-RU');
        if (initialLabel) initialLabel.innerText = initial.toLocaleString('ru-RU');

        // Формула: (Тело кредита * Ставка) / (1 - (1 + Ставка)^-Срок)
        // Ставка 1% в месяц (12% годовых), Срок 240 месяцев (20 лет)
        const monthly = (price - initial) * 0.01 / (1 - Math.pow(1.01, -240));
        if (monthlyResult) monthlyResult.innerText = Math.round(monthly).toLocaleString('ru-RU') + ' ₽';
    };

    [pRange, iRange].forEach(el => el.addEventListener('input', updateCalc));
    updateCalc();
}

// --- Конструктор цены (Расширенный) ---
let basePrice = 10000000;

// Выбор материала (только один активный в группе)
window.selectOpt = function(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateTotal();
};

// Переключение доп. опций (множественный выбор)
window.toggleAddon = function(btn) {
    btn.classList.toggle('active');
    updateTotal();
};

function updateTotal() {
    let extra = 0;
    // Собираем все значения data-add у активных кнопок
    document.querySelectorAll('.opt-btn.active').forEach(btn => {
        const val = btn.getAttribute('data-add');
        if (val) extra += parseInt(val);
    });
    
    animatePrice("final-price", basePrice + extra);
}

// Плавная анимация изменения цифр
function animatePrice(id, end) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    // Очищаем текущее значение от пробелов для расчетов
    const start = parseInt(obj.innerText.replace(/\s/g, '')) || 0;
    const duration = 600;
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Из замедления в конце
        const current = Math.floor(ease * (end - start) + start);
        
        obj.innerText = current.toLocaleString('ru-RU');
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initMortgage();
    updateTotal(); // Считаем начальную цену (база + выбранный Кедр)
});
