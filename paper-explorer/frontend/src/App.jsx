import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import PaperList from "./PaperList";
import PaperDetail from "./PaperDetail";

const BACKEND = "http://localhost:8000"; // Or your backend IP if serving remotely

function getAllModels(paperData) {
  if (!paperData || !paperData.answers) return [];
  const models = new Set();
  Object.values(paperData.answers).forEach(modelMap => {
    Object.keys(modelMap).forEach(model => models.add(model));
  });
  return Array.from(models);
}

function App() {
  const [papers, setPapers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [paperData, setPaperData] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND}/papers`).then(res => setPapers(res.data));
  }, []);

  function selectPaper(id) {
    setSelected(id);
    setPaperData(null);
    axios.get(`${BACKEND}/paper/${id}`).then(res => setPaperData(res.data));
  }

  function doSearch() {
    axios.get(`${BACKEND}/search?q=${encodeURIComponent(search)}`).then(res => setPapers(res.data));
  }

  // When paperData changes, default to all models selected
  useEffect(() => {
    if (paperData) {
      const models = getAllModels(paperData);
      setSelectedModels(models);
    }
  }, [paperData]);

  function toggleModel(model) {
    setSelectedModels(models =>
      models.includes(model) ? models.filter(m => m !== model) : [...models, model]
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Paper Explorer</span>
        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') doSearch(); }}
          />
          <button className={styles.button} onClick={doSearch}>
            Search
          </button>
        </div>
      </div>

      <div style={{margin: "1rem 0"}}>
        {paperData && (
          <div>
            <b>Select models to compare:</b>
            <div className={styles.modelsSelector}>
              {getAllModels(paperData).map(model => (
                <label
                  key={model}
                  className={selectedModels.includes(model) ? styles.selected : ""}
                  style={{
                    background: selectedModels.includes(model) ? "#e3eefe" : "#f3f3f3",
                    fontWeight: selectedModels.includes(model) ? "600" : undefined
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(model)}
                    onChange={() => toggleModel(model)}
                    style={{accentColor:"#377aff"}}
                  />
                  <span style={{fontFamily:"monospace", fontSize:"0.97rem"}}>{model}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{display:"flex", flexWrap:"wrap", gap:"2rem"}}>
        <div style={{flex:"0 0 260px"}}>
          <PaperList papers={papers} selected={selected} onSelect={selectPaper} />
        </div>
        <div style={{flex:"1 1 0%"}}>
          {paperData ? (
            <PaperDetail paper={paperData} selectedModels={selectedModels} />
          ) : (
            <div style={{margin:"2rem",color:"#666",textAlign:"center"}}>Select a paper to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
