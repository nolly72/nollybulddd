// catalog.js — Данные и генерация карточек
const HOUSES_DATA = [
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

function renderHouses() {
    const houseList = document.getElementById('house-list');
    
    if (!houseList) {
        console.error("ОШИБКА: Элемент #house-list не найден!");
        return;
    }

    console.log("Начинаю генерацию каталога...");

    houseList.innerHTML = HOUSES_DATA.map((h, index) => `
        <div class="house-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="house-img" style="
                background-image: url('${h.img}'); 
                background-size: cover; 
                background-position: center; 
                background-color: #2a3d34; 
                height: 280px; 
                border-radius: 25px; 
                margin-bottom: 20px;">
            </div>
            <p style="opacity:0.5; font-size:0.7rem; text-transform:uppercase; font-weight: 800; letter-spacing: 1px;">
                ${h.type}
            </p>
            <h3 style="margin:10px 0; font-weight: 800; font-size: 1.5rem; font-family: 'Syne', sans-serif;">
                ${h.name}
            </h3>
            <p style="font-size:0.9rem; opacity:0.8; height:50px; overflow:hidden; line-height: 1.4;">
                ${h.desc}
            </p>
            <p class="price-tag" style="color: #C5A16F; font-weight: 800; font-size: 1.2rem; margin-top: 15px;">
                ${h.price} ₽
            </p>
        </div>
    `).join('');
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', renderHouses);

