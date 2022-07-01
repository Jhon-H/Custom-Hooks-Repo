import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = (initialOpacity: number = 0.2) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current

  const fadeIn = (duration: number = 300, toValue: number = 1) => {
    Animated.timing(
      opacity,
      {
        toValue,
        duration,
        useNativeDriver: true
      }
    ).start()
  }

  const fadeOut = (duration: number = 300, toValue: number = initialOpacity) => {
    Animated.timing(
      opacity,
      {
        toValue,
        duration,
        useNativeDriver: true
      }
    ).start()
  }

  return {
    opacity,
    fadeIn,
    fadeOut
  }
}
