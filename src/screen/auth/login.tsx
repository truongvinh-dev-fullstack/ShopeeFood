import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {AppText} from '../../compoments/text/AppText';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../compoments/header';
import FastImage from 'react-native-fast-image';
import { images } from '../../assets/images';
import { AppInput } from '../../compoments/textInput/TextInput';
import Ionicons from "react-native-vector-icons/Ionicons";
import { showToast } from '../../helper/postServices';

import firestore from '@react-native-firebase/firestore';

const LoginScreen = () => {
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });
  const [placeHolder, setPlaceHolder] = useState({
    phone: 'Nhập số điện thoại',
    password: 'Nhập mật khẩu',
  });

  const refPass = useRef<TextInput>()

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    const userDocument = firestore().collection('user').doc('qNioaQuxLIoSlkSOGnK0');
    console.log("userDocument: ", userDocument)
  }

  const handleInputChange = (field: string, value: string) => {
    setForm(prevForm => ({...prevForm, [field]: value}));
  };

  const handlePlaceHolderChange = (field: string, value: string) => {
    setPlaceHolder(prevForm => ({...prevForm, [field]: value}));
  };

  const handleSubmit = () => {
    const {phone, password} = form;

    if (!phone || !password) {
      showToast("error","Cần điền đầy đủ thông tin")
      Alert.alert('Error', 'All fields are required.');
      return;
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Đăng nhập"
        IconLeft={
          <Ionicons name='arrow-back-outline' size={26} color={appColors.camDam} />
        }
      />
      <View style={styles.container2}>
        <FastImage resizeMode='cover' source={images.shoppefood} style={styles.image} />
        <AppInput
          keyboardType='numeric'
          style={styles.input}
          placeHolder={placeHolder.phone}
          value={form.phone}
          onChangeText={value => handleInputChange('phone', value)}
          autoCapitalize="none"
          autoCorrect={false}
          IconLeft={
            <Ionicons name='call-outline' size={22} color={appColors.den} />
          }
          onFocus={() => handlePlaceHolderChange("phone","")}
          onBlur={() => handlePlaceHolderChange("phone","Nhập số điện thoại")}
          onSubmitEditing={() => refPass?.current?.focus()}
        />
        <AppInput
          ref={refPass}
          style={styles.input}
          placeHolder={placeHolder.password}
          value={form.password}
          onChangeText={value => handleInputChange('password', value)}
          autoCapitalize="none"
          autoCorrect={false}
          IconLeft={
            <Ionicons name='lock-closed-outline' size={22} color={appColors.den} />
          }
          onFocus={() => handlePlaceHolderChange("password","")}
          onBlur={() => handlePlaceHolderChange("password","Nhập mật khẩu")}
          onSubmitEditing={handleSubmit}
        />
      

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // paddingHorizontal: 15,
    // marginBottom: 15,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: appColors.xam,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default LoginScreen;
