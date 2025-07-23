import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ChevronLeft, Search, ShoppingBag } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
}

export function Header({ 
  title, 
  showBack = false, 
  showCart = true,
  showSearch = false 
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const itemCount = useCartStore(state => state.getItemCount());

  const handleBackPress = () => {
    router.back();
  };

  const handleCartPress = () => {
    router.push('/cart');
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            onPress={handleBackPress} 
            style={styles.backButton} 
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft color={theme.colors.text} size={24} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      
      <View style={styles.rightContainer}>
        {showSearch && (
          <TouchableOpacity 
            onPress={handleSearchPress} 
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Search color={theme.colors.text} size={22} />
          </TouchableOpacity>
        )}
        
        {showCart && pathname !== '/cart' && (
          <TouchableOpacity 
            onPress={handleCartPress} 
            style={styles.cartButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ShoppingBag color={theme.colors.text} size={22} />
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingTop: Platform.OS === 'ios' ? 50 : theme.spacing.l,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: theme.spacing.s,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
  },
  iconButton: {
    marginLeft: theme.spacing.m,
  },
  cartButton: {
    marginLeft: theme.spacing.m,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: theme.fontSizes.xs,
    textAlign: 'center',
  },
});