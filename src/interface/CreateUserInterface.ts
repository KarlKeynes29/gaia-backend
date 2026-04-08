export interface CreateUserInterface {
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