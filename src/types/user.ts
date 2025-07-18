export interface MeIf {
    role: number;
    user_id: number;
    username: string;
}

// {
//     "id": 33,
//     "username": "jayasinghed7",
//     "email": "jayasinghed7@gmail.com",
//     "phone_number": "+94712345678",
//     "first_name": "John",
//     "last_name": "Doe",
//     "date_of_birth": "1990-01-01T00:00:00Z",
//     "address": "123 Street",
//     "city": "City",
//     "state": "State",
//     "country": "Sri Lanka",
//     "zip_code": "12345",
//     "user_status": 1,
//     "is_verified": false,
//     "is_enabled": false,
//     "password": ""
// }
export interface UserIf {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    user_status: number;
    is_verified: boolean;
    is_enabled: boolean;
    password?: string;
}