import { useEffect, useRef, useState } from 'react';

import './NotFound.scss';
import Logo from '../../../assets/images/notfound.png';

const DIFFICULTY_LEVELS = {
  EASY: { speed: 7, aiSpeed: 6, name: 'FACILE', color: '#00ff00' },
  MEDIUM: { speed: 9, aiSpeed: 8, name: 'MOYEN', color: '#ffff00' },
  HARD: { speed: 11, aiSpeed: 10, name: 'DIFFICILE', color: '#ff6600' },
  IMPOSSIBLE: { speed: 13, aiSpeed: 12, name: 'IMPOSSIBLE', color: '#ff0000' },
};

const POWER_UPS = {
  SPEED_UP: { type: 'SPEED_UP', color: '#ff0000', duration: 5000 },
  SLOW_DOWN: { type: 'SLOW_DOWN', color: '#00ff00', duration: 5000 },
  ENLARGE_PADDLE: { type: 'ENLARGE_PADDLE', color: '#0088ff', duration: 7000 },
  SHRINK_AI: { type: 'SHRINK_AI', color: '#ff00ff', duration: 5000 },
};

const NotFound = () => {
  const canvasRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [message, setMessage] = useState('');
  const [spaceCount, setSpaceCount] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('MEDIUM');
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [combo, setCombo] = useState(0);

  const WINNING_SCORE = 5;
  document.querySelector('.app-container')?.classList.add('hide-layout');

  const gameStateRef = useRef({
    player: { y: 0, height: 100, width: 15, speed: 8, originalHeight: 100 },
    ai: { y: 0, height: 100, width: 15, speed: 8, originalHeight: 100 },
    ball: { x: 0, y: 0, size: 10, dx: 0, dy: 0, speed: DIFFICULTY_LEVELS[selectedDifficulty].speed, isPerfect: false, perfectTimer: 0 },
    particles: [],
    powerUps: [],
    keys: { ArrowUp: false, ArrowDown: false, Escape: false },
    lastTime: 0,
    powerUpTimer: 0,
  });

  // Définition des dimensions par défaut
  const DEFAULT_WIDTH = 800;
  const DEFAULT_HEIGHT = 600;

  // Ajout des états pour les nouveaux effets
  const [matrixParticles, setMatrixParticles] = useState(() => Array.from({ length: 50 }, () => ({
    x: Math.random() * DEFAULT_WIDTH,
    y: Math.random() * DEFAULT_HEIGHT,
    speed: 1 + Math.random() * 3,
    size: 10 + Math.random() * 20,
    opacity: Math.random(),
    char: Math.random() < 0.5 ? '404' : 'ERROR',
  })));

  const resetGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setWinner(null);
    setGameStarted(false);
    const state = gameStateRef.current;
    state.ball.speed = DIFFICULTY_LEVELS[selectedDifficulty].speed;
  };

  useEffect(() => {
    if (playerScore >= WINNING_SCORE) {
      setGameOver(true);
      setWinner('player');
    } else if (aiScore >= WINNING_SCORE) {
      setGameOver(true);
      setWinner('ai');
    }
  }, [playerScore, aiScore]);

  useEffect(() => {
    if (!showGame) {
      const handleInitialSpace = (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          setSpaceCount(prev => {
            const newCount = prev + 1;
            if (newCount === 10) {
              setShowGame(true);
              window.removeEventListener('keydown', handleInitialSpace);
            }
            return newCount;
          });
        }
      };
      window.addEventListener('keydown', handleInitialSpace);
      return () => window.removeEventListener('keydown', handleInitialSpace);
    }
  }, [showGame]);

  useEffect(() => {
    if (!showGame) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mise à jour des positions des particules une fois que le canvas est disponible
    setMatrixParticles(prev => prev.map(particle => ({
      ...particle,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    })));

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Prevent scrolling during gameplay
    const preventScroll = (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'Escape'].includes(e.code)) {
        e.preventDefault();
        if (e.code === 'Escape') {
          setShowGame(false);
          setSpaceCount(0);
          setGameStarted(false);
        }
      }
    };
    window.addEventListener('keydown', preventScroll);

    const resetBall = (direction = 1) => {
      const state = gameStateRef.current;
      state.ball.x = canvas.width / 2;
      state.ball.y = canvas.height / 2;
      state.ball.dx = state.ball.speed * direction;
      state.ball.dy = (Math.random() - 0.5) * state.ball.speed;
    };

    const createParticle = (x, y, color) => {
      return {
        x,
        y,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 3,
        alpha: 1,
        color: gameStateRef.current.ball.isPerfect ? '#ff0000' : color,
      };
    };

    const drawParticles = () => {
      const state = gameStateRef.current;
      state.particles.forEach((particle, index) => {
        particle.alpha -= 0.02;
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.alpha <= 0) {
          state.particles.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();
      });
    };

    const drawBall = () => {
      const { ball } = gameStateRef.current;
      const gradient = ctx.createRadialGradient(
        ball.x, ball.y, 0,
        ball.x, ball.y, ball.size,
      );

      if (ball.isPerfect) {
        gradient.addColorStop(0, '#ff4444');
        gradient.addColorStop(1, '#ff0000');
        ctx.shadowColor = '#ff0000';
      } else {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#0088ff');
        ctx.shadowColor = '#0088ff';
      }

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const spawnPowerUp = () => {
      const types = Object.values(POWER_UPS);
      const powerUp = types[Math.floor(Math.random() * types.length)];
      const canvas = canvasRef.current;

      gameStateRef.current.powerUps.push({
        ...powerUp,
        x: Math.random() * (canvas.width - 30) + 15,
        y: Math.random() * (canvas.height - 30) + 15,
        radius: 10,
        active: true,
      });
    };

    const applyPowerUp = (powerUp) => {
      const state = gameStateRef.current;

      switch (powerUp.type) {
      case 'SPEED_UP':
        state.ball.speed *= 1.5;
        setTimeout(() => {
          state.ball.speed /= 1.5;
        }, powerUp.duration);
        break;
      case 'SLOW_DOWN':
        state.ball.speed *= 0.7;
        setTimeout(() => {
          state.ball.speed /= 0.7;
        }, powerUp.duration);
        break;
      case 'ENLARGE_PADDLE':
        state.player.height *= 1.5;
        setTimeout(() => {
          state.player.height = state.player.originalHeight;
        }, powerUp.duration);
        break;
      case 'SHRINK_AI':
        state.ai.height *= 0.7;
        setTimeout(() => {
          state.ai.height = state.ai.originalHeight;
        }, powerUp.duration);
        break;
      }

      setActivePowerUps(prev => [...prev, { type: powerUp.type, endTime: Date.now() + powerUp.duration }]);
      setTimeout(() => {
        setActivePowerUps(prev => prev.filter(p => p.endTime > Date.now()));
      }, powerUp.duration);
    };

    const drawPowerUps = (ctx) => {
      const state = gameStateRef.current;
      state.powerUps.forEach((powerUp) => {
        if (!powerUp.active) return;

        ctx.beginPath();
        ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
        ctx.fillStyle = powerUp.color;
        ctx.fill();

        // Effet de lueur
        ctx.shadowColor = powerUp.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Animation de pulsation
        powerUp.radius = 10 + Math.sin(Date.now() * 0.005) * 2;
      });
    };

    const checkPowerUpCollision = () => {
      const state = gameStateRef.current;
      const { ball } = state;

      state.powerUps.forEach((powerUp, index) => {
        if (!powerUp.active) return;

        const dx = ball.x - powerUp.x;
        const dy = ball.y - powerUp.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.size + powerUp.radius) {
          powerUp.active = false;
          applyPowerUp(powerUp);
          state.powerUps.splice(index, 1);
        }
      });
    };

    const update = (deltaTime) => {
      const state = gameStateRef.current;
      const { player, ai, ball } = state;

      // Spawn power-up periodically
      state.powerUpTimer += deltaTime;
      if (state.powerUpTimer > 5000) { // Every 5 seconds
        state.powerUpTimer = 0;
        if (Math.random() < 0.3) { // 30% chance
          spawnPowerUp();
        }
      }

      // Update perfect timer
      if (ball.perfectTimer > 0) {
        ball.perfectTimer -= deltaTime;
        if (ball.perfectTimer <= 0) {
          ball.isPerfect = false;
        }
      }

      // Update player position
      if (state.keys.ArrowUp) player.y = Math.max(0, player.y - player.speed);
      if (state.keys.ArrowDown) player.y = Math.min(canvas.height - player.height, player.y + player.speed);

      // AI with difficulty-based speed
      const aiSpeed = DIFFICULTY_LEVELS[selectedDifficulty].aiSpeed;
      const aiCenter = ai.y + ai.height / 2;
      const ballCenter = ball.y;
      const aiReactionDelay = selectedDifficulty === 'IMPOSSIBLE' ? 0 : 10;

      if (aiCenter < ballCenter - aiReactionDelay) ai.y += aiSpeed;
      if (aiCenter > ballCenter + aiReactionDelay) ai.y -= aiSpeed;
      ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y));

      // Ball movement
      if (gameStarted) {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Check power-up collisions
        checkPowerUpCollision();

        // Paddle collisions with improved effects
        if (ball.x <= player.width && ball.y >= player.y && ball.y <= player.y + player.height) {
          const hitPosition = (ball.y - player.y) / player.height;
          const isPerfectHit = hitPosition > 0.4 && hitPosition < 0.6;

          if (isPerfectHit) {
            ball.isPerfect = true;
            ball.perfectTimer = 1000;
            ball.dx = Math.abs(ball.dx) * 1.2;
            setCombo(prev => prev + 1);
            if (combo > 2) {
              setMessage(`COMBO x${combo}!`);
            }
          } else {
            ball.isPerfect = false;
            ball.dx = Math.abs(ball.dx) * 1.1;
            setCombo(0);
          }

          ball.dy += (ball.y - (player.y + player.height / 2)) * 0.2;

          // Particle effects
          const particleCount = isPerfectHit ? 10 : 5;
          for (let i = 0; i < particleCount; i++) {
            state.particles.push(createParticle(ball.x, ball.y, ball.isPerfect ? '#ff0000' : '#0088ff'));
          }
        }

        if (ball.x >= canvas.width - ai.width && ball.y >= ai.y && ball.y <= ai.y + ai.height) {
          ball.dx = -Math.abs(ball.dx) * 1.1;
          ball.dy += (ball.y - (ai.y + ai.height / 2)) * 0.1;
          for (let i = 0; i < 5; i++) {
            state.particles.push(createParticle(ball.x, ball.y, '#00ffff'));
          }
        }

        // Collision avec les murs
        if (ball.y <= 0 || ball.y >= canvas.height) {
          ball.dy *= -1;
          for (let i = 0; i < 3; i++) {
            state.particles.push(createParticle(ball.x, ball.y, '#ffffff'));
          }
        }

        // Score
        if (ball.x <= 0) {
          setAiScore(prev => prev + 1);
          resetBall(1);
        }
        if (ball.x >= canvas.width) {
          setPlayerScore(prev => prev + 1);
          resetBall(-1);
        }
      }
    };

    const render = (timestamp) => {
      if (!gameStateRef.current.lastTime) gameStateRef.current.lastTime = timestamp;
      const deltaTime = timestamp - gameStateRef.current.lastTime;
      gameStateRef.current.lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fond dégradé bleu marine
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a192f');
      gradient.addColorStop(1, '#112240');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mise à jour et dessin des particules matrix
      matrixParticles.forEach(particle => {
        particle.y += particle.speed;
        particle.opacity = Math.sin(timestamp * 0.001 + particle.speed);
        if (particle.y > canvas.height) particle.y = 0;

        ctx.save();
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.abs(particle.opacity) * 0.2})`;
        ctx.font = `${particle.size}px 'Press Start 2P'`;
        ctx.fillText(particle.char, particle.x, particle.y);
        ctx.restore();
      });

      // Grille avec effet de perspective
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 136, 255, 0.1)';
      ctx.lineWidth = 1;

      // Lignes verticales
      for (let x = 0; x <= canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Lignes horizontales avec effet de perspective
      for (let y = 0; y <= canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Ligne centrale avec effet de lueur
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 136, 255, 0.3)';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Effet de lueur sur la ligne centrale
      ctx.shadowColor = '#0088ff';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = 'rgba(0, 136, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Cercle central avec effet de lueur
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 136, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.shadowColor = '#0088ff';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = 'rgba(0, 136, 255, 0.5)';
      ctx.stroke();
      ctx.restore();

      // Effet de vignette
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5,
      );
      vignetteGradient.addColorStop(0, 'transparent');
      vignetteGradient.addColorStop(1, 'rgba(10, 25, 47, 0.7)');
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessin des raquettes avec effet de lueur
      const drawPaddleWithGlow = (x, y, width, height) => {
        ctx.save();
        // Lueur externe
        ctx.shadowColor = '#0088ff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#0088ff';
        ctx.fillRect(x, y, width, height);

        // Dégradé sur la raquette
        const paddleGradient = ctx.createLinearGradient(x, y, x + width, y);
        paddleGradient.addColorStop(0, '#0088ff');
        paddleGradient.addColorStop(1, '#00ffff');
        ctx.fillStyle = paddleGradient;
        ctx.fillRect(x, y, width, height);
        ctx.restore();
      };

      const { player, ai, ball } = gameStateRef.current;
      drawPaddleWithGlow(0, player.y, player.width, player.height);
      drawPaddleWithGlow(canvas.width - ai.width, ai.y, ai.width, ai.height);

      // Dessin des particules
      drawParticles();

      // Dessin de la balle avec effet de traînée
      if (ball.dx !== 0 || ball.dy !== 0) {
        // Effet de traînée
        ctx.save();
        for (let i = 1; i <= 5; i++) {
          const alpha = (1 - i / 5) * 0.2;
          ctx.fillStyle = `rgba(0, 136, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(
            ball.x - ball.dx * i * 2,
            ball.y - ball.dy * i * 2,
            ball.size - i,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.restore();
      }

      drawBall();

      // Afficher les power-ups actifs
      drawPowerUps(ctx);

      // Afficher les power-ups actifs en HUD
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 200, 30 * activePowerUps.length);
      activePowerUps.forEach((powerUp, index) => {
        const timeLeft = Math.max(0, (powerUp.endTime - Date.now()) / 1000).toFixed(1);
        ctx.fillStyle = POWER_UPS[powerUp.type].color;
        ctx.font = '16px Arial';
        ctx.fillText(`${powerUp.type}: ${timeLeft}s`, 20, 30 + (index * 30));
      });
      ctx.restore();

      update(deltaTime);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !gameStarted) {
        e.preventDefault();
        setGameStarted(true);
        setMessage('');
        resetBall();
      }
      if (e.code in gameStateRef.current.keys) {
        e.preventDefault();
        gameStateRef.current.keys[e.code] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.code in gameStateRef.current.keys) {
        gameStateRef.current.keys[e.code] = false;
      }
    };

    // Adjust canvas size to fullscreen
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // Reset paddle positions
      const state = gameStateRef.current;
      state.player.y = (canvas.height - state.player.height) / 2;
      state.ai.y = (canvas.height - state.ai.height) / 2;
      if (!gameStarted) {
        resetBall();
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Start the game loop
    resetBall();
    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', preventScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameStarted, showGame]);

  if (!showGame) {
    return (
      <div className="not-found-initial">
        <div className="content">
          <img src={Logo} alt="404" className="logo" />
          <h1>404</h1>
          <p>Page non trouvée</p>
          <div className="space-counter">
            <span className="press-space">Appuyez sur ESPACE {10 - spaceCount} fois pour découvrir une surprise...</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(spaceCount / 10) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="not-found">
      <div className={`game-container ${gameStarted ? 'started' : ''}`}>
        {!gameStarted && !gameOver && (
          <div className="game-overlay">
            <div className="game-intro">
              <h2>PONG 404</h2>
              <div className="difficulty-selector">
                {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                  <button
                    key={key}
                    className={`difficulty-btn ${selectedDifficulty === key ? 'selected' : ''}`}
                    style={{ '--difficulty-color': level.color }}
                    onClick={() => setSelectedDifficulty(key)}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
              <div className="instructions">
                <p>↑ / ↓ : Déplacer la raquette</p>
                <p>ESPACE : Commencer</p>
                <p>ÉCHAP : Quitter</p>
              </div>
              <div className="objective">Premier à {WINNING_SCORE} points gagne !</div>
              <div className="features">
                <p>Caractéristiques :</p>
                <ul>
                  <li>Power-ups aléatoires</li>
                  <li>Système de combo</li>
                  <li>Effets visuels dynamiques</li>
                  <li>4 niveaux de difficulté</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {gameOver && (
          <div className="game-overlay">
            <div className="game-end">
              <h2>{winner === 'player' ? 'VICTOIRE !' : 'DÉFAITE...'}</h2>
              <p className="score-final">Score Final: {playerScore} - {aiScore}</p>
              <div className="end-buttons">
                <button onClick={resetGame} className="retry-btn">Rejouer</button>
                <button onClick={() => {
                  setShowGame(false);
                  setSpaceCount(0);
                  resetGame();
                }} className="quit-btn">Quitter</button>
              </div>
            </div>
          </div>
        )}
        <div className="escape-hint">
          <span>ÉCHAP pour quitter</span>
        </div>
        <div className="game-stats">
          <span>Vous: {playerScore}</span>
          <span>{message}</span>
          <span>IA: {aiScore}</span>
        </div>
        <canvas ref={canvasRef} className="game-canvas" />
      </div>
    </div>
  );
};

export default NotFound;
