import * as SecureStore from 'expo-secure-store';


export async function SaveKeyPair(key:string, value:string) {
    await SecureStore.setItemAsync(key, value);
}


export async function DeleteKeyPair(key:string) {
    await SecureStore.deleteItemAsync(key);
}


export async function GetValueForKey(key:string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return null;
    }
}

