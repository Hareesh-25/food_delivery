import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MapPin, CreditCard, Tag, Clock } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { useCartStore } from '@/store/cartStore';

const paymentMethods = [
  { id: 'card', name: 'Credit Card' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'cod', name: 'Cash on Delivery' }
];

const deliveryTimes = [
  { id: 'asap', name: 'As soon as possible' },
  { id: '30min', name: 'In 30 minutes' },
  { id: '60min', name: 'In 1 hour' },
  { id: 'later', name: 'Schedule for later' }
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('123 Main St, Apt 4B, Foodtown, NY 10001');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [deliveryTime, setDeliveryTime] = useState(deliveryTimes[0].id);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [tip, setTip] = useState(3);
  
  const subtotal = getCartTotal();
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoApplied ? 5 : 0;
  const tipAmount = tip;
  const total = subtotal + deliveryFee + tax + tipAmount - discount;
  
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WELCOME') {
      setPromoApplied(true);
      Alert.alert('Promo Code Applied', 'You received $5 off your order!');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code.');
    }
  };
  
  const handlePlaceOrder = () => {
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to place this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Place Order', 
          onPress: () => {
            clearCart();
            // In a real app, send order to backend here
            router.replace('/order-confirmation');
          }
        }
      ]
    );
  };
  
  const handleTipChange = (amount: number) => {
    setTip(amount);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Checkout" showBack />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Type Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Type</Text>
          
          <View style={styles.orderTypeContainer}>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === 'delivery' && styles.orderTypeButtonActive
              ]}
              onPress={() => setOrderType('delivery')}
            >
              <Text style={[
                styles.orderTypeText,
                orderType === 'delivery' && styles.orderTypeTextActive
              ]}>Delivery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === 'pickup' && styles.orderTypeButtonActive
              ]}
              onPress={() => setOrderType('pickup')}
            >
              <Text style={[
                styles.orderTypeText,
                orderType === 'pickup' && styles.orderTypeTextActive
              ]}>Pickup</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Delivery Address */}
        {orderType === 'delivery' && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={theme.colors.primary} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Delivery Address</Text>
            </View>
            
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{address}</Text>
              <TouchableOpacity>
                <Text style={styles.changeButton}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Payment Method */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color={theme.colors.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethodButton,
                  paymentMethod === method.id && styles.paymentMethodButtonActive
                ]}
                onPress={() => setPaymentMethod(method.id)}
              >
                <Text style={[
                  styles.paymentMethodText,
                  paymentMethod === method.id && styles.paymentMethodTextActive
                ]}>{method.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Delivery Time */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={theme.colors.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Delivery Time</Text>
          </View>
          
          <View style={styles.deliveryTimesContainer}>
            {deliveryTimes.map(time => (
              <TouchableOpacity
                key={time.id}
                style={[
                  styles.deliveryTimeButton,
                  deliveryTime === time.id && styles.deliveryTimeButtonActive
                ]}
                onPress={() => setDeliveryTime(time.id)}
              >
                <Text style={[
                  styles.deliveryTimeText,
                  deliveryTime === time.id && styles.deliveryTimeTextActive
                ]}>{time.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Promo Code */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Tag size={20} color={theme.colors.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Promo Code</Text>
          </View>
          
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor={theme.colors.textTertiary}
              value={promoCode}
              onChangeText={setPromoCode}
              editable={!promoApplied}
            />
            <Button
              title={promoApplied ? "Applied" : "Apply"}
              onPress={handleApplyPromo}
              disabled={promoApplied || !promoCode.trim()}
              size="small"
              style={styles.promoButton}
            />
          </View>
        </View>
        
        {/* Tip */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Add a Tip</Text>
          
          <View style={styles.tipContainer}>
            {[0, 2, 3, 5, 10].map(amount => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.tipButton,
                  tip === amount && styles.tipButtonActive
                ]}
                onPress={() => handleTipChange(amount)}
              >
                <Text style={[
                  styles.tipButtonText,
                  tip === amount && styles.tipButtonTextActive
                ]}>{amount === 0 ? 'No Tip' : `$${amount}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            {orderType === 'delivery' && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tip</Text>
              <Text style={styles.summaryValue}>${tipAmount.toFixed(2)}</Text>
            </View>
            
            {promoApplied && (
              <View style={styles.summaryRow}>
                <Text style={styles.discountLabel}>Discount</Text>
                <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
              </View>
            )}
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title={`Place Order • $${total.toFixed(2)}`} 
          onPress={handlePlaceOrder} 
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
  sectionContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    margin: theme.spacing.l,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  sectionIcon: {
    marginRight: theme.spacing.s,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.m,
    backgroundColor: theme.colors.backgroundSecondary,
    overflow: 'hidden',
  },
  orderTypeButton: {
    flex: 1,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTypeButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  orderTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
  orderTypeTextActive: {
    color: 'white',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    flex: 1,
  },
  changeButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.primary,
    marginLeft: theme.spacing.m,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  paymentMethodButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    margin: theme.spacing.xs,
  },
  paymentMethodButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  paymentMethodText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  paymentMethodTextActive: {
    color: 'white',
  },
  deliveryTimesContainer: {
    flexDirection: 'column',
  },
  deliveryTimeButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  deliveryTimeButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  deliveryTimeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  deliveryTimeTextActive: {
    color: 'white',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    marginRight: theme.spacing.m,
  },
  promoButton: {
    minWidth: 100,
  },
  tipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  tipButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    margin: theme.spacing.xs,
  },
  tipButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  tipButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  tipButtonTextActive: {
    color: 'white',
  },
  summaryContainer: {
    paddingVertical: theme.spacing.m,
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
  discountLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.success,
  },
  discountValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.success,
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
});