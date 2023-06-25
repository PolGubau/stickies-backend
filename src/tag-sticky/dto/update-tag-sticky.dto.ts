import { PartialType } from '@nestjs/swagger';
import { CreateTagStickyDto } from './create-tag-sticky.dto';

export class UpdateTagStickyDto extends PartialType(CreateTagStickyDto) {}
