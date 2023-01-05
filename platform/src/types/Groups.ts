export type NewGroup = {
    name : string
    difficulty : number
    description : string
    isPublic : boolean
    cardIds : number[]
}

export type EditGroup = NewGroup & {
    id : number
}

export type GroupResponse = {
    id : number
    name : string
    difficulty : number
    description : string
    username : string
    isPublic : boolean
    cardIds : number[]
}