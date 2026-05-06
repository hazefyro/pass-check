import json
import re


def main():
    words = []

    with open("words.txt", encoding="utf-8") as f:
        for line in f:
            word = "".join(re.findall(r"[a-ząćęłńóśźż]+", line.lower()))
            if word:
                words.append(word)

    with open("words-pl.json", "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
