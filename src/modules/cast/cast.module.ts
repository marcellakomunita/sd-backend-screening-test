import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { Cast } from 'src/entity/cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  controllers: [CastController],
  providers: [CastService],
})
export class CastModule {}
