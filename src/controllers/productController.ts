import { Request, Response } from 'express';
import { Op, Order, ModelStatic, Model } from 'sequelize';
import { Game, MerchItem } from '../../src/models/index';

const getModel = (type: string): ModelStatic<Model> | null => {
	const normalizedType = type.toLowerCase();
	if (normalizedType === 'game') return Game as unknown as ModelStatic<Model>;
	
}