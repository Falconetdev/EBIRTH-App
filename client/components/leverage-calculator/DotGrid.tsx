import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

// Note: InertiaPlugin is a premium GSAP feature and not available in this environment.
// We use 'power2.out' to approximate the physics of the throw/inertia effect 
// while keeping the exact logic and variable calculations from your snippet.

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  // Store text pixel data to create the "moving text" effect
  const textDataRef = useRef<{ data: Uint8ClampedArray; width: number; height: number } | null>(null);
  
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;

    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    // --- Prepare Text Canvas ---
    const tCanvas = document.createElement('canvas');
    const tCtx = tCanvas.getContext('2d');
    if (tCtx) {
        // Font size approx 15% of screen height (reduced from 20%)
        const fontSize = Math.floor(height * 0.15);
        const text = "INNER RACERS";
        tCtx.font = `900 ${fontSize}px sans-serif`;
        const measure = tCtx.measureText(text);
        
        tCanvas.width = Math.ceil(measure.width);
        tCanvas.height = Math.ceil(fontSize * 1.5);
        
        tCtx.font = `900 ${fontSize}px sans-serif`;
        tCtx.fillStyle = '#ffffff';
        tCtx.textBaseline = 'middle';
        // Center text vertically in the canvas
        tCtx.fillText(text, 0, tCanvas.height / 2);
        
        textDataRef.current = {
            data: tCtx.getImageData(0, 0, tCanvas.width, tCanvas.height).data,
            width: tCanvas.width,
            height: tCanvas.height
        };
    }
    // ---------------------------

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;
      const time = Date.now();
      
      const textRef = textDataRef.current;
      // Scroll speed: move left
      const scrollSpeed = 0.05; 
      // Calculate current scroll offset. 
      // We loop (canvas.width + textWidth) to have it scroll fully off then restart
      const loopWidth = (canvas.width / window.devicePixelRatio) + (textRef?.width || 0);
      const scrollX = (time * scrollSpeed) % loopWidth;
      
      const textW = textRef?.width || 1;
      const textH = textRef?.height || 1;
      const textData = textRef?.data;
      
      // Vertical centering of text relative to screen
      const screenH = canvas.height / window.devicePixelRatio;
      const textDestY = (screenH - textH) / 2;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let r = baseRgb.r;
        let g = baseRgb.g;
        let b = baseRgb.b;

        // 1. Check proximity (Mouse Interaction)
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        } 
        // 2. Check Text Overlap (Background Effect)
        else if (textData) {
            // Map dot position to text bitmap coordinates
            // Text is scrolling LEFT, so dotX relative to text is dotX + scrollX
            // However, we want text to enter from right. 
            // effectiveX = dot.cx - (screenW - scrollX) ... simplified:
            const relativeX = dot.cx - (canvas.width/window.devicePixelRatio) + scrollX;
            const relativeY = dot.cy - textDestY;

            if (relativeX >= 0 && relativeX < textW && relativeY >= 0 && relativeY < textH) {
                const ix = Math.floor(relativeX);
                const iy = Math.floor(relativeY);
                const idx = (iy * textW + ix) * 4;
                // If alpha > 0 (text pixel exists here)
                if (textData[idx + 3] > 128) {
                     // Light up this dot with Gold color (approx RGB 255, 215, 0)
                     r = 255;
                     g = 215;
                     b = 0;
                }
            }
        }

        const style = `rgb(${r},${g},${b})`;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      (window as Window).addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current!.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        
        // Exact logic from snippet
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          
          // Exact logic from snippet
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          
          // Approximation of inertia with SMOOTHER animation
          gsap.to(dot, {
            xOffset: pushX, 
            yOffset: pushY, 
            duration: 1.5, // Slowed down from 0.5 to 1.5
            ease: "power2.out", // Smoother easing
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.5)' // Gentler elasticity
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          
          // Exact logic from snippet
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          
          // Approximation of inertia with SMOOTHER animation
          gsap.to(dot, {
            xOffset: pushX, 
            yOffset: pushY, 
            duration: 1.5, // Slowed down from 0.5 to 1.5
            ease: "power2.out", // Smoother easing
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.5)' // Gentler elasticity
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <div className={`dot-grid ${className}`} style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
      <div ref={wrapperRef} className="dot-grid__wrap" style={{ width: '100%', height: '100%' }}>
        <canvas ref={canvasRef} className="dot-grid__canvas" style={{ display: 'block' }} />
      </div>
    </div>
  );
};

export default DotGrid;