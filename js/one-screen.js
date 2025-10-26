document.addEventListener("DOMContentLoaded", () => {
    const lesha = document.getElementsByClassName("one-lesha")[0];
    const nastya = document.getElementsByClassName("one-nastya")[0];
    const info = document.getElementsByClassName("one-info")[0];

    const height = 1250;
    let animationCompleted = false;
    let animationUp = true;
    let rotateLesha = "";
    let translateXLesha = "";
    let rotateNastya = "";
    let translateXNastya = "";
    let lastScrollBottom = 0;
    const threshold = 100;

    window.addEventListener("scroll", () => {
        if (animationCompleted) {
            return;
        }

        const scrollBottom = window.scrollY + window.innerHeight;

        if (Math.abs(scrollBottom - lastScrollBottom) >= threshold) {
            // Вычисляем прогресс скролла (от 0 до 1)
            const progress = Math.min(scrollBottom / height, 1);

            // Интерполируем значение translate от -100% до -80%
            translateXLesha = -100 + 20 * progress; // -100 → -80
            translateXNastya = 100 - 20 * progress;

            // Интерполируем значение left от 0% до 50%
            const leftPositionLesha = 0 + 50 * progress; // 0% → 50%
            const rightPositionNastya = 0 + 50 * progress;

            if (animationUp) {
                rotateLesha = `5deg`;
                rotateNastya = `-5deg`;
                animationUp = false;
                info.style.display = 'none';
            } else {
                rotateLesha = `-5deg`;
                rotateNastya = `5deg`;
                animationUp = true;
                info.style.display = 'block';
            }

            lesha.style.left = `${leftPositionLesha}%`;
            lesha.style.transform = `rotate(${rotateLesha}) translate(${translateXLesha}%, -50%)`;

            nastya.style.right = `${rightPositionNastya}%`;
            nastya.style.transform = `rotate(${rotateNastya}) translate(${translateXNastya}%, -50%)`;

            lastScrollBottom = scrollBottom;
        }

        if (scrollBottom > height) {
            animationCompleted = true;
            rotate = `5deg`;
            lesha.style.transform = `rotate(${rotateLesha}) translate(${translateXLesha}%, -50%)`;
            console.log("Анимация завершена!");
        }
    });
});
