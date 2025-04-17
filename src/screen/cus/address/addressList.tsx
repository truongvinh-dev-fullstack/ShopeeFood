import React, { memo, useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { appColors } from '../../../constants/color';
import { useUserState } from '../../../hook/useUserState';
import { AppText } from '../../../compoments/text/AppText';
import { Header } from '../../../compoments/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from '../../../routers/NavigationService';
import { Address } from '../../../redux/slices/type';
import { RouteNames } from '../../../routers/RouteNames';

export const AddressListScreen = () => {
    const { user } = useUserState();
    const isFocus = useIsFocused();

    const [diaChiHienTai, setDiaChiHienTai] = useState<Address>();

    useEffect(() => {
        fetchData()
        return () => {
        };
    }, [isFocus]);

    const fetchData = () => {
        if (isFocus) {
            let listAddress = user.address;
            setDiaChiHienTai(listAddress.find(x => x.isMain))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Địa chỉ giao hàng"
                IconLeft={<Ionicons name="arrow-back-outline" size={20} color={appColors.cam} />}
                onIconLeftPress={goBack}

                IconRight={<Ionicons name="map-outline" size={20} color={appColors.cam} />}
                onIconRightPress={() => navigate(RouteNames.CHOOSE_MAP)}

            />
            <View style={{ paddingTop: 12 }}>
                <View style={{ backgroundColor: "#d1cfcb", paddingHorizontal: 12, paddingVertical: 5 }}>
                    <AppText>Địa chỉ giao hàng</AppText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8 }}>
                    <Ionicons name="location" size={20} color={appColors.cam} />
                    <View style={{ width: "80%" }}>
                        <AppText>{diaChiHienTai?.name}</AppText>
                    </View>
                    <AppText style={{color: appColors.xanhDuong}}>Sửa</AppText>
                </View>
                <View style={{ backgroundColor: "#d1cfcb", paddingHorizontal: 12, paddingVertical: 5 }}>
                    <AppText>Địa chỉ đã lưu</AppText>
                </View>
                {user.address?.map((item, index) => {
                    if (!item.isMain) {
                        return (
                            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: appColors.den}}>
                                <Ionicons name="location" size={20} color={appColors.cam} />
                                <View style={{ width: "80%" }}>
                                    <AppText>{item?.name}</AppText>
                                </View>
                                <AppText style={{color: appColors.xanhDuong}}>Sửa</AppText>
                            </View>
                        )

                    }
                })}

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.trangNhat,
    },

});
