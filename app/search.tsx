import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Header } from '@/components/Header';
import { FoodCard } from '@/components/FoodCard';
import { menuItems } from '@/data/mockData';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(menuItems);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (!text.trim()) {
      setSearchResults(menuItems);
      return;
    }
    
    const lowercaseQuery = text.toLowerCase();
    const filtered = menuItems.filter(item => {
      const nameMatches = item.name.toLowerCase().includes(lowercaseQuery);
      const descriptionMatches = item.description.toLowerCase().includes(lowercaseQuery);
      const categoryMatches = lowercaseQuery === 'vegetarian' ? item.isVegetarian : false;
      
      return nameMatches || descriptionMatches || categoryMatches;
    });
    
    setSearchResults(filtered);
  };
  
  const handleClear = () => {
    setSearchQuery('');
    setSearchResults(menuItems);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Search" showBack />
      
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search food, categories..."
            placeholderTextColor={theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
            clearButtonMode="never"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <X size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.resultsContainer}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => <FoodCard item={item} horizontal />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
                <Text style={styles.emptySubtext}>Try a different search term or browse our menu</Text>
              </View>
            }
          />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    margin: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
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
  searchIcon: {
    marginRight: theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.text,
  },
  clearButton: {
    padding: theme.spacing.s,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsList: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.xxl,
  },
  emptyContainer: {
    paddingVertical: theme.spacing.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.fontSizes.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.fontSizes.m,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});