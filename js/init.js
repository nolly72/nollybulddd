// Инициализация библиотек
document.addEventListener('DOMContentLoaded', () => {
    // Плавный скролл Lenis
    try {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    } catch (e) {
        console.warn("Lenis не подключен");
    }

    // Анимации AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1200, once: false });
    }
});
