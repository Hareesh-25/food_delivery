import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Clock } from 'lucide-react-native';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const [estimatedTime, setEstimatedTime] = useState('25-35 min');
  
  // Animation values
  const checkmarkScale = useSharedValue(0);
  const checkmarkOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const infoOpacity = useSharedValue(0);
  
  const checkmarkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkmarkScale.value }],
      opacity: checkmarkOpacity.value,
    };
  });
  
  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });
  
  const infoStyle = useAnimatedStyle(() => {
    return {
      opacity: infoOpacity.value,
    };
  });
  
  useEffect(() => {
    // Animate elements sequentially
    checkmarkScale.value = withSequence(
      withTiming(1.2, { duration: 400, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 200 })
    );
    checkmarkOpacity.value = withTiming(1, { duration: 400 });
    
    textOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 400 })
    );
    
    infoOpacity.value = withDelay(
      1000,
      withTiming(1, { duration: 400 })
    );
  }, []);
  
  const handleTrackOrder = () => {
    router.replace('/orders');
  };
  
  const handleContinueShopping = () => {
    router.replace('/menu');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View style={[styles.checkmarkContainer, checkmarkStyle]}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/7616843/pexels-photo-7616843.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
            style={styles.checkmarkImage}
          />
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, textStyle]}>
          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.message}>
            Thank you for your order. We're preparing your delicious food.
          </Text>
        </Animated.View>
        
        <Animated.View style={[styles.infoContainer, infoStyle]}>
          <View style={styles.orderInfo}>
            <View style={styles.estimatedTimeContainer}>
              <Clock size={24} color={theme.colors.primary} style={{ marginRight: theme.spacing.s }} />
              <View>
                <Text style={styles.estimatedTimeLabel}>Estimated Delivery Time</Text>
                <Text style={styles.estimatedTimeValue}>{estimatedTime}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.orderDetailsContainer}>
              <Text style={styles.orderDetailsLabel}>Order Number</Text>
              <Text style={styles.orderDetailsValue}>#12345</Text>
            </View>
          </View>
          
          <View style={styles.buttonsContainer}>
            <Button 
              title="Track Order" 
              onPress={handleTrackOrder} 
              fullWidth
              style={{ marginBottom: theme.spacing.m }}
            />
            <Button 
              title="Continue Shopping" 
              onPress={handleContinueShopping} 
              variant="outline"
              fullWidth
            />
          </View>
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  checkmarkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: `0px 4px 16px ${theme.colors.primary}80`,
      },
    }),
    overflow: 'hidden',
  },
  checkmarkImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.display,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.l,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginHorizontal: theme.spacing.l,
  },
  infoContainer: {
    width: '100%',
  },
  orderInfo: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.xl,
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
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  estimatedTimeLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
  estimatedTimeValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginBottom: theme.spacing.l,
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailsLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
  orderDetailsValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.primary,
  },
  buttonsContainer: {
    width: '100%',
  },
});