import { Request, Response } from 'express';
import { Op, Order, ModelStatic, Model } from 'sequelize';
import { Game, MerchItem } from '../../src/models/index';
import { ProductInterface } from '../interface/ProductInterface';
import { get } from 'https';

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

export const getAllProducts = async (
    req: Request<{}, {}, {}, FilterQueryParams>,
    res: Response
) => {
    try {
		const [games, merch] = await Promise.all([
			Game.findAll(),
			MerchItem.findAll()
       	]);

		const allProducts = [...games, ...merch];
		
        return res.status(200).json({
            success: true,
            message: 'Products successfully fetched!',
            data: allProducts,
        });
    } catch (error) {
        console.error(`Error in fetching the products.`, error);
        return res.status(500).json({
            success: false,
            message: `Failed to retrieve the products due to a server error.`,
        });
    }
};

// Currently working on this
export const searchProduct = async (req: Request, res: Response) => {
	const { q, minPrice, maxPrice } = req.query;
	const whereClause: Record<string, any> = {};
}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10; 
	try {
	
	} catch (error) {
		
	}
}

const getProductById = async (req: Request<{ type: string, id: string }>, res: Response) => {
    const { type, id } = req.params;
    const targetModel = getModel(type);

    if (!targetModel) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product type!',
        });
    }

    try {
        const product = await targetModel.findByPk(id);
        if (!product) {
            return res.status(404).json({
               success: false,
               	message: `${type.charAt(0) + type.slice(1)} with ID: ${id} was not found.`,
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Product succesfully fetched!',
            data: product,
        });
    } catch (error) {
        console.error('Error while fetching the product!', error);
        res.status(500).json({ message: 'Internal server error while fetching the product.' });
    }
};

export const addProduct = async (req: Request<{}, {}, ProductInterface, { type: string }>, res: Response) => {
    const { type } = req.query;
    const { title, description, price, source, image, is_available, is_featured } = req.body;

    const targetModel = getModel(type);

    if (!targetModel) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product type!',
        });
    }

    try {
        // Note: We assert as any strips away the strict, static shape requirements of the specific model. (I'm implementing one that adjusts dynamically.)
        const product = await targetModel.create(req.body as any);

        return res.status(201).json({
            message: `${type} was added successfully!`,
            data: product
        });
    } catch (error) {
        console.error('Error in adding the game!', error);
        return res.status(500).json({ message: 'Internal server error while adding.' });
    }
}

export const deleteProduct = async (req: Request<{type: string, id: string}>, res: Response) => {
	const { type, id } = req.params;
	const targetModel = getModel(type);
	
	if (!targetModel) { 
	 	return res.status(400).json({
            success: false,
            message: 'Invalid product type!',
        });
	}
	try {
		const product = await targetModel.findByPk(id);

		if (!product) { 
			return res.status(404).json({
				success: false,
				message: `${type.charAt(0) + type.slice(1)} with ID: ${id} was not found.`,
			});
		}
		await product.destroy();
		
	    return res.status(200).json({
	      success: true,
	      message: `${type.charAt(0).toUpperCase() + type.slice(1)} product deleted successfully!`,
	    });
	} catch (error) {
	    console.error('Error in adding the game!', error);
	    return res.status(500).json({ message: 'Internal server error while deleting.' });
	}
}

export const editProduct = async (req: Request<{ type: string, id: string}>, res: Response) => {
	const { type, id } = req.params;
	const targetModel = getModel(type);

	if (!targetModel) { 
	 	return res.status(400).json({
            success: false,
            message: 'Invalid product type!',
        });
	}

	const product = await targetModel.findByPk(id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: `${type.charAt(0)} + ${type.slice(1)} with ID: ${id} was not found.}`
		});
	}
	try {
		const updatedProduct = product.update(req.body as any);

		return res.status(200).json({
	      success: true,
	      message: `${type.charAt(0).toUpperCase()}${type.slice(1)} updated successfully!`,
	      data: updatedProduct,
    	});
	} catch (error) {
		
	}
}
