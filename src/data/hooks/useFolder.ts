import { folderService } from "@/services/folderService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateQuestFolderRequest } from "../models/folderModel";

export function useCreateFolder() {
    return useMutation({
        mutationFn: (data: CreateQuestFolderRequest) => folderService.create(data),
        mutationKey: ["create_folder"],
    })
}


export function useGetAllFolders() {
    return useQuery({
        queryFn: () => folderService.getAll(),
        queryKey: ["get_all_folders"],
    })
}