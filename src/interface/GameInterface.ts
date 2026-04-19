import { UUID } from "node:crypto";

export interface GameInterface {
    title: string;
    description: string;
    price: number;
    is_available: boolean;
    is_featured: boolean;
}

export interface GameResponseInterface {
    message: string,
    title: string,
    price: number
}

export interface editGameInterface {
    id: UUID,
    title?: string | null;
    description?: string | null;
    price?: number | null;
    is_available?: boolean;
    is_featured?: boolean;
}