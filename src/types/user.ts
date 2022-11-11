export interface IUser {
    id:         string;
    name:       string;
    email:      string;
    businessId: string;
    createdAt:  Date;
    updatedAt:  Date;
    business:   Business;
}

export interface Business {
    id:         string;
    name:       string;
    categoryId: string;
    updatedAt:  Date;
    createdAt:  Date;
    category:   Category;
}

export interface Category {
    id:        string;
    name:      string;
    updatedAt: Date;
    createdAt: Date;
}