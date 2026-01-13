import { APP_COLORS } from '@/constants/appColors';
import { ImageBackground } from 'expo-image';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 150;

interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  onPress?: () => void;
}

interface BannerCarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function BannerCarousel({
  banners,
  autoPlay = true,
  autoPlayInterval = 3000,
}: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % banners.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (BANNER_WIDTH + 16),
          animated: true,
        });
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, banners.length]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (BANNER_WIDTH + 16));
    setActiveIndex(index);
  };

  if (banners.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={BANNER_WIDTH + 16}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            style={styles.bannerContainer}
            onPress={banner.onPress}
            activeOpacity={0.9}
          >
                <ImageBackground
                  source={{ uri: banner.image }}
                  style={styles.bannerContent}
                >
                  <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerTitle}>{banner.title}</Text>
                    <Text style={styles.bannerDescription}>
                      {banner.description}
                    </Text>
                  </View>
                </ImageBackground>

          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    backgroundColor: APP_COLORS.primary,
    width: 24,
  },
  bannerTitle: {
    fontSize: 25,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  bannerDescription: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 600,
    textAlign: 'center',
  },
  bannerContent: {
    height: "100%",
    width: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(102, 36, 131, 0.4)',
    width: '100%',
    height: '100%',
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
