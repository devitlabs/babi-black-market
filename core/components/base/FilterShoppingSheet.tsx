import { useShoppingBagStateStore } from "@/core/store/HeaderStore";
import { AntDesign } from '@expo/vector-icons';
import { Motion } from "@legendapp/motion";
import { styled } from "nativewind";
import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DataPicker from "../design-system/Filters/DataPicker";
import PriceSlider from "../design-system/Filters/PriceSlider";
import CartContent from "./Cart/CartContent";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import ColorPicker from "../design-system/Filters/ColorPicker";




const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)





const FilterShoppingSheet = () => {

    const { width, height } = Dimensions.get('window');
    const isOpen = useShoppingBagStateStore(state => state.isFilterOpen);
    const actionOnFilterPopup = useShoppingBagStateStore(state => state.SetFilterPopup);

    const Area = styled(isOpen ? SafeAreaView : Motion.View)





    return (
        <Area
            style={{
                backgroundColor: "white",
                flex: 1,
            }}
            className="relative mt-10">
            <StyledAnimatedView style={{
                backgroundColor: "white",
                flex: 1,
                flexDirection: "column",
                position: "absolute",
                zIndex: 100,
                width: width,
            }}
                className="flex flex-row  justify-between bg-white"
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


                <StyledView className=' border-b border-gray-100 py-4 px-4'>
                    <StyledPressable
                        onPress={() => {
                            actionOnFilterPopup(false)
                        }}
                    >
                        <AntDesign name="close" size={25} color="black" />

                    </StyledPressable>
                    <StyledText className='text-2xl font-bold mt-2'>Filters</StyledText>
                </StyledView>

                <>

                    <StyledView className="grow mt-4 px-4">
                        <PriceSlider />


                        <StyledView className="mt-8">
                            <DataPicker
                                placeholder="Select a brand"
                                title="Brand"
                                values={[
                                    { label: 'Apple', value: 'apple' },
                                    { label: 'Banana', value: 'banana' },
                                    { label: 'Rice', value: 'Rice' },
                                    { label: 'Peaple', value: 'Peaple' },
                                    { label: 'Samsung', value: 'Samsung' },
                                    { label: 'Huawei', value: 'Huaweu' },
                                    { label: 'shsh', value: 'shsh' },
                                    { label: 'Domome', value: 'Domome' }
                                ]}
                            />
                        </StyledView>


                        <StyledView className="mt-8">
                            <DataPicker
                                placeholder="Select a category"
                                title="Category"
                                values={[
                                    { label: 'Apple', value: 'apple' },
                                    { label: 'Banana', value: 'banana' },
                                    { label: 'Rice', value: 'Rice' },
                                    { label: 'Peaple', value: 'Peaple' },
                                    { label: 'Samsung', value: 'Samsung' },
                                    { label: 'Huawei', value: 'Huaweu' },
                                    { label: 'shsh', value: 'shsh' },
                                    { label: 'Domome', value: 'Domome' }
                                ]}
                            />
                        </StyledView>

                        <StyledView className="mt-8">
                            <ColorPicker

                            />
                        </StyledView>
                    </StyledView>
                </>


                <StyledView
                    style={{
                        backgroundColor: "black",
                        width: Dimensions.get("screen").width,
                        bottom: 0,
                        position: "absolute",
                    }}
                    className='absolute bottom-0  h-20 flex items-center justify-center'>

                    <StyledText className='text-white text-lg text-center uppercase'>Apply</StyledText>

                </StyledView>
            </StyledAnimatedView>



        </Area>
    );
}

export default FilterShoppingSheet;



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