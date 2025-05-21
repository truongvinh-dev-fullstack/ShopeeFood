/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { appConfig } from '../../../constants/AppConfig';
import PackageCard from './packageCard';
import { Header } from '../../../compoments/header/Header';

const packages = [
  { id: '1', name: 'Bạc', price: '100K' },
  { id: '2', name: 'Vàng', price: '200K' },
  { id: '3', name: 'Kim Cương', price: '500K' },
  { id: '4', name: 'Titan', price: '1 Triệu' },
];

const ITEM_WIDTH = appConfig.width * 0.6;
const ITEM_SPACING = (appConfig.width - ITEM_WIDTH) / 2;

const PurchasePackageListScreen = () => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title="Gói thành viên"
        hasBack={true}
      />
      <Animated.FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING, gap: 20, marginTop: 70 }}
        onScroll={scrollHandler}
        // scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <PackageCard item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default PurchasePackageListScreen;
