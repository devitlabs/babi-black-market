import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { KeyboardAvoidingView, Platform, Pressable, Text as RNText, TextInput, View } from 'react-native';

import { Button } from '@/core/components/base/Button';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { yupResolver } from '@hookform/resolvers/yup';
import _ from "lodash";
import * as yup from "yup";
import { useShippingAddrStore } from '../store/ShippingAddrStore';
import Toast from 'react-native-toast-message';
import { SaveKeyPair } from '../utils/ExpoStore';


const StyledView = styled(View)
const Text = styled(RNText)
const StyledPressable = styled(Pressable)
const StyledTextInput = styled(TextInput)


const schema = yup.object({
  email: yup.string().required().email(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  postcode: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().required(),

}).required();




export default function AddShipping() {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();


  const addShipping = useShippingAddrStore(state => state.setShippingAddr)
  const shippings = useShippingAddrStore(state => state.shippings)
  const [submitted, setSubmitted] = React.useState(false);

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: any) => {
    addShipping({
      id: Math.random().toString(36).substr(2, 9),
      ...data,
    })
    setSubmitted(true)

  };




  useEffect(() => {
    if(submitted){
      console.log(errors)
      SaveKeyPair("shipping", JSON.stringify(shippings))
      Toast.show({
        type: 'success',
        text1: 'Adresse ajoutée',
        text2: 'Votre adresse a été ajoutée avec succès',
        position: "bottom"
      });
      navigation.goBack()
    }
  }, [shippings])




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
            <Text className='text-2xl font-bold mt-6 px-4'>Ajouter une nouvelle adresse</Text>
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

                      placeholderTextColor={"gray"} placeholder='Ville / Commune de livraison' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="city"
                />
                {errors.email && <Text className='text-red-400 text-[13px] ml-2'>Vous devez rajouter une ville / commune pour la livraion</Text>}


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
                      placeholderTextColor={"gray"} placeholder='Code Postal' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="postcode"
                />

                {errors.postcode && <Text className='text-red-400 text-[13px] ml-2'>Entrez un code postal Valide.</Text>}

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
                      keyboardType='phone-pad'
                      placeholderTextColor={"gray"} placeholder='Numéro de téléphone' className='border-b border-gray-200 px-2 pb-2' />
                  )}
                  name="phone"
                />

                {errors.phone && <Text className='text-red-400 text-[13px] ml-2'>Entrez un numéro Valide.</Text>}

              </StyledView>

              {/* <StyledView className='my-4'>
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


              </StyledView> */}




              {/* <StyledView className='my-4'>
                <StyledTextInput placeholderTextColor={"gray"} placeholder='Adresse' className='border-b border-gray-200 px-2 pb-2' />
              </StyledView> */}

              <StyledView className='mt-20'>
                <Button

                  onPress={handleSubmit(onSubmit)}
                  text='Ajouter mon Adresse' />
              </StyledView>
            </StyledView>



          </StyledView>
        </StyledView>






      </StyledView>

    </KeyboardAvoidingView>
  );
}




