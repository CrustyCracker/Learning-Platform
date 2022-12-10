export type NewCard = {
    question : string
    answer : string
    source : string
    isPublic : boolean
    groupIds : []
    tagIds : []
}

export type CardResponse = {
    question : string
    answer : string
    source : string
    username : string
    id : number
    isPublic : boolean
}
