import {
  IsString,
  IsUrl,
  IsInt,
  Min,
  Max,
  Length,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateMemDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsUrl({ require_protocol: true })
  @IsString()
  @Matches(/^https?:\/\/.*\.jpg$/, {
    message: 'Image must be a valid JPG URL',
  })
  image: string;

  @IsOptional()
  @IsString()
  @Length(5, 200)
  desc?: string;
  @IsInt()
  @Min(0)
  @Max(99)
  likes: number;
}
