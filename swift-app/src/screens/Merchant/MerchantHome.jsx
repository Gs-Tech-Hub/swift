import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const MerchantHome = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>
        Welcome, {user?.merchantData?.businessName || user?.fullName}
      </Text>

      <View style={styles.cardGroup}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.lightGray }]}
          onPress={() => navigation.navigate('AddProductScreen')}
        >
          <Ionicons name="add-circle-outline" size={28} color={theme.accent} />
          <Text style={[styles.cardText, { color: theme.primary }]}>Add Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.lightGray }]}
          onPress={() => navigation.navigate('ManageProductsScreen')}
        >
          <Ionicons name="cube-outline" size={28} color={theme.accent} />
          <Text style={[styles.cardText, { color: theme.primary }]}>Manage Products</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.lightGray }]}
          onPress={() => navigation.navigate('MerchantOrdersScreen')}
        >
          <Ionicons name="cart-outline" size={28} color={theme.accent} />
          <Text style={[styles.cardText, { color: theme.primary }]}>View Orders</Text>
        </TouchableOpacity>

        {/* NEW: Dispute Manager */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.lightGray }]}
          onPress={() => navigation.navigate('DisputeManagerScreen')}
        >
          <Ionicons name="alert-circle-outline" size={28} color={theme.accent} />
          <Text style={[styles.cardText, { color: theme.primary }]}>Dispute Manager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
  cardGroup: { gap: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  cardText: { fontSize: 16, marginLeft: 10 },
});

export default MerchantHome;
