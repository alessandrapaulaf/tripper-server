import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateItineraryDto } from '../dto/create-itinerary.dto';
import { ItinerariesService } from '../services/itineraries.service';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private itinerariesService: ItinerariesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  create(@Body(new ValidationPipe()) createItineraryDto: CreateItineraryDto) {
    return this.itinerariesService.create(createItineraryDto);
  }
}
