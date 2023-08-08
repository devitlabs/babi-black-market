import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Image, ScrollView, Text as RNText, View, TextInput, Pressable, Platform } from 'react-native';

import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/core/components/base/Button';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from '@apollo/client';
import { PASSWORD_RESET_MUTATION, REGISTER_USER_MUTATION } from '@/core/graphql/Auth.gql';
import _ from "lodash"





const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledTextInput = styled(TextInput)
const StyledPressable = styled(Pressable)


const schema = yup.object({
  email: yup.string().required().email(),
}).required();



export default function ForgotPassword() {
  const [message, setmessage] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [mutateFunction, { data, loading, error }] = useMutation(PASSWORD_RESET_MUTATION);


  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {

    mutateFunction({
      variables: {
        username: data.email,
      }
    }).then((response) => {
      Toast.show({
        type: 'success',
        text1: 'Mail envoyé',
        text2: 'Un mail de réinitialisation de mot de passe vous a été envoyé',
        position: "bottom"
      });
      navigation.goBack();
    })
      .catch((error) => {
      })

  };








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
        className="justify-between flex flex-col"
      >

        <StyledView>
          <StyledView className='py-4 px-4'>
            <StyledPressable
              onPress={() => navigation.goBack()}
            >
              <AntDesign name='close' color={"black"} size={25} />
            </StyledPressable>
            <Text className='text-2xl font-bold mt-6 px-4'>Mot de passe oublié</Text>

            <Text className='text-sm mt-4 px-4'>Saisissez votre adresse électronique et nous vous enverrons un lien pour réinitialiser votre mot de passe.</Text>
          </StyledView>

          <StyledView
            className={`px-6 mt-10 justify-between flex flex-col pb-6 `}>

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
                      placeholderTextColor={"gray"} placeholder='Email' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="email"
                />
                {errors.email && <Text className='text-red-400 text-[13px] ml-2'>Entrez un mail valide.</Text>}

              </StyledView>
              {error && <Text className='text-red-400 text-[13px] ml-2'>{_.deburr(error?.message)}</Text>}

              <StyledView className='mt-20'>
                <Button
                  isLoading={loading}
                  onPress={handleSubmit(onSubmit)}
                  text='ENVOYER' />
              </StyledView>
            </StyledView>



          </StyledView>
        </StyledView>





      </StyledView>

    </>
  );
}




