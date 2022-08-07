import { modelOptions, prop, Severity } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
export abstract class BaseModel {
  @prop({ default: Date.now(), required: true })
  createdAt?: Date;

  @prop({ default: Date.now(), required: true })
  updatedAt?: Date;

  id?: string;
}
export const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
};
