import { styled } from 'nativewind';
import { useState } from 'react';
import { Text as RText, ImageBackground, View, Image, StyleSheet, Pressable } from 'react-native';



const StyledView = styled(View)
const StyledPressable = styled(Pressable)
const Text = styled(RText)
const StyledImage = styled(Image)


export type productCardProps = {
    onPress?: () => void;
    title: string;
    description: string;
    image: string
    active?: boolean;
}

const image = { uri: 'https://reactjs.org/logo-og.png' };




export const ProductCard = ({ onPress, title, description, active, image }: productCardProps) => {

    return (
        <StyledPressable
            onPress={() => onPress(title)}
        >



            <StyledView
                style={[styles.shadowProp]}
                className={` ${active ? "bg-[#F4C670]" : "bg-[#f1f2f6]"} h-36 w-36  flex justify-center items-center rounded-lg mb-1 shadow-2xl`}>

                <StyledImage source={
                    image
                }
                    className='h-16 w-16'
                />

            </StyledView>
            <Text


                className='font-bold'>  {title} </Text>
            <Text


                className='text-gray-400'>  {description} </Text>
        </StyledPressable>
    );
}



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