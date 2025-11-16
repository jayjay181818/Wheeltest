import { motion } from 'framer-motion';
import { useEffect } from 'react';
import type { Prize, Theme } from '../types';
import { haptics } from '../utils/haptics';
import './PrizePopup.css';

interface PrizePopupProps {
  prize: Prize;
  onClose: () => void;
  theme: Theme;
}

const PrizePopup = ({ prize, onClose, theme }: PrizePopupProps) => {
  // Keyboard shortcut to close popup with Esc
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        haptics.light();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const handleClose = () => {
    haptics.light();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="popup-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prize-text"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        style={{ background: theme.background }}
      >
        <div className="popup-header">
          <h2 id="prize-text" className="prize-text">
            🎉 Congratulations! 🎉
          </h2>
        </div>
        <div className="prize-content">
          <p className="prize-message">You won:</p>
          <div className="prize-value" style={{ color: theme.colors[0] }}>
            {prize.value}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="popup-button"
          style={{
            background: `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`
          }}
          autoFocus
        >
          Play Again
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PrizePopup;
