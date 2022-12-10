export type NewGroup = {
    name : string
    difficulty : number
    description : string
    isPublic : boolean
    cardIds : []
}

export type GroupResponse = {
    id : number
    name : string
    difficulty : number
    description : string
    username : string
}