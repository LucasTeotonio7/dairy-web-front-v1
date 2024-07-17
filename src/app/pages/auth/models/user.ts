export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    name?: string;
    last_name?: string;
    image?: string;
    is_active: boolean;
    is_staff: boolean;
}


export interface UserLogin {
    username: string;
    password: string;
}
