import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, createEngineer, deleteCategory, getAllCategory, getCategoryById, getEngineers, updateCategory, type CategoryList, type createCategoryData, type EngineerData, type EngineerListResponse } from "../services/adminservice"


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

export const useGetCategoryById = (id: number) => {
    return useQuery<CategoryList>({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id,
    })
}

export const useUpdateCategory = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: createCategoryData) => updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.invalidateQueries({ queryKey: ["category", id] })
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
           
        }
    })
}