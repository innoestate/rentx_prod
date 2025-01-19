import { ConfigService } from '@nestjs/config';
import { SellerDto } from './dto/create-seller.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { ProspectionsDbService } from './services/prospections.db.service';
import { ProspectionsService } from './services/prospections.service';
import { SellersDbService } from './services/sellers.db.service';
export declare class ProspectionsController {
    private readonly prospectionService;
    private readonly prospectionsDbService;
    private readonly sellersService;
    private readonly configService;
    constructor(prospectionService: ProspectionsService, prospectionsDbService: ProspectionsDbService, sellersService: SellersDbService, configService: ConfigService);
    create(createProspectionDto: ProspectionDto, req: any): Promise<import("./entities/prospection.entity").Prospection_Entity>;
    findAll(req: any): Promise<import("./dto/prospection.db").ProspectionDb[]>;
    findOne(id: string, req: any): Promise<import("./entities/prospection.entity").Prospection_Entity>;
    update(id: string, updateProspectionDto: Partial<ProspectionDto>, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<import("./entities/prospection.entity").Prospection_Entity>;
    createSeller(createSellerDto: SellerDto, req: any): Promise<import("./entities/seller.entity").Seller_Entity>;
    findAllSellers(req: any): Promise<import("./entities/seller.entity").Seller_Entity[]>;
    findOneSeller(id: string): Promise<import("./entities/seller.entity").Seller_Entity>;
    updateSeller(id: string, updateSellerDto: SellerDto, req: any): Promise<import("./entities/seller.entity").Seller_Entity>;
    removeSeller(id: string, req: any, res: any): import("rxjs").Observable<any>;
}
