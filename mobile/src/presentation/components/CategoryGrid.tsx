import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Category } from '../../domain/entities/Category';
import { Colors } from '@/constants/theme';

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

export function CategoryGrid({ categories, onCategoryPress }: CategoryGridProps) {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => onCategoryPress(item)}
    >
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.categoryImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#6624831A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconContainer: {
    backgroundColor: Colors.light.tint,
    padding: 4,
    borderRadius: 5,
    marginRight: 8,
    width: 40,
    height: 40,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  icon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
});
