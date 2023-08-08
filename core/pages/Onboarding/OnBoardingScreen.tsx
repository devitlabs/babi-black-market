
import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Platform
} from 'react-native';
const { width } = Dimensions.get('screen');
import { EvilIcons } from '@expo/vector-icons';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { Button } from '@/core/components/base/Button';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';



const StyledView = styled(View)
const StyledPressable = styled(Pressable)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledText = styled(Text)


// https://www.creative-flyers.com
const DATA = [
  {
    title: 'Afro vibes',
    location: 'Profiter de bon plan',
    date: 'Nov 17th, 2020',
    poster: require('@/assets/hugo1.jpg'),
  },
  {
    title: 'Jungle Party',
    location: 'Avec BabiBlack',
    date: 'Sept 3rd, 2020',
    poster: require('@/assets/hugo2.jpg'), },
  {
    title: 'Carte cadeaux',
    location: 'Pour vos proches',
    date: 'Oct 11th, 2020',
    poster: require('@/assets/hugo3.jpg'),},
  {
    title: 'COMPLÉTEZ LE LOOK',
    location: 'Chez BabiBlack',
    more: "Veste et manteaux incontournables",
    date: 'Aug 17th, 2020',
    poster: require('@/assets/hugo4.jpg'),},
  // {
  //   title: 'BBQ with friends',
  //   location: 'Prague, Czech Republic',
  //   date: 'Sept 11th, 2020',
  //   poster:
  //     'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  // },
  {
    title: 'Festival music',
    location: '',
    date: 'Apr 21th, 2021',
    poster: require('@/assets/creative.jpg'),
  },
  // {
  //   title: 'Beach House',
  //   location: 'Liboa, Portugal',
  //   date: 'Aug 12th, 2020',
  //   poster:
  //     'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  // },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = Platform.OS === "android" ? ITEM_WIDTH * 1.5 : ITEM_WIDTH * 1.6;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>

              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>

                  {item.location}
                </Text>
                {/* <Text style={[styles.date]}>{item.date}</Text> */}

              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};







export default function OnBoardingScreen() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  },[]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  const navigation = useNavigation();
  return (
    <>
      <FlingGestureHandler
        key='left'
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key='right'
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}
        >
          <SafeAreaView style={styles.container}>

            <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
            <FlatList
              data={data}
              keyExtractor={(hola, index) => hola.title}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                padding: SPACING * 2,
                marginTop: 50,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, { zIndex: data.length - index }];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });

                return (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                    <Image
                      source={item.poster }
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
                    />
                    <StyledText className='text-2xl font-bold text-white absolute max-w-[300px] bottom-20 left-4'>
                      {item?.more}
                    </StyledText>
                  </Animated.View>
                );
              }}
            />
          </SafeAreaView>
        </FlingGestureHandler>


      </FlingGestureHandler>
      <StyledView className="absolute bottom-10 flex items-center justify-between w-full flex-row px-10">

        <StyledView className='flex items-center justify-center gap-4 flex-row grow'>
          <StyledView style={{
            width: index === 1 ? 10 : 2,
            height: 2,
            backgroundColor: "#000"
          }} />
          <StyledView style={{
            width: index === 2 ? 10 : 2,

            height: 2,
            backgroundColor: "#000"
          }} />
          <StyledView style={{
            width: index === 3 ? 10 : 2,

            height: 2,
            backgroundColor: "#000"
          }} />
          <StyledView style={{
            width: index === 4 ? 10 : 2,

            height: 2,
            backgroundColor: "#000"
          }} />

          <StyledView style={{
            width: index === 5 ? 10 : 2,

            height: 2,
            backgroundColor: "#000"
          }} />
        </StyledView>


        <StyledPressable
          onPress={() => navigation.navigate('login')}
        >
          <StyledText className='font-bold text-lg underline'>
            Passer
          </StyledText>
        </StyledPressable>

      </StyledView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});
