import { SingletonMapping } from './SingletonMapping';

export interface Expression {
  interpret(input: string): string;
}

export class NumberToWordInterpreter implements Expression {
  private mapping = SingletonMapping.getInstance();

  interpret(input: string): string {
    const parts = input.trim().split(/\s+/).flatMap(s => s.split(""));
    const result = parts.map(p => {
      if (/^[1-9]$/.test(p)) {
        return this.mapping.numToWord[+p] ?? "error";
      }
      return "error";
    });
    return result.join(" ");
  }
}

export class WordToNumberInterpreter implements Expression {
  private mapping = SingletonMapping.getInstance();

  interpret(input: string): string {
    const normalizedInput = input.toLowerCase().trim();

    if (normalizedInput.length === 0) return "";

    const tokens = this.tokenize(normalizedInput);

    return tokens.map(token => {
      return this.mapping.wordToNum[token] !== undefined
        ? String(this.mapping.wordToNum[token])
        : "error";
    }).join(" ");
  }

  private tokenize(input: string): string[] {
  const words = Object.keys(this.mapping.wordToNum).sort((a, b) => b.length - a.length); // длинные сначала
  const tokens: string[] = [];

  let str = input.trim().toLowerCase();

  while (str.length > 0) {
    if (str[0] === ' ') {
      str = str.slice(1);
      continue;
    }

    let matchedWord = "";
    for (const word of words) {
      if (str.startsWith(word)) {
        matchedWord = word;
        break;
      }
    }

    if (matchedWord) {
      tokens.push(matchedWord);
      str = str.slice(matchedWord.length);
    } else {
      tokens.push("error");
      break
    }
  }

  return tokens;
}
}