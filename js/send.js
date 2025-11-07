document.getElementById("button").addEventListener("click", async function () {
    const guestName = document.getElementById("name").value;
    const additionalGuests = document.getElementById("with").value;
    const yourServerUrl = "https://api.wedding.sem-a.ru/guests";

    // Проверка заполнения обязательных полей
    if (!guestName.trim()) {
        alert("Пожалуйста, введите ваше имя");
        return;
    }

    const formData = {
        name: guestName,
        with_guests: additionalGuests,
    };

    try {
        const response = await fetch(yourServerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            // Перенаправляем на страницу успеха с именем гостя
            window.location.href = `success.html?status=success&name=${encodeURIComponent(
                guestName
            )}`;
        } else {
            // Перенаправляем на страницу ошибки
            window.location.href = `success.html?status=error&error=${encodeURIComponent(
                result.error || "Неизвестная ошибка"
            )}`;
        }
    } catch (error) {
        console.error("Ошибка:", error);
        // Перенаправляем на страницу ошибки при проблемах с сетью
        window.location.href = `success.html?status=error&error=${encodeURIComponent(
            "Ошибка сети. Попробуйте еще раз."
        )}`;
    }
});
