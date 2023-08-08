import { useFilterStore } from '@/core/store/FilterStore';
import { Motion } from '@legendapp/motion';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { styled } from 'nativewind';
import { memo, useEffect, useState } from 'react';
import { Pressable, ScrollView, View, Text } from 'react-native';
import _ from 'lodash';



const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)



const PriceSlider = ({ onChange }: any) => {


    const minPriceStore = useFilterStore((state) => state.minPrice)
    const maxPriceStore = useFilterStore((state) => state.maxPrice)
    //const save = useFilterStore((state) => state.save)

    const setMinPriceStore = useFilterStore((state) => state.setMinPrice)
    const setMaxPriceStore = useFilterStore((state) => state.setMaxPrice)

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100)


    // useEffect(() => {
    //     console.log('minPrice', minPrice)
    //     console.log('maxPrice', maxPrice)

    //     setMinPriceStore(minPrice)
    //     setMaxPriceStore(maxPrice)
    // },[save])

    return (
        <StyledView className='flex'>
            <StyledText className='text-sm '>Filter by price</StyledText>

            <StyledView>
                <MultiSlider
                    values={[minPrice, maxPrice]}
                    min={10}
                    max={9999}

                    onValuesChange={(values) => {
                        setMinPrice(values[0])
                        setMaxPrice(values[1])

                        //debouce and save to setMinPriceStore and setMaxPriceStore with Lodash

                        _.debounce(()=>{
                            setMinPriceStore(minPrice)
                            setMaxPriceStore(maxPrice)
                        })


                    }}
                    containerStyle={{
                        marginLeft: 20,

                    }}
                    trackStyle={{
                        backgroundColor: '#f1f2f6',
                        height: 5,
                    }}
                    markerStyle={{
                        backgroundColor: 'black',
                        height: 15,
                        width: 15,
                    }}
                    markerOffsetY={2}
                    selectedStyle={{
                        backgroundColor: 'black',
                    }}
                />
            </StyledView>
            <StyledView className='flex flex-row justify-between px-4'>
                <StyledText className='text-sm font-bold'>{minPrice*100} FCFA</StyledText>
                <StyledText className='text-sm font-bold'>{maxPrice*100}FCFA</StyledText>
            </StyledView>

        </StyledView>
    );
}

export default memo(PriceSlider);