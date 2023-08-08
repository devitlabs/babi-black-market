import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Image, ScrollView, Text as RNText, View, TextInput, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';

import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/core/components/base/Button';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from '@/core/graphql/Auth.gql';
import _ from "lodash"
import { SaveKeyPair } from '@/core/utils/ExpoStore';
import { useAuthStore } from '@/core/store/AuthStore';


const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledPressable = styled(Pressable)
const StyledTextInput = styled(TextInput)


const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  addr: yup.string(),
}).required();




export default function SingUp() {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  const [isSelected, setIsSelected] = useState("");
  const [mutateFunction, { data, loading, error }] = useMutation(REGISTER_USER_MUTATION);


  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: any) => {

    mutateFunction({
      variables: {
        email: data.email,
        username: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        password: data.password,
        displayName: data.firstname + " " + data.lastname,
      }
    }).then((response) => {
      console.log(response)

      // "registerCustomer"
      SaveKeyPair('user-token', JSON.stringify(response.data.registerCustomer));
      SaveKeyPair('user-username', data.email);
      SaveKeyPair('user-password', data.password);


      setUser(response.data.registerCustomer);
      setIsAuth(true);

      Toast.show({
        type: 'success',
        text1: 'Inscription réussie',
        text2: 'Vous pouvez maintenant vous connecter',
        position: "bottom"
      });
      navigation.goBack()
    })

      .catch((error) => {
        Alert.alert("Erreur", "Impossible de créer votre compte")
      })

  };









  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StyledView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? insets.top : 0,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,

        }}
        className="justify-between flex flex-col"
      >

        <StyledView>
          <StyledView className='py-4 px-4'>
            <StyledPressable
              onPress={() => navigation.goBack()}
            >
              <AntDesign name='close' color={"black"} size={25} />
            </StyledPressable>
            <Text className='text-2xl font-bold mt-6 px-4'>Détails personnels</Text>
          </StyledView>

          <StyledView
            className={`px-6 mt-4 justify-between flex flex-col pb-6 `}>

            <StyledView className='grow'>
              <StyledView className='my-4'>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"gray"} placeholder='Nom' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="firstname"
                />
                {errors.firstname && <Text className='text-red-400 text-[13px] ml-2'>Vous Devez rajouter votre Nom.</Text>}


              </StyledView>
              <StyledView className='my-4'>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"gray"} placeholder="Prénom(s)" className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="lastname"
                />
                {errors.lastname && <Text className='text-red-400 text-[13px] ml-2'>Vous Devez rajouter votre prénom.</Text>}


              </StyledView>


              <StyledView className='my-4'>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"gray"} placeholder='Email' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="email"
                />
                {errors.email && <Text className='text-red-400 text-[13px] ml-2'>Entrez un mail valide.</Text>}


              </StyledView>
              <StyledView className='my-4'>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry
                      placeholderTextColor={"gray"} placeholder='Mot de passe' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="password"
                />

                {errors.password && <Text className='text-red-400 text-[13px] ml-2'>Le mot de passe est obligatoire (min 7 chars).</Text>}

              </StyledView>
              <StyledView className='my-4'>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}

                      placeholderTextColor={"gray"} placeholder='adresse' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="addr"
                />
                {errors.email && <Text className='text-red-400 text-[13px] ml-2'>Entrez votre Addresse</Text>}


              </StyledView>



              {error && <Text className='text-red-400 text-[13px] ml-2'>{_.deburr(error?.message)}</Text>}

              {/* <StyledView className='my-4'>
                <StyledTextInput placeholderTextColor={"gray"} placeholder='Adresse' className='border-b border-gray-200 px-2 pb-2' />
              </StyledView> */}

              <StyledView className='mt-20'>
                <Button
                  isLoading={loading}
                  onPress={handleSubmit(onSubmit)}
                  text='Inscription' />
              </StyledView>
            </StyledView>



          </StyledView>
        </StyledView>


        <StyledView className='grow  flex flex-1 justify-end p-6 text-center'>
          <StyledPressable
            onPress={() => navigation.navigate('login')}
          >
            <Text className='text-center'>Vous avez déjà un compte?<Text className='font-bold mx-2'>Connexion</Text></Text>
          </StyledPressable>

        </StyledView>




      </StyledView>

    </KeyboardAvoidingView>
  );
}




