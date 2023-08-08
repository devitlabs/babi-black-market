import { styled } from 'nativewind';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';



const SafeView = ({ children }) => {
    const StyledSafeAreaView = styled(SafeAreaView)


    return (
        <StyledSafeAreaView className='white' style={{
            flex: 1,
        }}>

            {children}
        </StyledSafeAreaView>


    );
}

export default SafeView;