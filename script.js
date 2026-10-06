const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const startOverlay = document.getElementById("startOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");
const finalTime = document.getElementById("finalTime");

const keys = { left: false, right: false };
let animationId = null;
let running = false;
let lastTime = 0;
let elapsed = 0;
let score = 0;
let obstacles = [];
let particles = [];
let stars = [];
let best = Number(localStorage.getItem("neonDodgeBest") || 0);

const player = { x: 0, y: 0, w: 34, h: 48, speed: 390 };

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  player.y = rect.height - 88;
  if (!player.x) player.x = rect.width / 2;
  stars = Array.from({length: Math.max(50, Math.floor(rect.width / 10))}, () => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    size: Math.random() * 1.7 + .3,
    speed: Math.random() * 20 + 8
  }));
}
window.addEventListener("resize", resize);
resize();
bestEl.textContent = String(best).padStart(5, "0");

function resetGame() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  player.x = w / 2;
  player.y = h - 88;
  elapsed = 0;
  score = 0;
  obstacles = [];
  particles = [];
  lastTime = performance.now();
  scoreEl.textContent = "00000";
  timeEl.textContent = "00.0";
}

function spawnObstacle() {
  const w = canvas.clientWidth;
  const size = 24 + Math.random() * 30;
  obstacles.push({
    x: size + Math.random() * (w - size * 2),
    y: -size,
    size,
    speed: 165 + elapsed * 4.2 + Math.random() * 75,
    angle: Math.random() * Math.PI,
    spin: (Math.random() - .5) * 3
  });
}

function addExplosion(x, y) {
  for (let i = 0; i < 38; i++) {
    const a = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 260;
    particles.push({
      x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
      life: .5 + Math.random() * .6, max: 1
    });
  }
}

function collision(o) {
  const px = player.x, py = player.y;
  return Math.abs(o.x - px) < (o.size + player.w) * .45 &&
         Math.abs(o.y - py) < (o.size + player.h) * .45;
}

function drawBackground(dt) {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#07031a"); g.addColorStop(1, "#010107");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  stars.forEach(s => {
    s.y += s.speed * dt;
    if (s.y > h) { s.y = -3; s.x = Math.random() * w; }
    ctx.fillStyle = "rgba(150, 125, 255, .5)";
    ctx.fillRect(s.x, s.y, s.size, s.size);
  });

  const horizon = h * .56;
  ctx.strokeStyle = "rgba(105, 75, 200, .18)";
  ctx.lineWidth = 1;

  for (let y = horizon; y < h + 100; y += 38) {
    const perspective = (y - horizon) / (h - horizon);
    const yy = y + perspective * perspective * 40;
    ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(w, yy); ctx.stroke();
  }

  for (let x = -w; x <= w * 2; x += 70) {
    ctx.beginPath();
    ctx.moveTo(w / 2, horizon);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(w/2, horizon, 5, w/2, horizon, w*.55);
  glow.addColorStop(0, "rgba(95,252,255,.13)");
  glow.addColorStop(1, "rgba(95,252,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.shadowBlur = 28;
  ctx.shadowColor = "#5ffcff";

  ctx.beginPath();
  ctx.moveTo(0, -player.h/2);
  ctx.lineTo(player.w/2, player.h/2);
  ctx.lineTo(0, player.h/3);
  ctx.lineTo(-player.w/2, player.h/2);
  ctx.closePath();
  ctx.fillStyle = "#5ffcff";
  ctx.fill();

  ctx.shadowBlur = 12;
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(0, -5, 5, 0, Math.PI*2); ctx.fill();

  ctx.fillStyle = "rgba(255,79,216,.8)";
  ctx.beginPath(); ctx.moveTo(-8, player.h/2); ctx.lineTo(0, player.h/2 + 20); ctx.lineTo(8, player.h/2); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawObstacle(o) {
  ctx.save();
  ctx.translate(o.x, o.y);
  ctx.rotate(o.angle);
  ctx.shadowBlur = 22;
  ctx.shadowColor = "#ff4fd8";
  ctx.strokeStyle = "#ff4fd8";
  ctx.fillStyle = "rgba(255,79,216,.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    const r = o.size * (i % 2 ? .72 : 1);
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

function update(dt) {
  const w = canvas.clientWidth;
  const move = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  player.x += move * player.speed * dt;
  player.x = Math.max(24, Math.min(w - 24, player.x));

  elapsed += dt;
  score = Math.floor(elapsed * 100);
  scoreEl.textContent = String(score).padStart(5, "0");
  timeEl.textContent = elapsed.toFixed(1).padStart(4, "0");

  const spawnInterval = Math.max(.34, .9 - elapsed * .008);
  if (!update.spawnTimer) update.spawnTimer = 0;
  update.spawnTimer -= dt;
  if (update.spawnTimer <= 0) {
    spawnObstacle();
    update.spawnTimer = spawnInterval;
  }

  obstacles.forEach(o => {
    o.y += o.speed * dt;
    o.angle += o.spin * dt;
  });
  obstacles = obstacles.filter(o => o.y < canvas.clientHeight + 80);

  for (const o of obstacles) {
    if (collision(o)) {
      addExplosion(player.x, player.y);
      endGame(false);
      return;
    }
  }

  if (elapsed >= 60) {
    endGame(true);
  }
}

function draw(dt) {
  drawBackground(dt);
  obstacles.forEach(drawObstacle);
  drawPlayer();

  particles.forEach(p => {
    p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = "#5ffcff";
    ctx.fillRect(p.x, p.y, 3, 3);
  });
  particles = particles.filter(p => p.life > 0);
  ctx.globalAlpha = 1;
}

function loop(now) {
  if (!running) return;
  const dt = Math.min((now - lastTime) / 1000, .04);
  lastTime = now;
  update(dt);
  draw(dt);
  if (running) animationId = requestAnimationFrame(loop);
}

function startGame() {
  if (animationId) cancelAnimationFrame(animationId);
  resetGame();
  update.spawnTimer = .25;
  running = true;
  startOverlay.classList.add("hidden");
  gameOverOverlay.classList.add("hidden");
  animationId = requestAnimationFrame(loop);
}

function endGame(won) {
  running = false;
  cancelAnimationFrame(animationId);
  animationId = null;

  if (score > best) {
    best = score;
    localStorage.setItem("neonDodgeBest", best);
    bestEl.textContent = String(best).padStart(5, "0");
  }

  resultTitle.textContent = won ? "YOU SURVIVED" : "GAME OVER";
  resultText.textContent = won
    ? "60 seconds complete. You cleared the target!"
    : "You collided with an obstacle. Dodge better next run.";
  finalScore.textContent = String(score).padStart(5, "0");
  finalTime.textContent = `${elapsed.toFixed(1)}s`;
  gameOverOverlay.classList.remove("hidden");

  draw(0);
}

function setKey(key, value) {
  keys[key] = value;
}

window.addEventListener("keydown", e => {
  if (["ArrowLeft", "a", "A"].includes(e.key)) { e.preventDefault(); setKey("left", true); }
  if (["ArrowRight", "d", "D"].includes(e.key)) { e.preventDefault(); setKey("right", true); }
  if (e.key === " " && !running) { e.preventDefault(); startGame(); }
});
window.addEventListener("keyup", e => {
  if (["ArrowLeft", "a", "A"].includes(e.key)) setKey("left", false);
  if (["ArrowRight", "d", "D"].includes(e.key)) setKey("right", false);
});

function bindHold(id, key) {
  const btn = document.getElementById(id);
  const on = e => { e.preventDefault(); setKey(key, true); };
  const off = e => { e.preventDefault(); setKey(key, false); };
  ["pointerdown", "touchstart"].forEach(ev => btn.addEventListener(ev, on, {passive:false}));
  ["pointerup", "pointercancel", "pointerleave", "touchend"].forEach(ev => btn.addEventListener(ev, off, {passive:false}));
}
bindHold("leftBtn", "left");
bindHold("rightBtn", "right");

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);

resetGame();
draw(0);
