import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { categories, menuItems, promotions, restaurantInfo } from '@/data/mockData';
import { FoodCard } from '@/components/FoodCard';
import { CategoryCard } from '@/components/CategoryCard';
import { PromoCard } from '@/components/PromoCard';
import { RestaurantInfo } from '@/components/RestaurantInfo';

export default function HomeScreen() {
  const router = useRouter();
  const [promoIndex, setPromoIndex] = useState(0);

  const popularItems = menuItems.filter(item => item.isPopular);

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handlePromoPress = (promoCode: string) => {
    // Could show a toast with the promo code or auto-apply to cart
    console.log(`Promo code ${promoCode} selected`);
  };
  
  const handleViewAllMenu = () => {
    router.push('/menu');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.restaurantName}>{restaurantInfo.name}</Text>
            <Text style={styles.tagline}>{restaurantInfo.tagline}</Text>
          </View>
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearchPress}
            activeOpacity={0.8}
          >
            <Search size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        {/* Promotions Carousel */}
        <View style={styles.section}>
          <FlatList
            data={promotions}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={280 + theme.spacing.m}
            decelerationRate="fast"
            contentContainerStyle={styles.promotionsContainer}
            renderItem={({ item }) => (
              <PromoCard promo={item} onPress={handlePromoPress} />
            )}
            keyExtractor={item => item.id}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / (280 + theme.spacing.m)
              );
              setPromoIndex(newIndex);
            }}
          />
          
          <View style={styles.pagination}>
            {promotions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === promoIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>
        </View>
        
        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>
        
        {/* Popular Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <TouchableOpacity onPress={handleViewAllMenu}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.popularItemsContainer}>
            {popularItems.map((item, index) => (
              <FoodCard key={item.id} item={item} horizontal={index < 2} />
            ))}
          </View>
        </View>
        
        {/* Restaurant Information */}
        <RestaurantInfo 
          name={restaurantInfo.name}
          address={restaurantInfo.address}
          phone={restaurantInfo.phone}
          email={restaurantInfo.email}
          hours={restaurantInfo.hours}
        />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 {restaurantInfo.name}. All rights reserved.</Text>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingTop: Platform.OS === 'ios' ? 10 : theme.spacing.l,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  restaurantName: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.xxl,
    color: theme.colors.primary,
  },
  tagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
  searchButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.full,
  },
  section: {
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.primary,
  },
  promotionsContainer: {
    paddingVertical: theme.spacing.m,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.s,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: theme.colors.primary,
    width: 16,
  },
  categoriesContainer: {
    paddingBottom: theme.spacing.m,
  },
  popularItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footer: {
    padding: theme.spacing.l,
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textTertiary,
  },
});