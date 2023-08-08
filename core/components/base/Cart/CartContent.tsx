import { useCartStore } from "@/core/store/CartStore";
import { useShoppingBagStateStore } from "@/core/store/HeaderStore";
import { Motion } from "@legendapp/motion";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { styled } from "nativewind";
import { Dimensions, Pressable, ScrollView, Text, View, Image } from "react-native";
import { Button } from "../Button";
import Lottie from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';



const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)
const StyledImage = styled(Image)



const CartContent = () => {

    const navigation = useNavigation();
    const actionOnShoppingBag = useShoppingBagStateStore(state => state.SetShoppingBage);
    const cart = useCartStore((state) => state.cart);


    const animationRef = useRef<Lottie>(null)

    useEffect(() => {
        animationRef.current?.play()

        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(0, 120);
    }, [])



    const CartLength = () => {
        return cart ? cart?.totalProductsCount : 0
    }
    

    return (
        <StyledView className="overflow-hidden">
            {CartLength() !== 0 && <StyledText><StyledText className="font-bold">{CartLength()} Produit(s)</StyledText> <StyledText>dans mon panier.</StyledText>  </StyledText>}

            <ScrollView style={{ height: Dimensions.get("screen").height / 3, marginTop: 20, marginBottom: 20 }}>
                <FlashList
                    data={CartLength() === 0 ? [] : cart?.products}
                    renderItem={({ item }) => <CartItem title={item.name} description={item.totalPrice} image={item.image?.sourceUrl} count={item?.qty} />}
                    estimatedItemSize={300}
                    numColumns={1}
                    ItemSeparatorComponent={() => <StyledView className="h-2" />}
                    ListEmptyComponent={() => (
                        <StyledView className="flex items-center justify-center">
                            <Lottie
                                ref={animationRef}
                                source={require('@/assets/108106-empty-cart.json')}
                                style={{
                                    height: 200
                                }}
                            />
                            <StyledText>
                                Votre panier est vide
                            </StyledText>
                        </StyledView>
                    )}
                />
            </ScrollView>

            <Button
                onPress={() => {
                    if (CartLength() === 0) return actionOnShoppingBag(false)
                    actionOnShoppingBag(false)
                    navigation.navigate("shopping-cart")
                }}
                text={CartLength() === 0 ? "Faire Mon shopping" : "Voir mon panier"} />
        </StyledView>
    );
}



const CartItem = ({ title, description, image, count }: any) => {
    return (
        <StyledView className="flex-row items-start">
            <StyledView className="bg-gray-200 h-20 w-20 rounded-md flex items-center justify-center relative">
                <StyledImage source={{ uri: image }}
                    className='h-12 w-12'
                />
                <StyledView className="absolute top-1 left-1  px-1 rounded-full bg-black">
                    <StyledText className="text-white text-[10px]">{count}</StyledText>

                </StyledView>

            </StyledView>
            <StyledView className="flex-1 ml-4">

                <StyledText className="font-bold">{title}</StyledText>
                <StyledText className="text-gray-400">{description}</StyledText>
            </StyledView>
        </StyledView>
    )
}
export default CartContent;