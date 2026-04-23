export interface GameInterface {
    title?: string;
    description?: string;
    price?: number;
    is_available?: boolean;
    is_featured?: boolean;
}

export interface GameResponseInterface {
    message: string;
    title?: string;
    price?: number;
}
