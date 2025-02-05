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
import Animated, {useSharedValue} from 'react-native-reanimated';

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

  const scrollViewRef = useRef<ScrollView>(null);
  const categoryPositions = useRef({});
  const [indexLoaiMonSelect, setIndexLoaiMonSelect] = useState(0);
  const zIndexHeader = useSharedValue(0);
  const chonLoaiMonHeader = useRef(false);

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
          setListCategoryId(listCategory_Id);
          console.log('listCategory_Id: ', listCategory_Id);
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

  // Lưu vị trí của từng loại món ăn
  const handleLayout = (categoryId: any, event: any) => {
    console.log('layout: ', event.nativeEvent.layout, categoryId);
    try {
      categoryPositions.current[categoryId] = event.nativeEvent.layout;
      //   {
      //     "x": 0,
      //     "y": 210.57142639160156,
      //     "width": 411.4285583496094,
      //     "height": 291.1428527832031
      // }
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
        {/* Header 1 */}
        <Animated.View
          style={{position: 'absolute', zIndex: zIndexHeader, width: '100%'}}>
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

          <TouchableOpacity
            style={styles.addMonAnHeader}
            onPress={() => setModalThemMoi(true)}>
            <Ionicons name="add-outline" size={25} color={appColors.trang} />
          </TouchableOpacity>
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
                      setTimeout(() => chonLoaiMonHeader.current = false, 500)
                      
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
            );
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
              <AppText style={styles.text_header}>Thêm món ăn</AppText>
              <AppText>Phân loại</AppText>
              <View style={appStyles.flex_between}>
                <View style={{width: '90%'}}>
                  <DropDownPicker
                    style={[appStyles.dropDownPicker]}
                    placeholder={'Chọn'}
                    placeholderStyle={{
                      color: 'grey',
                    }}
                    itemSeparator={true}
                    dropDownContainerStyle={[
                      appStyles.dropDownContainerTopStyle,
                    ]}
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
                </View>
                <TouchableOpacity onPress={() => setModalThemLoaiMon(true)}>
                  <Ionicons
                    name="add-circle"
                    size={25}
                    color={appColors.xanhLaDam}
                  />
                </TouchableOpacity>
              </View>

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
});

// {/* Sticky Header */}
//         {/* <View style={styles.stickyHeader}>
//           <AppText>Danh sách thực đơn</AppText>
//           <TouchableOpacity onPress={() => setModalThemMoi(true)}>
//             <Ionicons name="add-circle" size={25} color={appColors.xanhLa} />
//           </TouchableOpacity>
//         </View> */}
