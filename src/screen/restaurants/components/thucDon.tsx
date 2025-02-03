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
import {CategoryData, ThucDonType} from './type';
import {formatNumber, isDecimal, showToast} from '../../../helper/postServices';
import Button from '../../../compoments/button';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import {Checkbox} from '../../../compoments/checkbox/checkbox';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';

type ThucDonProps = {
  cuaHang: CuaHang;
};

export const ThucDon: React.FC<ThucDonProps> = ({cuaHang}) => {
  const isFocus = useIsFocused();
  const [modalThemMoi, setModalThemMoi] = useState(false);
  const [modalThemLoaiMon, setModalThemLoaiMon] = useState(false);
  const [showModal, setShowModal] = useState({
    showCategory: false,
  });

  const [thucDonData, setThucDonData] = useState<ThucDonType>({
    restaurantId: '',
    menuId: '1',
    categoryId: '',
    name: '',
    images: '',
    description: '',
    price: 0,
    originalPrice: 0,
    like: 0,
    sold: 0,
    flashSale: false,
    timeFlastSale: '',
    createdAt: new Date(),
  });

  const [categoryData, setCategoryData] = useState<CategoryData>({
    categoryId: '1',
    restaurantId: '',
    name: '',
    code: 'TĐ',
    createdAt: new Date(),
  });

  const [listLoaiMonAn, setListLoaiMonAn] = useState<Array<CategoryData>>([]);
  const [listMonAn, setListMonAn] = useState<Array<ThucDonType>>([]);

  useEffect(() => {
    getListLoaiMonAn();
    getListMonAn();
    return () => {
      setModalThemMoi(false);
      setListLoaiMonAn([]);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {}; // Clear timeout khi màn hình mất focus
    }, []),
  );

  const getListMonAn = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Menu')
        .where('restaurantId', '==', cuaHang.restaurantId)
        .get();

      if (!querySnapshot.empty) {
        const arrMonAn: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
        }));

        const header = {
          menuId: "3223424"
        }

        const scrollHeader = {
          menuId: "32234fd24"
        }

        // console.log("arrMonAn: ", arrMonAn)
        setListMonAn([header,scrollHeader,...arrMonAn]);
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

  const handleSaveThucDon = async () => {
    try {
      // Lấy nhà hàng cuối cùng
      const querySnapshot = await firestore()
        .collection('Menu')
        .orderBy('createdAt', 'desc') // Sắp xếp theo thứ tự giảm dần của createdAt
        .limit(1) // Giới hạn kết quả trả về là 1 document
        .get();

      if (!querySnapshot.empty) {
        const lastMonAn = querySnapshot.docs[0].data();
        console.log('món ăn cuối cùng:', lastMonAn);
        let dataThucDon: ThucDonType = {...thucDonData};
        dataThucDon.menuId = (parseFloat(lastMonAn?.menuId) + 1).toString();
        dataThucDon.restaurantId = cuaHang.restaurantId;
        dataThucDon.createdAt = new Date();
        await firestore().collection('Menu').add(dataThucDon);
        showToast('success', 'Thêm thành công');
        setThucDonData({
          restaurantId: '',
          menuId: '',
          categoryId: '',
          name: '',
          images: '',
          description: '',
          price: 0,
          originalPrice: 0,
          like: 0,
          sold: 0,
          flashSale: false,
          timeFlastSale: '',
          createdAt: new Date(),
        });
      } else {
        let dataThucDon = {...thucDonData};
        dataThucDon.restaurantId = cuaHang.restaurantId;
        dataThucDon.createdAt = new Date();
        await firestore().collection('Menu').add(dataThucDon);
        showToast('success', 'Thêm thành công');
        setThucDonData({
          restaurantId: '',
          menuId: '',
          categoryId: '',
          name: '',
          images: '',
          description: '',
          price: 0,
          originalPrice: 0,
          like: 0,
          sold: 0,
          flashSale: false,
          timeFlastSale: '',
          createdAt: new Date(),
        });
      }
    } catch (error) {
      showToast('error', 'Lỗi');
      console.error('Lỗi khi thêm nhà hàng: ', error);
    }
  };

  const handleSaveCategory = async () => {
    try {
      // Lấy nhà hàng cuối cùng
      const querySnapshot = await firestore()
        .collection('Categories')
        .orderBy('createdAt', 'desc') // Sắp xếp theo thứ tự giảm dần của createdAt
        .limit(1) // Giới hạn kết quả trả về là 1 document
        .get();

      if (!querySnapshot.empty) {
        const lastCategory = querySnapshot.docs[0].data();
        console.log('category cuối cùng:', lastCategory);
        let dataCategory = {...categoryData};
        dataCategory.categoryId = (
          parseFloat(lastCategory?.categoryId) + 1
        ).toString();
        dataCategory.restaurantId = cuaHang.restaurantId;
        dataCategory.createdAt = new Date();
        await firestore().collection('Categories').add(dataCategory);
        showToast('success', 'Thêm thành công');
        setCategoryData({
          categoryId: '',
          restaurantId: '',
          name: '',
          code: 'TĐ',
          createdAt: new Date(),
        });
      } else {
        let dataCategory = {...categoryData};
        dataCategory.restaurantId = cuaHang.restaurantId;
        dataCategory.createdAt = new Date();
        await firestore().collection('Categories').add(dataCategory);
        showToast('success', 'Thêm thành công');
        setCategoryData({
          categoryId: '1',
          restaurantId: '',
          name: '',
          code: 'TĐ',
          createdAt: new Date(),
        });
      }
    } catch (error) {
      showToast('error', 'Lỗi');
      console.error('Lỗi khi thêm nhà hàng: ', error);
    }
  };

  const ViewItem: ListRenderItem<ThucDonType> = ({item, index}) => {
    if(index == 0){
      return(
        <View style={[
          styles.containerViewItem, {backgroundColor : appColors.trang}
        ]}>
          <AppText style={styles.text_header}>{cuaHang?.name}</AppText>
        </View>
      )
    }
    if(index == 1){
      return(
        <View style={[
          styles.containerViewItem, {backgroundColor : appColors.trang, zIndex: 99}
        ]}>
          <ScrollView horizontal>
            {[1,1,1,1,1,1,1,1,1,1,1]?.map((item, index) => {
              return(
                <View key={"scrollHeader" + index}>
                  <AppText>Món ngon</AppText>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )
    }
    return (
      <View
        style={[
          styles.containerViewItem
        ]}>
        <View
          style={[
            appStyles.flex_row,
            {
              alignItems: 'flex-start',
              backgroundColor: appColors.trang,
            },
          ]}>
          <FastImage
            source={{uri: item.images}}
            style={{width: 100, height: 75}}
            resizeMode="stretch"
          />
          <View style={{gap: 5, flex: 1}}>
            <AppText
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              style={[styles.text_header]}>
              {item.name}
            </AppText>
            <AppText numberOfLines={1}>{item.description}</AppText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
     
      <FlatList
        data={listMonAn}
        renderItem={ViewItem}
        key={'listMonAn'}
        keyExtractor={(item, index) => 'listMonAn' + item?.menuId}
        // contentContainerStyle={{zIndex: 3}}
        ListHeaderComponent={() => {
          return (
            <View style={styles.imageHeader}>
              <FastImage
                source={{uri: cuaHang.images}}
                style={styles.imageHeader}
                resizeMode="stretch"
              />
              {/* <View style={[appStyles.flex_between, {zIndex: 999}]}>
                <View style={appStyles.flex_row}>
                  <AppText>Danh sách thực đơn</AppText>
                  <View>
                    <TouchableOpacity onPress={() => setModalThemMoi(true)}>
                      <Ionicons
                        name="add-circle"
                        size={25}
                        color={appColors.xanhLa}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.btn}>
                  <Button
                    label="Thêm loại món"
                    onPress={() => setModalThemLoaiMon(true)}
                    style={styles.btn}
                  />
                </View>
              </View> */}
            </View>
          );
        }}
        stickyHeaderIndices={[0,2,4]}
        // getItemLayout={(data, index) => ({
        //   length: 75,
        //   offset: 75 * index,
        //   index,
        // })}
      />

      {/* Thêm thực đơn */}
      <AppModal
        isVisible={modalThemMoi}
        onCloseModal={() => setModalThemMoi(false)}
        contentStyle={appStyles.contentStyleModal}>
        <AppModal.Container>
          <AppModal.Body style={appStyles.viewBodyModal}>
            <ScrollView contentContainerStyle={appStyles.gap_10}>
              <AppText>Phân loại</AppText>
              <DropDownPicker
                style={[appStyles.dropDownPicker]}
                placeholder={'Chọn'}
                placeholderStyle={{
                  color: 'grey',
                }}
                itemSeparator={true}
                dropDownContainerStyle={[appStyles.dropDownContainerTopStyle]}
                mode="BADGE"
                // searchable
                // searchPlaceholder={"Tìm kiếm"}
                maxHeight={250}
                // multiple
                dropDownDirection="BOTTOM"
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                onSelectItem={item => {
                  setThucDonData({...thucDonData, categoryId: item?.value});
                }}
                open={showModal?.showCategory}
                value={thucDonData.categoryId}
                items={
                  listLoaiMonAn
                    ? listLoaiMonAn.map(item => {
                        return {
                          value: item?.categoryId,
                          label: item?.name,
                        };
                      })
                    : []
                }
                setOpen={() => {
                  setShowModal({
                    ...showModal,
                    showCategory: !showModal?.showCategory,
                  });
                }}
                setValue={() => {}}
                zIndex={204}
              />

              <AppInput
                label="Tên món ăn"
                value={thucDonData.name}
                onChangeText={text =>
                  setThucDonData({...thucDonData, name: text})
                }
              />
              <AppInput
                label="Giá thực tế"
                keyboardType="numeric"
                value={
                  thucDonData.price
                    ? formatNumber(thucDonData.price).toString()
                    : ''
                }
                onChangeText={text => {
                  let str = text.replace(/,/g, '');

                  if (isDecimal(str) && parseFloat(str) >= 0) {
                    setThucDonData({...thucDonData, price: parseFloat(str)});
                  }
                  if (!str) setThucDonData({...thucDonData, price: null});
                }}
              />

              <AppInput
                label="Giá gốc"
                keyboardType="numeric"
                value={
                  thucDonData.originalPrice
                    ? formatNumber(thucDonData.originalPrice).toString()
                    : ''
                }
                onChangeText={text => {
                  let str = text.replace(/,/g, '');

                  if (isDecimal(str) && parseFloat(str) >= 0) {
                    setThucDonData({
                      ...thucDonData,
                      originalPrice: parseFloat(str),
                    });
                  }
                  if (!str)
                    setThucDonData({...thucDonData, originalPrice: null});
                }}
              />

              <AppInput
                label="Link ảnh"
                value={thucDonData.images}
                onChangeText={text =>
                  setThucDonData({...thucDonData, images: text})
                }
              />

              <AppInput
                label="Mô tả"
                value={thucDonData.description}
                onChangeText={text =>
                  setThucDonData({...thucDonData, description: text})
                }
              />

              <View style={appStyles.flex_row}>
                <Checkbox
                  value={thucDonData.flashSale}
                  onToggle={() =>
                    setThucDonData({
                      ...thucDonData,
                      flashSale: !thucDonData.flashSale,
                    })
                  }
                />
                <AppText>FlastSale</AppText>
              </View>

              <AppInput
                label="Thời gian flastSale trong ngày"
                value={thucDonData.timeFlastSale}
                onChangeText={text =>
                  setThucDonData({...thucDonData, timeFlastSale: text})
                }
              />

              <Button label="Lưu" onPress={handleSaveThucDon} />
            </ScrollView>
          </AppModal.Body>
        </AppModal.Container>
      </AppModal>

      {/* Thêm loại món ăn */}
      <AppModal
        isVisible={modalThemLoaiMon}
        onCloseModal={() => setModalThemLoaiMon(false)}
        contentStyle={appStyles.contentStyleModal}>
        <AppModal.Container>
          <AppModal.Body style={appStyles.viewBodyModal}>
            <ScrollView contentContainerStyle={appStyles.gap_10}>
              <AppInput
                label="Tên"
                value={categoryData.name}
                onChangeText={text =>
                  setCategoryData({...categoryData, name: text})
                }
              />

              <Button label="Lưu" onPress={handleSaveCategory} />
            </ScrollView>
          </AppModal.Body>
        </AppModal.Container>
        <Toast />
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.xamDam,
    paddingTop: 10,
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
  imageHeader: {
    width: appConfig.width,
    height: (appConfig.width * 4) / 10,
  },
  containerViewItem: {
      paddingHorizontal: 12,
      backgroundColor: appColors.xamDam,
      zIndex: 10,
      paddingBottom: 12,
  }
});
