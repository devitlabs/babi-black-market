import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styled } from 'nativewind';
import { Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import OnBoardingScreen from '../pages/Onboarding/OnBoardingScreen';

const Stack = createNativeStackNavigator();
const StyledSafeAreaView = styled(SafeAreaView)

const StyledView = styled(View)
const StyledPressable = styled(Pressable)


const StyledImage = styled(Image)

const AuthStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="onboarding">

            <Stack.Screen name="onboarding" component={OnBoardingScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false
                }}

            />

            <Stack.Screen name="forgot-password" component={ForgotPassword}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false,
                    presentation: 'modal'

                }}

            />

            <Stack.Screen name="signup" component={SignUp}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false,
                    presentation: 'modal'
                }}

            />


            <Stack.Screen name="login" component={Login}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false,

                }}

            />




        </Stack.Navigator>
    );
}

export default AuthStackNavigation;