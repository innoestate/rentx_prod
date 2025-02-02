import { Repository } from 'typeorm';
import { ProspectionDb } from '../dto/prospection.db';
import { ProspectionDto } from '../dto/prospection.dto';
import { Offer_Entity } from '../../offers/models/offer.entity';
import { Prospection_Entity } from '../entities/prospection.entity';
export declare class ProspectionsDbService {
    private prospectionRepository;
    private offerRepository;
    constructor(prospectionRepository: Repository<Prospection_Entity>, offerRepository: Repository<Offer_Entity>);
    create(createProspectionDto: ProspectionDto): Promise<Prospection_Entity>;
    findAll(user_id: string): Promise<ProspectionDb[]>;
    findOne(id: string): Promise<Prospection_Entity>;
    update(id: string, updateProspectionDto: Partial<ProspectionDto>): Promise<import("typeorm").UpdateResult>;
    updateMany(user_id: string, updateProspectionDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<Prospection_Entity>;
}
