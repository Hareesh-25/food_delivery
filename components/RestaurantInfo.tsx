import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Phone, Mail, Clock, MapPin } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface RestaurantInfoProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: Record<string, string>;
}

export function RestaurantInfo({ name, address, phone, email, hours }: RestaurantInfoProps) {
  const handlePhonePress = () => {
    Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleAddressPress = () => {
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = Platform.select({
      ios: `maps:q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
      default: `https://maps.google.com/?q=${encodedAddress}`
    });
    
    Linking.openURL(mapUrl);
  };

  // Get current day
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Information</Text>
      
      <TouchableOpacity style={styles.infoRow} onPress={handleAddressPress}>
        <MapPin size={18} color={theme.colors.primary} style={styles.icon} />
        <Text style={styles.infoText}>{address}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.infoRow} onPress={handlePhonePress}>
        <Phone size={18} color={theme.colors.primary} style={styles.icon} />
        <Text style={styles.infoText}>{phone}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.infoRow} onPress={handleEmailPress}>
        <Mail size={18} color={theme.colors.primary} style={styles.icon} />
        <Text style={styles.infoText}>{email}</Text>
      </TouchableOpacity>
      
      <View style={styles.infoRow}>
        <Clock size={18} color={theme.colors.primary} style={styles.icon} />
        <View>
          <Text style={[styles.infoText, styles.todayHours]}>
            Today: {hours[today]}
          </Text>
          <TouchableOpacity style={styles.viewAllHoursButton}>
            <Text style={styles.viewAllHoursText}>View all hours</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.l,
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
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  icon: {
    marginRight: theme.spacing.m,
    marginTop: 2,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
    flex: 1,
  },
  todayHours: {
    fontFamily: 'Poppins-Medium',
  },
  viewAllHoursButton: {
    marginTop: theme.spacing.xs,
  },
  viewAllHoursText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.s,
    color: theme.colors.primary,
  },
});