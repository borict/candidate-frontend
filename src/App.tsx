import { useEffect, useState } from "react";
import { getCandidates } from "./api/candidateApi";
import type { Candidate } from "./types/Candidate";

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    getCandidates().then(setCandidates);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Candidate Management</h1>

      {candidates.map((candidate) => (
        <div key={candidate.id} style={{ marginBottom: "20px" }}>
          <h3>{candidate.fullName}</h3>
          <p>{candidate.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
