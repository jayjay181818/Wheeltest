import { useEffect, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

const useSwipe = (handlers: SwipeHandlers, minSwipeDistance = 50) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (!touchStartX.current || !touchStartY.current || !touchEndX.current || !touchEndY.current) {
        return;
      }

      const distanceX = touchEndX.current - touchStartX.current;
      const distanceY = touchEndY.current - touchStartY.current;
      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

      if (isHorizontalSwipe) {
        if (distanceX > minSwipeDistance && handlers.onSwipeRight) {
          handlers.onSwipeRight();
        } else if (distanceX < -minSwipeDistance && handlers.onSwipeLeft) {
          handlers.onSwipeLeft();
        }
      } else {
        if (distanceY > minSwipeDistance && handlers.onSwipeDown) {
          handlers.onSwipeDown();
        } else if (distanceY < -minSwipeDistance && handlers.onSwipeUp) {
          handlers.onSwipeUp();
        }
      }

      // Reset values
      touchStartX.current = null;
      touchStartY.current = null;
      touchEndX.current = null;
      touchEndY.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlers, minSwipeDistance]);
};

export default useSwipe;
