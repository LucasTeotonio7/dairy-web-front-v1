export interface User {
    id: string;
    last_login?: string;
    is_superuser: boolean;
    created_at: string;
    updated_at: string;
    username: string;
    email: string;
    name: string;
    last_name: string;
    image?: string;
    is_active: boolean;
    is_staff: boolean;
}


export interface UserLogin {
    username: string;
    password: string;
}
