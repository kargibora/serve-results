import styles from "./App.module.css";

export default function ModelAnswers({ answers, selectedModels }) {
  if (!answers) return null;
  return (
    <div>
      {Object.entries(answers).map(([question, models]) => (
        <div className={styles.questionBlock} key={question}>
          <div className={styles.questionTitle}>{question.replace(/_/g, " ").replace("question", "")}</div>
          <div className={styles.modelAnswers}>
            {Object.entries(models)
              .filter(([model]) => !selectedModels || selectedModels.includes(model))
              .map(([model, output]) => (
                <div key={model} className={styles.modelBlock}>
                  <div className={styles.modelName}>{model}</div>
                  {question === "project_question" && output.answer && typeof output.answer === "object" && (
                    <ul style={{marginLeft:18}}>
                      <li>
                        <span style={{fontWeight:500}}>Project: </span>
                        {output.answer.project ? (
                          <a href={output.answer.project} target="_blank" rel="noopener noreferrer">{output.answer.project}</a>
                        ) : (
                          <span style={{color:'#bbb'}}>[not provided]</span>
                        )}
                      </li>
                      <li>
                        <span style={{fontWeight:500}}>GitHub: </span>
                        {output.answer.github ? (
                          <a href={output.answer.github} target="_blank" rel="noopener noreferrer">{output.answer.github}</a>
                        ) : (
                          <span style={{color:'#bbb'}}>[not provided]</span>
                        )}
                      </li>
                    </ul>
                  )}
                  {question !== "project_question" && Array.isArray(output.answer) ? (
                    <ul style={{marginLeft:18}}>
                      {output.answer.map((ans, i) => (
                        <li key={i}>{ans || <span style={{color:'#bbb'}}>[empty]</span>}</li>
                      ))}
                    </ul>
                  ) : null}
                  {question !== "project_question" && !Array.isArray(output.answer) && typeof output.answer === "string" && (
                    <pre>{output.answer}</pre>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
