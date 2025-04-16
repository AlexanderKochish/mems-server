import { PartialType } from '@nestjs/mapped-types';
import { CreateMemDto } from './create-mem.dto';

export class UpdateMemDto extends PartialType(CreateMemDto) {}
