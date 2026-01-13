import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Colors,
  InputStyles,
  Spacing,
  getInputStyle,
} from '@/constants/theme';

export interface ThemedInputProps extends TextInputProps {
  /** Input label */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Success message to display */
  success?: string;
  /** Input size variant */
  size?: 'small' | 'base' | 'large';
  /** Container style */
  containerStyle?: ViewStyle;
  /** Override input style */
  inputStyle?: TextStyle;
  /** Show character counter */
  maxLength?: number;
  showCounter?: boolean;
}

export function ThemedInput({
  label,
  error,
  success,
  size = 'base',
  containerStyle,
  inputStyle,
  editable = true,
  multiline = false,
  maxLength,
  showCounter = false,
  value,
  ...props
}: ThemedInputProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isFocused, setIsFocused] = useState(false);

  // Determine input state
  const getState = (): 'default' | 'focus' | 'error' | 'disabled' => {
    if (!editable) return 'disabled';
    if (error) return 'error';
    if (isFocused) return 'focus';
    return 'default';
  };

  const state = getState();
  const baseStyle = getInputStyle(colorScheme, state);

  // Get size-specific styles
  const sizeStyle =
    size === 'small'
      ? InputStyles.small
      : size === 'large'
      ? InputStyles.large
      : {};

  // Get multiline style
  const multilineStyle = multiline ? InputStyles.multiline : {};

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}

      {/* Input */}
      <TextInput
        {...props}
        value={value}
        editable={editable}
        multiline={multiline}
        maxLength={maxLength}
        style={[baseStyle, sizeStyle, multilineStyle, inputStyle]}
        placeholderTextColor={colors.inputPlaceholder}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />

      {/* Error Message */}
      {error && (
        <View style={[styles.messageContainer, styles.errorContainer]}>
          <Text style={[styles.messageText, { color: colors.error }]}>
            {error}
          </Text>
        </View>
      )}

      {/* Success Message */}
      {success && !error && (
        <View style={[styles.messageContainer, styles.successContainer]}>
          <Text style={[styles.messageText, { color: colors.success }]}>
            {success}
          </Text>
        </View>
      )}

      {/* Character Counter */}
      {showCounter && maxLength && (
        <Text style={[styles.counter, { color: colors.inputPlaceholder }]}>
          {value?.length || 0} / {maxLength}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  messageContainer: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  errorContainer: {
    // Additional error styling if needed
  },
  successContainer: {
    // Additional success styling if needed
  },
  messageText: {
    fontSize: 12,
  },
  counter: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: Spacing.xs,
  },
});
