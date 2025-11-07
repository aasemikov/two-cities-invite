document.getElementById("button").addEventListener("click", async function () {
    const guestName = document.getElementById("name").value;
    const additionalGuests = document.getElementById("with").value;
    const yourServerUrl = "https://api.wedding.sem-a.ru/guests";

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
            alert("Отлично! Ваш ответ записан.");
            document.getElementById("name").value = "";
            document.getElementById("with").value = "";
        } else {
            alert("Ошибка: " + result.error);
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка сети. Попробуйте еще раз.");
    }
});
