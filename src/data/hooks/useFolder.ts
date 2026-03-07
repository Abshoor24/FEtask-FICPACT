import { folderService } from "@/services/folderService";
import { useMutation } from "@tanstack/react-query";
import { CreateQuestFolderRequest } from "../models/folderModel";

export function useCreateFolder() {
    return useMutation({
        mutationFn: (data: CreateQuestFolderRequest) => folderService.create(data),
        mutationKey: ["create_folder"],
    })
}
