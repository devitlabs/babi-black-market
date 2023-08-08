import { styled } from 'nativewind';
import { Text as RText, TouchableHighlight, View, Pressable, ActivityIndicator } from 'react-native';



const StyledView = styled(View)
const StyledText = styled(Pressable)
const Text = styled(RText)


export type ButtonProps = {
    onPress?: () => void;
    text: string;
    variant?: "default" | "outline-blue" | "white";
    size?: "full" | "max";
    ContainerclassName?: string;
    TextclassName?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

const variantStyles = {
    default: "bg-black text-white",
    white: "bg-white text-black",
    "outline-blue": "text-black border border-blue-600",
    full: "w-full",
    max: "w-max !px-4",
};


export const Button = ({ onPress, ContainerclassName, TextclassName, text, variant, size, isLoading, disabled }: ButtonProps) => {
    return (

        <StyledText
            disabled={disabled || isLoading}
            className={`
            px-10 py-3 flex flex-row items-center justify-center disabled:opacity-50

            ${ContainerclassName}
  
      ${variantStyles[variant || "default"]}
      ${variantStyles[size || "full"]}
    `}
            onPress={onPress}
        >
            {isLoading && <ActivityIndicator style={{
                marginRight: 10
            }} size="small" color="#fff" />}
            <Text className={`
            text-md font-bold text-center 
            ${TextclassName}

            ${variant === "outline-blue" ? "text-blue-600" : "text-white"}
            ${variant === "white" ? "text-black" : ""}
            `}>{text}</Text>
        </StyledText>

    );
}

