document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.altKey) {
        let miniWindow = document.getElementById("miniWindow");
        miniWindow.style.display = miniWindow.style.display === "none" ? "block" : "none";
    }
});

window.addEventListener("beforeunload", function () {
    fetch("/deactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "123" })
    });
});

async function activateSession() {
    await fetch("/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "123" })
    });
}

async function askGPT() {
    let question = document.getElementById("question").value;
    let response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "123", question: question })
    });
    let data = await response.json();
    document.getElementById("answer").innerText = data.answer;
}

// Активируем сессию при загрузке
activateSession();
