function realLoading() {
    return new Promise((resolve) => {
        const percentageElement = document.getElementById("percentage");
        const loadingScreen = document.getElementById("loading-screen");
        const mainContent = document.getElementsByTagName("section");

        const resources = [
            { name: "HTML", size: 20 },
            { name: "CSS", size: 15 },
            { name: "JavaScript", size: 25 },
            { name: "Изображения", size: 40 },
        ];

        let currentProgress = 0;

        resources.forEach((resource, index) => {
            setTimeout(() => {
                currentProgress += resource.size;
                const percentage = Math.min(currentProgress, 100);
                percentageElement.textContent = percentage + "%";

                if (percentage === 100) {
                    setTimeout(() => {
                        loadingScreen.style.opacity = "0";
                        setTimeout(() => {
                            loadingScreen.style.display = "none";
                            for (const content of mainContent) {
                                content.style.display = "block";
                            }
                            resolve(); // Загрузка завершена
                        }, 500);
                    }, 500);
                }
            }, (index + 1) * 500);
        });
    });
}

function initCarAnimation() {
    const first = document.getElementById("one");
    const car = document.getElementsByClassName("car")[0];
    const rect = first.getBoundingClientRect();
    const firstBottom = rect.bottom;

    window.addEventListener("scroll", () => {
        if (window.scrollY > firstBottom - 400) {
            car.classList.add("car-active");
        }
    });
}

function initSamoletAnim() {
    const samolet = document.getElementsByClassName("four-samolet")[0];
    const line = document.getElementsByClassName("four-line")[0];

    window.addEventListener("scroll", () => {
        const lineRect = line.getBoundingClientRect();
        const startLine = lineRect.top;
        const endLine = lineRect.bottom;
        const lineHeight = lineRect.height;
        const middle = Math.floor(window.innerHeight / 2);

        // Если линия в зоне видимости
        if (startLine <= middle && endLine >= middle) {
            // Вычисляем прогресс скролла относительно линии
            const progress = (middle - startLine) / lineHeight;

            // Перемещаем самолетик по линии пропорционально скроллу
            const planePosition = progress * lineHeight;
            samolet.style.transform = `translate(-50%, ${
                planePosition - 25
            }px)`;
        }
        // Если дошли до начала линии
        else if (startLine > middle) {
            samolet.style.transform = `translate(-50%, -25px)`;
        }
        // Если проскроллили за конец линии
        else if (endLine < middle) {
            samolet.style.transform = `translate(-50%, ${lineHeight - 25}px)`;
        }
    });
}

// Инициализация
initSamoletAnim();

// Запускаем загрузку, затем инициализируем анимацию
window.addEventListener("load", async () => {
    await realLoading();
    initCarAnimation();
    initSamoletAnim();
});
