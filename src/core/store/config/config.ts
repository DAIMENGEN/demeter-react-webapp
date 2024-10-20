import AsyncStorage from "@react-native-async-storage/async-storage";

export const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["userState"],
};

export const userPersistConfig = {
    key: "userState",
    storage: AsyncStorage,
};

