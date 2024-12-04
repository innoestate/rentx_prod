export interface Owner_Db {
    id?: string;
    user_id: string;
    name: string;
    street: string;
    city: string;
    zip: string;
    signature: string;
    email: string;
    phone: string;
    created_at?: string;
    updated_at?: string;
}
export declare const formatOwner: (owner: any) => Owner_Db;
