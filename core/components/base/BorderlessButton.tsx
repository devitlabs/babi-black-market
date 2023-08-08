import { styled } from 'nativewind';
import { Pressable, Text as RText } from 'react-native';



const Text = styled(RText)
const StyledPressable = styled(Pressable)




const BorderlessButton = ({ children,onPress }: any) => {
    return (
        <StyledPressable
            className='flex flex-row gap-1 items-center'
            onPress={onPress}
        >
            {children}
        </StyledPressable>
    );
}

export default BorderlessButton;