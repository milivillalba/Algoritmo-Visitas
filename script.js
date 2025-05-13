const correctSteps = [
  "Calentar el agua (sin hervir)",
  "Colocar yerba en el mate",
  "Humedecer la yerba con un poco de agua fría",
  "Poner la bombilla",
  "Servir el agua caliente"
];

let userSteps = [];
const codeBlock = document.getElementById("codeBlock");
const message = document.getElementById("message");
const realCodeContainer = document.getElementById("realCodeContainer");
const stepsContainer = document.getElementById("stepsContainer");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createSteps() {
  const shuffled = shuffle([...correctSteps]);
  stepsContainer.innerHTML = '';
  shuffled.forEach(stepText => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "step";
    stepDiv.textContent = stepText;
    stepDiv.dataset.step = stepText;
    stepDiv.addEventListener("click", () => selectStep(stepDiv));
    stepsContainer.appendChild(stepDiv);
  });
}

function selectStep(stepElement) {
  const selected = stepElement.dataset.step;
  if (userSteps.includes(selected)) return;

  userSteps.push(selected);
  stepElement.classList.add("selected");

  codeBlock.textContent = userSteps.map((s, i) => `${i + 1}. ${s}`).join("\n");

  if (userSteps.length === correctSteps.length) {
    const isCorrect = correctSteps.every((val, i) => val === userSteps[i]);
    if (isCorrect) {
      message.textContent = "🎉 ¡Lo lograste! Armás tu primer algoritmo 🧉";
      message.classList.add("success");
      realCodeContainer.classList.remove("hidden");
    } else {
      message.textContent = "Uy... parece que no era ese el orden 😅. ¡Probá otra vez!";
      message.classList.remove("success");
    }
  }
}

function resetGame() {
  userSteps = [];
  codeBlock.textContent = "// Aquí se mostrará el algoritmo...";
  message.textContent = "";
  message.classList.remove("success");
  realCodeContainer.classList.add("hidden");
  createSteps();
}

window.onload = () => {
  createSteps();
};
