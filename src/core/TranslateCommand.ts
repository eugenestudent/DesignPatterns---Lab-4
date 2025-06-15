import { Expression } from './Interpreter';

export class TranslateCommand {
  constructor(private input: string, private interpreter: Expression) {}

  execute(): string {
    return this.interpreter.interpret(this.input);
  }
}