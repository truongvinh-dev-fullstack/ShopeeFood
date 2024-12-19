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
import { icons } from '../../assets/icons';

const LoginScreen = () => {
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
  }, []);

  const fetchData = async () => {
    const userDocument = await firestore().collection('users').get();
    console.log('userDocument: ', userDocument);
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prevForm => ({...prevForm, [field]: value}));
  };

  const handlePlaceHolderChange = (field: string, value: string) => {
    setPlaceHolder(prevForm => ({...prevForm, [field]: value}));
  };

  const handleSubmit = () => {
    const {phone, password} = form;

    if (!phone || !password) {
      showToast('error', 'Cần điền đầy đủ thông tin');
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  };

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
            <FastImage
              resizeMode="contain"
              source={images.shopeeFoodLogoTtext}
              style={styles.image}
            />
            <AppInput
              keyboardType="numeric"
              style={styles.input}
              placeHolder={placeHolder.phone}
              value={form.phone}
              onChangeText={value => handleInputChange('phone', value)}
              autoCapitalize="none"
              autoCorrect={false}
              IconLeft={
                <Ionicons name="call-outline" size={22} color={appColors.den} />
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
              onSubmitEditing={handleSubmit}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
            {/* Hoặc đăng nhập phương thức khác */}
            <View style={styles.box_hoac}>
              <LinearGradient colors={[appColors.trang, appColors.xam]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width: 120, height: 1}}>
              </LinearGradient>
              <AppText style={{color: appColors.xamDam}}>HOẶC</AppText>
              <LinearGradient colors={[appColors.xam, appColors.trang]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width: 120, height: 1}}>
              </LinearGradient>
            </View>
            {/* Các phương thức đăng nhập */}
            <View style={styles.boxPhuongThucDangNhap}>
              <FastImage source={icons.shopee} resizeMode='stretch' style={styles.imagesIconDangNapKhac} />
              <AppText>Tiếp tục với Shopee</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </View>
            <View style={styles.boxPhuongThucDangNhap}>
              <FastImage source={icons.google} resizeMode='contain' style={styles.imagesIconDangNapKhac} />
              <AppText>Tiếp tục với Google</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </View>
            <View style={styles.boxPhuongThucDangNhap}>
              <FastImage source={icons.facebook} resizeMode='contain' style={styles.imagesIconDangNapKhac} />
              <AppText>Tiếp tục với Facebook</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </View>
            <View style={styles.boxPhuongThucDangNhap}>
              <FastImage source={icons.apple} resizeMode='contain' style={styles.imagesIconDangNapKhac} />
              <AppText>Tiếp tục với Apple</AppText>
              <View style={styles.imagesIconDangNapKhac}></View>
            </View>
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
    height: 50,
    backgroundColor: appColors.xam,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: appColors.xamDam,
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
    alignItems: 'center'
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
    width: '100%'
  },
  imagesIconDangNapKhac: {
    width: 20,
    height: 20
  }
});

export default LoginScreen;
