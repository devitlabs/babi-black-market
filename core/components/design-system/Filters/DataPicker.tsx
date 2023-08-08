import { useShoppingBagStateStore } from '@/core/store/HeaderStore';
import { Motion } from '@legendapp/motion';
import { styled } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Animated from 'react-native-reanimated';
import _ from "lodash";
import { FlashList } from '@shopify/flash-list';



const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)



type DataPickerProps = {
    values: any;
    title: string;
    placeholder: string;
    type: "brand" | "category" | "price" | "color" | "size" | "discount" | "rating" | "new" | "bestseller" | "sale" | "none"

}

const DataPicker = ({ values, title, placeholder, type }: DataPickerProps) => {

    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(values);
    const isOpen = useShoppingBagStateStore(state => state.filterData);
    const SetFilterData = useShoppingBagStateStore(state => state.SetFilterData);
    const DataSelected = useShoppingBagStateStore(state => _.get(state, ['filterDataSelected', type], []));

    useEffect(() => {
        
    },[DataSelected])
    return (
        <StyledView className='flex relative '>
            <StyledText className='text-sm '>{title}</StyledText>

            <StyledPressable
                onPress={() => {
                    SetFilterData(type)
                }}
                className='border-b border-gray-200  pb-2'>
                <StyledView className='mt-4 ' style={{ width:Dimensions.get("screen").width, }}>
                    <FlashList
                        data={DataSelected || []}
                        renderItem={({ item }) => <Item item={item} />}
                        estimatedItemSize={300}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={
                            () => (
                                <StyledView className='w-2' />
                            )
                        }

                    />

                </StyledView>
            </StyledPressable>

        </StyledView>
    );
}

export default DataPicker;

const Item = (props) => {
    return (
        <StyledView className='flex flex-row items-center justify-between bg-black px-2 py-1 rounded-lg'>
            <StyledText className='text-sm text-white font-bold'>{props?.item}</StyledText>
        </StyledView>
    )
}