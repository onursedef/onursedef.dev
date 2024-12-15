export interface Login {
    authToken: string;
    user: User;
}

interface User {
    id: string;
    name: string
}