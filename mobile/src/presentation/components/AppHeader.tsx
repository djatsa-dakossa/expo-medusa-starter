import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { APP_ASSETS } from '@/constants/appAssets';
import { Colors } from '@/constants/theme';
import { APP_COLORS } from '@/constants/appColors';

interface AppHeaderProps {
  showBackButton?: boolean;
  title?: string;
  showCartButton?: boolean;
  showNotificationButton?: boolean;
}

export function AppHeader({ showBackButton = false, title, showCartButton = false, showNotificationButton = false }: AppHeaderProps) {
  const router = useRouter();
  const notificationCount = 1;
  const cartCount = 1;

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Ionicons name="chevron-back-outline" size={20} style={styles.backIcon} />
          </TouchableOpacity>
        ) : (
          <Image
            source={APP_ASSETS.logo}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      {
        title && <View style={styles.headerCenter}>
          <Text style={styles.title}>{title}</Text>
        </View>
      }

      <View style={styles.headerRight}>
        {showNotificationButton && <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
          <Ionicons name="notifications-outline" size={24} color={Colors.light.tint} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        }
        {showCartButton && <TouchableOpacity style={styles.headerButton} onPress={() => router.push({ pathname: '/cart' })}>
          <Ionicons name="cart-outline" size={24} color={Colors.light.tint} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 16,

  },
  headerLeft: {
    flexDirection: 'row',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#6624831A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: APP_COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerIcon: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  image: {
    height: 40,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
