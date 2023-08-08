import { useShoppingBagStateStore } from "@/core/store/HeaderStore";
import { AntDesign } from '@expo/vector-icons';
import { Motion } from "@legendapp/motion";
import { styled } from "nativewind";
import { Animated, Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button } from "../components/base/Button";




const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)





const ThankYouScreen = () => {

    const { width, height } = Dimensions.get('window');
    const [isOpen, setIsOpen] = useState(false);

    const Area = styled(isOpen ? SafeAreaView : Motion.View)


    const navigation = useNavigation();

    const router = useRoute();






    return (
        <>


            <Area
                style={{
                    backgroundColor: "white",
                    flex: 1,
                }}
                className={`relative`}>
                <StyledAnimatedView style={{
                    backgroundColor: "white",
                    flex: 1,
                    flexDirection: "column",
                    position: "absolute",

                    width: width,
                    height: height,
                }}
                    className={`flex flex-row relative  bg-white ${Platform.OS === "android" ? "pt-8" : "pt-0"} `}
                >



                    {/* <StyledView className="flex flex-row items-center">
                    <StyledPressable
                        onPress={() => {
                            actionOnFilterPopup(false)
                        }}
                    >
                        <AntDesign name="close" size={22} color="black" />

                    </StyledPressable>

                    <StyledText className="font-bold text-md grow text-center">Mon Panier</StyledText>
                </StyledView> */}


                    <StyledView className='py-4 px-4 mt-10'>
                        <StyledPressable
                            onPress={() => {
                                navigation.navigate("home")
                            }}
                        >
                            <AntDesign name="close" size={25} color="black" />

                        </StyledPressable>
                    </StyledView>


                    <StyledView className="flex flex-col items-center justify-center mt-20">

                        <StyledView className="h-32 w-32 rounded-full border-4 border-black flex items-center justify-center">
                            <AntDesign name="check" size={80} color="black" />
                        </StyledView>
                        <StyledText className="text-3xl font-bold text-black mt-10">Merci!</StyledText>
                        <StyledText className="text-stone-400  my-5 px-7 text-center mb-10 text-[17px]">
                            Votre commande <StyledText className="font-bold text-black">{router?.params?.orderId}</StyledText> a été enregistrée avec succès.
                            nous vous contacterons dès que possible.
                        </StyledText>

                        <Button
                            onPress={() => {
                                navigation.navigate("home")
                            }}
                            size="max" text="Continuer mes achats" />
                    </StyledView>




                </StyledAnimatedView>
            </Area>
        </>


    )
}

export default ThankYouScreen;



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