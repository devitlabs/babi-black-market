import { useShoppingBagStateStore } from "@/core/store/HeaderStore";
import { AntDesign } from '@expo/vector-icons';
import { Motion } from "@legendapp/motion";
import { FlashList } from "@shopify/flash-list";
import { styled } from "nativewind";
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartContent from "./CartContent";
import _ from "lodash";



const StyledView = styled(View)
const StyledAnimatedView = styled(Motion.View)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)


const CategoryData = {
    "brand": [
        {
            "id": "1",
            "name": "All",
        },
        {
            "id": "2",
            "name": "Apple",
        },
        {
            "id": "3",
            "name": "Samsung",
        }, {
            "id": "4",
            "name": "Huawei",
        },
        {
            "id": "5",
            "name": "Xiaomi",
        }
    ]
}


const DataPickerSheet = () => {

    const { width, height } = Dimensions.get('window');
    const isOpen = useShoppingBagStateStore(state => state.filterData);
    const type = useShoppingBagStateStore(state => state.filterData);
    const actionOnShoppingBag = useShoppingBagStateStore(state => state.SetFilterData);


    return (
        <>
            <StyledAnimatedView style={{
                backgroundColor: "white",
                flex: 1,
                flexDirection: "column",
                position: "absolute",
                zIndex: isOpen !== "none" ? 99999999999 : 0,
                width: width,
                paddingTop: 20,
                paddingBottom: 20,
                bottom: 0,

            }}

                animate={{
                    height: isOpen !== "none" ? height / 3 : 0,
                    opacity: isOpen !== "none" ? 1 : 0,

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
                            actionOnShoppingBag("none")
                        }}
                    >
                        <AntDesign name="close" size={22} color="black" />

                    </StyledPressable>

                    <StyledText className="font-bold text-md grow text-center">Choose an option</StyledText>
                </StyledView>

                <StyledView className='mt-4 px-4' style={{ height: 300, }}>
                    <FlashList
                        data={_.get(CategoryData, type, [])}
                        renderItem={({ item }) => <Item item={item} />

                        }
                        estimatedItemSize={300}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={
                            () => (
                                <StyledView className='w-4 h-4' />
                            )
                        }

                    />

                </StyledView>


            </StyledAnimatedView>

            {isOpen !== "none" && <StyledPressable
                onPress={() => {
                    actionOnShoppingBag("none")
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
                    opacity: isOpen !== "none" ? 0.8 : 0,
                }}
            >


            </StyledPressable>

            }



        </>
    );
}

export default DataPickerSheet;



const Item = (props) => {
    const type = useShoppingBagStateStore(state => state.filterData);
    const addAction = useShoppingBagStateStore(state => state.setFilterDataSelected);
    const rempveAction = useShoppingBagStateStore(state => state.removeFilterDataSelected);
    const filterDataSelected = useShoppingBagStateStore(state => _.get(state, ["filterDataSelected",type], []));

    return (
        <StyledPressable
            onPress={() => {
                if(filterDataSelected.includes(props?.item?.name)){
                    rempveAction(props?.item?.name,type)
                }else{
                    addAction(props?.item?.name,type)
                }
            }}
            className="flex items-center justify-between flex-row h-5">
            <StyledText className="text-black">{props?.item?.name}</StyledText>
           {filterDataSelected.includes(props?.item?.name) && <AntDesign name="check" color={"black"} size={15} />}
        </StyledPressable>

    )
}