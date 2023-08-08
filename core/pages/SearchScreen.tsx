import { Motion } from "@legendapp/motion";
import { styled } from "nativewind";
import { ActivityIndicator, Animated, Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useFilterStore } from "../store/FilterStore";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { PRODUCT_SEARCH } from "../graphql/Products.gql";
import { ProductItem } from "../components/design-system/ProductItem";
import { range } from "lodash";
import { ShimmerProductItem } from "./ProductsListScreen";




const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)
const StyledTextInput = styled(TextInput)
const StyledScrollView = styled(ScrollView)





const SearchScreen = () => {

    const { width, height } = Dimensions.get('window');
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");




    const navigation = useNavigation();



    const { data, loading, refetch } = useQuery(PRODUCT_SEARCH, {
        variables: {

            search: "?????????????",
        },

    });

    useEffect(() => {
        if (search.length > 2) {
            refetch({
                search: search || "",
            })
        }
    }, [search])




    return (
        <>

            <StyledView
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



                    <StyledView className='px-4 mt-2'>

                        <StyledText className='text-2xl font-bold mt-2'>Faites votre recherche</StyledText>
                    </StyledView>

                    <>

                        <StyledView className="grow px-4 relative">
                            <StyledTextInput
                                value={search}
                                onChangeText={(text) => {
                                    setSearch(text)
                                }}
                                placeholder="Votre Recherche"
                                placeholderTextColor={"gray"} className='border-b border-gray-200 px-2 pb-2 mt-10' />

                            <StyledView className="absolute right-5 top-10">
                                <AntDesign name="search1" size={20} color="gray" />
                            </StyledView>




                        </StyledView>

                        <StyledScrollView
                            style={{ height: Dimensions.get("screen").height }}
                        >
                            <StyledView

                                className='flex items-start flex-row justify-start px-4 flex-wrap gap-2 pb-40 mt-4' >
                                {!loading &&
                                    data?.products?.nodes?.map((item, index) => (
                                        <StyledView
                                            key={item.id}
                                            style={{
                                                width: Dimensions.get("screen").width / 2 - 20,
                                            }}
                                        >
                                            <ProductItem productId={item?.productId} title={item.name} id={item.id} description={item.price} image={item?.image?.sourceUrl} />

                                        </StyledView>
                                    ))
                                }

                                {loading &&
                                    range(0, 30).map((item, index) => (
                                        <StyledView
                                            key={item}
                                            style={{
                                                width: Dimensions.get("screen").width / 2 - 20,
                                            }}
                                        >
                                            <ShimmerProductItem />
                                        </StyledView>
                                    ))
                                }

                            </StyledView>


                        </StyledScrollView>
                    </>


                    <StyledPressable
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{
                            backgroundColor: "black",
                            width: Dimensions.get("screen").width,
                            bottom: Platform.OS === "android" ? 0 : 50,
                            position: "absolute",
                        }}
                        className='absolute bottom-0  h-24 flex items-center justify-center flex-row '>

                        {loading && <ActivityIndicator size="small" color="white" />}
                        <StyledText className='text-white text-lg text-center uppercase ml-2'>
                            Fermer
                        </StyledText>

                    </StyledPressable>
                </StyledAnimatedView>
            </StyledView>


        </>
    )
}

export default SearchScreen;



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