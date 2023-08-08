import { styled } from 'nativewind';
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, Text as RNText, View } from 'react-native';

import CategoryTitle from '@/core/components/base/CategoryTitle';
import { DATA } from '@/core/pages/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import React from 'react';
import { ProductSimpleImage } from '../design-system/ProductSimpleImage';
import { Button } from './Button';







const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const StyledImageBackground = styled(ImageBackground)
const StyledPressable = styled(Pressable)
const Text = styled(RNText)



export default function ProductDescriptionScreen({name}: {name: string}) {

    const navigation = useNavigation()

    return (
        <StyledView className=' py-4 border-b border-gray-100 pb-4'>
            <StyledView className='mb-2'>
                <CategoryTitle isBig title={`${name}(${Math.round(Math.random()*3930)})`} secondText='Show all' onPress={() => {
                    navigation.navigate('productList')
                }} />
            </StyledView>


            <StyledView className='mt-4' style={{ width: Dimensions.get("screen").width, }}>

                <FlashList
                    data={DATA.slice(0, Math.round(Math.random() * 5)+1)}
                    renderItem={({ item }) => <SimpleProduct title={item.title} price={item.price} image={item.link} />}
                    estimatedItemSize={300}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={
                        () => (
                            <StyledView className='h-4' />
                        )
                    }

                />
            </StyledView>

        </StyledView>
    )

}


const SimpleProduct = ({ title, price, image }: any) => {
    return (
        <StyledView className='flex items-center flex-row jus'>
            <ProductSimpleImage title={title} description={price} image={image} />
            <StyledView className='ml-4'>
                <StyledText className='text-black font-bold'>{title}</StyledText>
                <StyledView
                    style={{
                        width: Dimensions.get("screen").width - 140
                    }}
                    className='flex items-start justify-between flex-row mt-2'>
                    <StyledText className='text-gray-400 mt-4 grow flex-1'>{price}</StyledText>
                    <Button text='Acheter' size='max' />
                </StyledView>
            </StyledView>
        </StyledView>
    )
}