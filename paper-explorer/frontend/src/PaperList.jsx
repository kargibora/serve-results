import styles from "./App.module.css";

export default function PaperList({ papers, selected, onSelect }) {
  return (
    <div className={styles.paperList}>
      <h2 style={{marginBottom:8}}>Papers</h2>
      <ul>
        {papers.map(p => (
          <li
            key={p.id}
            className={selected === p.id ? styles.selected : ""}
            onClick={() => onSelect(p.id)}
            style={{fontSize: "1.05rem"}}
          >
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
