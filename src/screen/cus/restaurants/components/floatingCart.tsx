import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../../constants/color';
import {AppText} from '../../../../compoments/text/AppText';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useOrderState} from '../../../../hook/useOrderState';
import {formatNumber} from '../../../../helper/postServices';

const FloatingCart = () => {
  const {orders} = useOrderState();

  // Tính tổng số lượng món ăn
  const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);
  // Tính tổng giá tiền
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalOriginalPrice = orders.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );

  return (
    <View>
      {/* Floating Cart hiển thị tổng tiền */}
      <View style={[styles.cartContainer, totalItems > 0 ? {} : {display: 'none'}]}>
        <TouchableOpacity style={styles.cartButton}>
          <View>
            <View style={styles.boxCount}>
              <AppText style={styles.count}>{totalItems}</AppText>
            </View>
            <Ionicons name="cart" size={30} color={appColors.cam} />
          </View>
          <View style={styles.flex_row}>
            <View>
              <AppText style={styles.originalPrice}>
                {formatNumber(totalOriginalPrice)}đ
              </AppText>
              <AppText style={styles.discountPrice}>
                {formatNumber(totalPrice)}đ
              </AppText>
            </View>
            <TapGestureHandler>
              <View style={styles.btnGiaoHang}>
                <AppText style={styles.textTrang}>Giao hàng</AppText>
              </View>
            </TapGestureHandler>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: 'red',
  },
  addButton: {
    padding: 5,
  },
  textTrang: {
    color: appColors.trang,
  },
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.trangNhat,
    overflow: 'hidden',
    elevation: 5, // Hiệu ứng bóng cho Android
  },
  cartButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  cartText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  cartPrice: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  boxCount: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.cam,
    position: 'absolute',
    top: -12,
    right: -14,
  },
  count: {
    color: appColors.trang,
    fontWeight: '700',
    fontSize: 12,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: appColors.nau,
    fontSize: 12,
    marginRight: 8,
  },
  discountPrice: {
    color: appColors.cam,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  btnGiaoHang: {
    backgroundColor: appColors.cam,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default FloatingCart;
