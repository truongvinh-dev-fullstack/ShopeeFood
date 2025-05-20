import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, SharedValue } from 'react-native-reanimated';
import { appConfig } from '../../../constants/AppConfig';

interface Props {
    item: {
        id: string;
        name: string;
        price: string;
    };
    index: number;
    scrollX: SharedValue<number>;
}

const ITEM_WIDTH = appConfig.width * 0.6;

const PackageCard = ({ item, index, scrollX }: Props) => {
    const animatedStyle = useAnimatedStyle(() => {
        const position = index * ITEM_WIDTH;
        const distance = scrollX.value;

        const scale = interpolate(
            distance,
            [position - ITEM_WIDTH, position, position + ITEM_WIDTH],
            [0.8, 1.3, 0.8],
        );

        const opacity = interpolate(
            distance,
            [position - ITEM_WIDTH, position, position + ITEM_WIDTH],
            [0.6, 1, 0.6],
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.price}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        // marginHorizontal: 10,
        width: ITEM_WIDTH,
        height: appConfig.height* 0.5,
        backgroundColor: '#f1f1f1',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default PackageCard;
