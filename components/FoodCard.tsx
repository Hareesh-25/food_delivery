import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { MenuItem } from '@/types';
import { CirclePlus as PlusCircle } from 'lucide-react-native';

interface FoodCardProps {
  item: MenuItem;
  horizontal?: boolean;
}

export function FoodCard({ item, horizontal = false }: FoodCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/menu/${item.id}`);
  };

  if (horizontal) {
    return (
      <TouchableOpacity 
        style={styles.horizontalCard} 
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalTextContainer}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              {item.isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <PlusCircle size={28} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      {item.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <PlusCircle size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
    width: '48%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  image: {
    height: 130,
    width: '100%',
  },
  content: {
    padding: theme.spacing.m,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: theme.spacing.s,
    left: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  popularText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.xs,
    color: 'white',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
    width: '100%',
    height: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalTextContainer: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
});