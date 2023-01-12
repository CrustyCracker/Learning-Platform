export type NewCard = {
    question : string
    answer : string
    source : string
    isPublic : boolean
    groupIds : number[]
    tags : string[]
}

export type EditCard = NewCard & {
    id : number
}

export type CardResponse = EditCard & {
    username : string
    groups : string[]
}

export type DeleteCard = {
    id : number
}
