export type Credentials = {
    username: string
    password: string
}

export type RegisterCredentials = Credentials & {
    confirmPassword: string
    email: string
}