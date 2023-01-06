export type NewCard = {
    question : string
    answer : string
    source : string
    isPublic : boolean
    groupsIds : number[]
    tagIds : number[]
}

export type EditCard = NewCard & {
    id : number
}

export type CardResponse = EditCard & {
    username : string
    tagNames : string[]
    groupNames : string[]
}

export type DeleteCard = {
    id : number
}
