import styles from "./App.module.css";
import ModelAnswers from "./ModelAnswers";

export default function PaperDetail({ paper, selectedModels }) {
  if (!paper) return null;
  return (
    <div className={styles.paperDetail}>
      <h2 style={{fontSize:"1.6rem",fontWeight:700, marginBottom:18}}>{paper.paper_title || "Untitled"}</h2>
      <ModelAnswers answers={paper.answers} selectedModels={selectedModels} />
    </div>
  );
}
