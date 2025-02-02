import { INestApplication } from '@nestjs/common';
export declare const buildApp: (user: {
    email: string;
    name: string;
}) => Promise<INestApplication<any>>;
