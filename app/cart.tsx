import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


import { useCart } from './context/CartContext';

export default function CartScreen() {
  const router = useRouter();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.title}>
            My Cart
          </Text>

          {cartCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>
                {cartCount}
              </Text>
            </View>
          )}
        </View>

        <View style={{ width: 44 }} />
      </View>

      {cart.length === 0 ? (
        /* Empty Cart */
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>
            🛒
          </Text>

          <Text style={styles.emptyTitle}>
            Your cart is empty
          </Text>

          <Text style={styles.emptyText}>
            Add some products and they will appear here.
          </Text>

          <Pressable
            style={styles.shopButton}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.shopButtonText}>
              Start Shopping
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Cart Items */}
          {cart.map((item) => (
            <View
              key={item.id}
              style={styles.cartItem}
            >
              {/* Image */}
              <View style={styles.itemImage}>
                <Text style={styles.itemEmoji}>
                  {item.emoji}
                </Text>
              </View>

              {/* Details */}
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                <Text style={styles.itemPrice}>
                  ₹{item.price.toLocaleString('en-IN')}
                </Text>

                {/* Quantity */}
                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    <Text style={styles.quantityButtonText}>
                      −
                    </Text>
                  </Pressable>

                  <Text style={styles.quantity}>
                    {item.quantity}
                  </Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    <Text style={styles.quantityButtonText}>
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Remove */}
              <Pressable
                style={styles.removeButton}
                onPress={() =>
                  removeFromCart(item.id)
                }
              >
                <Text style={styles.removeText}>
                  ✕
                </Text>
              </Pressable>
            </View>
          ))}

          {/* Order Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>
              Order Summary
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>
                Items ({cartCount})
              </Text>

              <Text style={styles.value}>
                ₹{cartTotal.toLocaleString('en-IN')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Delivery
              </Text>

              <Text style={styles.free}>
                FREE
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>
                Total
              </Text>

              <Text style={styles.total}>
                ₹{cartTotal.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          {/* Checkout */}
          <Pressable
            style={styles.checkoutButton}
            onPress={() =>
              alert('Checkout coming next! 🚀')
            }
          >
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>

            <Text style={styles.checkoutPrice}>
              ₹{cartTotal.toLocaleString('en-IN')}
            </Text>
          </Pressable>

          <View style={{ height: 30 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
  },

  header: {
    height: 75,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  countBadge: {
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#D96C4F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 7,
  },

  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  backText: {
    fontSize: 34,
    color: '#3D2C2E',
    marginTop: -4,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#FFF0E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemEmoji: {
    fontSize: 48,
  },

  itemDetails: {
    flex: 1,
    marginLeft: 14,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D96C4F',
    marginTop: 5,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF0E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    fontSize: 18,
    color: '#D96C4F',
    fontWeight: '700',
  },

  quantity: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3D2C2E',
    marginHorizontal: 14,
  },

  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeText: {
    color: '#999',
    fontSize: 16,
  },

  summary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3D2C2E',
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    color: '#777',
  },

  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2C2E',
  },

  free: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5A9B65',
  },

  divider: {
    height: 1,
    backgroundColor: '#EBDDD6',
    marginVertical: 5,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  total: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D96C4F',
  },

  checkoutButton: {
    height: 58,
    borderRadius: 29,
    backgroundColor: '#3D2C2E',
    marginTop: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  checkoutPrice: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyEmoji: {
    fontSize: 80,
  },

  emptyTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#3D2C2E',
    marginTop: 18,
  },

  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },

  shopButton: {
    backgroundColor: '#3D2C2E',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 14,
    marginTop: 22,
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
