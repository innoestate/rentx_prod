import { Repository } from 'typeorm';
import { Seller_Entity } from '../entities/seller.entity';
import { SellerDto } from '../dto/create-seller.dto';
export declare class SellersDbService {
    private sellerRepository;
    constructor(sellerRepository: Repository<Seller_Entity>);
    createSeller(createSellerDto: SellerDto): Promise<Seller_Entity>;
    removeSeller(id: string): Promise<Seller_Entity>;
    updateSeller(id: string, updateSellerDto: SellerDto): Promise<Seller_Entity>;
    findAllSellers(user_id: string): Promise<Seller_Entity[]>;
    findOneSeller(id: string): Promise<Seller_Entity>;
}
