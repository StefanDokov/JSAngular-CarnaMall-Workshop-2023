
export interface Reserve {
    dateFrom: string;
    forDays: number;
    cardNum: string;
    costPrice: number;
    resOwner: string;
}


export interface CraftRent {
    model: string;
    image: string;
    doors: number;
    seats: number;
    transmission: string;
    year: number;
    price: number;
    ownerId: string
    reserves: Reserve[];
}

export interface Rent {
    model: string;
    image: string;
    doors: number;
    seats: number;
    transmission: string;
    year: number;
    price: number;
    ownerId: string
    reserves: Reserve[];
    _id: string;
}



