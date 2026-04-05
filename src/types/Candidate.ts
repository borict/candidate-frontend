export interface Skill {
    id:number
    name: string
}
export interface Candidate{
    id: number
    fullName: string
    dateOfBirth: string
    contactNumber: string
    email: string
    skills: Skill[]
}