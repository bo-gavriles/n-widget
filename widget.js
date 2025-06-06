(async function () {
  const container = document.getElementById("hdef-widget-container");

  // Подключаем стили
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "style.css";
  document.head.appendChild(style);

  try {
    const res = await fetch("events.json");
    if (!res.ok) throw new Error("Ошибка загрузки JSON");
    const events = await res.json();

    const river = document.createElement("div");
    river.className = "hdef-river";

    for (const ev of events) {
      const title = ev.title || "Без заголовка";
      const desc = ev.desc || "";
      const tag = ev.tag || "";
      const date = ev.date || ""; // опционально, если в JSON есть поле `date`

      const card = document.createElement("div");
      card.className = "hdef-card";
      card.innerHTML = `
        <div class="hdef-card-header">
          <h4>${title}</h4>
          <span class="hdef-date">${date}</span>
        </div>
        <p>${desc}</p>
        <p class="hdef-tags">${tag}</p>
      `;
      river.appendChild(card);
    }

    container.appendChild(river);
  } catch (error) {
    console.error("Не удалось загрузить события:", error);
    container.innerHTML = `<div class="hdef-error">Ошибка загрузки новостей</div>`;
  }
})();
