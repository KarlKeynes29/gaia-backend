export interface GameInterface {
    title?: string;
    description?: string;
    price?: number;
    genre?: string;
    image?: string;
    is_available?: boolean;
    is_featured?: boolean;
}

export interface filterGameInterface {
    genre?: string;
    is_featured?: boolean;
    is_available?: boolean;
    price?: string;
}

export interface GameResponseInterface {
    message: string;
    title?: string;
    price?: number;
}
