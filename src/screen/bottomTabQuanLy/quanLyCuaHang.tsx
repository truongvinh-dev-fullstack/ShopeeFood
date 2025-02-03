import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';

import {appConfig} from '../../constants/AppConfig';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {AppText} from '../../compoments/text/AppText';
import {AppInput} from '../../compoments/textInput/TextInput';
import {Header} from '../../compoments/header';
import {CuaHang, StoreData} from './type';
import {appStyles} from '../../themes/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import Button from '../../compoments/button';
import {AppModal} from '../../compoments/modal';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../routers/NavigationService';
import {TabNames} from '../../routers/RouteNames';
import CuaHangLoader from '../../compoments/contentLoader/cuaHangLoader';
import {useCuaHangActions} from '../../hook/useCuaHangAction';
import {useCuaHangState} from '../../hook/useCuaHangState';

const QuanLyCuaHang = () => {
  const {setDanhSachCuaHangRedux, setLoadingCuaHangRedux} = useCuaHangActions();
  const {cuaHangs, loading} = useCuaHangState();
  const [isLoading, setIsLoading] = useState(true);
  const [modalThemCuaHang, setModalThemCuaHang] = useState(false);
  const [storeData, setStoreData] = useState<StoreData>({
    restaurantId: '',
    numberOfRatings: 0,
    rating: 0,
    type: '',
    name: '',
    images: '',
    address: '',
    openingHours: [
      {
        close: '',
        day: '',
        open: '',
      },
    ],
    createdAt: new Date(),
  });

  const isFocus = useIsFocused();

  const [listCuaHang, setListCuaHang] = useState<Array<CuaHang>>([]);

  useEffect(() => {
    getListCuaHang();
    return () => {
      setListCuaHang([]);
      setIsLoading(true);
    };
  }, [isFocus]);

  const getListCuaHang = async () => {
    if (loading) {
      try {
        const querySnapshot = await firestore().collection('Restaurants').get();
        if (!querySnapshot.empty) {
          const listCuaHang: any = querySnapshot.docs.map(doc => ({
            ...doc.data(),
          }));
          setDanhSachCuaHangRedux(listCuaHang);
          setIsLoading(false);
          setListCuaHang(listCuaHang);
        }
      } catch (error) {
        console.log('Lỗi lấy dữ liệu cửa hàng');
      }
    } else {
      setListCuaHang(cuaHangs);
      setIsLoading(false);
    }
  };

  const themLichLamViec = () => {
    setStoreData({
      ...storeData,
      openingHours: [
        ...storeData.openingHours,
        {
          close: '',
          day: '',
          open: '',
        },
      ],
    });
  };

  const handleSaveRestaurant = async () => {
    try {
      // Lấy nhà hàng cuối cùng
      const querySnapshot = await firestore()
        .collection('Restaurants')
        .orderBy('createdAt', 'desc') // Sắp xếp theo thứ tự giảm dần của createdAt
        .limit(1) // Giới hạn kết quả trả về là 1 document
        .get();

      if (!querySnapshot.empty) {
        const lastRestaurant = querySnapshot.docs[0].data();
        console.log('Nhà hàng cuối cùng:', lastRestaurant);
        let dataStore = {...storeData};
        dataStore.restaurantId = (
          parseFloat(lastRestaurant?.restaurantId) + 1
        ).toString();
        await firestore().collection('Restaurants').add(dataStore);
        setStoreData({
          restaurantId: '',
          numberOfRatings: 0,
          rating: 0,
          type: '',
          name: '',
          images: '',
          address: '',
          openingHours: [
            {
              close: '',
              day: '',
              open: '',
            },
          ],
          createdAt: new Date(),
        });
        setLoadingCuaHangRedux();
      } else {
        console.log('Không có nhà hàng nào.');
        await firestore().collection('Restaurants').add(storeData);
        setStoreData({
          restaurantId: '1',
          numberOfRatings: 0,
          rating: 0,
          type: '',
          name: '',
          images: '',
          address: '',
          openingHours: [
            {
              close: '',
              day: '',
              open: '',
            },
          ],
          createdAt: new Date(),
        });
        setLoadingCuaHangRedux();
      }
    } catch (error) {
      console.error('Lỗi khi thêm nhà hàng: ', error);
    }
  };

  const ViewItem: ListRenderItem<CuaHang> = ({item, index}) => {
    return (
      <TouchableOpacity
        style={appStyles.flex_row}
        onPress={() =>
          navigate(TabNames.chiTietCuaHangQuanLy, {
            item: item,
          })
        }>
        <FastImage
          source={{uri: item.images}}
          style={{width: 100, height: 75}}
          resizeMode="contain"
        />
        <View style={{alignSelf: 'stretch', gap: 5, flex: 1}}>
          <AppText numberOfLines={1} style={styles.text_header}>
            {item.name}
          </AppText>
          <AppText numberOfLines={1}>{item.address}</AppText>
          <View style={[appStyles.flex_row, {gap: 5}]}>
            <Ionicons name="star" size={12} color={appColors.cam} />
            <AppText>{item.rating}</AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Quản lý cửa hàng" />
      <View style={styles.body}>
        <View style={appStyles.flex_between}>
          <AppText>Danh sách cửa hàng</AppText>
          <View>
            <Button
              style={styles.btn_themMoi}
              label="Thêm mới"
              onPress={() => setModalThemCuaHang(true)}
            />
          </View>
        </View>
        {isLoading ? (
          <View style={{gap: 8}}>
            {[1, 1, 1, 1, 1, 1, 1]?.map((item, index) => {
              return <CuaHangLoader key={'loader' + index} />;
            })}
          </View>
        ) : (
          <FlatList
            data={listCuaHang}
            renderItem={ViewItem}
            key={'listCuaHang'}
            keyExtractor={(item, index) => 'listCuaHang' + item?.restaurantId}
            contentContainerStyle={{gap: 12}}
          />
        )}
      </View>

      <AppModal
        isVisible={modalThemCuaHang}
        onCloseModal={() => setModalThemCuaHang(false)}
        contentStyle={appStyles.contentStyleModal}>
        <AppModal.Container>
          <AppModal.Body style={appStyles.viewBodyModal}>
            <ScrollView contentContainerStyle={appStyles.gap_10}>
              <AppInput
                label="Tên cửa hàng"
                value={storeData.name}
                onChangeText={text => setStoreData({...storeData, name: text})}
              />

              <AppInput
                label="Link ảnh"
                value={storeData.images}
                onChangeText={text =>
                  setStoreData({...storeData, images: text})
                }
              />

              <AppInput
                label="Địa chỉ"
                value={storeData.address}
                onChangeText={text =>
                  setStoreData({...storeData, address: text})
                }
              />

              <View style={appStyles.flex_row}>
                <AppText style={{width: 90}}>Lịch làm việc</AppText>
                <TouchableOpacity onPress={themLichLamViec}>
                  <Ionicons
                    name="add-circle"
                    size={25}
                    color={appColors.xanhLaDam}
                  />
                </TouchableOpacity>
              </View>
              <View></View>
              <AppText>Vị trí địa lý</AppText>
              <View style={[appStyles.box_item, appStyles.flex_between]}>
                <View style={{width: '48%'}}>
                  <AppInput
                    label="Latitude"
                    value={
                      storeData?.location?._latitude
                        ? storeData?.location?._latitude.toString()
                        : ''
                    }
                    onChangeText={text => {
                      let data: any = {};
                      if (storeData?.location) data = {...storeData?.location};
                      data._latitude = text;
                      setStoreData({...storeData, location: data});
                    }}
                  />
                </View>
                <View style={{width: '48%'}}>
                  <AppInput
                    label="Longitude"
                    value={
                      storeData?.location?._longitude
                        ? storeData?.location?._longitude.toString()
                        : ''
                    }
                    onChangeText={text => {
                      let data: any = {};
                      if (storeData?.location) data = {...storeData?.location};
                      data._longitude = text;
                      setStoreData({...storeData, location: data});
                    }}
                  />
                </View>
              </View>
              {storeData.openingHours?.map((item, index) => {
                return (
                  <View style={appStyles.box_item} key={'openingHours' + index}>
                    <View style={appStyles.flex_between}>
                      <AppText>Ngày làm việc</AppText>
                      <TouchableOpacity
                        style={index == 0 ? {display: 'none'} : {}}
                        onPress={() => {
                          let data = [...storeData.openingHours].filter(
                            (i, i_index) => i_index != index,
                          );
                          let _storeData = {...storeData};
                          _storeData.openingHours = data;
                          setStoreData(_storeData);
                        }}>
                        <Ionicons name="trash" size={25} color={appColors.do} />
                      </TouchableOpacity>
                    </View>
                    <AppInput
                      value={item?.day}
                      onChangeText={text => {
                        let data = {...item};
                        data.day = text;
                        let dataOpenHours: any = [...storeData.openingHours];
                        dataOpenHours[index] = data;
                        setStoreData({
                          ...storeData,
                          openingHours: dataOpenHours,
                        });
                      }}
                    />
                    <AppInput
                      label="Giờ mở cửa"
                      value={item?.open}
                      onChangeText={text => {
                        let data = {...item};
                        data.open = text;
                        let dataOpenHours: any = [...storeData.openingHours];
                        dataOpenHours[index] = data;
                        setStoreData({
                          ...storeData,
                          openingHours: dataOpenHours,
                        });
                      }}
                    />
                    <AppInput
                      label="Giờ đóng cửa"
                      value={item?.close}
                      onChangeText={text => {
                        let data = {...item};
                        data.close = text;
                        let dataOpenHours: any = [...storeData.openingHours];
                        dataOpenHours[index] = data;
                        setStoreData({
                          ...storeData,
                          openingHours: dataOpenHours,
                        });
                      }}
                    />
                  </View>
                );
              })}
              <Button label="Lưu" onPress={handleSaveRestaurant} />
            </ScrollView>
          </AppModal.Body>
        </AppModal.Container>
      </AppModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
  },
  bodyFlastScreen: {
    height: appConfig.height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  flex_row: {
    flexDirection: 'row',
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
  body: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
    paddingVertical: 16,
  },
  btn_themMoi: {
    height: 40,
    width: 100,
  },
  text_header: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default QuanLyCuaHang;
