"use client";

import { useEffect, useRef } from "react";

interface ArcadeBackgroundProps {
  isPlaying: boolean;
}

interface Enemy {
  x: number;
  y: number;
  direction: number;
  isAlive: boolean;
}

interface Player {
  x: number;
  direction: number;
}

interface Bullet {
  x: number;
  y: number;
}

export default function ArcadeBackground({ isPlaying }: ArcadeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Player>({ x: 0, direction: 0 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const bulletsRef = useRef<Bullet[]>([]);
  const lastShotRef = useRef<number>(0);
  const gameOverRef = useRef<boolean>(false);
  const enemiesRef = useRef<Enemy[]>([]);
  const levelRef = useRef<number>(1);

  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PIXEL_SIZE = 4;
    const GRID_SIZE = 8;
    const SHOT_INTERVAL = 1000;

    const initEnemies = () => {
      enemiesRef.current = [];
      const ROWS = 3;
      const COLS = 8;
      const ENEMY_SPACING = 40;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          enemiesRef.current.push({
            x: col * ENEMY_SPACING + 100,
            y: row * ENEMY_SPACING + 50,
            direction: 1,
            isAlive: true,
          });
        }
      }
    };

    const initGame = () => {
      gameOverRef.current = false;
      bulletsRef.current = [];
      levelRef.current = 1;
      playerRef.current = {
        x: canvas.width / 2 - (GRID_SIZE * PIXEL_SIZE) / 2,
        direction: 0,
      };
      initEnemies();
    };

    initGame();

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.code === "Space" && gameOverRef.current) {
        initGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const shoot = () => {
      const now = Date.now();
      if (now - lastShotRef.current >= SHOT_INTERVAL) {
        bulletsRef.current.push({
          x: playerRef.current.x + (GRID_SIZE * PIXEL_SIZE) / 2,
          y: canvas.height - 60,
        });
        lastShotRef.current = now;
      }
    };

    const drawBullet = (x: number, y: number) => {
      ctx.fillStyle = "#ff2b2b";
      ctx.fillRect(x - 3, y, 6, 16);
    };

    const drawEnemy = (x: number, y: number) => {
      ctx.fillStyle = "#ff2b2b";
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (owlShape[i][j]) {
            ctx.fillRect(
              x + j * PIXEL_SIZE,
              y + i * PIXEL_SIZE,
              PIXEL_SIZE,
              PIXEL_SIZE
            );
          }
        }
      }
    };

    const drawPlayer = (x: number) => {
      ctx.fillStyle = "#ff2b2b";
      const playerShape = [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
      ];

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (playerShape[i][j]) {
            ctx.fillRect(
              x + j * PIXEL_SIZE,
              canvas.height - 50 + i * PIXEL_SIZE,
              PIXEL_SIZE,
              PIXEL_SIZE
            );
          }
        }
      }
    };

    const owlShape = [
      [0, 1, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
    ];

    let moveCounter = 0;
    const moveSpeed = 2;
    let globalDirection = 1;

    const checkCollisions = () => {
      bulletsRef.current.forEach((bullet, bulletIndex) => {
        enemiesRef.current.forEach((enemy) => {
          if (enemy.isAlive) {
            const enemyWidth = GRID_SIZE * PIXEL_SIZE;
            const enemyHeight = GRID_SIZE * PIXEL_SIZE;
            if (
              bullet.x >= enemy.x &&
              bullet.x <= enemy.x + enemyWidth &&
              bullet.y >= enemy.y &&
              bullet.y <= enemy.y + enemyHeight
            ) {
              enemy.isAlive = false;
              bulletsRef.current.splice(bulletIndex, 1);

              if (enemiesRef.current.every((e) => !e.isAlive)) {
                levelRef.current++;
                initEnemies();
              }
            }
          }
        });
      });

      enemiesRef.current.forEach((enemy) => {
        if (
          enemy.isAlive &&
          enemy.y + GRID_SIZE * PIXEL_SIZE >= canvas.height - 60
        ) {
          gameOverRef.current = true;
        }
      });
    };

    const updatePlayer = () => {
      if (gameOverRef.current) return;

      const speed = 5;
      if (keysRef.current["ArrowLeft"]) {
        playerRef.current.x = Math.max(0, playerRef.current.x - speed);
        playerRef.current.direction = -1;
      }
      if (keysRef.current["ArrowRight"]) {
        playerRef.current.x = Math.min(
          canvas.width - GRID_SIZE * PIXEL_SIZE,
          playerRef.current.x + speed
        );
        playerRef.current.direction = 1;
      }
      if (!keysRef.current["ArrowLeft"] && !keysRef.current["ArrowRight"]) {
        playerRef.current.direction = 0;
      }

      shoot();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(255, 43, 43, 0.1)";
      ctx.lineWidth = 1;
      const gridSize = 20;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.fillStyle = "#ff2b2b";
      ctx.font = "20px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`LEVEL: ${levelRef.current}`, 40, 40);

      if (gameOverRef.current) {
        ctx.fillStyle = "#ff2b2b";
        ctx.font = "bold 40px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px monospace";
        ctx.fillText(
          "PRESS SPACE TO CONTINUE",
          canvas.width / 2,
          canvas.height / 2 + 40
        );
        ctx.fillText(
          `FINAL LEVEL: ${levelRef.current}`,
          canvas.width / 2,
          canvas.height / 2 + 80
        );
        requestAnimationFrame(animate);
        return;
      }

      moveCounter++;

      if (moveCounter >= moveSpeed) {
        moveCounter = 0;

        let hitEdge = false;
        enemiesRef.current.forEach((enemy) => {
          if (
            (enemy.x >= canvas.width - 100 && globalDirection > 0) ||
            (enemy.x <= 50 && globalDirection < 0)
          ) {
            hitEdge = true;
          }
        });

        if (hitEdge) {
          globalDirection *= -1;
          enemiesRef.current.forEach((enemy) => {
            enemy.y += 20;
          });
        }

        enemiesRef.current.forEach((enemy) => {
          enemy.x += globalDirection * 2;
        });
      }

      bulletsRef.current.forEach((bullet, index) => {
        bullet.y -= 12;
        if (bullet.y < 0) {
          bulletsRef.current.splice(index, 1);
        }
      });

      checkCollisions();
      updatePlayer();

      enemiesRef.current.forEach((enemy) => {
        if (enemy.isAlive) {
          drawEnemy(enemy.x, enemy.y);
        }
      });

      bulletsRef.current.forEach((bullet) => {
        drawBullet(bullet.x, bullet.y);
      });

      drawPlayer(playerRef.current.x);

      requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      playerRef.current.x = canvas.width / 2 - (GRID_SIZE * PIXEL_SIZE) / 2;
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isPlaying ? "opacity-15" : "opacity-0"
      }`}
    />
  );
}
