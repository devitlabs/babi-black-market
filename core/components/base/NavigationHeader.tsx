import { styled } from 'nativewind';
import { Platform, Pressable, Text, View } from 'react-native';

import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useShoppingBagStateStore } from '@/core/store/HeaderStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { GET_CART } from '@/core/graphql/Card.gql';
import { useCartStore } from '@/core/store/CartStore';
import { getFormattedCart } from '@/core/utils/CartFunction';
import { SaveKeyPair } from '@/core/utils/ExpoStore';
import { useQuery } from '@apollo/client';

const Stack = createNativeStackNavigator();




const StyledView = styled(View)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)
const StyledSafeAreaView = styled(SafeAreaView)



const NavigationHeader = ({ isWhite }) => {


    const actionOnShoppingBag = useShoppingBagStateStore(state => state.SetShoppingBage);
    const insets = useSafeAreaInsets();


    const navigation = useNavigation();


    const setCard = useCartStore((state) => state.setCard)
    const cart = useCartStore((state) => state.cart)



    const CartLength = () => {
        return cart ? cart?.totalProductsCount : 0
    }


    const { data: cartData, refetch: refechCart } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: async () => {
            const updatedCart = getFormattedCart(cartData);
            if (updatedCart) {
                await SaveKeyPair('woo-next-cart', JSON.stringify(updatedCart));

            }

            setCard(updatedCart);
        }
    });



    useEffect(() => {
        refechCart()
    }, [])


    return (
        <>
            <StyledView
                style={{
                    backgroundColor: isWhite ? 'white' : 'transparent',
                    paddingTop: Platform.OS === "android" ? insets.top : 40,
                    paddingBottom: 20,
                }}
                className='absolute top-0 w-full z-50 '>

                <StyledView className='px-4 flex-row justify-between items-center  py-2 '>

                    <StyledPressable
                        onPress={() => {
                            navigation?.openDrawer()
                            // StatusBar.setHidden(true);

                        }}
                        style={{
                            width: 20,
                            height: 25,

                        }}
                        className="flex items-center justify-center"

                    >
                        <Feather name="menu" size={26} color="black" />

                    </StyledPressable>

                    <StyledView className='flex flex-row gap-6'>

                        <StyledPressable
                            onPress={() => {
                                actionOnShoppingBag(true)
                            }}

                            className="flex items-center justify-center relative"
                        >
                            <MaterialCommunityIcons name="shopping-outline" size={26} color="black" />
                            {CartLength() !== 0 && <StyledView className='absolute bg-white px-1 rounded-full -left-2 -top-1'>
                                <StyledText className='text-[11px]'>{
                                    CartLength()
                                }</StyledText>
                            </StyledView>}

                        </StyledPressable>

                        <StyledPressable
                            onPress={() => {
                                navigation.navigate('search')
                            }}

                            className="flex items-center justify-center"
                        >
                            <AntDesign name="search1" size={28} color="black" />

                        </StyledPressable>
                    </StyledView>
                </StyledView>



            </StyledView>
        </>
    );
}

export default NavigationHeader;