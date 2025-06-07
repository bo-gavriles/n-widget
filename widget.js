document.addEventListener("DOMContentLoaded", function () {
  const widgetContainer = document.getElementById("hdef-widget");
  if (!widgetContainer) return;

  const lang = widgetContainer.getAttribute("data-lang") || "en";

  fetch("events.json")
    .then(res => res.json())
    .then(data => {
      const langNews = data[lang] || data["en"];

      const style = document.createElement("style");
      style.textContent = `
        .hdef-track {
          display: flex;
          animation: hdef-scroll 60s linear infinite;
          gap: 1rem;
        }
        @keyframes hdef-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .hdef-card {
          flex: 0 0 auto;
          min-width: 280px;
          background: rgba(255,255,255,0.9);
          color: #000;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-left: 4px solid #6200ee;
        }
        .hdef-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .hdef-card p { font-size: 0.9rem; margin-bottom: 0.2rem; }
        .hdef-tags { font-size: 0.75rem; color: #555; }
      `;
      document.head.appendChild(style);

      const track = document.createElement("div");
      track.className = "hdef-track";

      langNews.forEach(({ title, desc, tags }) => {
        const card = document.createElement("div");
        card.className = "hdef-card";
        card.innerHTML = `<h3>${title}</h3><p>${desc}</p><p class='hdef-tags'>${tags}</p>`;
        track.appendChild(card);
      });

      const container = document.createElement("div");
      container.className = "overflow-hidden w-full max-w-5xl mx-auto";
      container.appendChild(track);

      widgetContainer.appendChild(container);
    })
    .catch(err => console.error("Failed to load events.json:", err));
});
