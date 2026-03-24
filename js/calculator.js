// --- Ипотечный калькулятор ---
function initMortgage() {
    const pRange = document.getElementById('priceRange');
    const iRange = document.getElementById('initialRange');
    
    // Проверка наличия элементов на странице
    if (!pRange || !iRange) return;

    const updateCalc = () => {
        const priceLabel = document.getElementById('priceLabel');
        const initialLabel = document.getElementById('initialLabel');
        const monthlyResult = document.getElementById('monthlyResult');

        const price = parseInt(pRange.value) || 0;
        const initial = parseInt(iRange.value) || 0;

        if (priceLabel) priceLabel.innerText = price.toLocaleString('ru-RU');
        if (initialLabel) initialLabel.innerText = initial.toLocaleString('ru-RU');

        // Расчет аннуитетного платежа (примерный: 12% годовых на 20 лет)
        const monthlyRate = 0.01; 
        const months = 240;
        const loanAmount = price - initial;

        if (loanAmount > 0) {
            const monthly = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
            if (monthlyResult) monthlyResult.innerText = Math.round(monthly).toLocaleString('ru-RU') + ' ₽';
        } else if (monthlyResult) {
            monthlyResult.innerText = '0 ₽';
        }
    };

    pRange.addEventListener('input', updateCalc);
    iRange.addEventListener('input', updateCalc);
    updateCalc();
}

// --- Конструктор цены (10 материалов + 10 опций) ---
let basePrice = 10000000;

// Выбор одного материала
window.selectOpt = function(btn) {
    if (!btn) return;
    const parent = btn.parentElement;
    parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateTotal();
};

// Переключение доп. опций
window.toggleAddon = function(btn) {
    if (!btn) return;
    btn.classList.toggle('active');
    updateTotal();
};

function updateTotal() {
    let extra = 0;
    // Считаем все активные кнопки в конструкторе
    document.querySelectorAll('#constructor .opt-btn.active').forEach(btn => {
        const val = btn.getAttribute('data-add');
        if (val) extra += parseInt(val);
    });
    
    animatePrice("final-price", basePrice + extra);
}

// Плавная анимация цифр
function animatePrice(id, end) {
    const obj = document.getElementById(id);
    if (!obj) return;

    // Улучшенная очистка строки от любых нечисловых символов (пробелы, ₽ и т.д.)
    const start = parseInt(obj.innerText.replace(/\D/g, '')) || 0;
    const duration = 600;
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(ease * (end - start) + start);
        
        obj.innerText = current.toLocaleString('ru-RU');
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Единая точка входа
document.addEventListener('DOMContentLoaded', () => {
    initMortgage();
    updateTotal();
});
