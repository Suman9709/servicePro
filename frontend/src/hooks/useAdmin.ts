import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createEngineer, getEngineers, type EngineerData, type EngineerListResponse } from "../services/adminservice"


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

export const useGetEngineers = ()=>{
    return useQuery<EngineerListResponse[]>({
        queryKey: ["engineers"],
        queryFn: getEngineers,
        retry: false,
    })
}