import type { Candidate } from "../types/Candidate";

const API_URL = "http://localhost:8080/api/candidates";

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createCandidate = async (candidate: {
  fullName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) {
    throw new Error("Failed to create candidate");
  }

  return response.json();
};

export const updateCandidate = async (
  candidateId: number,
  candidate: {
    fullName: string;
    email: string;
    contactNumber: string;
    dateOfBirth: string;
  },
) => {
  const response = await fetch(`${API_URL}/${candidateId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) {
    throw new Error("Failed to update candidate");
  }

  return response.json();
};

export const addSkillToCandidate = async (
  candidateId: number,
  skillName: string,
) => {
  const response = await fetch(`${API_URL}/${candidateId}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: skillName }),
  });

  if (!response.ok) {
    throw new Error("Failed to add skill");
  }

  return response.json();
};

export const removeSkillFromCandidate = async (
  candidateId: number,
  skillId: number,
) => {
  const response = await fetch(`${API_URL}/${candidateId}/skills/${skillId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove skill");
  }
};

export const searchCandidatesByFullName = async (
  fullName: string,
): Promise<Candidate[]> => {
  const response = await fetch(
    `${API_URL}/search?fullName=${encodeURIComponent(fullName)}`,
  );
  return response.json();
};

export const searchCandidatesBySkill = async (
  skill: string,
): Promise<Candidate[]> => {
  const response = await fetch(
    `${API_URL}/search/by-skill?skill=${encodeURIComponent(skill)}`,
  );
  return response.json();
};

export const deleteCandidate = async (candidateId: number) => {
  const response = await fetch(`${API_URL}/${candidateId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete candidate");
  }
};
