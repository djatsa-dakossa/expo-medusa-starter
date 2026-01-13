import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32; // Minus horizontal margins

export interface FlashSaleItem {
  id: string;
  title: string;
  endsAt: Date;
  backgroundColor?: string;
  discount?: string;
  description?: string;
}

interface FlashSaleBannerProps {
  items?: FlashSaleItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const DEFAULT_ITEMS: FlashSaleItem[] = [
  {
    id: '1',
    title: 'Vente Flash',
    endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    backgroundColor: '#7C3AED',
    description: 'Profitez dès maintenant de notre offre spéciale',
  },
  {
    id: '2',
    title: 'Super Promo',
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
    backgroundColor: '#EC4899',
    discount: '-50%',
    description: 'Profitez dès maintenant de notre offre spéciale',
  },
  {
    id: '3',
    title: 'Offre Spéciale',
    endsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    backgroundColor: '#EF4444',
    discount: '-30%',
    description: 'Profitez dès maintenant de notre offre spéciale',
  },
];

function CountdownTimer({ endsAt }: { endsAt: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endsAt.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.days).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>jours</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>heures</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>minutes</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>secondes</Text>
      </View>
    </View>
  );
}

export function FlashSaleBanner({
  items = DEFAULT_ITEMS,
  autoPlay = true,
  autoPlayInterval = 5000,
}: FlashSaleBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % items.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * BANNER_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / BANNER_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <View
            key={item.id}
            style={[
              styles.banner,
              { backgroundColor: item.backgroundColor || '#7C3AED' },
            ]}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.title}>{item.title}</Text>
              {item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}
              <CountdownTimer endsAt={item.endsAt} />
              <Pressable style={styles.bannerButton} onPress={() => {}}>
                <Text style={styles.bannerButtonText}>Profitez maintenant !</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {items.length > 1 && (
        <View style={styles.pagination}>
          {items.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: Colors.light.tint,
    width: 24,
  },
  banner: {
    borderRadius: 12,
    marginRight: 10,
    overflow: 'hidden',
    paddingVertical: 30,
    width: BANNER_WIDTH,
  },
  bannerButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bannerButtonText: {
    color: Colors.light.tint,
    fontSize: 12,
    fontWeight: 400,
  },
  bannerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    marginVertical: 12,
  },
  description: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 8,
    textAlign: 'center',
  },
  discount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dot: {
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
    width: 8,
  },
  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  separator: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  timeBox: {
    alignItems: 'center',
    minWidth: 50,
  },
  timeLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 4,
  },
  timeValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
