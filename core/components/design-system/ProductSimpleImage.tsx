import { styled } from 'nativewind';
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text as RText, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Image from 'react-native-image-progress';
import { isValidHttpUrl } from '@/core/utils/isValidHttpUrl';
import { useProductDescriptionStore } from '@/core/store/ProductDescriptionStore';



const StyledView = styled(View)
const StyledPressable = styled(Pressable)
const Text = styled(RText)
const StyledImage = styled(Image)


export type ProductSimpleImageProps = {
    onPress?: () => void;
    title: string;
    description: string;
    image: string;
    active?: boolean;
    id: string;
    productId?: string;
}



const { width } = Dimensions.get('window');

export const ProductSimpleImage = ({ onPress, title, description, image, id, productId }: ProductSimpleImageProps) => {
    const navigation = useNavigation();
    const setCurrentId = useProductDescriptionStore((state) => state.setCurrentId)
    const setCurrentProductId = useProductDescriptionStore((state) => state.setCurrentProductId)


    return (
        <StyledPressable
            onPress={() => {
                setCurrentProductId(productId)
                setCurrentId(id)
            }}

            className={`bg-[##f1f2f6] bg-stone-200 rounded-lg   w-20 h-20  flex justify-center items-center shadow-2xl py-4  `}>


            <StyledImage source={{
                uri: isValidHttpUrl(image) ? image : 'https://images.unsplash.com/photo-1616166330003-8b5f2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

            }}
                className='h-12  w-12'
                indicator={() => <ActivityIndicator color={"black"} size="small" />}

            />


        </StyledPressable>
    );
}


