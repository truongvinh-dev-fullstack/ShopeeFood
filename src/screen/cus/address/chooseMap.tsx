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
import { goBack } from '../../../routers/NavigationService';
import { Address } from '../../../redux/slices/type';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appConfig } from '../../../constants/AppConfig';
import Geolocation from '@react-native-community/geolocation';

export const ChooseMap = () => {
    const { user } = useUserState();
    const isFocus = useIsFocused();

    const [diaChiHienTai, setDiaChiHienTai] = useState<Address>();

    const [region, setRegion] = useState<Region>({
        latitude: 21.005068,
        longitude: 105.7761275,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [addressLabel, setAddressLabel] = useState<string>("");

    useEffect(() => {
        fetchData()
        return () => {
        };
    }, [isFocus]);

    const fetchData = () => {
        if (isFocus) {
            const mainAddress = user.address.find(x => x.isMain);
            if (mainAddress) {
                setDiaChiHienTai(mainAddress);
                setRegion({
                    latitude: mainAddress.location.latitude,
                    longitude: mainAddress.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                // fallback: dùng định vị người dùng nếu không có địa chỉ mặc định
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        const newRegion = {
                            latitude,
                            longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        };
                        setRegion(newRegion);
                        getAddressFromCoordinates(latitude, longitude);
                    },
                    error => console.warn(error.message),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        }
    };

    const getAddressFromCoordinates = async (lat: number, lng: number) => {
        try {
            console.log("api: ", `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDffPGEieghuJVS55O8Rg_O-eOf5dnm_Z0`)
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDffPGEieghuJVS55O8Rg_O-eOf5dnm_Z0`
            );
            const data = await response.json();
            console.log("data: ", data)
            const address = data?.results?.[0]?.formatted_address;
            setAddressLabel(address || "Không tìm thấy địa chỉ");
        } catch (error) {
            console.log("Lỗi reverse geocoding:", error);
        }
    };

    const handleRegionChange = (newRegion: Region) => {
        setRegion(newRegion);
    };

    const handleRegionChangeComplete = (newRegion: Region) => {
        console.log("newRegion: ", newRegion)
        setRegion(newRegion);
        getAddressFromCoordinates(newRegion.latitude, newRegion.longitude);
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Chọn địa chỉ"
                IconLeft={<Ionicons name="arrow-back-outline" size={20} color={appColors.cam} />}
                onIconLeftPress={goBack}
            />

            <View style={styles.containerMap}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    onRegionChange={handleRegionChange}
                    onRegionChangeComplete={handleRegionChangeComplete}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                </MapView>
            </View>
            <View style={{marginTop: 12}}>
                <AppText>{addressLabel}</AppText>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.trangNhat,
    },
    containerMap: {
        height: 400,
        width: appConfig.width,
        backgroundColor: appColors.cam
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
