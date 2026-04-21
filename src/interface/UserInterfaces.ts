export interface RegisterInterface {
    username: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    birthday?: string;
    phoneNumber?: string;
    address?: string;
    role: string;
}

export interface UserParams {
    id: string;
}