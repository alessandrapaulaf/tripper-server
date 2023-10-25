import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isAfter, isBefore, isValid } from 'date-fns';
import { Model } from 'mongoose';
import { CreateItineraryDto } from '../dto/create-itinerary.dto';
import { Itinerary } from '../schemas/itinerary.schema';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectModel(Itinerary.name) private itineraryModel: Model<Itinerary>,
  ) {}

  create(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
    const { name, startDate, endDate, destinations } = createItineraryDto;

    const formattedDate = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    if (!isValid(formattedDate.startDate) || !isValid(formattedDate.endDate)) {
      throw new HttpException(
        'Dates with incorrect format.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const destinationOutsideTimeBox = destinations.some((destination) => {
      const isBeforeTimebox =
        isBefore(destination.arriveDate, formattedDate.startDate) ||
        isBefore(destination.departureDate, formattedDate.endDate);

      const isAfterTimeBox =
        isAfter(destination.arriveDate, formattedDate.startDate) ||
        isAfter(destination.departureDate, formattedDate.endDate);

      return isBeforeTimebox || isAfterTimeBox;
    });

    if (destinationOutsideTimeBox) {
      throw new HttpException(
        'Destination Dates out of itinerary timebox.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdItinerary = new this.itineraryModel({
      ...formattedDate,
      name,
      destinations,
    });

    return createdItinerary.save();
  }
}
