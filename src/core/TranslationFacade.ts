import { NumberToWordInterpreter, WordToNumberInterpreter } from './Interpreter';
import { TranslateCommand } from './TranslateCommand';

export class TranslationFacade {
  
  static translate(input: string): string {
  const cleanInput = input.replace(/\s+/g, '');
  const isNumeric = /^[1-9]+$/.test(cleanInput);

  const interpreter = isNumeric
    ? new NumberToWordInterpreter()
    : new WordToNumberInterpreter();

  const command = new TranslateCommand(input, interpreter);
  return command.execute();
}}