import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ItineraryDocument = HydratedDocument<Itinerary>;

@Schema()
export class Itinerary {
  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ default: null })
  endDate?: Date;

  @Prop()
  destination: [];
}

export const ItinerarySchema = SchemaFactory.createForClass(Itinerary);
