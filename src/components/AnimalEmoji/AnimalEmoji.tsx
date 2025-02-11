import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ANIMAL_EMOJIS } from './AnimalEmoji.constants';

const getRandomEmoji = () => {
  const emojiIndex = Math.floor(Math.random() * ANIMAL_EMOJIS.length);
  return ANIMAL_EMOJIS[emojiIndex];
};

const AnimalEmojiContext = createContext<string>('🐶');
interface AnimalEmojiProviderProps {
  children: ReactNode;
}
export const AnimalEmojiProvider = ({ children }: AnimalEmojiProviderProps) => {
  const location = useLocation();
  const [emoji, setEmoji] = useState(getRandomEmoji());

  const prevLocationRef = useRef(location);
  useEffect(() => {
    const prevLocation = prevLocationRef.current;
    prevLocationRef.current = location;

    if (location === prevLocation) {
      return;
    }

    setEmoji(getRandomEmoji());
  }, [location]);

  return <AnimalEmojiContext.Provider value={emoji}>{children}</AnimalEmojiContext.Provider>;
};

export const AnimalEmoji = () => {
  return <>{useContext(AnimalEmojiContext)}</>;
};
