import spacy
from sklearn.feature_extraction.text import TfidfVectorizer

nlp = spacy.load("en_core_web_sm")


def preprocess_text(text):
    doc = nlp(text.lower())

    tokens = [
        token.lemma_
        for token in doc
        if not token.is_stop and token.is_alpha
    ]

    return " ".join(tokens)


def vectorize_text(text1, text2):
    vectorizer = TfidfVectorizer(
        ngram_range=(1,2),
        max_features=5000
    )
    vectors = vectorizer.fit_transform([text1, text2])

    return vectors[0], vectors[1]