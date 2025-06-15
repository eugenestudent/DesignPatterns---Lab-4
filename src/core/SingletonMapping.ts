export class SingletonMapping {
  private static instance: SingletonMapping;

  numToWord: Record<string, string>;
  wordToNum: Record<string, string>;
  
  private constructor() {
    this.numToWord = {
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine'
    };

    this.wordToNum = Object.fromEntries(
        Object.entries(this.numToWord).map(([k, v]: [string, string]) => [v, k])
    );
  }

  static getInstance() {
    if (!SingletonMapping.instance) {
      SingletonMapping.instance = new SingletonMapping();
    }
    return SingletonMapping.instance;
  }
}