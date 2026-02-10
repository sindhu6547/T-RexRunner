 // ===== ELEMENTS =====
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const ground = document.getElementById("ground");
    const startText = document.getElementById("startText");
    const gameOverText = document.getElementById("gameOver");
    const scoreEl = document.getElementById("score");
    let bestScore = localStorage.getItem("bestScore") || 0;
    document.getElementById("bestScore").innerText = "Best: " + bestScore;

    // ===== STATE =====
    let gameStarted = false;
    let gameOver = false;
    let isJumping = false;
    let score = 0;

    // ===== POSITIONS =====
    let dinoBottom = 400;
    let cactusLeft = window.innerWidth;
    let speed = 8;

    // ===== IMAGES =====
    const dinoStand = "./assets/standing_still.png";
    const dinoRun1 = "./assets/dino_run1.png";
    const dinoRun2 = "./assets/dino_run2.png";

    const cactusImages = [
      "./assets/cactus_1.png",
      "./assets/cactus_2.png",
      "./assets/cactus_3.png"
    ];

    // ===== KEY CONTROL =====
    document.addEventListener("keydown", () => {
      if (!gameStarted && !gameOver) {
        startGame();
      } else if (gameOver) {
  restartGame();
      } else {
        jump();
      }
    });

    // ===== START GAME =====
    function startGame() {
      gameStarted = true;
      startText.style.display = "none";
      startRunAnimation();
      startCactus();
      startGround();
    }

    // ===== JUMP =====
    function jump() {
      if (isJumping) return;
      isJumping = true;

      dinoBottom = 500;
      dino.style.bottom = dinoBottom + "px";

      setTimeout(() => {
        dinoBottom = 380;
        dino.style.bottom = dinoBottom + "px";
        isJumping = false;
      }, 400);
    }

    // ===== RUN ANIMATION =====
    function startRunAnimation() {
      let toggle = false;

      setInterval(() => {
        if (!gameStarted || isJumping || gameOver) return;
        dino.src = toggle ? dinoRun1 : dinoRun2;
        toggle = !toggle;
      }, 150);
    }

    // ===== CACTUS =====
    function startCactus() {
      setInterval(() => {
        if (!gameStarted || gameOver) return;

        cactusLeft -= speed;
        cactus.style.left = cactusLeft + "px";

        if (cactusLeft < -50) {
          cactusLeft = window.innerWidth;
          cactus.src = cactusImages[Math.floor(Math.random() * cactusImages.length)];
          score++;
          scoreEl.innerText = "Score: " + score;

          if (score % 5 === 0) speed++;
        }

        checkCollision();
      }, 20);
    }

    // ===== GROUND =====
    function startGround() {
      let groundX = 0;

      setInterval(() => {
        if (!gameStarted || gameOver) return;
        groundX -= speed;
        ground.style.backgroundPositionX = groundX + "px";
      }, 20);
    }

    // ===== COLLISION =====
    function checkCollision() {
      const dinoRect = dino.getBoundingClientRect();
      const cactusRect = cactus.getBoundingClientRect();

      if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
      ) {
        endGame();
      }
    }

    // ===== GAME OVER =====
   function endGame() {
  gameOver = true;
  gameStarted = false;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    document.getElementById("bestScore").innerText = "Best: " + bestScore;
  }

  gameOverText.style.display = "block";
}
function restartGame() {
  // update best score
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    document.getElementById("bestScore").innerText = "Best: " + bestScore;
  }

  // reset values
  score = 0;
  speed = 8;
  cactusLeft = window.innerWidth;
  dinoBottom = 380;

  scoreEl.innerText = "Score: 0";
  dino.style.bottom = dinoBottom + "px";
  cactus.style.left = cactusLeft + "px";

  gameOver = false;
  gameStarted = true;

  gameOverText.style.display = "none";
  startText.style.display = "none"; 
}