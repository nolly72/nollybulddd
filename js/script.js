// 1. Данные о домах (удобно добавлять новые)
const houses = [
    { title: "Cedar Minimalist", price: "12.5 млн", img: "house1.jpg" },
    { title: "Stone Residence", price: "18.2 млн", img: "house2.jpg" },
    { title: "Glass Pavilion", price: "25.0 млн", img: "house3.jpg" }
];

// 2. Отрисовка каталога
const houseList = document.getElementById('house-list');
if(houseList) {
    houses.forEach(house => {
        houseList.innerHTML += `
            <div class="house-card">
                <div class="house-info">
                    <h3>${house.title}</h3>
                    <p>${house.price}</p>
                </div>
            </div>
        `;
    });
}

// 3. Калькулятор ипотеки
const priceRange = document.getElementById('priceRange');
const initialRange = document.getElementById('initialRange');

function updateCalc() {
    const price = priceRange.value * 1000000;
    const initial = initialRange.value * 1000000;
    document.getElementById('priceLabel').innerText = priceRange.value;
    document.getElementById('initialLabel').innerText = initialRange.value;
    
    // Простая формула (ставка 8%)
    const loan = price - initial;
    const monthly = Math.round((loan * (0.08 / 12))); 
    document.getElementById('monthlyResult').innerText = monthly.toLocaleString() + ' ₽';
}

priceRange?.addEventListener('input', updateCalc);
initialRange?.addEventListener('input', updateCalc);
