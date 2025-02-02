import { Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Docs_Entity } from './docs.entity';
import { Docs_Dto } from './docs.dto.model';
import { Docs_Db } from './docs.db.model';
export declare class DocsDbService {
    private docsRepository;
    constructor(docsRepository: Repository<Docs_Entity>);
    create(docsDto: Docs_Dto): Observable<Docs_Entity>;
    getByUser(userId: string): Observable<Docs_Db[]>;
    update(docs: DeepPartial<Docs_Entity>): Observable<any>;
    delete(id: string): Observable<any>;
    deleteByUserId(user_id: string): Observable<any>;
}
