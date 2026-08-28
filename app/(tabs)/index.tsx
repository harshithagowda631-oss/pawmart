import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const categories = [
    { name: 'Food', emoji: '🍖' },
    { name: 'Toys', emoji: '🧸' },
    { name: 'Beds', emoji: '🛏️' },
    { name: 'Grooming', emoji: '🧴' },
    { name: 'Health', emoji: '💊' },
  ];

  const products = [
    {
      id: '1',
      name: 'Premium Dog Food',
      price: '₹799',
      emoji: '🥩',
    },
    {
      id: '2',
      name: 'Cute Pet Toy',
      price: '₹299',
      emoji: '🧸',
    },
    {
      id: '3',
      name: 'Cozy Pet Bed',
      price: '₹1,299',
      emoji: '🛏️',
    },
  ];

  const openProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Welcome to</Text>
          <Text style={styles.title}>PawMart 🐾</Text>
        </View>

        <Pressable
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.cartText}>🛒</Text>
        </Pressable>
      </View>

      {/* Search */}
      <Text>Searching for: {search}</Text>
      <TextInput
        style={styles.search}
        placeholder="Search pet products..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* Banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerSmall}>
            EVERYTHING FOR
          </Text>

          <Text style={styles.bannerTitle}>
            Your Best Friend 🐶
          </Text>

          <Text style={styles.bannerSubtitle}>
            Food • Toys • Care • Accessories
          </Text>

          <Pressable style={styles.shopButton}>
            <Text style={styles.shopButtonText}>
              Shop Now
            </Text>
          </Pressable>
        </View>

        <Text style={styles.bannerEmoji}>🐕</Text>
      </View>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Categories
        </Text>

        <Pressable>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category) => (
          <Pressable
           key={category.name}
           style={styles.categoryCard}
           onPress={() => setSearch(category.name)}
>
            <Text style={styles.categoryEmoji}>
              {category.emoji}
            </Text>

            <Text style={styles.categoryName}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Popular Products */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Popular Products
        </Text>

        <Pressable>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.products}>
       {products
       .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
        )
  .map((product) => (
          <Pressable
            key={product.id}
            style={styles.productCard}
            onPress={() => openProduct(product.id)}
          >
            {/* Product Image */}
            <View style={styles.productImage}>
              <Text style={styles.productEmoji}>
                {product.emoji}
              </Text>
            </View>

            {/* Product Name */}
            <Text style={styles.productName}>
              {product.name}
            </Text>

            {/* Rating */}
            <Text style={styles.rating}>
              ⭐ 4.8
            </Text>

            {/* Price + Add Button */}
            <View style={styles.productBottom}>
              <Text style={styles.price}>
                {product.price}
              </Text>

              <Pressable
                style={styles.addButton}
                onPress={() => openProduct(product.id)}
              >
                <Text style={styles.addText}>
                  +
                </Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Bottom spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
    paddingHorizontal: 20,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 20,
  },

  smallText: {
    fontSize: 14,
    color: '#777',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  cartText: {
    fontSize: 23,
  },

  /* Search */

  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 18,
    fontSize: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  /* Banner */

  banner: {
    backgroundColor: '#F7B267',
    borderRadius: 22,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },

  bannerSmall: {
    fontSize: 11,
    fontWeight: '700',
    color: '#68472B',
  },

  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3D2C2E',
    marginTop: 4,
  },

  bannerSubtitle: {
    fontSize: 12,
    color: '#68472B',
    marginTop: 5,
  },

  bannerEmoji: {
    fontSize: 70,
  },

  shopButton: {
    backgroundColor: '#3D2C2E',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 14,
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  /* Section Header */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3D2C2E',
  },

  seeAll: {
    color: '#D96C4F',
    fontWeight: '600',
  },

  /* Categories */

  categoryScroll: {
    marginHorizontal: -5,
  },

  categoryCard: {
    backgroundColor: '#FFFFFF',
    width: 82,
    height: 92,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  categoryEmoji: {
    fontSize: 30,
    marginBottom: 7,
  },

  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A3A3C',
  },

  /* Products */

  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  productCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 18,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0E5DF',
  },

  productImage: {
    height: 125,
    backgroundColor: '#FFF0E8',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  productEmoji: {
    fontSize: 65,
  },

  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2C2E',
    marginTop: 10,
  },

  rating: {
    fontSize: 11,
    color: '#777',
    marginTop: 5,
  },

  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D96C4F',
  },

  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3D2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 22,
  },
});
