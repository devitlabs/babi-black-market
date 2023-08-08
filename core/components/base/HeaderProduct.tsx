import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { Dimensions, Image, Text as RText, View } from 'react-native';
import { Button } from './Button';
import NavigationHeader from './NavigationHeader';



const StyledView = styled(View)
const StyledImage = styled(Image)
const Text = styled(RText)

const HeaderProduct = () => {

    const { height } = Dimensions.get('window');


    const navigation = useNavigation();



    return (
        <StyledView
            className='flex flex-row justify-between items-end  py-10 bg-gray-200 h-[45vh]  px-4'
        >



            <StyledImage
                source={require('../../../assets/dot.png')}
                className="absolute  left-20  h-[50vh]"

            />



            <StyledView
                className='w-[60vw] flex flex-col gap-2'
            >

                <Text className='text-gray-400'>
                Cyber lundi
                </Text>
                <Text

                    className='text-4xl font-bold  leading-snug'>
                  Soldes -70% de réduction
                </Text>

                <StyledView className='mt-2 w-2/4'>

                    <Button
                        onPress={() => {
                            navigation.navigate('category')
                        }}
                        text='Achat' size='max' />
                </StyledView>


            </StyledView>
        </StyledView>
    );
}

export default HeaderProduct;