
export interface Reservez {
    dateFrom: string;
    forDays: number;
    cardNum: string;
    costPrice: number;
    reserveId: string;
}


export interface Profile {
    email: string;
    username: string;
    _id: string;
    userReserves: Reservez[];
}

export interface User {
    email: string;
    username: string;
    password: string;
    userReserves: Reservez[];
}

export interface Login {
    username: string;
    password: string;
}