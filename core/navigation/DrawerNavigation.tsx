import React from 'react';

import NavigationHeader from '@/core/components/base/NavigationHeader';
import ExploreScreen from '@/core/pages/ExploreScreen';
import HomeScreen from '@/core/pages/HomeScreen';
import PhilzCoffee from '@/core/pages/CategoryScreenTwo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import CustomDrawerContent from './Drawer/CustomDrawerContent';


const Stack = createNativeStackNavigator();
const StyledSafeAreaView = styled(SafeAreaView)

const Drawer = createDrawerNavigator();



const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='home' drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="home" component={StackNavigation} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;