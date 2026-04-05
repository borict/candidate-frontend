
const API_URL = "http://localhost:8080/api/candidates"

export const getCandidates = async (): Promise<Candidate[]> => {
    const response = await fetch(API_URL)
    return response.json()
    }