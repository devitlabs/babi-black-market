import React from 'react'
import { ScrollView, StyleSheet, Text, StatusBar, SafeAreaView, Pressable } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated'

import { getFormatedDate } from '@/core/utils/getDate'
import { posts } from '@/core/data/posts'
import AppBlock from '@/core/components/swipeGesture/AppBlock'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)
const CollectionScreen = () => {
  const isShowingDetails = useSharedValue(false)

  const animatedProps = useAnimatedProps(() => {
    return { scrollEnabled: !isShowingDetails.value }
  })

  const onShowingStateChanged = () => {
    'worklet'
    isShowingDetails.value = !isShowingDetails.value
  }


  const navigation = useNavigation()
  const insets = useSafeAreaInsets();



  return (

    <>
      <AnimatedScrollView
        style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }]}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}

        animatedProps={animatedProps}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {/* <StatusBar hidden/>  */}
        {/* <Text style={styles.date}>{getFormatedDate()}</Text>
        <Text style={styles.title}>Collections</Text> */}

        <StyledPressable
          className='mb-10'
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='arrowleft' color={"black"} size={25} />

          <StyledText className='text-3xl font-bold mt-2'>Collections</StyledText>
        </StyledPressable>

        {posts.map((post, index) => (
          <AppBlock
            key={index}
            post={post}
            isShowingDetails={isShowingDetails}
            showingStateChanged={onShowingStateChanged}
          />
        ))}
      </AnimatedScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  date: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 3
  },
  title: {
    color: 'black',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10
  }
})

export default CollectionScreen