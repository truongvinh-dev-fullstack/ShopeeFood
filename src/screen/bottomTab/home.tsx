import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  TextInput,
} from 'react-native';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';

import {appConfig} from '../../constants/AppConfig';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AppText} from '../../compoments/text/AppText';
import {AppInput} from '../../compoments/textInput/TextInput';
import {Header} from '../../compoments/header';
import {appStyles} from '../../themes/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import Button from '../../compoments/button';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../routers/NavigationService';
import {TabNames} from '../../routers/RouteNames';
import CuaHangLoader from '../../compoments/contentLoader/cuaHangLoader';
import {useCuaHangActions} from '../../hook/useCuaHangAction';
import {useCuaHangState} from '../../hook/useCuaHangState';
import {CuaHang} from '../bottomTabQuanLy/type';
import {CuaHangType} from '../../redux/slices/type';

const HomeScreen = () => {
  const {setDanhSachCuaHangRedux} = useCuaHangActions();
  const {cuaHangs, loading} = useCuaHangState();
  const [isLoading, setIsLoading] = useState(true);

  const isFocus = useIsFocused();

  const [listCuaHang, setListCuaHang] = useState<Array<CuaHang>>([]);

  useEffect(() => {
    setIsLoading(false);
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

          let listData: CuaHangType[] = [];
          listCuaHang.forEach((item: any) => {
            let location = {
              latitude: item.location._latitude, // Lấy dữ liệu từ object
              longitude: item.location._longitude,
            };
            let createdAt = new Date(item.createdAt._seconds * 1000).getTime(); 
            listData.push({...item, location, createdAt});
          });

          setDanhSachCuaHangRedux(listData);
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

  const ViewItem: ListRenderItem<CuaHang> = ({item, index}) => {
    return (
      <TouchableOpacity
        style={appStyles.flex_row}
        onPress={() =>
          navigate(TabNames.ChiTietCuaHang, {
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
      {/* header */}
      <View style={styles.card_header}>
        <View>
          <AppText style={styles.text_trang}>Giao đến:</AppText>
          <View style={styles.flex_between}>
            <View style={[styles.flex_row, {width: '95%'}]}>
              <Ionicons name="location" size={20} color={appColors.trang} />
              <AppText style={styles.text_header}>
                Mễ Trì, Hoàn Kiếm, Hà Nội, Việt Nam
              </AppText>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={appColors.trang}
            />
          </View>
        </View>
        <View style={[styles.flex_row, styles.card_input]}>
          <View style={{width: '5%'}}>
            <Ionicons name="search-outline" size={20} color={appColors.cam} />
          </View>
          <TextInput
            style={{
              color: appColors.cam,
              fontSize: 12,
              width: '90%',
            }}
            placeholder={'Tìm kiếm'}
            placeholderTextColor={appColors.cam}
          />
        </View>
      </View>

      <View style={styles.body}>
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
    alignItems: 'center',
  },
  flex_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
    fontWeight: '700',
    color: appColors.trang,
    marginLeft: 10,
  },
  text_trang: {
    color: appColors.trang,
    marginBottom: 6,
  },
  card_header: {
    backgroundColor: appColors.cam,
    padding: 10,
  },
  card_input: {
    backgroundColor: appColors.trang,
    marginTop: 10,
    borderRadius: 5,
    gap: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
