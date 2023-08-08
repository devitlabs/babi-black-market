import { styled } from 'nativewind';
import { ActivityIndicator, Image, Pressable, ScrollView, Text as RNText, TextInput, View } from 'react-native';

import React from 'react';





const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledPressable = styled(Pressable)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledTextInput = styled(TextInput)



export default function AppSplashScreen() {


    return (
        <>
            <StyledView
                style={{
                    flex: 1,
                    backgroundColor: "black",

                }}
                className={`justify-center items-center flex flex-col`}
            >

                <StyledView>
                    <Text className='text-2xl font-bold mt-14 px-4 text-white mb-4'>Babi Black Market</Text>
                    <ActivityIndicator size="small" color="#fff" />
                </StyledView>

            </StyledView>


        </>
    );
}




