import pdfplumber
from docx import Document




async def extract_text(file):
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        text = extract_pdf(file)

    elif filename.endswith(".docx"):
        text = extract_docx(file)

    elif filename.endswith(".txt"):
        content = await file.read()
        text = content.decode("utf-8", errors="ignore")

    else:
        return ""

    # 🔥 RESET POINTER (CRITICAL FIX)
    file.file.seek(0)

    return text.strip()


def extract_pdf(file):
    text = ""

    try:
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        print("PDF ERROR:", e)

    return text.strip()


def extract_docx(file):
    try:
        doc = Document(file.file)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print("DOCX ERROR:", e)
        return ""