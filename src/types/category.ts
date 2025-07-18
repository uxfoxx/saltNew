export interface CategoryIf{
    _id: string;
    name: string;
    description: string;
    createdDate: Date;
    updatedDate?: Date;
    isActive?: boolean;
}