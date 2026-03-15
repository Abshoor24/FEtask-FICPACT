export interface UserModel {
    id: string;
    email: string;
    currentExp: number;
    expToNextLevel: number;
    level: number;
    totalExp: number;
    isVerified: boolean;
    reflectionDays: number;
    nextReflection: string | null;
    lastReflection: string;
    createdAt: string;
    updatedAt: string;
}