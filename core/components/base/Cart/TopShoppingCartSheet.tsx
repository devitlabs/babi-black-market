import { GET_CART } from "@/core/graphql/Card.gql";
import { useCartStore } from "@/core/store/CartStore";
import { useShoppingBagStateStore } from "@/core/store/HeaderStore";
import { useProductDescriptionStore } from "@/core/store/ProductDescriptionStore";
import { getFormattedCart } from "@/core/utils/CartFunction";
import { SaveKeyPair } from "@/core/utils/ExpoStore";
import { useQuery } from "@apollo/client";
import { AntDesign } from '@expo/vector-icons';
import { Motion } from "@legendapp/motion";
import { styled } from "nativewind";
import { useEffect } from "react";
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartContent from "./CartContent";




const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)





const TopShoppingCartSheet = () => {

    const { width, height } = Dimensions.get('window');
    const isOpen = useShoppingBagStateStore(state => state.isShoppingBagOpen);
    const actionOnShoppingBag = useShoppingBagStateStore(state => state.SetShoppingBage);
    const insets = useSafeAreaInsets();

    const currentId = useProductDescriptionStore((state) => state.currentId)
    const currentProductId = useProductDescriptionStore((state) => state.currentProductId)

    const setCard = useCartStore((state) => state.setCard)

    const { data: cartData, refetch: refechCart } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: async () => {
            const updatedCart = getFormattedCart(cartData);
            console.log(updatedCart)
            if (updatedCart) {
                await SaveKeyPair('woo-next-cart', JSON.stringify(updatedCart));

            }

            setCard(updatedCart);
        }
    });



    useEffect(()=>{
        refechCart()
    },[])


    return (
        <>
            <StyledAnimatedView style={{
                backgroundColor: "white",
                flex: 1,
                flexDirection: "column",
                position: "absolute",
                zIndex: isOpen ? 100 : 0,
                width: width,
                paddingTop: insets.top + 20,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}

                animate={{
                    height: isOpen ? height / 1.65 : 0,
                    opacity: isOpen ? 1 : 0,

                }}
                transition={{
                    default: {
                        type: 'spring',
                    }
                }}
                className="flex flex-row justify-between bg-white"
            >
                <StyledView className="flex flex-row items-center px-4 pb-2">
                    <StyledPressable
                        onPress={() => {
                            actionOnShoppingBag(false)
                        }}
                    >
                        <AntDesign name="close" size={22} color="black" />

                    </StyledPressable>

                    <StyledText className="font-bold text-md grow text-center">Mon Panier</StyledText>
                </StyledView>

                <StyledView className="grow mt-4 px-4">
                    <CartContent />
                </StyledView>


            </StyledAnimatedView>

            {isOpen && <StyledPressable
                onPress={() => {
                    actionOnShoppingBag(false)
                }}
                style={{
                    backgroundColor: "black",
                    flex: 1,
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    zIndex: 10,
                    width: width,
                    height: height * 2,
                    opacity: isOpen ? 0.8 : 0,
                }}
            >


            </StyledPressable>

            }



        </>
    );
}

export default TopShoppingCartSheet;



const styles = StyleSheet.create({

    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
});  