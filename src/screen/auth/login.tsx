import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import {AppText} from '../../compoments/text/AppText';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../compoments/header';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets/images';
import {AppInput} from '../../compoments/textInput/TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showToast} from '../../helper/postServices';
import LinearGradient from 'react-native-linear-gradient';

import firestore from '@react-native-firebase/firestore';
import {appConfig} from '../../constants/AppConfig';
import {icons} from '../../assets/icons';
import Animated, {
  Easing,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ReduceMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {navigate} from '../../routers/NavigationService';
import {RouteNames} from '../../routers/RouteNames';
import {useCuaHangState} from '../../hook/useCuaHangState';
import { useUserActions } from '../../hook/useUserAction';
import { Address, UserState } from '../../redux/slices/type';

const LoginScreen = () => {
  const {setUserInfoRedux} = useUserActions();
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });
  const [placeHolder, setPlaceHolder] = useState({
    phone: 'Nhập số điện thoại',
    password: 'Nhập mật khẩu',
  });

  useEffect(() => {
    fetchData();
    loadAnimated();
    return () => {
      opacityAnimated.value = 0;
    };
  }, []);

  const opacityAnimated = useSharedValue(0);
  const rightAnimatedPhone = useSharedValue(-16);
  const leftAnimatedPhone = useSharedValue(-appConfig.width);

  const fetchData = async () => {
    // const userDocument = await firestore().collection('users').get();
    // console.log('userDocument: ', userDocument);
  };

  const loadAnimated = () => {
    opacityAnimated.value = withDelay(500, withTiming(1));
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prevForm => ({...prevForm, [field]: value}));
  };

  const handlePlaceHolderChange = (field: string, value: string) => {
    setPlaceHolder(prevForm => ({...prevForm, [field]: value}));
  };

  const handleSubmit = async (type: number) => {
    // Type = 1: Ấn tiếp tục khi nhập số điện thoại
    // Type = 2: Ấn tiếp tục đăng nhập khi nhập mật khẩu
    const {phone, password} = form;
    switch (type) {
      case 1: {
        if (!phone) {
          showToast('error', 'Cần điền đầy đủ thông tin');
          return;
        }
        const userQuerySnapshot = await firestore()
          .collection('Users') // Chọn bảng "User"
          .where('phone', '==', phone)  // điều kiện
          .get();

        if (userQuerySnapshot.empty) {
          showToast('error', 'Số điện thoại chưa được đăng ký!');
          return null;
        }else{
          rightAnimatedPhone.value = withTiming(appConfig.width, {
            duration: 300,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System,
          });
          leftAnimatedPhone.value = withDelay(
            500,
            withTiming(-16, {
              duration: 300,
              easing: Easing.inOut(Easing.quad),
              reduceMotion: ReduceMotion.System,
            }),
          );
        }
        return
        
      }
      case 2: {
        if (!password) {
          showToast('error', 'Cần điền đầy đủ thông tin');
          return;
        }
        try {
          const userQuerySnapshot = await firestore()
          .collection('Users') // Chọn bảng "User"
          .where('phone', '==', phone)  // điều kiện
          .where('password', '==', password)  // điều kiện
          .get();

        if (userQuerySnapshot.empty) {
          showToast('error', 'Mật khẩu không chính xác!');
          return
        }else{
          const userData : any = userQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // get dữ liệu địa chỉ của người dùng
          const addressQuery = await firestore()
          .collection('Address')
          .where('userId', '==', userData[0].userId)
          .get();
          let address : Address[] = [];
          console.log("addressQuery: ", addressQuery)
          if(!addressQuery.empty){
            address = addressQuery.docs.map((doc : any) => ({
              id: doc.id,
              ...doc.data(),
            }));
            address.forEach(x => {
              x.location = {
                latitude: x.location.latitude,
                longitude: x.location.longitude
              }
            })
          }
      
          setUserInfoRedux({...userData[0], address})
          let user : UserState = userData[0]
          if(user.role == "CUS"){
            navigate(RouteNames.MAIN)
          }
          if(user.role == "ADMIN"){
            navigate(RouteNames.MAIN_QUANLY)
          }
        }
        } catch (error) {
          
        }
      }
    }
  
  };

  const phuonThucKhacAnimed = FadeInDown.withInitialValues({
    opacity: 0,
    transform: [{translateY: 50}],
  })
    .duration(400)
    .delay(500)
    .springify();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.anhMonAn}
        resizeMode="cover"
        style={styles.imageBackGround}>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.9)',
            'rgba(255,255,255,1)',
          ]}
          style={styles.linearGradient}>
          <View style={styles.container2}>
            <Animated.View
              entering={FadeInRight.delay(300)
                .withInitialValues({
                  opacity: 0.1,
                  transform: [{translateX: appConfig.width / 2}],
                })
                .duration(500)
                .springify()
                .damping(20)}>
              <FastImage
                resizeMode="contain"
                source={images.shopeeFoodLogoTtext}
                style={styles.image}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.boxDangNHap,
                {
                  opacity: opacityAnimated,
                },
              ]}>
              <View style={{height: 50}}></View>
              <Animated.View
                style={[
                  {paddingHorizontal: 16, position: 'absolute', right: rightAnimatedPhone}
                ]}
              >
                <AppInput
                  keyboardType="numeric"
                  style={styles.input}
                  placeHolder={placeHolder.phone}
                  value={form.phone}
                  onChangeText={value => handleInputChange('phone', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  IconLeft={
                    <Ionicons
                      name="call-outline"
                      size={22}
                      color={appColors.den}
                    />
                  }
                  onFocus={() => handlePlaceHolderChange('phone', '')}
                  onBlur={() =>
                    handlePlaceHolderChange('phone', 'Nhập số điện thoại')
                  }
                  inputStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderRadius: 0,
                  }}
                  onSubmitEditing={() => handleSubmit(1)}
                />
              </Animated.View>
              <Animated.View
                style={[
                  {
                    paddingHorizontal: 16,
                    position: 'absolute',
                    right: leftAnimatedPhone,
                  },
                ]}>
                <AppInput
                  style={styles.input}
                  placeHolder={placeHolder.password}
                  value={form.password}
                  onChangeText={value => handleInputChange('password', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  IconLeft={
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color={appColors.den}
                    />
                  }
                  onFocus={() => handlePlaceHolderChange('password', '')}
                  onBlur={() =>
                    handlePlaceHolderChange('phone', 'Nhập mật khẩu')
                  }
                  inputStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderRadius: 0,
                  }}
                  onSubmitEditing={() => handleSubmit(2)}
                />
              </Animated.View>

              <TouchableOpacity style={styles.button} onPress={() => {
                if(!form.password){
                  handleSubmit(1)
                }else handleSubmit(2)
              }}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
              </TouchableOpacity>
              {/* Hoặc đăng nhập phương thức khác */}
              <View style={styles.box_hoac}>
                <LinearGradient
                  colors={[appColors.trang, appColors.xam]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{width: 120, height: 1}}></LinearGradient>
                <AppText style={{color: appColors.xamDam}}>HOẶC</AppText>
                <LinearGradient
                  colors={[appColors.xam, appColors.trang]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{width: 120, height: 1}}></LinearGradient>
              </View>
            </Animated.View>

            {/* Các phương thức đăng nhập */}
            <Animated.View
              entering={phuonThucKhacAnimed}
              style={styles.boxPhuongThucDangNhap}>
              <FastImage
                source={icons.shopee}
                resizeMode="stretch"
                style={styles.imagesIconDangNapKhac}
              />
              <AppText>Tiếp tục với Shopee</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </Animated.View>
            <Animated.View
              entering={phuonThucKhacAnimed}
              style={styles.boxPhuongThucDangNhap}>
              <FastImage
                source={icons.google}
                resizeMode="contain"
                style={styles.imagesIconDangNapKhac}
              />
              <AppText>Tiếp tục với Google</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </Animated.View>
            <Animated.View
              entering={phuonThucKhacAnimed}
              style={styles.boxPhuongThucDangNhap}>
              <FastImage
                source={icons.facebook}
                resizeMode="contain"
                style={styles.imagesIconDangNapKhac}
              />
              <AppText>Tiếp tục với Facebook</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </Animated.View>
            <Animated.View
              entering={phuonThucKhacAnimed}
              style={styles.boxPhuongThucDangNhap}>
              <FastImage
                source={icons.apple}
                resizeMode="contain"
                style={styles.imagesIconDangNapKhac}
              />
              <AppText>Tiếp tục với Apple</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </Animated.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: appColors.camDam,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: appColors.trang,
    fontSize: 16,
    fontWeight: '600',
  },
  container2: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  boxDangNHap: {
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 136,
    height: 50,
  },
  imageBackGround: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  box_hoac: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  boxPhuongThucDangNhap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: appColors.xam,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    width: '100%',
  },
  imagesIconDangNapKhac: {
    width: 20,
    height: 20,
  },
});

export default LoginScreen;
