from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).parent / "data.json"

with open(DATA_PATH, "r", encoding="utf-8") as f:
    PAPERS = json.load(f)

@app.get("/papers")
def list_papers():
    return [{"id": k, "title": v["paper_title"]} for k, v in PAPERS.items()]

@app.get("/paper/{paper_id}")
def get_paper(paper_id: str):
    return PAPERS.get(paper_id, {})

# Optional: search by keyword
@app.get("/search")
def search_papers(q: str):
    q = q.lower()
    results = [
        {"id": k, "title": v["paper_title"]}
        for k, v in PAPERS.items()
        if q in v["paper_title"].lower()
    ]
    return results
