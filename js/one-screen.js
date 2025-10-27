document.addEventListener("DOMContentLoaded", () => {
  const lesha = document.getElementsByClassName("one-lesha")[0];
  const nastya = document.getElementsByClassName("one-nastya")[0];
  const info = document.getElementsByClassName("one-info")[0];

  const height = 1500;
  let animationCompleted = false;
  let animationUp = true;
  let rotateLesha = "";
  let translateXLesha = "";
  let rotateNastya = "";
  let translateXNastya = "";

  // Для отслеживания анимации через каждые 50px
  let lastScrollForAnimation = 0;
  const animationInterval = 100;

  window.addEventListener("scroll", () => {
    if (animationCompleted) {
      return;
    }

    const scrollBottom = window.scrollY + window.innerHeight;

    // Вычисляем прогресс скролла (от 0 до 1), гарантируем завершение на 1
    let progress = Math.min(scrollBottom / height, 1);

    if (scrollBottom >= height && progress < 1) {
      progress = 1;
    }

    console.log(progress);

    // Логика анимации (перемещение + повороты) через каждые 50px
    if (Math.abs(scrollBottom - lastScrollForAnimation) >= animationInterval) {
      // Дискретное перемещение (каждые 50px)
      translateXLesha = -100 + 20 * progress; // -100 → -80
      translateXNastya = 100 - 20 * progress;

      const leftPositionLesha = 0 + 50 * progress; // 0% → 50%
      const rightPositionNastya = 0 + 50 * progress;

      // Повороты
      if (animationUp) {
        rotateLesha = `5deg`;
        rotateNastya = `-5deg`;
        animationUp = false;
        info.style.display = "none";
      } else {
        rotateLesha = `-5deg`;
        rotateNastya = `5deg`;
        animationUp = true;
        info.style.display = "block";
      }

      // Применяем трансформации
      lesha.style.left = `${leftPositionLesha}%`;
      lesha.style.transform = `rotate(${rotateLesha}) translate(${translateXLesha}%, -50%)`;

      nastya.style.right = `${rightPositionNastya}%`;
      nastya.style.transform = `rotate(${rotateNastya}) translate(${translateXNastya}%, -50%)`;

      lastScrollForAnimation = scrollBottom;
    }

    if (progress >= 1) {
      animationCompleted = true;
      lesha.style.transform = `translate(${-80}%, -50%)`;
      nastya.style.transform = `translate(${80}%, -50%)`;
      console.log("Анимация завершена!");
    }
  });
});
