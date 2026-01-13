import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

interface IconButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  iconColor?: string;
  buttonStyles?: ViewStyle;
}

export default function IconButton ({children, onPress, buttonStyles }: IconButtonProps) {
  
  return <Pressable 
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      { opacity: pressed ? 0.7 : 1, backgroundColor: '#f0f0f0' },
      buttonStyles
    ]}
  >
    {children}
  </Pressable>
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});