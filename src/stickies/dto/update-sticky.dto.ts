import { PartialType } from '@nestjs/swagger';
import { CreateStickyDto } from './create-sticky.dto';

export class UpdateStickyDto extends PartialType(CreateStickyDto) {}
