document.addEventListener("DOMContentLoaded", () => {
    const first = document.getElementById("one");
    const car = document.getElementsByClassName("car")[0];
    const rect = first.getBoundingClientRect();
    const firstBottom = rect.bottom;

    window.addEventListener("scroll", () => {
        if (window.scrollY > firstBottom - 400) {
            car.classList.add("car-active");
        }
    });
});
