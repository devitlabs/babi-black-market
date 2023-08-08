import { AntDesign } from '@expo/vector-icons';
import { Motion } from '@legendapp/motion';
import { FlashList } from '@shopify/flash-list';
import { styled } from 'nativewind';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';




const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledAnimatedPressable = styled(Motion.Pressable)
const StyledMotionText = styled(Motion.Text)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)



const ColorPicker = ({ hideText }) => {

    const [isSelected, setIsSelected] = useState("#F99404");
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Red', value: '#E6E5EB' },

        { label: 'Blue', value: '#F99404' },
        {
            label: 'Orange', value: '#307AFF',
        },
        {
            label: 'Yellow', value: '#DDB792',
        },
        {
            label: 'Purple', value: '#5855D6',
        }
    ]);


    return (
        <StyledView className='flex'>
            {!hideText && <StyledText className='text-sm '>Colors</StyledText>}

            <StyledView className='mt-4 flex flex-row' >
                {
                    items.map((item, index) => (
                        <ColorItem isSelected={isSelected} setIsSelected={setIsSelected} value={item.value} />
                    ))
                }
            </StyledView>


        </StyledView>
    );
}


const ColorItem = ({ value, isSelected, setIsSelected }: any) => {
    return (
      <StyledPressable
        style={{
          backgroundColor: value,
          width: 35,
          height: 35,
        }}
        className='rounded-full flex items-center justify-center mr-3'
        onPress={() => {
          setIsSelected(value)
        }}
      >
  
        {isSelected === value && <AntDesign name='check' color={"white"} size={15} />}
  
      </StyledPressable>
    )
  }
  
  
  
export default ColorPicker;