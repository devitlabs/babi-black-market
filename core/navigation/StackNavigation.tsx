import React from 'react';

import CategoryScreenTwo from '@/core/pages/CategoryScreenTwo';
import HomeScreen from '@/core/pages/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styled } from 'nativewind';
import { Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackNavigationHeader from '../components/base/BackNavigationHeader';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import CategoryScreen from '../pages/CategoryScreen';
import CheckoutScreen from '../pages/CheckoutScreen';
import FilterScreen from '../pages/FilterScreen';
import OnBoardingScreen from '../pages/Onboarding/OnBoardingScreen';
import ProductDescriptionScreen from '../pages/ProductDescriptionScreen';
import ProductsListScreen from '../pages/ProductsListScreen';
import ReviewScreen from '../pages/ReviewScreen';
import ShoppingCartScreen from '../pages/ShoppingCartScreen';
import CollectionScreen from '../pages/CollectionScreen';
import ThankYouScreen from '../pages/ThankYouScreen';
import FavoriteScreen from '../pages/FavoriteScreen';
import ShippingAddrScreen from '../pages/ShippingAddrScreen';
import AddShipping from '../pages/AddShipping';
import SearchScreen from '../pages/SearchScreen';
import OrderScreen from '../pages/OrderScreen';

const Stack = createNativeStackNavigator();
const StyledSafeAreaView = styled(SafeAreaView)

const StyledView = styled(View)
const StyledPressable = styled(Pressable)


const StyledImage = styled(Image)

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="home">


            <Stack.Screen name="collection" component={CollectionScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false
                }}

            />



            <Stack.Screen name="checkout" component={CheckoutScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false,
                    presentation: 'modal'
                }}

            />



            <Stack.Screen name="home" component={HomeScreen}
            />

            <Stack.Screen name="category" component={CategoryScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <BackNavigationHeader title={"Categories"} />
                    )
                }}
            />


            <Stack.Screen name="addresse" component={ShippingAddrScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    )

                }}
            />

            <Stack.Screen name="orders" component={OrderScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    )

                }}
            />

            <Stack.Screen name="search" component={SearchScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    presentation: 'modal'

                }}
            />


            <Stack.Screen name="add-shipping" component={AddShipping}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    presentation: 'modal'

                }}
            />


            <Stack.Screen name="review" component={ReviewScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <BackNavigationHeader title={"Reviews"} />
                    ),
                    presentation: 'modal'

                }}
            />





            <Stack.Screen name="shopping-cart" component={ShoppingCartScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    )
                }}
            />


            <Stack.Screen name="thank-you" component={ThankYouScreen}
                options={{
                    headerTransparent: true,
                    
                    header: () => (
                        <></>
                    ),
                    presentation: 'fullScreenModal',
                    gestureEnabled: false,

                }}
            />



            <Stack.Screen name="productList" component={ProductsListScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    )
                }}
            />

            <Stack.Screen name="favorite" component={FavoriteScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <BackNavigationHeader title={"Favoris"} />
                    ),
                    presentation: 'modal'
                }}
            />

            <Stack.Screen name="product-filter" component={FilterScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    headerShown: false,
                    presentation: 'fullScreenModal'
                }}
            />


            <Stack.Screen name="product-swipe" component={CategoryScreenTwo}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    presentation: 'fullScreenModal'
                }}
            />

            <Stack.Screen name="product-info" component={ProductDescriptionScreen}
                options={{
                    headerTransparent: true,
                    header: () => (
                        <></>
                    ),
                    presentation: 'modal'
                }}
            />


        </Stack.Navigator>
    );
}

export default StackNavigation;