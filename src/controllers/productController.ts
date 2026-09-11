import { Request, Response } from 'express';
import { Op, Order, ModelStatic, Model } from 'sequelize';
import { Game, MerchItem } from '../../src/models/index';

const getModel = (type: string): ModelStatic<Model> | null => {
    const properType = type.toLowerCase();
    if (properType === 'game') return Game as unknown as ModelStatic<Model>;
    if (properType === 'merch') return MerchItem as unknown as ModelStatic<Model>;
    return null;
};

interface FilterQueryParams {
    searchValue?: string;
    genre?: string;
    source?: string;
    is_featured?: string;
    is_available?: string;
    priceFrom?: string;
    priceTo?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
}

export const getAllProducts = async (req: Request<{type: string}, {}, {}, FilterQueryParams>, res: Response) => {

}
const TargetModel = getModel('game');
type Blob<T> = T extends Promise(...args: any[]) => infer R ? R : never;
