import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { MongoError } from 'mongodb';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { DBException } from 'shared/exceptions';
import { BaseModel } from 'shared/models/base.model';

type QueryList<T extends BaseModel> = Array<DocumentType<T>>;
type QueryItem<T extends BaseModel> = DocumentType<T>;

export type ModelType<T extends BaseModel> = ReturnModelType<
  AnyParamConstructor<T>
>;

export abstract class BaseRepository<T extends BaseModel> {
  protected model: ModelType<T>;

  protected constructor(model: ModelType<T>) {
    this.model = model;
  }

  static toObjectId(id: string): Types.ObjectId {
    try {
      return new Types.ObjectId(id);
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  protected static throwMongoError(err: MongoError): void {
    throw new DBException(err);
  }

  createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  async findAll(filter = {}, options = {}): Promise<QueryList<T>> {
    try {
      return this.model.find(filter, {}, options).exec();
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async findOne(filter = {}): Promise<QueryItem<T>> {
    try {
      return this.model.findOne(filter).exec();
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async findById(id: string, options = {}): Promise<QueryItem<T>> {
    try {
      return this.model
        .findById(BaseRepository.toObjectId(id), {}, options)
        .exec();
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async create(item: T): Promise<DocumentType<T>> {
    try {
      return await this.model.create(item);
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async deleteOne(filter = {}, options = {}): Promise<QueryItem<T>> {
    try {
      return this.model.findOneAndDelete(filter, options).exec();
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async deleteById(id: string, options = {}): Promise<QueryItem<T>> {
    try {
      return this.model
        .findByIdAndDelete(BaseRepository.toObjectId(id), options)
        .exec();
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async updateById(
    id: string,
    updateQuery: UpdateQuery<DocumentType<T>>,
    options = {},
  ): Promise<QueryItem<T>> {
    try {
      return await this.model.findByIdAndUpdate(
        BaseRepository.toObjectId(id),
        updateQuery,
        { new: true, ...options },
      );
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async count(filter: FilterQuery<DocumentType<T>>): Promise<number> {
    try {
      return await this.model.countDocuments(filter).exec();
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async exists(filter: FilterQuery<DocumentType<T>> = {}): Promise<boolean> {
    try {
      return !!(await this.model.exists(filter).exec());
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }
}
