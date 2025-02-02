export interface ProspectionDto {
    user_id: string;
    city?: string;
    address?: string;
    zip?: string;
    link?: string;
    seller_id?: string;
    status?: PropertyStatus;
    price?: number;
    counter_proposal?: number;
    emission_date?: Date;
    offer_id?: string;
    construction_cost?: number;
    rents?: any;
    resume?: string;
    comment?: string;
    storage_folder_id?: string;
}
export type PropertyStatus = "Unresponsive" | "Contacted" | "Scheduled" | "Visited" | "Abandoned" | "Pending" | "Declined" | "Countered" | "Accepted" | "Validated" | "Signed" | "Completed" | "UnderContract" | "Sold";
export declare const PropertyStatusTranslation: {
    [key in PropertyStatus]: string;
};
