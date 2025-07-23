import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MapPin, CreditCard, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Header } from '@/components/Header';

// Mock user data
const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
};

export default function ProfileScreen() {
  const renderMenuItem = (icon, title, onPress) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <ChevronRight size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" showBack={false} showCart={false} />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user.imageUrl }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          
          {renderMenuItem(
            <Heart size={20} color={theme.colors.primary} style={styles.menuIcon} />,
            'Favorites',
            () => {}
          )}
          
          {renderMenuItem(
            <MapPin size={20} color={theme.colors.primary} style={styles.menuIcon} />,
            'Delivery Addresses',
            () => {}
          )}
          
          {renderMenuItem(
            <CreditCard size={20} color={theme.colors.primary} style={styles.menuIcon} />,
            'Payment Methods',
            () => {}
          )}
          
          {renderMenuItem(
            <Bell size={20} color={theme.colors.primary} style={styles.menuIcon} />,
            'Notifications',
            () => {}
          )}
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Support</Text>
          
          {renderMenuItem(
            <HelpCircle size={20} color={theme.colors.primary} style={styles.menuIcon} />,
            'Help & FAQ',
            () => {}
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={theme.colors.error} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
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
  profileHeader: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: theme.spacing.l,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  profilePhone: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
  },
  menuSection: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.l,
    marginTop: theme.spacing.l,
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
  menuSectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: theme.spacing.m,
  },
  menuItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing.l,
    marginTop: theme.spacing.l,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
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
  logoutIcon: {
    marginRight: theme.spacing.s,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSizes.m,
    color: theme.colors.error,
  },
  footer: {
    padding: theme.spacing.l,
    alignItems: 'center',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.textTertiary,
  },
});