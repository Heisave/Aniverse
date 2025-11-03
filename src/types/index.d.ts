// This file contains TypeScript type definitions for the application, defining types for props and state used throughout the project.

export interface Anime {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    episodes: number;
    genres: string[];
}

export interface AnimeDetail extends Anime {
    synopsis: string;
    rating: number;
    status: string;
}

export interface SearchResults {
    results: Anime[];
    total: number;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export interface PlayerProps {
    episodeUrl: string;
    title: string;
}