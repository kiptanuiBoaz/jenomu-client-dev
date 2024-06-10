export type Role = {
    id: string;
    Permissions: string[];
};

export type User = {
    email: string;
    id: string;
    lname: string;
    fname: string;
    phone_no: string;
    avatar: string | null;
    recycled: string;
    farmer: string | null;
    role: Role;
};
