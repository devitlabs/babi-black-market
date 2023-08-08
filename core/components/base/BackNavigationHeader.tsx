import { styled } from 'nativewind';
import { TouchableOpacity, Text, View, Platform } from 'react-native';

import { useShoppingBagStateStore } from '@/core/store/HeaderStore';
import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();




const StyledView = styled(View)
const StyledPressable = styled(TouchableOpacity)
const StyledText = styled(Text)



const BackNavigationHeader = ({ title, hasFilter }: any) => {

    const actionSetFilterPopup = useShoppingBagStateStore(state => state.SetFilterPopup);
    const isFilterOpen = useShoppingBagStateStore(state => state.isFilterOpen);

    const insets = useSafeAreaInsets();

    const navigation = useNavigation();


    return (
        <StyledView
            style={{
                paddingTop:  Platform.OS==="android" ? insets.top : 40,
                paddingBottom: Platform.OS==="android" ? insets.bottom : 0,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                backgroundColor: "white",
            }}
        >
            <StyledView

                className='flex-row justify-between items-center px-4 py-3  bg-white '>

                <StyledPressable
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 20,
                        height: 25,

                    }}
                    className="flex items-center justify-center mr-4"

                >
                    <Feather name="arrow-left" size={20} color="black" />

                </StyledPressable>

                <StyledText className={`${!hasFilter ? "grow mr-12" : ""} text-center  font-bold text-sm`}>
                    {title}
                </StyledText>

                {hasFilter && <StyledPressable

                    onPress={() => {
                        navigation.navigate("product-filter")

                    }}
                    className='grow flex justify-center items-end '>
                    <StyledView>

                        <StyledText className='font-bold text-md py-1'>
                            Filtres
                        </StyledText>

                    </StyledView>
                </StyledPressable>}

            </StyledView>
        </StyledView>
    );
}

export default BackNavigationHeader;