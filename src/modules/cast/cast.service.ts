import { Injectable } from '@nestjs/common';
import { Cast } from './../../entity/cast.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isLeapYear } from '../../helpers/isLeap';
import { getHoroscope } from '../../helpers/getHoroscope';

@Injectable()
export class CastService {
  constructor(
    @InjectRepository(Cast)
    private castRepository: Repository<Cast>,
  ) {}

  async findAll(): Promise<Cast[]> {
    return this.castRepository.find();
  }

  async findOne(id: bigint): Promise<Cast | undefined> {
    return this.castRepository.findOne({ where: { id } });
  }

  async findOneWithLang(id: bigint): Promise<string[] | undefined> {
    const query = this.castRepository
      .createQueryBuilder('cast')
      .select('DISTINCT movie.language', 'language')
      .innerJoin('cast.castMovie', 'castMovie')
      .innerJoin('castMovie.movie', 'movie')
      .where('cast.id = :id', { id })
      .andWhere('movie.rating > 4.5')
      .getRawMany();

    const result = await query;
    return result.map((item) => item.language);
  }

  async findWithTrivia(): Promise<Cast[]> {
    const casts = await this.castRepository.find();
    return casts.map((cast) => ({
      id: cast.id,
      name: cast.name,
      birthday: cast.birthday,
      deadday: cast.deadday,
      rating: cast.rating,
      horoscope: getHoroscope(cast.birthday),
      isLeap: isLeapYear(cast.birthday),
    }));
  }

  async create(cast: Partial<Cast>): Promise<Cast> {
    const newCast = await this.castRepository.create(cast);
    return this.castRepository.save(newCast);
  }

  async delete(id: bigint): Promise<void> {
    const cast = await this.castRepository.findOne({ where: { id } });
    await this.castRepository.delete(cast);
  }

  async update(id: bigint, user: Partial<Cast>): Promise<Cast> {
    await this.castRepository.update(Number(id), user);
    return this.castRepository.findOne({ where: { id } });
  }
}
