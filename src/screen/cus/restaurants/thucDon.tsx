import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ListRenderItem,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {appColors} from '../../../constants/color';
import {appConfig} from '../../../constants/AppConfig';
import {CuaHang} from '../../bottomTabQuanLy/type';
import {AppText} from '../../../compoments/text/AppText';
import {appStyles} from '../../../themes/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppModal} from '../../../compoments/modal';
import {AppInput} from '../../../compoments/textInput/TextInput';
import {formatNumber, isDecimal, showToast} from '../../../helper/postServices';
import Button from '../../../compoments/button';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import {Checkbox} from '../../../compoments/checkbox/checkbox';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import {Header} from '../../../compoments/header';
import {goBack} from '../../../routers/NavigationService';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {useLoading} from '../../../hook/LoadingContex';
import ChiTietCuaHangLoader from '../../../compoments/contentLoader/chiTietCuaHang';
import {CategoryData, ThucDonType} from '../../restaurants/components/type';
import {TapGestureHandler} from 'react-native-gesture-handler';
import { useOrderActions } from '../../../hook/useOrderAction';

type ThucDonProps = {
  cuaHang: CuaHang;
};

export const ThucDon: React.FC<ThucDonProps> = ({cuaHang}) => {
   const {addListOrder} = useOrderActions();
  const {showLoader, hideLoader} = useLoading();
  const [isLoading, setIsLoading] = useState(true);
  const isFocus = useIsFocused();

  const [listLoaiMonAn, setListLoaiMonAn] = useState<Array<CategoryData>>([]);
  const [listMonAn, setListMonAn] = useState<Array<ThucDonType>>([]);
  const [listCategoryId, setListCategoryId] = useState<Array<any>>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const categoryPositions = useRef({});
  const [indexLoaiMonSelect, setIndexLoaiMonSelect] = useState(0);
  const zIndexHeader = useSharedValue(0);
  const chonLoaiMonHeader = useRef(false);

  useEffect(() => {
    getListLoaiMonAn();
    getListMonAn();
    return () => {
      setListLoaiMonAn([]);
      // setListMonAn([]);
    };
  }, [isFocus]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {}; // Clear timeout khi màn hình mất focus
    }, []),
  );

  const getListMonAn = async () => {
    try {
      if (listMonAn?.length == 0) {
        setIsLoading(true);
        const querySnapshot = await firestore()
          .collection('Menu')
          .where('restaurantId', '==', cuaHang.restaurantId)
          .get();

        if (!querySnapshot.empty) {
          const arrMonAn: any = querySnapshot.docs.map(doc => ({
            ...doc.data(),
          }));

          console.log('arrMonAn: ', arrMonAn);
          let listCategory_Id: any = [];
          arrMonAn?.map((i: any) => {
            if (!listCategory_Id.includes(i?.categoryId))
              listCategory_Id.push(i?.categoryId);
          });
          setListMonAn([...arrMonAn]);
          setListCategoryId(listCategory_Id);
        }
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const getListLoaiMonAn = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Categories')
        .where('code', '==', 'TĐ')
        .where('restaurantId', '==', cuaHang.restaurantId)
        .get();

      if (!querySnapshot.empty) {
        const arrLoaiMonAn: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
        }));
        setListLoaiMonAn(arrLoaiMonAn);
      }
    } catch (error) {}
  };

  const themMonAnVaoGioHang = (monAn: ThucDonType) => {
    addListOrder({
      id: monAn.menuId,
      name: monAn.name,
      originalPrice: monAn.originalPrice,
      price: monAn.price,
      quantity: 1,
      images: monAn.images
    })

  }

  // Lưu vị trí của từng loại món ăn
  const handleLayout = (categoryId: any, event: any) => {
    try {
      categoryPositions.current[categoryId] = event.nativeEvent.layout;
    } catch (error) {}
  };

  // Xử lý sự kiện cuộn
  const handleScroll = (event: any) => {
    try {
      if (!chonLoaiMonHeader.current) {
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY > 115 && zIndexHeader.value == 0) {
          zIndexHeader.value = 1;
        }
        if (scrollY <= 115 && zIndexHeader.value != 0) {
          zIndexHeader.value = 0;
        }
        let closestCategory: any = null;

        Object.keys(categoryPositions.current).forEach((categoryId, index) => {
          let distance =
            categoryPositions.current[categoryId].y +
            categoryPositions.current[categoryId].height;
          if (
            categoryPositions.current[categoryId].y - 50 <= scrollY &&
            scrollY < distance - 50
          ) {
            closestCategory = categoryId;
          }
        });

        if (closestCategory !== null) {
          let findIndex = listCategoryId.findIndex(
            i => i.toString() == closestCategory.toString(),
          );
          setIndexLoaiMonSelect(findIndex);
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ChiTietCuaHangLoader />
      ) : (
        <View style={{flex: 1}}>
          {/* Header Image */}
          <View style={[styles.bodyHeader]}>
            {/* Header 1 */}
            <Animated.View
              style={{
                position: 'absolute',
                zIndex: zIndexHeader,
                width: '100%',
              }}>
              <Header hasBack={true} title="Chi tiết cửa hàng" />
            </Animated.View>

            {/* Header 2 */}
            <View style={{zIndex: 0}}>
              <FastImage
                source={{uri: cuaHang.images}}
                style={styles.imageHeader}
                resizeMode="stretch"
              />
              <TouchableOpacity style={styles.backHerader} onPress={goBack}>
                <Ionicons
                  name="arrow-back-outline"
                  size={25}
                  color={appColors.trang}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.addMonAnHeader}
                onPress={() => setModalThemMoi(true)}>
                <Ionicons
                  name="add-outline"
                  size={25}
                  color={appColors.trang}
                />
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={{flex: 1, paddingTop: 50}}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[2]}
              onScroll={handleScroll}
              scrollEventThrottle={16}>
              {/* khoảng cách bằng header */}
              <View
                style={[
                  styles.imageHeader,
                  {height: (appConfig.width * 4) / 10 - 50},
                ]}>
                {/* <FastImage
              source={{uri: cuaHang.images}}
              style={styles.imageHeader}
              resizeMode="stretch"
            /> */}
              </View>

              <View
                style={[
                  styles.containerViewItem,
                  {backgroundColor: appColors.trang, zIndex: 10},
                ]}>
                <AppText style={styles.text_header}>{cuaHang?.name}</AppText>
              </View>

              {/* ScrollView ngang hiển thị loại món ăn */}
              <View
                key={'scrollVew'}
                style={[
                  {
                    backgroundColor: appColors.trang,
                    zIndex: 20,
                    position: 'relative',
                    paddingVertical: 5,
                    // paddingBottom: 10,
                  },
                ]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {listCategoryId?.map((item, index) => {
                    let tenLoaiMon = listLoaiMonAn.find(
                      i => i.categoryId == item,
                    )?.name;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setIndexLoaiMonSelect(index);
                          chonLoaiMonHeader.current = true;
                          scrollViewRef.current?.scrollTo({
                            y: categoryPositions.current[item].y - 50,
                            animated: true,
                          });
                          setTimeout(
                            () => (chonLoaiMonHeader.current = false),
                            500,
                          );
                        }}
                        key={'scrollHeader' + index}
                        style={[
                          styles.loaiMonAn,
                          indexLoaiMonSelect == index
                            ? {
                                borderBottomColor: appColors.camDam,
                                borderBottomWidth: 1,
                              }
                            : {},
                        ]}>
                        <AppText
                          style={
                            indexLoaiMonSelect == index
                              ? {color: appColors.camDam}
                              : {}
                          }>
                          {tenLoaiMon}
                        </AppText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Danh sách món ăn */}
              {listCategoryId?.map((item, index) => {
                let tenLoaiMon = listLoaiMonAn.find(
                  i => i.categoryId == item,
                )?.name;
                let dsMonAn = listMonAn.filter(i => i.categoryId == item);
                return (
                  <View
                    key={'item' + item}
                    onLayout={event => handleLayout(item, event)}>
                    <View style={{backgroundColor: '#EEEEEE'}}>
                      <AppText style={styles.textLoaiMonAn}>
                        {tenLoaiMon} ({dsMonAn?.length})
                      </AppText>
                    </View>

                    {dsMonAn.map((monAn, indexMonAn) => (
                      <View
                        style={[styles.containerViewItem, {zIndex: 1}]}
                        key={'MonAn' + monAn.menuId}>
                        <View
                          style={[
                            appStyles.flex_row,
                            {
                              alignItems: 'flex-start',
                              backgroundColor: appColors.trang,
                            },
                          ]}>
                          <FastImage
                            source={{uri: monAn.images}}
                            style={{width: 100, height: 85}}
                            resizeMode="stretch"
                          />
                          <View style={{flex: 1, paddingTop: 7}}>
                            <AppText
                              // adjustsFontSizeToFit={true}
                              numberOfLines={1}
                              style={[styles.text_monAn]}>
                              {monAn.name}
                            </AppText>
                            <AppText numberOfLines={1}>
                              {monAn.description}
                            </AppText>
                            <View
                              style={[
                                styles.flex_row,
                                {justifyContent: 'space-between'},
                              ]}>
                              <View style={styles.flex_row}>
                                <AppText style={styles.originalPrice}>
                                  {formatNumber(monAn.originalPrice)}đ
                                </AppText>
                                <AppText style={styles.discountPrice}>
                                  {formatNumber(monAn.price)}đ
                                </AppText>
                              </View>
                              <TapGestureHandler onActivated={() => themMonAnVaoGioHang(monAn)}>
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
                    ))}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    // paddingHorizontal: 12,
  },
  bodyFlastScreen: {
    height: appConfig.height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLogo: {
    fontSize: 32,
    fontWeight: '700',
    color: appColors.cam,
  },
  image: {
    width: 80,
    height: 80,
  },
  btn: {
    height: 35,
    width: 120,
  },
  text_header: {
    fontSize: 16,
    fontWeight: '700',
    width: '100%',
  },
  text_monAn: {
    fontSize: 15,
    fontWeight: '700',
    width: '100%',
  },
  imageHeader: {
    width: appConfig.width,
    height: (appConfig.width * 4) / 10,
  },
  containerViewItem: {
    paddingHorizontal: 12,
    backgroundColor: '#EEEEEE',
    // zIndex: 10,
    paddingBottom: 12,
  },
  stickyHeader: {
    // position: 'sticky', // Giữ header cố định khi cuộn (iOS & Web)
    top: 0,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    zIndex: 99,
  },
  backHerader: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(15, 1, 1, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    left: 10,
  },
  addMonAnHeader: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(12, 228, 5, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    right: 10,
  },
  loaiMonAn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  bodyHeader: {
    position: 'absolute',
    width: appConfig.width,
    height: (appConfig.width * 4) / 10,
  },
  textLoaiMonAn: {
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 8,
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
  addButton: {
    padding: 5,
  },
});
