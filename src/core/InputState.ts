export interface InputState {
  apply(input: HTMLInputElement, hasError: boolean): void;
  updateUI(editBtn: HTMLElement, resetBtn: HTMLElement): void;
}

export class EditableState implements InputState {
  apply(input: HTMLInputElement, hasError: boolean = false): void {
    input.readOnly = false;
    input.classList.toggle('input-error', hasError);
  }

  updateUI(editBtn: HTMLElement, resetBtn: HTMLElement): void {
    editBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
  }
}

export class ReadOnlyState implements InputState {
  apply(input: HTMLInputElement, hasError: boolean = false): void {
    input.readOnly = true;
    input.classList.toggle('input-error', hasError);
  }

  updateUI(editBtn: HTMLElement, resetBtn: HTMLElement): void {
    editBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
  }
}