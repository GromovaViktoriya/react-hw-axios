import {createContext} from "react";

export const LoadingContext = createContext({
    isLoading: true,
    setIsloading: ()=>{}
});