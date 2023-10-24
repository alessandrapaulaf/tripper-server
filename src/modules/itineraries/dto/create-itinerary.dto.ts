import {
  IsArray,
  IsDate,
  IsString,
  MinDate,
  MinLength,
  ValidateNested,
} from 'class-validator';

class CreateDestinationDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsDate()
  @MinDate(new Date())
  arriveDate: Date;

  @IsDate()
  @MinDate(new Date())
  departureDate: Date;

  @IsArray()
  attractions: string[];
}

export class CreateItineraryDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsDate()
  @MinDate(new Date())
  startDate: Date;

  @IsDate()
  @MinDate(new Date())
  endDate: Date;

  @IsArray()
  @ValidateNested()
  destinations: CreateDestinationDto[];
}
