import { UUID } from "node:crypto";

export interface GameInterface {
    id: UUID,
    title: string;
    description: string;
    price: number;
    is_available: boolean;
    is_featured: boolean;
}

export interface GameResponseInterface {
    message: string,
    title?: string,
    price?: number
}
