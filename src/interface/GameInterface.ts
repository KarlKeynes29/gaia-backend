export interface GameInterface {
    id: string,
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
