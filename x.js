// x.js
import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js").then(() => {
  const botToken = "8019441613:AAGvcrVmKwdq4YKgWWQgDxC4zmtM9-HR-CQ";
  const chatId = "6342951618"; // Замени, если нужно
  // Кнопка-помощник
  const helperBtn = document.createElement("div");
  helperBtn.innerText = "🤖";
  helperBtn.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #007aff;
    color: white;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    cursor: pointer;
    z-index: 99999;
  `;
  document.body.appendChild(helperBtn);

  helperBtn.addEventListener("click", async () => {
    helperBtn.innerText = "⌛";

    const canvas = await html2canvas(document.body);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

    // Создание модального окна
    const modal = document.createElement("div");
    modal.style = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      z-index: 100000;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
    `;

    modal.innerHTML = `
      <div style="margin-bottom:10px;">Введите ваш ответ:</div>
      <input id="tg-answer" style="width: 100%; padding: 5px;" placeholder="Ответ..."/>
      <button id="send-to-tg" style="margin-top: 10px; padding: 5px 10px;">📤 Отправить</button>
    `;
    document.body.appendChild(modal);

    document.getElementById("send-to-tg").onclick = async () => {
      const answer = document.getElementById("tg-answer").value;

      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("photo", blob, "screenshot.png");
      form.append("caption", answer);

      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: form,
      });

      modal.remove();
      helperBtn.innerText = "✅";
      setTimeout(() => helperBtn.innerText = "🤖", 3000);
    };
  });
});
