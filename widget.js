(async function () {
  const container = document.getElementById("hdef-widget-container");

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "style.css";
  document.head.appendChild(style);

  try {
    const res = await fetch("events.json");
    const events = await res.json();

    const river = document.createElement("div");
    river.className = "hdef-river";

    for (const ev of events) {
      const date = ev.Date || "";
      const title = ev.Title || "Без заголовка";
      const tag = ev.Tag || "";

      const card = document.createElement("div");
      card.className = "hdef-card";
      card.innerHTML = `
        <h4>${title}</h4>
        <p style="font-size:0.75rem; color:#aaa;">${date}</p>
        <p style="font-size:0.75rem; color:#60a5fa;">${tag}</p>
      `;
      river.appendChild(card);
    }

    container.appendChild(river);
  } catch (err) {
    console.error("Ошибка загрузки или обработки JSON:", err);
    container.innerHTML = `<div class="hdef-error">⚠️ Ошибка загрузки новостей</div>`;
  }
})();
