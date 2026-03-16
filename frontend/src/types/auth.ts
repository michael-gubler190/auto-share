export interface RegisterRequest {
    fullName: string,
    username: string,
    email: string,
    phone: string,
    password: string
}


export interface UserResponseDTO {
    userId: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    profilePicturePath: string;
    role: string;
    createdAt: string;
}

