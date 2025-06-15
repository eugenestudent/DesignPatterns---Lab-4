import { EditableState, ReadOnlyState } from './core/InputState';
import { TranslationFacade } from './core/TranslationFacade';

let currentState = new EditableState();

const inputEl = document.getElementById('input') as HTMLInputElement;
const buttonEl = document.getElementById('translateBtn') as HTMLButtonElement;
const resultEl = document.getElementById('result') as HTMLDivElement;
const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

function updateUIAfterTranslation(result: string) {
  resultEl.textContent = result;
  const hasError = result.includes('error');

  currentState = new ReadOnlyState();
  currentState.apply(inputEl, hasError);
  currentState.updateUI(editBtn, resetBtn);
}

function resetState() {
  inputEl.value = '';
  resultEl.textContent = '';
  currentState = new EditableState();
  currentState.apply(inputEl, false);
  currentState.updateUI(editBtn, resetBtn);
}

function editAgain() {
  currentState = new EditableState();
  currentState.apply(inputEl, false);
  currentState.updateUI(editBtn, resetBtn);
}

buttonEl.addEventListener('click', () => {
  if (currentState instanceof ReadOnlyState) return;

  const input = inputEl.value.trim();
  if (input === '') return;

  const result = TranslationFacade.translate(input);
  updateUIAfterTranslation(result);
});

resetBtn.addEventListener('click', resetState);
editBtn.addEventListener('click', editAgain);