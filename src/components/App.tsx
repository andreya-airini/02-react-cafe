import css from "../styles/App.module.css";
import CafeInfo from "../components/CafeInfo";
import { useState } from "react";
import type { Votes, VoteType } from "../types/votes";
import VoteOptions from "../components/VoteOptions";
import VoteStats from "../components/VoteStats";
import Notification from "../components/Notification";

export default function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  const handleVote = (type: VoteType) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  console.log(votes);

  const totalVotes = votes.good + votes.bad + votes.neutral;
  const positiveRate =
    totalVotes === 0 ? 0 : Math.round((votes.good / totalVotes) * 100);

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
