import { Estate_Db } from './estate-db.model';
import { Estate_Dto } from './estate-dto.model';
export declare const formatEstateDtoToEstateDb: (estateDto: Estate_Dto, userId: string) => Estate_Db;
export declare const fromatEstateForPatch: (data: any) => Partial<Estate_Db>;
