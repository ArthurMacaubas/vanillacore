const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
const message = document.getElementById("message");

const messages = [
  "Iniciando processo...",
  "Analizando pedido...",
  "Fabricando pedido...",
  "Trasportando pedido...",
  "Pedido entregue! 🍨"
];

let currentStep = 1;

next.addEventListener("click", () => {
  currentStep++;
  if (currentStep > circles.length) currentStep = circles.length;
  update();
});

prev.addEventListener("click", () => {
  currentStep--;
  if (currentStep < 1) currentStep = 1;
  update();
});

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll(".active");
  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  prev.disabled = currentStep === 1;
  next.disabled = currentStep === circles.length;

  message.textContent = messages[currentStep - 1];
}