import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Prize, Theme, PrizeListType } from '../types';
import './ConfigurationPanel.css';

interface ConfigurationPanelProps {
  prizes: Prize[];
  onPrizesChange: (prizes: Prize[]) => void;
  predefinedLists: Record<string, string[]>;
  theme: Theme;
}

const ConfigurationPanel = ({ prizes, onPrizesChange, predefinedLists, theme }: ConfigurationPanelProps) => {
  const [selectedList, setSelectedList] = useState<PrizeListType | ''>('');

  const handlePredefinedListChange = (listType: string) => {
    if (predefinedLists[listType]) {
      const newPrizes = predefinedLists[listType].map((value, index) => ({
        id: (index + 1).toString(),
        value
      }));
      onPrizesChange(newPrizes);
      setSelectedList(listType as PrizeListType);
    }
  };

  const addPrize = () => {
    if (prizes.length < 12) {
      const newPrize: Prize = {
        id: Date.now().toString(),
        value: `Prize ${prizes.length + 1}`
      };
      onPrizesChange([...prizes, newPrize]);
    }
  };

  const removePrize = (id: string) => {
    if (prizes.length > 2) {
      onPrizesChange(prizes.filter(prize => prize.id !== id));
    }
  };

  const updatePrize = (id: string, value: string) => {
    onPrizesChange(
      prizes.map(prize => 
        prize.id === id ? { ...prize, value } : prize
      )
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="config-panel"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <h2>Prize Configuration</h2>
      
      <div className="form-group">
        <label htmlFor="predefinedLists">Example Prize Lists:</label>
        <select 
          id="predefinedLists"
          value={selectedList}
          onChange={(e) => handlePredefinedListChange(e.target.value)}
          style={{ background: theme.colors[0] }}
        >
          <option value="">Choose a prize list</option>
          {Object.entries(predefinedLists).map(([key, values]) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} ({values.length} prizes)
            </option>
          ))}
        </select>
      </div>

      <div className="prize-inputs">
        <h3>Custom Prizes</h3>
        {prizes.map((prize, index) => (
          <div key={prize.id} className="prize-input">
            <input
              type="text"
              value={prize.value}
              onChange={(e) => updatePrize(prize.id, e.target.value)}
              placeholder={`Prize ${index + 1}`}
              aria-label={`Prize ${index + 1}`}
            />
            {prizes.length > 2 && (
              <button
                onClick={() => removePrize(prize.id)}
                className="remove-prize"
                aria-label={`Remove ${prize.value}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addPrize}
        disabled={prizes.length >= 12}
        className="add-prize"
        style={{
          background: `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`
        }}
      >
        Add Prize ({prizes.length}/12)
      </button>
    </motion.div>
  );
};

export default ConfigurationPanel;
