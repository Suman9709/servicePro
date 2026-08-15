import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, createEngineer, getAllCategory, getEngineers, type CategoryList, type createCategoryData, type EngineerData, type EngineerListResponse } from "../services/adminservice"


export const useCreateEngineer = () => {
    const quryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EngineerData) => createEngineer(data),

        onSuccess: () => {
            quryClient.invalidateQueries({ queryKey: ["engineers"] });
            queryKey: ["engineers"]
        }
    })
}

export const useGetEngineers = () => {
    return useQuery<EngineerListResponse[]>({
        queryKey: ["engineers"],
        queryFn: getEngineers,
        retry: false,
    })
}


export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: createCategoryData) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}

export const useGetCategories = () => {
    return useQuery<CategoryList[]>({
        queryKey: ["categories"],
        queryFn: getAllCategory,
        retry: false,
    })
}