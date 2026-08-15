import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, createEngineer, createService, deleteCategory, getAllCategory, getAllServices, getCategoryById, getEngineers, updateCategory, type CategoryList, type createCategoryData, type CreateService, type EngineerData, type EngineerListResponse, type ServiceResponse } from "../services/adminservice"


export const useCreateEngineer = () => {
    const quryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EngineerData) => createEngineer(data),

        onSuccess: () => {
            quryClient.invalidateQueries({ queryKey: ["engineers"] });
           
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


// services
export const useGetAllServices = () => {
    return useQuery<ServiceResponse[]>({
        queryKey: ["services"],
        queryFn: getAllServices,
        retry: false,
    })
}

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateService) => createService(data),
        onSuccess:()=> queryClient.invalidateQueries({ queryKey: ["services"] })
    })
}