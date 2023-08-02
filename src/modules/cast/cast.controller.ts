import { Cast } from './../../entity/cast.entity';
import { CastService } from './cast.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

@Controller('cast')
export class CastController {
  constructor(private castService: CastService) {}

  @Get('trivia')
  async findWithTrivia(): Promise<Cast[]> {
    return this.castService.findWithTrivia();
  }

  @Get()
  async findAll(): Promise<Cast[]> {
    return this.castService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: bigint): Promise<Cast | undefined> {
    const castFound = await this.castService.findOne(id);
    if (castFound) {
      return this.castService.findOne(id);
    }
    throw new NotFoundException('Cast does not exist');
  }

  @Get('language/:id')
  async findCastWithLang(
    @Param('id') id: bigint,
  ): Promise<string[] | undefined> {
    const castFound = await this.castService.findOne(id);
    if (castFound) {
      return this.castService.findOneWithLang(id);
    }
    throw new NotFoundException('Cast does not exist');
  }

  @Post()
  async create(@Body() cast: Cast): Promise<Cast> {
    return this.castService.create(cast);
  }

  @Delete(':id')
  async delete(@Param('id') id: bigint): Promise<void> {
    const castFound = await this.castService.findOne(id);
    if (castFound) {
      return this.castService.delete(id);
    }
    throw new NotFoundException('Cast does not exist');
  }

  @Put(':id')
  async update(
    @Param('id') id: bigint,
    @Body() cast: Cast,
  ): Promise<Cast | null> {
    const castFound = await this.castService.findOne(id);
    if (castFound) {
      return this.castService.update(id, cast);
    }
    throw new NotFoundException('Cast does not exist');
  }
}
