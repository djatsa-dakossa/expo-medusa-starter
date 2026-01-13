import { Colors } from '@/constants/theme';
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface AppButtonProps {
  onPress: () => void;
  title: string;
  style?: any;
  textStyle?: any;
}

const AppButton = ({ onPress, title, style, textStyle }: AppButtonProps) => (
  <Pressable onPress={onPress} style={({ pressed }) => [
    styles.buttonContainer,
    style,
    pressed && styles.buttonPressed,
  ]}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 400,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

export default AppButton;
