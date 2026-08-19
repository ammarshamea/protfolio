export const OPEN_COMMAND_PALETTE_EVENT = "open-command-palette";

export function dispatchOpenCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
}
