/**
 * Haptic feedback utilities using the Vibration API
 * Provides tactile feedback for mobile devices
 */

export const haptics = {
  /**
   * Light tap feedback
   */
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },

  /**
   * Medium tap feedback
   */
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },

  /**
   * Heavy tap feedback
   */
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(40);
    }
  },

  /**
   * Success pattern (double vibration)
   */
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([20, 50, 20]);
    }
  },

  /**
   * Error pattern (three quick vibrations)
   */
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 30, 10, 30, 10]);
    }
  },

  /**
   * Spinning pattern (continuous light vibration)
   */
  spinning: (duration: number = 100) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  },

  /**
   * Check if vibration is supported
   */
  isSupported: () => {
    return 'vibrate' in navigator;
  }
};
