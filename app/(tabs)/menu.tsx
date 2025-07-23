import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { categories, menuItems } from '@/data/mockData';
import { FoodCard } from '@/components/FoodCard';
import { Header } from '@/components/Header';

export default function MenuScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  useEffect(() => {
    if (activeCategory) {
      setFilteredItems(menuItems.filter(item => item.category === activeCategory));
    } else {
      setFilteredItems(menuItems);
    }
  }, [activeCategory]);

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Menu" showSearch />
      
      <View style={styles.container}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  activeCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.8}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    activeCategory === category.id && styles.categoryButtonTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Menu Items */}
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <FoodCard item={item} horizontal />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuItemsContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items found in this category.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  categoriesContainer: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.l,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  menuItemsContainer: {
    padding: theme.spacing.l,
  },
  emptyContainer: {
    padding: theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
});