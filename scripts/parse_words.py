import re

def main():
  raw_words = []
  with open("words.txt") as f:
    for x in f:
      raw_words.append(re.findall(r"[a-z]", x))

  words = []
  for x in raw_words:
    words.append("".join(x))

  with open("words-pl.json", "w") as f:
    f.write("[ \n")
    for x in words:
      f.write('\t' + '\"' + x  + '\"' + "," + '\n')

    f.write("] \n")


if __name__ == "__main__":
  main()