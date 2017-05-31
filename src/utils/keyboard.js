export const ENTER = 13;
export const ESC = 27;
export const BACKSPACE = 8;
export const DELETE = 46;

export function isEnter(event) {
  return event.which === ENTER;
}

export function isEsc(event) {
  return event.which === ESC;
}

export function isRemove(event) {
  return event.which === BACKSPACE || event.which === DELETE;
}
