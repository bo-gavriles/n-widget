document.addEventListener("DOMContentLoaded", () => {
  const river = document.getElementById("news-river");
  if (!river) return;

  fetch("events.json")
    .then(res => res.json())
    .then(newsData => {
      // создаем контейнер для скролла
      const track = document.createElement("div");
      track.className = "scrolling-track";

      // создаем карточки новостей
      newsData.forEach(item => {
        const card = document.createElement("div");
        card.className = "news-item";
        card.innerHTML = `
          <span class="news-emoji">${item.emoji}</span>
          <span class="news-text">${item.text}</span>
          <span class="news-tags">${item.tags.join(", ")}</span>
        `;
        track.appendChild(card);
      });

      // дублируем для плавного бесконечного скролла
      track.appendChild(track.cloneNode(true));

      river.appendChild(track);
    })
    .catch(err => console.error("Error loading events.json:", err));
});
