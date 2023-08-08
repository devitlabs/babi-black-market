import { useShoppingBagStateStore } from "@/core/store/HeaderStore";
import { AntDesign } from '@expo/vector-icons';
import { Motion } from "@legendapp/motion";
import { styled } from "nativewind";
import { ActivityIndicator, Animated, Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { MenuProvider } from "react-native-popup-menu";
import DataPickerSheet from "../components/base/Cart/DataPickerSheet";
import ColorPicker from "../components/design-system/Filters/ColorPicker";
import DataPicker from "../components/design-system/Filters/DataPicker";
import PriceSlider from "../components/design-system/Filters/PriceSlider";
import { useFilterStore } from "../store/FilterStore";




const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)





const FilterScreen = () => {

    const { width, height } = Dimensions.get('window');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [opacity, setOpacity] = useState(new Animated.Value(0));


    // const minPrice = useFilterStore((state) => state.minPrice)
    // const maxPrice = useFilterStore((state) => state.maxPrice)
    const search = useFilterStore((state) => state.search)
    const setSave = useFilterStore((state) => state.setSave)

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100)

    // const setMinPrice = useFilterStore((state) => state.setMinPrice)
    // const setMaxPrice = useFilterStore((state) => state.setMaxPrice)
    const setSearch = useFilterStore((state) => state.setSearch)




    const Area = styled(isOpen ? SafeAreaView : Motion.View)


    const navigation = useNavigation();

    const Apply = () => {
        setLoading(true)
        setSave(
            Math.random().toString(36).substring(7)
        )
        setTimeout(() => {
            //navigation.goBack();
            setLoading(false)
        }, 2000)
    }




    return (
        <>
            <DataPickerSheet type={""} />

            <MenuProvider
                style={{
                    top: 0,
                    right: 0,
                    flex: 1,
                }}
                customStyles={{
                    backdrop: {
                        backgroundColor: 'black',
                        opacity: 0.7,
                    },
                    menuProviderWrapper: {
                        top: 0,
                        right: 0,
                        zIndex: 1000,
                    }
                }}
            >
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
                        className={`flex flex-row relative justify-between bg-white ${Platform.OS === "android" ? "pt-8" : "pt-0"} `}
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


                        <StyledView className=' border-b border-gray-100 py-4 px-4 mt-10'>
                            <StyledPressable
                                onPress={() => {
                                    navigation.goBack()
                                }}
                            >
                                <AntDesign name="close" size={25} color="black" />

                            </StyledPressable>
                            <StyledText className='text-2xl font-bold mt-2'>Filtres</StyledText>
                        </StyledView>

                        <>

                            <StyledView className="grow mt-4 px-4">
                                <PriceSlider
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    onChange={(value) => {
                                        setMinPrice(value[0])
                                        setMaxPrice(value[1])
                                    }}

                                />


                                <StyledView className="mt-8">
                                    <DataPicker
                                        placeholder="Select a brand"
                                        title="Brand"
                                        type="brand"
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
                                        type="category"
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
                                    <ColorPicker />
                                </StyledView>
                            </StyledView>
                        </>


                        <StyledPressable
                            onPress={Apply}
                            style={{
                                backgroundColor: "black",
                                width: Dimensions.get("screen").width,
                                bottom: 0,
                                position: "absolute",
                            }}
                            className='absolute bottom-0  h-24 flex items-center justify-center flex-row '>

                            {loading && <ActivityIndicator size="small" color="white" />}
                            <StyledText className='text-white text-lg text-center uppercase ml-2'>{
                                loading ? "En cours..." : "Appliquer"
                            }</StyledText>

                        </StyledPressable>
                    </StyledAnimatedView>
                </Area>
            </MenuProvider>

        </>
    )
}

export default FilterScreen;



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