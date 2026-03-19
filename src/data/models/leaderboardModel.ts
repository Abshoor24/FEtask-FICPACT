export interface UserProfile {
    email: string;
    name: string;
    avatar: string;
}

export interface LeaderboardModel {
    id: string;
    profile: UserProfile;
    level: number;
    exp: number;
    rank: number;
}