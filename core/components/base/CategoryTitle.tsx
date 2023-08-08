import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Image, Text as RText, View, Pressable } from 'react-native';
import BorderlessButton from './BorderlessButton';



const StyledView = styled(View)
const StyledImage = styled(Image)
const Text = styled(RText)

const CategoryTitle = ({ title, secondText, onPress, isBig }: {
    title: string
    secondText: string
    onPress: () => void
    isBig?: boolean
}) => {

    return (
        <StyledView
            className='flex flex-row justify-between items-center'
        >
            <Text
                style={{
                    fontFamily: 'Avenir-Black'
                }}
                className={`
                 font-bold
                 ${isBig ? 'text-xl' : 'text-[16px]'}
                `}>{title}</Text>
            <BorderlessButton
                onPress={onPress}
            >
                <Text className='text-xs'>{secondText}</Text>
                <AntDesign name="caretright" size={15} color="black" />
            </BorderlessButton>

        </StyledView>
    );
}

export default CategoryTitle;