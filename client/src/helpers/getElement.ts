export function getElById(str: string, options: string) {
  switch (options) {
    case "btn":
      return document.getElementById(str) as HTMLButtonElement;
    default:
      return document.getElementById(str) as HTMLElement;
  }
}

export function getButtonElById(str: string) {
  return document.getElementById(str) as HTMLButtonElement;
}

export function getInputElByName(name: string) {
  return document.querySelector(`input[name=${name}]`) as HTMLInputElement;
}
