import { styled } from 'nativewind';
import { Dimensions, ImageBackground, Pressable, ScrollView, Text as RNText, View } from 'react-native';

import React from 'react';

import StarRating from 'react-native-star-rating-widget';
import { Bar } from 'react-native-progress';
import { Button } from './Button';
import Image from 'react-native-image-progress';


const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const StyledImageBackground = styled(ImageBackground)
const StyledPressable = styled(Pressable)
const Text = styled(RNText)





const ProductReview = ({data,avgRating}) => {
    return (
        <StyledView className='flex items-start flex-row'>
            <StyledView>

                <StyledView
                    className='bg-[#3079FF] rounded-lg h-[80px] w-[80px]  flex items-center justify-center'
                >

                    <Text className='text-white font-bold text-2xl'>{avgRating}</Text>
                    <Text className='text-white text-[12px] -mt-2'>sur 5</Text>

                </StyledView>

                <StyledView className='mt-2'>
                    <StarRating
                        rating={3}
                        onChange={() => { }}
                        starSize={15}
                        starStyle={{ marginHorizontal: 1 }}
                        color="#F29217"
                        emptyColor='#f1f2f6'
                    />
                </StyledView>

            </StyledView>

            <StyledView className='ml-4'>

                <StyledView className='flex flex-row items-center my-[2px]'>
                    <Text
                        style={{
                            fontFamily: 'Avenir-Roman'
                        }}

                        className='text-gray-400 text-[12px] w-16'>Excellent</Text>
                    <StyledView className='ml-4'>
                        <Bar
                            style={{ borderWidth: 0, borderColor: 'red' }}
                            borderWidth={0}
                            borderColor='red'
                            unfilledColor='#f1f2f6'

                            progress={0.5} width={
                                Dimensions.get("screen").width / 2.5
                            } />
                    </StyledView>
                </StyledView>

                <StyledView className='flex flex-row my-[3px] items-center'>
                    <Text
                        style={{
                            fontFamily: 'Avenir-Roman'
                        }}
                        className='text-gray-400 text-[11px] w-16'>Très bon</Text>
                    <StyledView className='ml-4'>
                        <Bar
                            style={{ borderWidth: 0, borderColor: 'red' }}
                            borderWidth={0}
                            borderColor='red'
                            unfilledColor='#f1f2f6'

                            progress={0.3} width={
                                Dimensions.get("screen").width / 2.5
                            } />
                    </StyledView>


                </StyledView>


                <StyledView className='flex flex-row my-[3px] items-center'>
                    <Text

                        style={{
                            fontFamily: 'Avenir-Roman'
                        }}
                        className='text-gray-400 text-[11px] w-16'>Moyen</Text>
                    <StyledView className='ml-4'>
                        <Bar
                            style={{ borderWidth: 0, borderColor: 'red' }}
                            borderWidth={0}
                            borderColor='red'
                            unfilledColor='#f1f2f6'

                            progress={0.2} width={
                                Dimensions.get("screen").width / 2.5
                            } />
                    </StyledView>
                </StyledView>

                <StyledView className='flex flex-row my-[3px] items-center'>
                    <Text
                        style={{
                            fontFamily: 'Avenir-Roman'
                        }}
                        className='text-gray-400 text-[11px] w-16'>Mauvais</Text>
                    <StyledView className='ml-4'>
                        <Bar
                            style={{ borderWidth: 0, borderColor: 'red' }}
                            borderWidth={0}
                            borderColor='red'
                            unfilledColor='#f1f2f6'

                            progress={0.1} width={
                                Dimensions.get("screen").width / 2.5
                            } />
                    </StyledView>
                </StyledView>
            </StyledView>


        </StyledView>
    );
}

export default ProductReview;