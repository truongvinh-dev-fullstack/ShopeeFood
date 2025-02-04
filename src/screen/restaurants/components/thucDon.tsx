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
import {Header} from '../../../compoments/header';
import {goBack} from '../../../routers/NavigationService';

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
  const [listCategoryId, setListCategoryId] = useState<Array<any>>([]);
  const [indexLoaiMonSelect, setIndexLoaiMonSelect] = useState(0);

  useEffect(() => {
    getListLoaiMonAn();
    getListMonAn();
    return () => {
      setModalThemMoi(false);
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
    console.log('Lấy mơi');
    try {
      if (listMonAn?.length == 0) {
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
          setListCategoryId(listCategory_Id)
        }
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
    // if(index == 0){
    //   return(
    //     <View style={[
    //       styles.containerViewItem, {backgroundColor : appColors.trang, zIndex: 10}
    //     ]}>
    //       <AppText style={styles.text_header}>{cuaHang?.name}</AppText>
    //     </View>
    //   )
    // }
    // if(index == 1){
    //   return(
    //     <View key={"scrollVew"} style={[
    //       styles.containerViewItem, {backgroundColor : appColors.trang, zIndex: 20}
    //     ]}>
    //       <ScrollView horizontal>
    //         {[1,1,1,1,1,1,1,1,1,1,1]?.map((item, index) => {
    //           return(
    //             <View key={"scrollHeader" + index}>
    //               <AppText>Món ngon</AppText>
    //             </View>
    //           )
    //         })}
    //       </ScrollView>
    //     </View>
    //   )
    // }
    return (
      <View style={[styles.containerViewItem, {zIndex: 4}]}>
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
      {/* Header Image */}
      <View style={[styles.bodyHeader]}>
        {/* <View>
          <Header hasBack={true} title="Chi tiết cửa hàng" />
        </View> */}

        <View>
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
        </View>
      </View>
      <View style={{flex: 1, paddingTop: 50}}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[2]}>
          {/* Header Image */}
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

          {/* Header loại món ăn */}
          <View
            key={'scrollVew'}
            style={[
              {
                backgroundColor: appColors.trang,
                zIndex: 20,
                position: 'relative',
                marginBottom: 10,
              },
            ]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listCategoryId?.map((item, index) => {
                let tenLoaiMon = listLoaiMonAn.find((i) => i.categoryId == item)?.name
                return (
                  <View
                    key={'scrollHeader' + index}
                    style={[
                      styles.loaiMonAn,
                      indexLoaiMonSelect == index
                        ? {backgroundColor: appColors.cam}
                        : {backgroundColor: appColors.trang},
                    ]}>
                    <AppText>{tenLoaiMon}</AppText>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {/* Danh sách món ăn */}
          {listCategoryId?.map((item,index) => {
            let tenLoaiMon = listLoaiMonAn.find((i) => i.categoryId == item)?.name
            let dsMonAn = listMonAn.filter((i) => i.categoryId == item)
            return(
              <View key={"item" + item}>
                  <AppText>{tenLoaiMon} ({dsMonAn?.length})</AppText>
                  {dsMonAn.map((monAn, indexMonAn) => (
                    <View style={[styles.containerViewItem, {zIndex: 1}]} key={"MonAn" + monAn.menuId}>
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
                          style={{width: 100, height: 75}}
                          resizeMode="stretch"
                        />
                        <View style={{gap: 5, flex: 1}}>
                          <AppText
                            adjustsFontSizeToFit={true}
                            numberOfLines={2}
                            style={[styles.text_header]}>
                            {monAn.name}
                          </AppText>
                          <AppText numberOfLines={1}>{monAn.description}</AppText>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            )
          })}
        </ScrollView>
      </View>

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
    backgroundColor: "#EEEEEE",
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
    backgroundColor: "#EEEEEE",
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
  loaiMonAn: {
    backgroundColor: appColors.cam,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  bodyHeader: {
    position: 'absolute',
    width: appConfig.width,
    height: (appConfig.width * 4) / 10,
  },
});

// {/* Sticky Header */}
//         {/* <View style={styles.stickyHeader}>
//           <AppText>Danh sách thực đơn</AppText>
//           <TouchableOpacity onPress={() => setModalThemMoi(true)}>
//             <Ionicons name="add-circle" size={25} color={appColors.xanhLa} />
//           </TouchableOpacity>
//         </View> */}
