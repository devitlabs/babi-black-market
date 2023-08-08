import { useFavoriteStore } from '@/core/store/FavoriteStore';
import { useProductDescriptionStore } from '@/core/store/ProductDescriptionStore';
import { isValidHttpUrl } from '@/core/utils/isValidHttpUrl';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { ActivityIndicator, Dimensions, Pressable, Text as RText, View } from 'react-native';
import Image from 'react-native-image-progress';



const StyledView = styled(View)
const StyledPressable = styled(Pressable)
const Text = styled(RText)
const StyledImage = styled(Image)


export type ProductItemProps = {
    onPress?: () => void;
    title: string;
    description: string;
    image: string;
    id: string;
    active?: boolean;
    favorite?: boolean;
    productId?: string;
    handler?: () => void;
}



const { width } = Dimensions.get('window');

export const ProductItem = ({ onPress, title, description, image, favorite, id, productId, handler }: ProductItemProps) => {
    const navigation = useNavigation();
    const favoriteStore = useFavoriteStore((state) => state.favorites)
    const setCurrentId = useProductDescriptionStore((state) => state.setCurrentId)
    const setCurrentProductId = useProductDescriptionStore((state) => state.setCurrentProductId)


    const ExistInFavorites = (id) => {
        return favoriteStore.find((item) => item?.product?.id === id)
      }

      

    return (
        <StyledPressable
            onPress={() => {
                setCurrentProductId(productId)
                setCurrentId(id)
                navigation.navigate('product-info', {
                    id,
                    productId
                })
                handler && handler()
            }}
            className='relative  w-full'>


            <StyledView


                className={`bg-white h-56 rounded-md flex justify-center items-center  mb-1 shadow-2xl `}>

                <StyledImage source={{
                    uri: isValidHttpUrl(image) ? image : 'https://images.unsplash.com/photo-1616166330003-8b5f2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

                }}
                    className='h-44 w-36'
                    indicator={() => <ActivityIndicator color={"black"} size="small" />}

                />

                <StyledView className='absolute right-2 top-2 h-20'>
                    <AntDesign name={
                        ExistInFavorites(id) ? "heart" : "hearto"
                    } size={15} color={
                        ExistInFavorites(id) ? "red" : "black"
                    } />
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
        </StyledPressable>
    );
}


