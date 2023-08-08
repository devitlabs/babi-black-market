import React, { useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import DrawerNavigation from '@/core/navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopShoppingCartSheet from './core/components/base/Cart/TopShoppingCartSheet';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthStackNavigation from './core/navigation/AuthStackNavigation';
import { GetValueForKey, SaveKeyPair } from './core/utils/ExpoStore';
import AppSplashScreen from './core/pages/AppSplashScreen';
import client from "@/core/utils/AppoloClient";
import { useFavoriteStore } from './core/store/FavoriteStore';
import { useAuthStore } from '@/core/store/AuthStore';





export default function App() {


  const [isLoading, setIsLoading] = React.useState(true);
  const setFavorite = useFavoriteStore((state) => state.setFavorite)
  const favoritesStore = useFavoriteStore((state) => state.favorites)

  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const isAuth = useAuthStore((state) => state.isAuth);


  const [fontsLoaded] = useFonts({
    'Avenir-Black': require('@/assets/fonts/AvenirLTStd-Black.otf'),
    'Avenir-Book': require('@/assets/fonts/AvenirLTStd-Book.otf'),
    'Avenir-Roman': require('@/assets/fonts/AvenirLTStd-Roman.otf'),
  });


  const ExistInFavorites = (id) => {
    return favoritesStore.find((item) => item?.product?.id === id)
  }


  const RestoreFavorite = async () => {
    const favorites = await GetValueForKey('favorites') || '[]'

    try {
      const parsedFavorites = JSON.parse(favorites)
      if (parsedFavorites.length > 0) {
        parsedFavorites.forEach((item: any) => {

          if (!ExistInFavorites(item?.product?.id)) {
            if (Object.keys(item).length > 0) {
              setFavorite(item)
            }

          }
        })
      }
    }
    catch (e) {
      console.log(e, "error parse")
    }
  }
  const onLayoutRootView = useCallback(async () => {
    setIsLoading(true)
    let uniqId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const data = await GetValueForKey('user-token')
    await SaveKeyPair('uniqId', uniqId)


    RestoreFavorite()




    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
    if (data) {

      try {
        let parseData = JSON.parse(data)
        if (parseData) {
          setUser(parseData)
        }

      } catch (error) {

      }

      setTimeout(() => {
        setIsAuth(true)
        setIsLoading(false)

      }, 1000)


    } else {
      setTimeout(() => {
        setIsAuth(false)
        setIsLoading(false)

      }, 1000)
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }








  return (

    <ApolloProvider client={client}>
      <SafeAreaProvider onLayout={onLayoutRootView}>



        <NavigationContainer>
          <TopShoppingCartSheet />

          {
            isLoading ? <AppSplashScreen /> : <>
              {
                isAuth ? <DrawerNavigation /> : <AuthStackNavigation />
              }


              {/* <DrawerNavigation /> */}
              <StatusBar backgroundColor="auto"
                translucent={true}
              />
            </>
          }

        </NavigationContainer>

      </SafeAreaProvider>
      <Toast />
    </ApolloProvider>
  );
}

