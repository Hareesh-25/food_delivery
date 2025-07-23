import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Minus, Plus, Heart } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { MenuItem } from '@/types';
import { menuItems } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  
  const [item, setItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ optionId: string, choiceIds: string[] }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Find the menu item by id
    const menuItem = menuItems.find(item => item.id === id);
    
    if (menuItem) {
      setItem(menuItem);
      
      // Initialize selected options
      if (menuItem.options) {
        const initialOptions = menuItem.options.map(option => ({
          optionId: option.id,
          choiceIds: option.required ? [option.choices[0].id] : [],
        }));
        setSelectedOptions(initialOptions);
      }
    }
  }, [id]);
  
  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.max(1, newQuantity); // Minimum quantity is 1
    });
  };
  
  const toggleChoice = (optionId: string, choiceId: string, multiSelect: boolean) => {
    setSelectedOptions(prev => {
      return prev.map(option => {
        if (option.optionId === optionId) {
          if (multiSelect) {
            // For multi-select options: toggle the choice
            const choiceIds = option.choiceIds.includes(choiceId)
              ? option.choiceIds.filter(id => id !== choiceId)
              : [...option.choiceIds, choiceId];
            return { ...option, choiceIds };
          } else {
            // For single-select options: replace the choice
            return { ...option, choiceIds: [choiceId] };
          }
        }
        return option;
      });
    });
  };
  
  const calculateTotalPrice = () => {
    if (!item) return 0;
    
    let total = item.price * quantity;
    
    // Add costs for selected options
    selectedOptions.forEach(selectedOption => {
      const option = item.options?.find(opt => opt.id === selectedOption.optionId);
      if (option) {
        selectedOption.choiceIds.forEach(choiceId => {
          const choice = option.choices.find(c => c.id === choiceId);
          if (choice) {
            total += choice.price * quantity;
          }
        });
      }
    });
    
    return total;
  };
  
  const handleAddToCart = () => {
    if (!item) return;
    
    const cartItem = {
      id: `${item.id}_${Date.now()}`,
      menuItem: item,
      quantity,
      selectedOptions,
      specialInstructions,
      totalPrice: calculateTotalPrice(),
    };
    
    addItem(cartItem);
    Alert.alert(
      'Added to Cart', 
      `${quantity} ${item.name} added to your cart.`,
      [
        { 
          text: 'Continue Shopping', 
          style: 'cancel',
          onPress: () => router.back()
        },
        {
          text: 'View Cart',
          onPress: () => router.push('/cart')
        }
      ]
    );
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header showBack />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header showBack />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart 
              size={24} 
              color={isFavorite ? theme.colors.primary : 'white'} 
              fill={isFavorite ? theme.colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
          
          <Text style={styles.itemDescription}>{item.description}</Text>
          
          {item.isVegetarian && (
            <View style={styles.badgeContainer}>
              <View style={[styles.badge, styles.vegetarianBadge]}>
                <Text style={styles.badgeText}>Vegetarian</Text>
              </View>
              
              {item.isSpicy && (
                <View style={[styles.badge, styles.spicyBadge]}>
                  <Text style={styles.badgeText}>Spicy</Text>
                </View>
              )}
            </View>
          )}
          
          <View style={styles.divider} />
          
          {/* Options */}
          {item.options && item.options.map((option) => (
            <View key={option.id} style={styles.optionContainer}>
              <Text style={styles.optionTitle}>
                {option.name} {option.required && <Text style={styles.requiredText}>(Required)</Text>}
              </Text>
              
              <View style={styles.choicesContainer}>
                {option.choices.map((choice) => {
                  const selectedOption = selectedOptions.find(o => o.optionId === option.id);
                  const isSelected = selectedOption?.choiceIds.includes(choice.id);
                  
                  return (
                    <TouchableOpacity 
                      key={choice.id}
                      style={[
                        styles.choiceButton,
                        isSelected && styles.choiceButtonSelected
                      ]}
                      onPress={() => toggleChoice(option.id, choice.id, option.multiSelect)}
                    >
                      <Text 
                        style={[
                          styles.choiceText,
                          isSelected && styles.choiceTextSelected
                        ]}
                      >
                        {choice.name}
                      </Text>
                      {choice.price > 0 && (
                        <Text 
                          style={[
                            styles.choicePriceText,
                            isSelected && styles.choiceTextSelected
                          ]}
                        >
                          +${choice.price.toFixed(2)}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(false)}
                disabled={quantity <= 1}
              >
                <Minus 
                  size={20} 
                  color={quantity <= 1 ? theme.colors.textTertiary : theme.colors.primary} 
                />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(true)}
              >
                <Plus size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${calculateTotalPrice().toFixed(2)}</Text>
        </View>
        
        <Button 
          title="Add to Cart" 
          onPress={handleAddToCart}
          fullWidth
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.l,
    color: theme.colors.textSecondary,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.l,
    right: theme.spacing.l,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.full,
  },
  contentContainer: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    marginTop: -20,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.xxxl,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.s,
  },
  itemName: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.xxl,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.m,
  },
  itemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.primary,
  },
  itemDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
    lineHeight: 24,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  badge: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.s,
  },
  vegetarianBadge: {
    backgroundColor: theme.colors.success,
  },
  spicyBadge: {
    backgroundColor: theme.colors.error,
  },
  badgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.xs,
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.m,
  },
  optionContainer: {
    marginBottom: theme.spacing.l,
  },
  optionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  requiredText: {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.primary,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  choiceButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
    minWidth: 80,
    alignItems: 'center',
  },
  choiceButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  choiceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.s,
    color: theme.colors.text,
  },
  choiceTextSelected: {
    color: 'white',
  },
  choicePriceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  quantityTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.l,
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  totalContainer: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  totalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
  },
  totalPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
  },
});