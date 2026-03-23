export const UserTypes = {
    renter: "renter",
    owner: "owner",
    admin: "admin"
} as const;


export interface UpdateUserRequest {
    fullName: string,
    username: string,
    phone: string,
    profilePicturePath: string
}