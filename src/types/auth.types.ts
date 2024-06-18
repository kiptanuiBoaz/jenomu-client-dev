export interface Permission {
    guid: string;
    name: string;
}

export interface Role {
    guid: string;
    name: string;
    Permissions: Permission[];
}

export interface User {
    access: string;
    refresh: string;
    email: string;
    guid: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    avatar: string | null;
    recycled: string;
    role_guid: string;
    role: Role;
}


export interface AuthInfoState {
    isAuthenticated: boolean;
    user: any;
}
