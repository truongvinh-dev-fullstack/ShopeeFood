import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appColors } from '../../../../constants/color';
import { AppText } from '../../../../compoments/text/AppText';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useOrderState } from '../../../../hook/useOrderState';
import { formatNumber } from '../../../../helper/postServices';
import { appConfig } from '../../../../constants/AppConfig';
import { FlatList } from 'react-native';
import { OrderType } from '../../../../redux/slices/type';
import { appStyles } from '../../../../themes/AppStyles';
import FastImage from 'react-native-fast-image';
import { useOrderActions } from '../../../../hook/useOrderAction';

const FloatingCart = () => {
  const {removeItemOrder, addListOrder} = useOrderActions();
  const { orders } = useOrderState();

  const [showDetail, setShowDetail] = useState(false)

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

  const viewItem: ListRenderItem<OrderType> = ({ item, index }) => {
    return (
      <View
        style={[styles.containerViewItem, { zIndex: 1 }]}
        key={'MonAn' + item.id}>
        <View
          style={[
            appStyles.flex_row,
            {
              alignItems: 'flex-start',
              backgroundColor: appColors.trang,
            },
          ]}>
          <FastImage
            source={{ uri: item.images }}
            style={{ width: 100, height: 85 }}
            resizeMode="stretch"
          />
          <View style={{ flex: 1, paddingTop: 7 }}>
            <AppText
              // adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={[styles.text_monAn]}>
              {item.name}
            </AppText>
            <View
              style={[
                styles.flex_row,
                { justifyContent: 'space-between' },
              ]}>
              <View style={styles.flex_row}>
                <AppText style={styles.originalPrice}>
                  {formatNumber(item.originalPrice)}đ
                </AppText>
                <AppText style={styles.discountPrice}>
                  {formatNumber(item.price)}đ
                </AppText>
              </View>
              {/* <TapGestureHandler onActivated={() => themMonAnVaoGioHang(monAn)}>
              <View style={styles.addButton}>
                <Ionicons
                  name="add-circle"
                  size={24}
                  color={appColors.cam}
                />
              </View>
            </TapGestureHandler> */}
            </View>
            <View style={[styles.flex_row,,{gap: 0, justifyContent: 'flex-end'}]}>
              <TapGestureHandler onActivated={() => removeItemOrder(item.id)}>
                <View style={[styles.addButton]}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color={appColors.cam}
                  />
                </View>
              </TapGestureHandler>
              <View style={{borderWidth: 1, borderColor: appColors.den, width: 25, height: 25, borderRadius: 4, alignItems: 'center', justifyContent: 'center'}}>
                <AppText>{item?.quantity}</AppText>
              </View>
              <TapGestureHandler onActivated={() => addListOrder(item)}>
                <View style={styles.addButton}>
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color={appColors.cam}
                  />
                </View>
              </TapGestureHandler>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      {/* View Detail */}
      {showDetail ?
        <View style={styles.cart_detail}>
          <FlatList
            data={orders}
            renderItem={viewItem}
          />
        </View> : null}
      <View style={[styles.cartContainer, totalItems > 0 ? {} : { display: 'none' }]}>
        <TouchableOpacity style={styles.cartButton} onPress={() => setShowDetail(!showDetail)}>
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
    width: 35
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
  text_monAn: {
    fontSize: 15,
    fontWeight: '700',
    width: '100%',
  },
  containerViewItem: {
    marginTop: 12,
    backgroundColor: appColors.xamNhat
  },
  cart_detail: {
    position: 'absolute',
    height: 500,
    width: appConfig.width,
    backgroundColor: appColors.trang,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    top: -550
  }
});

export default FloatingCart;
