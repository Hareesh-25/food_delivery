import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { useCartStore } from '@/store/cartStore';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCartStore();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = getCartTotal();
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to your cart before checking out.');
      return;
    }
    
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/menu');
  };

  const renderItem = ({ item }) => {
    const handleIncrement = () => {
      updateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.quantity - 1);
      } else {
        removeItem(item.id);
      }
    };

    const handleRemove = () => {
      removeItem(item.id);
    };

    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.menuItem.imageUrl }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.menuItem.name}</Text>
            <TouchableOpacity onPress={handleRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Trash2 size={18} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
          
          {item.selectedOptions.map((option, index) => {
            const optionInfo = item.menuItem.options?.find(opt => opt.id === option.optionId);
            if (!optionInfo) return null;

            const selectedChoices = option.choiceIds.map(choiceId => {
              const choice = optionInfo.choices.find(c => c.id === choiceId);
              return choice?.name;
            }).filter(Boolean);

            return (
              <Text key={index} style={styles.itemOption}>
                {optionInfo.name}: {selectedChoices.join(', ')}
              </Text>
            );
          })}
          
          <View style={styles.itemFooter}>
            <View style={styles.quantityControl}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleDecrement}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Minus size={16} color={theme.colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleIncrement}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Plus size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>${item.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Your Cart" showBack={false} showCart={false} />
      
      <View style={styles.container}>
        {items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
          />
        ) : (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCartText}>Add items from the menu to start your order</Text>
            <Button 
              title="Browse Menu" 
              onPress={handleContinueShopping} 
              style={styles.browseButton}
            />
          </View>
        )}
      </View>
      
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          
          <Button 
            title="Proceed to Checkout" 
            onPress={handleCheckout} 
            fullWidth
          />
        </View>
      )}
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
  cartList: {
    padding: theme.spacing.l,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.s,
  },
  itemDetails: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.s,
  },
  itemOption: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.s,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.s,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    paddingHorizontal: theme.spacing.m,
    minWidth: 30,
    textAlign: 'center',
  },
  itemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.primary,
  },
  footer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
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
  summaryContainer: {
    marginBottom: theme.spacing.l,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  totalRow: {
    marginTop: theme.spacing.s,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.primary,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyCartTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  emptyCartText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  browseButton: {
    marginTop: theme.spacing.l,
  },
});