import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {authMe, login, register} from "../api/authApi.js";
import {getCookie} from "../../utils/getCookie.js";

export const authKeys = {
    me: ['auth', 'me'],
};

export const useAuthMe = () => {
    const token = getCookie("access_token");

    const query = useQuery({
        queryKey: authKeys.me,
        queryFn: authMe,
        enabled: !!token,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return {
        ...query,
        isLoggedIn: !!token && !!query.data && !query.isError,
    };
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            document.cookie = `access_token=${data.access_token}; path=/`;
            queryClient.invalidateQueries({queryKey: authKeys.me});
        }
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            document.cookie = `access_token=${data.access_token}; path=/`;
            queryClient.invalidateQueries({queryKey: authKeys.me});
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return () => {
        document.cookie = "access_token=; Max-Age=0; path=/;"
        queryClient.setQueryData(authKeys.me, null)
    }
}