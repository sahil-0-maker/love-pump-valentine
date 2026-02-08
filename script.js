
// PAGE 1 – HEART PUMP


let size = 80;
let progress = 0;

const heart = document.getElementById("heart");
const bar = document.getElementById("progressBar");
const pump = document.getElementById("pump");

if (pump && heart && bar) {
  pump.addEventListener("click", () => {
    size += 20;
    progress += 10;

    heart.style.width = size + "px";
    heart.style.height = size + "px";
    bar.style.width = progress + "%";

    if (progress >= 100) {
      setTimeout(() => {
        window.location.href = "puzzle.html";
      }, 600);
    }
  });
}


// STORY SECTION (Images + Text)

const texts = [
  "Hey beautiful ❤️",
  "We've made so many beautiful memories together",
  "You make me smile every single day",
  "So… I have a question"
];

const images = [
  "assets/img1.jpeg",
  "assets/img2.jpeg",
  "assets/img3.jpeg",
  "assets/img4.jpg"
];

let index = 0;

const textEl = document.getElementById("storyText");
const imgEl = document.getElementById("storyImage");
const nextBtn = document.getElementById("nextBtn");
const questionSection = document.getElementById("questionSection");
const resultSection = document.getElementById("resultSection");

if (nextBtn && textEl && imgEl) {
  nextBtn.addEventListener("click", () => {
    index++;

    if (index < texts.length) {
      textEl.innerText = texts[index];
      imgEl.src = images[index];
    } else {
      textEl.style.display = "none";
      imgEl.style.display = "none";
      nextBtn.style.display = "none";

      if (questionSection) {
        questionSection.style.display = "block";
      }
    }
  });
}

// YES / NO LOGIC (Fixed)

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons");

let yesScale = 1;

// Set initial position so it never disappears
if (noBtn) {
  noBtn.style.left = "10px";
  noBtn.style.top = "60px";
}

noBtn?.addEventListener("mouseenter", () => {
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10;

  const maxX = containerRect.width - btnRect.width - padding;
  const maxY = containerRect.height - btnRect.height - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  // Grow YES button
  yesScale += 0.1;
  if (yesBtn) {
    yesBtn.style.transform = `scale(${yesScale})`;
  }
});


// YES CLICK → RESULT + FIREWORKS

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    if (questionSection) questionSection.style.display = "none";
    if (resultSection) resultSection.style.display = "block";
    startFireworks();
  });
}


// FIREWORKS

function startFireworks() {
  const canvas = document.getElementById("fireworks");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  function createFirework(x, y) {
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: x,
        y: y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 1,
        life: 60
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`;
      ctx.fill();

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  setInterval(() => {
    createFirework(
      Math.random() * canvas.width,
      Math.random() * canvas.height / 2
    );
  }, 500);

  animate();
}
