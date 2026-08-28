import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  rating: string;
  description: string;
};

const productData: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Dog Food',
    price: 799,
    emoji: '🥩',
    rating: '4.8',
    description:
      'A nutritious and delicious meal made with quality ingredients to keep your dog healthy, active and happy.',
  },

  '2': {
    id: '2',
    name: 'Cute Pet Toy',
    price: 299,
    emoji: '🧸',
    rating: '4.8',
    description:
      'A fun and soft toy designed to keep your pet entertained and active throughout the day.',
  },

  '3': {
    id: '3',
    name: 'Cozy Pet Bed',
    price: 1299,
    emoji: '🛏️',
    rating: '4.7',
    description:
      'A comfortable and cozy bed that gives your furry friend the perfect place to relax and sleep.',
  },
};

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { addToCart } = useCart();

  const productId = Array.isArray(id) ? id[0] : id;

  const product = productData[productId];

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundEmoji}>🐾</Text>

        <Text style={styles.notFoundTitle}>
          Product Not Found
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
      },
      quantity
    );

    Alert.alert(
      'Added to Cart 🛒',
      `${quantity} × ${product.name} added successfully.`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'View Cart',
          onPress: () => router.push('/cart'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Navigation */}
        <View style={styles.topBar}>
          <Pressable
            style={styles.roundButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.topTitle}>
            Product Details
          </Text>

          <Pressable
            style={styles.roundButton}
            onPress={() => setLiked(!liked)}
          >
            <Text style={styles.heart}>
              {liked ? '❤️' : '♡'}
            </Text>
          </Pressable>
        </View>

        {/* Product Image */}
        <View style={styles.productImage}>
          <Text style={styles.productEmoji}>
            {product.emoji}
          </Text>
        </View>

        {/* Product Information */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.productName}>
              {product.name}
            </Text>

            <View style={styles.ratingBox}>
              <Text style={styles.star}>⭐</Text>

              <Text style={styles.rating}>
                {product.rating}
              </Text>
            </View>
          </View>

          {/* Price */}
          <Text style={styles.price}>
            ₹{product.price.toLocaleString('en-IN')}
          </Text>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.aboutTitle}>
            About this product
          </Text>

          <Text style={styles.description}>
            {product.description}
          </Text>

          {/* Quantity */}
          <Text style={styles.quantityTitle}>
            Quantity
          </Text>

          <View style={styles.quantityContainer}>
            <Pressable
              style={styles.quantityButton}
              onPress={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
            >
              <Text style={styles.quantityButtonText}>
                −
              </Text>
            </Pressable>

            <Text style={styles.quantityText}>
              {quantity}
            </Text>

            <Pressable
              style={styles.quantityButton}
              onPress={() =>
                setQuantity(quantity + 1)
              }
            >
              <Text style={styles.quantityButtonText}>
                +
              </Text>
            </Pressable>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🚚</Text>

              <View>
                <Text style={styles.featureTitle}>
                  Fast Delivery
                </Text>

                <Text style={styles.featureText}>
                  Delivered to your doorstep
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>↩️</Text>

              <View>
                <Text style={styles.featureTitle}>
                  Easy Returns
                </Text>

                <Text style={styles.featureText}>
                  Simple and hassle-free
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔒</Text>

              <View>
                <Text style={styles.featureTitle}>
                  Secure Payment
                </Text>

                <Text style={styles.featureText}>
                  Safe and secure checkout
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{totalPrice.toLocaleString('en-IN')}
          </Text>
        </View>

        <Pressable
          style={styles.cartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.cartButtonText}>
            Add to Cart 🛒
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
  },

  scrollContent: {
    paddingBottom: 140,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
  },

  topTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  roundButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  backIcon: {
    fontSize: 36,
    color: '#3D2C2E',
    lineHeight: 38,
  },

  heart: {
    fontSize: 25,
    color: '#D96C4F',
  },

  productImage: {
    height: 320,
    marginHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF0E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productEmoji: {
    fontSize: 150,
  },

  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },

  productName: {
    flex: 1,
    fontSize: 25,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  star: {
    fontSize: 15,
  },

  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2C2E',
    marginLeft: 4,
  },

  price: {
    fontSize: 25,
    fontWeight: '800',
    color: '#D96C4F',
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#EBDDD6',
    marginVertical: 22,
  },

  aboutTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#3D2C2E',
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#6E5D5D',
  },

  quantityTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3D2C2E',
    marginTop: 25,
    marginBottom: 12,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EBDDD6',
  },

  quantityButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    fontSize: 24,
    color: '#D96C4F',
    fontWeight: '600',
  },

  quantityText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#3D2C2E',
    minWidth: 35,
    textAlign: 'center',
  },

  features: {
    marginTop: 25,
    gap: 12,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 14,
  },

  featureIcon: {
    fontSize: 25,
    marginRight: 12,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2C2E',
  },

  featureText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBDDD6',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 12,
    color: '#888',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3D2C2E',
    marginTop: 2,
  },

  cartButton: {
    backgroundColor: '#3D2C2E',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 15,
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: '#FFF9F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFoundEmoji: {
    fontSize: 70,
  },

  notFoundTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3D2C2E',
    marginTop: 15,
  },

  backButton: {
    backgroundColor: '#3D2C2E',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 25,
    marginTop: 20,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
