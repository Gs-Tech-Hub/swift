import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import Button from '../../components/Button';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function MarketplaceHome({ navigation }) {
  const { products, addToCart } = useMarketplace();
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary, fontSize: theme.FONTS.large }]}>
        Marketplace
      </Text>

      {products.map((p) => (
        <View
          key={p.id}
          style={[
            styles.productCard,
            { backgroundColor: theme.lightGray, borderRadius: theme.RADIUS.md },
          ]}
        >
          <Text style={[styles.productName, { color: theme.primary }]}>{p.name}</Text>
          <Text style={{ color: theme.secondary, marginBottom: theme.SPACING.sm }}>
            ₦{p.price}
          </Text>
          <Button title="Add to cart" onPress={() => addToCart(p)} />
        </View>
      ))}

      <View style={{ marginTop: theme.SPACING.lg }}>
        <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontWeight: '700', marginBottom: 20 },
  productCard: { padding: 16, marginBottom: 12 },
  productName: { fontWeight: '700', fontSize: 16 },
});

