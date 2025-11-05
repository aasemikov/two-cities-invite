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

// Запускаем загрузку, затем инициализируем анимацию
window.addEventListener("load", async () => {
    await realLoading();
    initCarAnimation();
});
