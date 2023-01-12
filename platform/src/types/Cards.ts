export type NewCard = {
    question : string
    answer : string
    source : string
    isPublic : boolean
    groupIds : number[]
    tagIds : number[]
}

export type EditCard = NewCard & {
    id : number
}

export type CardResponse = EditCard & {
    username : string
    tags : string[]
    groups : string[]
}

export type DeleteCard = {
    id : number
}
