import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Image, ScrollView, Text as RNText, View, TextInput, Pressable, Platform } from 'react-native';

import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/core/components/base/Button';
import { useNavigation } from '@react-navigation/native';
import { LoginEndpoint } from '@/core/endpoints/Auth';
import Toast from 'react-native-toast-message';
import { SaveKeyPair } from '@/core/utils/ExpoStore';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '@/core/graphql/Auth.gql';
import { useAuthStore } from '@/core/store/AuthStore';





const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledPressable = styled(Pressable)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledTextInput = styled(TextInput)



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);


  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN_USER_MUTATION,{
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)

    }
  });

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();


  const LoginUser = async () => {
    if (email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Veuillez remplir tous les champs',
        position: "bottom"
      });
      return;
    }
    try {
      const data = await mutateFunction({
        variables: {
          username:email,
          password
        }
      })
     
      SaveKeyPair('user-token', JSON.stringify(data.data.login));
      SaveKeyPair('user-username', email);
      SaveKeyPair('user-password', password);
      setUser(data.data.login);
      setIsAuth(true);
      // navigation.navigate('Home');
    }
    catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Mot de passe ou email incorrect',
        text2: 'Veuillez vérifier vos informations',
        position: "bottom"
      });
    }
  }

  return (
    <>
      <StyledView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? insets.top : 0,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,

        }}
        className={`justify-between flex flex-col mt-[${insets.top.toString()}px]`}
      >

        <StyledView>
          <StyledView className='py-4 px-4'>


            <Text className='text-2xl font-bold mt-14 px-4'>Connexion</Text>
          </StyledView>

          <StyledView
            className={`px-6 mt-10 justify-between flex flex-col pb-6 `}>

            <StyledView className='grow'>
              <StyledView className='my-4'>
                <StyledTextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Email ou nom d'utilisateur" placeholderTextColor={"gray"} className='border-b border-gray-200 px-2 pb-2' />

              </StyledView>
              <StyledView className='my-4'>
                <StyledTextInput
                  value={password}
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                  placeholder='Mot de passe' placeholderTextColor={"gray"} className='border-b border-gray-200 px-2 pb-2' />
              </StyledView>
              <StyledView className='mt-20'>
                <Button
                  isLoading={loading}
                  disabled={loading}
                  onPress={LoginUser}
                  text={
                    loading ? "Connexion..." : "Connexion"
                  } />
              </StyledView>

              <StyledPressable
                onPress={() => navigation.navigate('forgot-password')}
              >
                <Text className='text-center mt-5'>Vous avez oublié votre mot de passe ?</Text>
              </StyledPressable>




            </StyledView>



          </StyledView>
        </StyledView>


        <StyledView className='grow  flex flex-1 justify-end p-6 text-center'>

          <StyledPressable
            onPress={() => navigation.navigate('signup')}
          >
            <Text className='text-center'>Vous n'avez pas de compte ? <Text className='font-bold'>Inscription</Text></Text>
          </StyledPressable>
        </StyledView>


      </StyledView>

    </>
  );
}




