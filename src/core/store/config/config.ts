import AsyncStorage from "@react-native-async-storage/async-storage";

export const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["employeeState"],
};

export const employeePersistConfig = {
    key: "employeeState",
    storage: AsyncStorage,
};

