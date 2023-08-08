import { styled } from "nativewind";
import { View, Text, Image, Pressable, Dimensions } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/core/store/AuthStore";
import { DeleteKeyPair, GetValueForKey } from "@/core/utils/ExpoStore";
import { useEffect } from "react";





const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledPressable = styled(Pressable)
const StyledText = styled(Text)


const DrawerContent = [
    {
        title: "Acceuil",
        icon: "home",
        screen: "home"


    },
    {
        title: "Categories",
        icon: "inbox",
        screen: "category"
    },
    // {
    //     title: "Collections",
    //     icon: "inbox",
    //     screen: "collection"
    // },
    {
        title: "Mes Adresses",
        icon: "home",
        screen: "addresse"

    },
    {
        title: "Mes Favoris",
        icon: "hearto",
        screen: "favorite"
    },
    {
        title: "Mes Commandes",
        icon: "hearto",
        screen: "orders"
    },
    {
        title: "Déconnexion",
        icon: "logout",
        screen: "favorite"
    },
]

const CustomDrawerContent = (props: any) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);



    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const isAuth = useAuthStore((state) => state.isAuth);



    const LoadUser = async () => {
        const data = await GetValueForKey('user-token')

        try {
            let parseData = JSON.parse(data)
            if (parseData) {
                console.log(data?.parseData, "data")
                setUser(parseData)
            }

        } catch (error) {

        }
    }


    useEffect(() => {
        LoadUser()
    }, [])



    return (
        <StyledView
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,

            }}>
            <StyledPressable
                onPress={() => navigation?.goBack()}
                className="flex items-end   mb-2 w-ful h-10 px-5">
                {/* <AntDesign color={"black"} size={27} name="close" /> */}
            </StyledPressable>


            <StyledView className="flex items-center flex-row mb-16 gap-2 px-4">
                <StyledImage
                    source={{ uri: `https://ui-avatars.com/api/?name=${user?.customer?.firstName + user?.customer?.lastName}&background=random` }}
                    className="rounded-full h-14 w-14 bg-gray-200"></StyledImage>
                <StyledView>
                    <StyledText className="font-bold text-lg" >{
                        user?.customer?.firstName + " " + user?.customer?.lastName
                    }</StyledText>
                    <StyledText

                        className="text-gray-400 text-xs">
                        {
                            user?.customer?.email
                        }
                    </StyledText>
                </StyledView>

            </StyledView>


            <StyledView className="flex items-center  w-full  flex-1 android:pl-10 ios:pl-4">
                <StyledView style={{ height: Dimensions.get("screen").height / 2, width: Dimensions.get("screen").width / 1.5 }}>
                    <FlashList
                        data={DrawerContent}
                        renderItem={({ item }) => <Item title={item.title} icon={item.icon} screen={item.screen} />}
                        estimatedItemSize={300}
                        numColumns={1}
                        ItemSeparatorComponent={() => <StyledView className="h-8" />}
                    />
                </StyledView>
            </StyledView>
        </StyledView>
    );
}

const Item = ({ title, icon, screen }: any) => {
    const navigation = useNavigation();
    const setUser = useAuthStore((state) => state.setUser);
    const setIsAuth = useAuthStore((state) => state.setIsAuth);


    const handleLogout = () => {
        setUser(null);
        setIsAuth(false);
        DeleteKeyPair("user-token")
    }

    return (
        <StyledPressable
            onPress={() => icon === "logout" ? handleLogout() : navigation.navigate(screen)}
            className={
                `
                flex items-center flex-row gap-2
                
                `
            }>
            <AntDesign color={icon === "logout" ? "red" : "gray"} size={25} name={icon} />
            <StyledText className={
                `
                text-xl
                ${icon === "logout" ? "text-red-600" : "text-gray-500"}
                `
            }>
                {title}
            </StyledText>
        </StyledPressable>
    )
}

export default CustomDrawerContent;