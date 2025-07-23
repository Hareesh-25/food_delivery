import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { theme } from '@/constants/theme';
import { Promotion } from '@/types';

interface PromoCardProps {
  promo: Promotion;
  onPress: (promoCode: string) => void;
}

export function PromoCard({ promo, onPress }: PromoCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(promo.code)}
      activeOpacity={0.95}
    >
      <Image 
        source={{ uri: promo.imageUrl }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{promo.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{promo.description}</Text>
        </View>
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Use Code:</Text>
          <Text style={styles.code}>{promo.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 160,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    marginRight: theme.spacing.m,
    backgroundColor: theme.colors.card,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  image: {
    width: '100%',
    height: 100,
  },
  contentContainer: {
    padding: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  codeContainer: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.s,
    alignItems: 'center',
  },
  codeLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.xs,
    color: 'white',
  },
  code: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.s,
    color: 'white',
    letterSpacing: 0.5,
  },
});