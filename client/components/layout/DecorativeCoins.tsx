import { useMemo } from "react";

interface CoinPosition {
  top: string;
  left: string;
  rotation: number;
  delay: number;
  opacity: number;
  size: number;
}

const COIN_IMAGE_PATHS = [
  "/Bitcoin-PNG-removebg-preview.png",
  "/coin2.webp",
  "/Bitcoin-PNG-removebg-preview.png",
  "/coin4.webp",
];

const COIN_COUNT = 12; // Increased number of decorative coins

// Generates stable random positions once per mount
function useCoinPositions(count: number): CoinPosition[] {
  return useMemo(() => {
    const positions: CoinPosition[] = [];
    for (let i = 0; i < count; i++) {
      const topPct = 3 + Math.random() * 84; // allow near full height without clipping
      const leftPct = 3 + Math.random() * 84;
      positions.push({
        top: `${topPct}%`,
        left: `${leftPct}%`,
        rotation: -25 + Math.random() * 50,
        delay: Math.random() * 4,
        opacity: 0.08 + Math.random() * 0.18,
        size: 70 + Math.random() * 80, // bigger coins 70px - 150px
      });
    }
    return positions;
  }, [count]);
}

export const DecorativeCoins = () => {
  const positions = useCoinPositions(COIN_COUNT);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {positions.map((pos, idx) => (
        <img
          key={idx}
          src={COIN_IMAGE_PATHS[idx % COIN_IMAGE_PATHS.length]}
          alt="Bitcoin decorative"
          className="coin-float select-none"
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            width: pos.size,
            height: pos.size,
            opacity: pos.opacity,
            transform: `rotate(${pos.rotation}deg)`,
            animationDelay: `${pos.delay}s`,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
};

export default DecorativeCoins;
