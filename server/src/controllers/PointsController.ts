import knex from '../database/connection'
import { Request, Response } from 'express';

class PointsController {

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('points_item', 'points.id', '=', 'points_item.point_id')
      .whereIn('points_item.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return res.json(points);
  }


  async show(req: Request, res: Response) {
    const { id } = req.params; //desestruturação porque o id se repete dos 2 lados

    const point = await knex('points').select('*').where('id', id).first();

    if (!point) {
      return res.status(400).json({ error: 'Point not Exists!' });
    }

    const items = await knex('items')
      .join('points_item', 'items.id', '=', 'points_item.item_id')
      .where('points_item.point_id', id)
      .select('items.title');

    return res.json({ point, items });
  }

  async create(req: Request, res: Response) {

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body; //pegando os dados do body da request

    const point = {
      image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const trx = await knex.transaction(); //se der problema em algumas das querys não execute as outras

    const insertedId = await trx('points').insert(point); //inserindo o novo point e retornando o id do point inserido
    const point_id = insertedId[0];

    const pointItems = items.map((item_id: number) => { //fazendo um map dos items cadastrados e retornando os point
      return {
        item_id,
        point_id: point_id
      };
    });

    await trx('points_item').insert(pointItems); //inserindo os ids do point e items na tabela pivo

    trx.commit(); //se deu tudo certo faz a transação e salva no BD

    return res.status(201).json({
      id: point_id,
      ...point //spred operator, retorna todos os dados de um objeto em outro
    });

  }
}

export default PointsController;