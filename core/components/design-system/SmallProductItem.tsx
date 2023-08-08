import { styled } from 'nativewind';
import { Dimensions, Image, Pressable, StyleSheet, Text as RText, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useProductDescriptionStore } from '@/core/store/ProductDescriptionStore';



const StyledView = styled(Pressable)
const Text = styled(RText)
const StyledImage = styled(Image)


export type SmallProductItemProps = {
    onPress?: () => void;
    title: string;
    description: string;
    image: string;
    active?: boolean;
    id: string;
    productId?: string;
}



const { width } = Dimensions.get('window');

export const SmallProductItem = ({ onPress, title, description, image, id, productId }: SmallProductItemProps) => {

    const setCurrentId = useProductDescriptionStore((state) => state.setCurrentId)
    const setCurrentProductId = useProductDescriptionStore((state) => state.setCurrentProductId)


    return (
        <StyledView
            onPress={() => {
                setCurrentProductId(productId)
                setCurrentId(id)
            }}
            className='relative'>


            <StyledView
                style={{
                    width: "85%"
                }}

                className={`bg-[#f1f2f6] h-40  flex justify-center items-center  mb-1 shadow-2xl px-5 `}>

                <StyledImage source={image}
                    className='h-36 w-36'
                />

                <StyledView className='absolute right-4 top-2 h-20'>
                    <AntDesign name="hearto" size={15} color="black" />
                </StyledView>
            </StyledView>

            <StyledView
                style={{
                    width: width / 2.5,
                }}

            >
                <Text

                    className='font-bold '>{title} </Text>


                <Text
                    className='text-gray-400 text-start -ml-2'>  {description} </Text>

            </StyledView>
        </StyledView>
    );
}


