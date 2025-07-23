import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';

// Mock data for orders - in a real app, this would come from an API
const orders = [
  {
    id: 'o1',
    date: '2025-05-20T18:30:00Z',
    status: 'delivered',
    items: [
      { name: 'Grilled Salmon', quantity: 1 },
      { name: 'Caesar Salad', quantity: 1 }
    ],
    total: 38.97,
    deliveryAddress: '123 Main St, Apt 4B, Foodtown, NY 10001'
  },
  {
    id: 'o2',
    date: '2025-05-18T19:45:00Z',
    status: 'delivered',
    items: [
      { name: 'Fettuccine Alfredo', quantity: 1 },
      { name: 'Bruschetta', quantity: 1 },
      { name: 'Fresh Lemonade', quantity: 2 }
    ],
    total: 42.95,
    deliveryAddress: '123 Main St, Apt 4B, Foodtown, NY 10001'
  }
];

// Active order (in progress)
const activeOrder = {
  id: 'o3',
  date: new Date().toISOString(),
  status: 'in-delivery',
  estimatedDelivery: new Date(Date.now() + 20 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  items: [
    { name: 'Crispy Calamari', quantity: 1 },
    { name: 'Chocolate Lava Cake', quantity: 2 }
  ],
  total: 30.97,
  deliveryAddress: '123 Main St, Apt 4B, Foodtown, NY 10001',
  driver: {
    name: 'Michael',
    vehicle: 'Honda Civic',
    phone: '555-123-4567'
  }
};

export default function OrdersScreen() {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) + ', ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const handleOrderPress = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  const handleTrackOrder = () => {
    router.push(`/order-tracking/${activeOrder.id}`);
  };

  const renderPastOrder = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard} 
      onPress={() => handleOrderPress(item.id)}
      activeOpacity={0.9}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Delivered</Text>
        </View>
      </View>
      
      <View style={styles.orderItems}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.orderItemText}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        <Text style={styles.reorderText}>Reorder</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Your Orders" showBack={false} />
      
      <View style={styles.container}>
        {activeOrder && (
          <View style={styles.activeOrderContainer}>
            <View style={styles.activeOrderHeader}>
              <Text style={styles.activeOrderTitle}>Current Order</Text>
              <View style={styles.activeStatusBadge}>
                <Text style={styles.activeStatusText}>On the way</Text>
              </View>
            </View>
            
            <View style={styles.deliveryInfoContainer}>
              <View style={styles.estimatedTimeContainer}>
                <Text style={styles.estimatedTimeLabel}>Estimated Delivery</Text>
                <Text style={styles.estimatedTime}>{activeOrder.estimatedDelivery}</Text>
              </View>
              
              <View style={styles.driverInfoContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
                  style={styles.driverImage}
                />
                <View style={styles.driverDetails}>
                  <Text style={styles.driverName}>{activeOrder.driver.name}</Text>
                  <Text style={styles.driverVehicle}>{activeOrder.driver.vehicle}</Text>
                </View>
              </View>
            </View>
            
            <Button 
              title="Track Order" 
              onPress={handleTrackOrder} 
              fullWidth
            />
          </View>
        )}
        
        <View style={styles.pastOrdersContainer}>
          <Text style={styles.pastOrdersTitle}>Past Orders</Text>
          
          {orders.length > 0 ? (
            <FlatList
              data={orders}
              renderItem={renderPastOrder}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.ordersList}
            />
          ) : (
            <View style={styles.emptyOrdersContainer}>
              <Text style={styles.emptyOrdersText}>You don't have any past orders yet.</Text>
              <Button 
                title="Browse Menu" 
                onPress={() => router.push('/menu')} 
                style={{ marginTop: theme.spacing.l }}
              />
            </View>
          )}
        </View>
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
  activeOrderContainer: {
    margin: theme.spacing.l,
    padding: theme.spacing.l,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  activeOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  activeOrderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
  },
  activeStatusBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  activeStatusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.s,
    color: 'white',
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  estimatedTimeContainer: {
    flex: 1,
  },
  estimatedTimeLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
  },
  estimatedTime: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.m,
  },
  driverDetails: {},
  driverName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  driverVehicle: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
  },
  pastOrdersContainer: {
    flex: 1,
    padding: theme.spacing.l,
  },
  pastOrdersTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  ordersList: {
    paddingBottom: theme.spacing.xl,
  },
  orderCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  orderDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.xs,
    color: 'white',
  },
  orderItems: {
    marginBottom: theme.spacing.m,
  },
  orderItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  orderTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
  },
  reorderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.primary,
  },
  emptyOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  emptyOrdersText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});