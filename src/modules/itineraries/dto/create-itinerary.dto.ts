import {
  IsArray,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinDate,
  MinLength,
  ValidateNested,
} from 'class-validator';

class CreateCoordinatesDto {
  @IsNumber()
  latitude: string;

  @IsNumber()
  longitude: string;
}

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

  @IsObject()
  @ValidateNested()
  coordinates: CreateCoordinatesDto;

  @IsArray()
  attractions: string[];
}

export class CreateItineraryDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  startDate: string;

  @IsString()
  @MinLength(1)
  endDate: string;

  @IsArray()
  @ValidateNested()
  @IsOptional()
  destinations?: CreateDestinationDto[];
}
