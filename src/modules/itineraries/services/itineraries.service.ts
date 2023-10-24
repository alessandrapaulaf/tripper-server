import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItineraryDto } from '../dto/create-itinerary.dto';
import { Itinerary } from '../schemas/itinerary.schema';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectModel(Itinerary.name) private itineraryModel: Model<Itinerary>,
  ) {}

  create(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
    const createdItinerary = new this.itineraryModel(createItineraryDto);
    return createdItinerary.save();
  }
}
