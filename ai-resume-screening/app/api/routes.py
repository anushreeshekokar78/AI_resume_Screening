from fastapi import APIRouter, UploadFile, File, Form
from app.services.parser import extract_text
from app.services.nlp import preprocess_text, vectorize_text
from app.services.matcher import calculate_similarity, extract_skills

router = APIRouter()


@router.get("/")
def home():
    return {"message": "API is running 🚀"}


@router.post("/match")
async def match_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # =========================
    # STEP 1: Extract Resume Text
    # =========================
    resume_text = await extract_text(resume)

    # DEBUG (VERY IMPORTANT)
    print("\n===== RAW RESUME TEXT =====\n", resume_text[:500])
    print("\n===== JOB DESCRIPTION =====\n", job_description)

    # SAFETY CHECK
    if not resume_text or len(resume_text.strip()) < 20:
        return {
            "match_score": 0,
            "skills_found": [],
            "missing_skills": [],
            "error": "Resume parsing failed or empty"
        }

    # =========================
    # STEP 2: Preprocess (ONLY for TF-IDF)
    # =========================
    resume_clean = preprocess_text(resume_text)
    jd_clean = preprocess_text(job_description)

    print("\n===== CLEAN RESUME =====\n", resume_clean[:200])
    print("\n===== CLEAN JD =====\n", jd_clean[:200])

    # =========================
    # STEP 3: Vectorization
    # =========================
    resume_vec, jd_vec = vectorize_text(resume_clean, jd_clean)

    # =========================
    # STEP 4: Similarity Score
    # =========================
    score = calculate_similarity(resume_vec, jd_vec)
    print("\n===== SIMILARITY SCORE =====\n", score)

    # =========================
    # STEP 5: Skill Extraction (USE RAW TEXT)
    # =========================
    skills_found, missing_skills = extract_skills(resume_text, job_description)

    print("\n===== SKILLS FOUND =====\n", skills_found)
    print("\n===== MISSING SKILLS =====\n", missing_skills)

    # =========================
    # STEP 6: Skill Score
    # =========================
    if len(skills_found) + len(missing_skills) > 0:
        skill_score = len(skills_found) / (len(skills_found) + len(missing_skills))
    else:
        skill_score = 0

    # =========================
    # STEP 7: Final Score
    # =========================
    final_score = (0.7 * score) + (0.3 * skill_score)

    return {
        "match_score": round(final_score * 100, 2),
        "skills_found": skills_found,
        "missing_skills": missing_skills
    }