import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Wheel from './components/Wheel';
import ConfigurationPanel from './components/ConfigurationPanel';
import ThemeToggle from './components/ThemeToggle';
import PrizePopup from './components/PrizePopup';
import type { Prize, Theme, SpinResult } from './types';
import { themes } from './utils/themes';
import './styles/App.css';

function App() {
  const [prizes, setPrizes] = useState<Prize[]>([
    { id: '1', value: 'T-Shirt' },
    { id: '2', value: 'Hat' },
    { id: '3', value: 'Stickers' },
    { id: '4', value: 'Mug' },
    { id: '5', value: 'Poster' },
    { id: '6', value: 'Keychain' }
  ]);
  
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.warm);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const predefinedLists = {
    default: ['$100', '$25', '$50', '$75', '$100', '$150'],
    money: ['$5', '$10', '$20', '$50', '$100', '$200'],
    fun: ['T-Shirt', 'Hat', 'Stickers', 'Mug', 'Poster', 'Keychain']
  };

  const handleSpinComplete = (result: SpinResult) => {
    setCurrentPrize(result.prize);
    setShowPopup(true);
    setIsSpinning(false);
  };

  const handleSpinStart = () => {
    if (prizes.length >= 2 && !isSpinning) {
      setIsSpinning(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setCurrentPrize(null);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentTheme.primaryColor);
    root.style.setProperty('--secondary-color', currentTheme.secondaryColor);
    root.style.setProperty('--accent-color', currentTheme.accentColor);
    root.style.setProperty('--text-primary', currentTheme.textPrimary);
    root.style.setProperty('--text-secondary', currentTheme.textSecondary);
    root.style.setProperty('--background-primary', currentTheme.background);
  }, [currentTheme]);

  return (
    <div className="app" style={{ background: currentTheme.background }}>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="app-header"
      >
        <div className="header-content">
          <h1 className="app-title">Spin & Win!</h1>
          <p className="app-subtitle">Try your luck and win amazing prizes</p>
          <ThemeToggle
            currentTheme={currentTheme}
            availableThemes={Object.values(themes)}
            onThemeChange={setCurrentTheme}
          />
        </div>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="app-main"
      >
        <div className="game-container">
          <ConfigurationPanel
            prizes={prizes}
            onPrizesChange={setPrizes}
            predefinedLists={predefinedLists}
            theme={currentTheme}
          />
          
          <Wheel
            prizes={prizes}
            onSpinComplete={handleSpinComplete}
            isSpinning={isSpinning}
            theme={currentTheme}
            onSpinStart={handleSpinStart}
          />
        </div>
      </motion.main>

      <AnimatePresence>
        {showPopup && currentPrize && (
          <PrizePopup
            prize={currentPrize}
            onClose={handlePopupClose}
            theme={currentTheme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
