
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { login, register, logout, updateProfile, profile, type RegisterData, type LoginData, type User } from "../services/authservice"


export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterData) => register(data),
    })

}

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: LoginData) => login(data),

        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: ["profile"]
            })
        }
    })
}


export const useProfile = () => {

    return useQuery<User>({
        queryKey: ["profile"],
        queryFn: () => profile(),
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<User>) => updateProfile(data),
        onSuccess: async (updatedUser) => {
           queryClient.setQueryData<User>(["profile"], updatedUser);
        }
    })

}

export const useLogout = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["profile"]
            })
        }

    })
}
