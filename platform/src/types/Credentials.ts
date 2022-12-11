export type Credentials = {
    username: string
    password: string
}

export type RegisterCredentials = Credentials & {
    confirmPassword: string
    email: string
}

export type LoginResponse = {
    success : boolean
    token : string
    message : string
}

export type RegisterResponse = LoginResponse