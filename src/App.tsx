import { useEffect, useState } from "react";
import {
  addSkillToCandidate,
  createCandidate,
  deleteCandidate,
  getCandidates,
  searchCandidatesByFullName,
  searchCandidatesBySkill,
  updateCandidate,
} from "./api/candidateApi";
import type { Candidate } from "./types/Candidate";
import { removeSkillFromCandidate } from "./api/candidateApi";

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [skillInputs, setSkillInputs] = useState<Record<number, string>>({});
  const [searchFullName, setSearchFullName] = useState("");
  const [searchSkill, setSearchSkill] = useState("");

  const [editingCandidateId, setEditingCandidateId] = useState<number | null>(
    null,
  );
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editContactNumber, setEditContactNumber] = useState("");
  const [editDateOfBirth, setEditDateOfBirth] = useState("");

  const loadCandidates = () => {
    getCandidates().then(setCandidates);
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createCandidate({
      fullName,
      email,
      contactNumber,
      dateOfBirth,
    });

    setFullName("");
    setEmail("");
    setContactNumber("");
    setDateOfBirth("");

    loadCandidates();
  };

  const handleSkillInputChange = (candidateId: number, value: string) => {
    setSkillInputs((previous) => ({
      ...previous,
      [candidateId]: value,
    }));
  };

  const handleAddSkill = async (candidateId: number) => {
    const skillName = skillInputs[candidateId]?.trim();

    if (!skillName) return;

    await addSkillToCandidate(candidateId, skillName);

    setSkillInputs((previous) => ({
      ...previous,
      [candidateId]: "",
    }));

    loadCandidates();
  };

  const handleSearchByFullName = async () => {
    if (!searchFullName.trim()) {
      loadCandidates();
      return;
    }

    const results = await searchCandidatesByFullName(searchFullName);
    setCandidates(results);
  };

  const handleSearchBySkill = async () => {
    if (!searchSkill.trim()) {
      loadCandidates();
      return;
    }

    const results = await searchCandidatesBySkill(searchSkill);
    setCandidates(results);
  };

  const handleResetSearch = () => {
    setSearchFullName("");
    setSearchSkill("");
    loadCandidates();
  };

  const handleDeleteCandidate = async (candidateId: number) => {
    await deleteCandidate(candidateId);
    loadCandidates();
  };

  const handleStartEdit = (candidate: Candidate) => {
    setEditingCandidateId(candidate.id);
    setEditFullName(candidate.fullName);
    setEditEmail(candidate.email);
    setEditContactNumber(candidate.contactNumber);
    setEditDateOfBirth(candidate.dateOfBirth);
  };

  const handleUpdateCandidate = async (candidateId: number) => {
    await updateCandidate(candidateId, {
      fullName: editFullName,
      email: editEmail,
      contactNumber: editContactNumber,
      dateOfBirth: editDateOfBirth,
    });

    setEditingCandidateId(null);
    loadCandidates();
  };

  const handleRemoveSkill = async (candidateId: number, skillId: number) => {
    await removeSkillFromCandidate(candidateId, skillId);
    loadCandidates();
  };

  const availableSkillNames = [
    ...new Set(
      candidates.flatMap((candidate) =>
        candidate.skills.map((skill) => skill.name),
      ),
    ),
  ].sort();

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Candidate Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <button>Add Candidate</button>
      </form>

      <hr />

      <input
        placeholder="Search by full name"
        value={searchFullName}
        onChange={(e) => setSearchFullName(e.target.value)}
      />
      <button onClick={handleSearchByFullName}>Search Name</button>

      <input
        placeholder="Search by skill"
        value={searchSkill}
        onChange={(e) => setSearchSkill(e.target.value)}
      />
      <button onClick={handleSearchBySkill}>Search Skill</button>

      <button onClick={handleResetSearch}>Reset</button>

      <hr />

      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}
        >
          {editingCandidateId === candidate.id ? (
            <>
              <input
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
              />
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <input
                value={editContactNumber}
                onChange={(e) => setEditContactNumber(e.target.value)}
              />
              <input
                type="date"
                value={editDateOfBirth}
                onChange={(e) => setEditDateOfBirth(e.target.value)}
              />

              <button onClick={() => handleUpdateCandidate(candidate.id)}>
                Save
              </button>

              <button onClick={() => setEditingCandidateId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{candidate.fullName}</h3>
              <p>{candidate.email}</p>
              <p>{candidate.contactNumber}</p>
              <p>{candidate.dateOfBirth}</p>
            </>
          )}

          <b>Skills:</b>
          <ul>
            {candidate.skills.map((s) => (
              <li key={s.id}>
                {s.name}
                <button onClick={() => handleRemoveSkill(candidate.id, s.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <input
            list="skills"
            value={skillInputs[candidate.id] || ""}
            onChange={(e) =>
              handleSkillInputChange(candidate.id, e.target.value)
            }
          />

          <datalist id="skills">
            {availableSkillNames.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>

          <button onClick={() => handleAddSkill(candidate.id)}>
            Add Skill
          </button>

          <button onClick={() => handleStartEdit(candidate)}>Edit</button>

          <button onClick={() => handleDeleteCandidate(candidate.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
