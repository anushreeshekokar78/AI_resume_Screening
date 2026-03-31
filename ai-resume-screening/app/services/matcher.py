from sklearn.metrics.pairwise import cosine_similarity
import re

# Basic skill list (can expand later)
SKILL_MAP = {
    "python": ["flask", "django", "fastapi", "pandas", "numpy"],
    "machine learning": ["scikit-learn", "tensorflow", "pytorch"],
    "data science": ["pandas", "numpy", "matplotlib"],
    "web development": ["html", "css", "javascript"],
    "cloud": ["aws", "azure", "gcp"]
}


def calculate_similarity(vec1, vec2):
    return cosine_similarity(vec1, vec2)[0][0]




def extract_skills(resume_text, job_description):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    # Tokenize (split words properly)
    resume_words = set(re.findall(r'\b\w+\b', resume_text))
    jd_words = set(re.findall(r'\b\w+\b', job_description))

    found = set()
    missing = set()

    for skill, related_skills in SKILL_MAP.items():

        # MAIN SKILL
        if skill in jd_words:
            if skill in resume_words:
                found.add(skill)
            else:
                missing.add(skill)

        # RELATED SKILLS
        for sub in related_skills:
            if sub in jd_words or skill in jd_words:
                if sub in resume_words:
                    found.add(sub)
                else:
                    missing.add(sub)

    return list(found), list(missing)