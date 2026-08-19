export const RECRUITER_MODE_STORAGE_KEY = "recruiter-mode";
export const RECRUITER_MODE_CHANGE_EVENT = "recruiter-mode-change";

export function isRecruiterModeEnabled() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(RECRUITER_MODE_STORAGE_KEY) === "true";
}

export function setRecruiterMode(enabled: boolean) {
  window.localStorage.setItem(RECRUITER_MODE_STORAGE_KEY, String(enabled));
  document.documentElement.toggleAttribute("data-recruiter", enabled);
  window.dispatchEvent(
    new CustomEvent<boolean>(RECRUITER_MODE_CHANGE_EVENT, { detail: enabled }),
  );
}
