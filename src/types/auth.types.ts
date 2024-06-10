export type Role = {
    //eg:"admin" | "researcher" | "freelancer" 
    id: string;
    Permissions: string[];
    //predefined for freelancer and researcher 
    //dynamic for admins (to be managed by a root admin)
};

export type User = {
    email: string;
    id: string;
    lname: string;
    fname: string;
    phone_no: string;
    avatar: string | null;
    recycled: string;
    role: Role;
};
