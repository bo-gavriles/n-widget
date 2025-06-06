(async function () {
  const container = document.getElementById("hdef-widget-container");

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "style.css";
  document.head.appendChild(style);

  const res = await fetch("events.json");
  const events = await res.json();

  const river = document.createElement("div");
  river.className = "hdef-river";

  for (const ev of events) {
    const card = document.createElement("div");
    card.className = "hdef-card";
    card.innerHTML = `
      <h4>${ev.title}</h4>
      <p>${ev.desc}</p>
      <p style="font-size:0.75rem; color:#60a5fa;">${ev.tag}</p>
    `;
    river.appendChild(card);
  }

  container.appendChild(river);
})();
