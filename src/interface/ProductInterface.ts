export interface ProductInterface {
    title?: string;
    description?: string;
    price?: number;
    source?: string;
    image?: string;
    is_available?: boolean;
    is_featured?: boolean;
}

export interface filteredSearchInterface {
    searchValue?: string;
    genre?: string;
    is_featured?: string;
    is_available?: string;
    priceFrom?: string;
    priceTo?: string;
    page?: string;
    limit?: string
    sortBy?: string;
}

export interface ProductResponseInterface {
    message: string;
    title?: string;
    price?: number;
}
