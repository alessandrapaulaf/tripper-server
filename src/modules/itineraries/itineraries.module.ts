import { Module } from '@nestjs/common';
import { ItinerariesController } from './controllers/itineraries.controller';
import { ItinerariesService } from './services/itineraries.service';

@Module({
  providers: [ItinerariesService],
  controllers: [ItinerariesController],
})
export class ItinerariesModule {}
