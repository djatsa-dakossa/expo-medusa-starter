import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { APP_COLORS } from '@/constants/appColors';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="construct-outline" size={80} color={APP_COLORS.primary} />
        <Text style={styles.title}>En construction</Text>
        <Text style={styles.message}>
          Cette fonctionnalité sera bientôt disponible
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
