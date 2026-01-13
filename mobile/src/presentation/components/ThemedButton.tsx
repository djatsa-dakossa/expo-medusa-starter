import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Colors,
  ButtonStyles,
  getButtonStyle,
  getButtonTextStyle,
} from '@/constants/theme';

export interface ThemedButtonProps extends TouchableOpacityProps {
  /** Button text */
  title: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'small' | 'base' | 'large';
  /** Loading state */
  loading?: boolean;
  /** Override button style */
  buttonStyle?: ViewStyle;
  /** Override text style */
  textStyle?: TextStyle;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
}

export function ThemedButton({
  title,
  variant = 'primary',
  size = 'base',
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}: ThemedButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const isDisabled = disabled || loading;

  // Get base styles
  const baseStyle = getButtonStyle(colorScheme, variant, isDisabled);
  const textBaseStyle = getButtonTextStyle(colorScheme, variant, isDisabled);

  // Get size-specific styles
  const sizeStyle =
    size === 'small'
      ? ButtonStyles.small
      : size === 'large'
      ? ButtonStyles.large
      : {};

  return (
    <TouchableOpacity
      {...props}
      disabled={isDisabled}
      style={[baseStyle, sizeStyle, buttonStyle]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : colors.tint}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[textBaseStyle, textStyle]}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}
