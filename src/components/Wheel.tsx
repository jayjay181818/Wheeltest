import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Prize, Theme, SpinResult } from '../types';
import useSwipe from '../hooks/useSwipe';
import { haptics } from '../utils/haptics';
import './Wheel.css';

const VIEWBOX_SIZE = 400;
const CENTER = VIEWBOX_SIZE / 2;
const RADIUS = VIEWBOX_SIZE / 2;
const LABEL_RADIUS = RADIUS * 0.65;

const polarToCartesian = (angle: number, radius: number) => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(radians),
    y: CENTER + radius * Math.sin(radians)
  };
};

const describeSegmentPath = (startAngle: number, endAngle: number) => {
  const start = polarToCartesian(startAngle, RADIUS);
  const end = polarToCartesian(endAngle, RADIUS);
  const angleDiff = (endAngle - startAngle + 360) % 360;
  const largeArcFlag = angleDiff > 180 ? 1 : 0;
  const sweepFlag = 1;

  return [
    'M', start.x, start.y,
    'A', RADIUS, RADIUS, 0, largeArcFlag, sweepFlag, end.x, end.y,
    'L', CENTER, CENTER,
    'Z'
  ].join(' ');
};

interface WheelProps {
  prizes: Prize[];
  onSpinComplete: (result: SpinResult) => void;
  isSpinning: boolean;
  theme: Theme;
  onSpinStart: () => void;
}

const Wheel = ({ prizes, onSpinComplete, isSpinning, theme, onSpinStart }: WheelProps) => {
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

  const segments = useMemo(() => {
    if (!prizes.length) {
      return [];
    }

    const sliceAngle = 360 / prizes.length;
    const segmentSpan = prizes.length === 1 ? 359.999 : sliceAngle;

    return prizes.map((prize, index) => {
      const startAngle = -segmentSpan / 2 + index * sliceAngle;
      const endAngle = startAngle + segmentSpan;
      const midpointAngle = startAngle + segmentSpan / 2;

      const normalizedAngle = ((midpointAngle % 360) + 360) % 360;
      const shouldFlip = normalizedAngle > 90 && normalizedAngle < 270;

      return {
        id: prize.id,
        label: prize.value,
        path: describeSegmentPath(startAngle, endAngle),
        textPosition: polarToCartesian(midpointAngle, LABEL_RADIUS),
        textRotation: shouldFlip ? 180 : 0,
        color: theme.colors[index % theme.colors.length]
      };
    });
  }, [prizes, theme.colors]);

  useEffect(() => {
    if (isSpinning) {
      // Haptic feedback on spin start
      haptics.heavy();

      const spins = 5 + Math.random() * 5; // 5-10 spins
      const finalRotation = rotation + (spins * 360);

      void controls.start({
        rotate: finalRotation,
        transition: {
          duration: 7,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
          times: [0, 0.6, 1],
        }
      }).then(() => {
        // Update rotation state
        setRotation(finalRotation);

        // Calculate which prize won
        const normalizedRotation = ((finalRotation % 360) + 360) % 360;
        const prizeIndex = Math.floor((360 - normalizedRotation) / (360 / prizes.length)) % prizes.length;

        // Haptic feedback on win
        haptics.success();

        onSpinComplete({
          prize: prizes[prizeIndex],
          angle: normalizedRotation
        });
      });
    }
  }, [isSpinning, prizes, onSpinComplete, controls, rotation]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (!isSpinning && prizes.length >= 2) {
          onSpinStart();
          haptics.light();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSpinning, prizes.length, onSpinStart]);

  // Swipe gesture to spin
  useSwipe({
    onSwipeUp: () => {
      if (!isSpinning && prizes.length >= 2) {
        onSpinStart();
        haptics.medium();
      }
    },
    onSwipeDown: () => {
      if (!isSpinning && prizes.length >= 2) {
        onSpinStart();
        haptics.medium();
      }
    },
    onSwipeLeft: () => {
      if (!isSpinning && prizes.length >= 2) {
        onSpinStart();
        haptics.medium();
      }
    },
    onSwipeRight: () => {
      if (!isSpinning && prizes.length >= 2) {
        onSpinStart();
        haptics.medium();
      }
    }
  }, 60);

  const handleSpinClick = () => {
    if (!isSpinning && prizes.length >= 2) {
      haptics.light();
      onSpinStart();
    }
  };

  return (
    <div className="wheel-container" role="application" aria-label="Spinning wheel game">
      <div className="wheel-wrapper">
        <motion.div
          className="wheel"
          animate={controls}
          initial={{ rotate: 0 }}
        >
          <svg
            className="wheel-svg"
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            role="img"
            aria-label="Prize wheel segments"
          >
            {segments.map((segment) => (
              <g key={segment.id} className="wheel-segment">
                <path
                  d={segment.path}
                  fill={segment.color}
                  className="wheel-segment-path"
                />
                <text
                  x={segment.textPosition.x}
                  y={segment.textPosition.y}
                  className="segment-text"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${segment.textRotation} ${segment.textPosition.x} ${segment.textPosition.y})`}
                >
                  {segment.label}
                </text>
              </g>
            ))}
          </svg>
          {prizes.length === 0 && (
            <div className="wheel-empty-state">
              Add prizes to begin
            </div>
          )}
        </motion.div>
        
        <div className="wheel-indicator" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path
              d="M15 0 L20 10 L15 20 L10 10 Z"
              fill={theme.colors[0]}
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      
      <motion.button
        className="spin-button"
        onClick={handleSpinClick}
        disabled={isSpinning || prizes.length < 2}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Spin the wheel"
        aria-describedby="spin-instructions"
      >
        {isSpinning ? 'Spinning...' : 'Spin The Wheel!'}
      </motion.button>
      
      <div id="spin-instructions" className="sr-only">
        Click the spin button to rotate the wheel and win a prize
      </div>
    </div>
  );
};

export default Wheel;
