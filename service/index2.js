export let translations = {};
export let currentLang = "en";

export async function loadTranslations() {
  try {
    const response = await fetch('/locales/translation.json');
    translations = await response.json();

    const savedLang = localStorage.getItem("preferredLang") || currentLang;
    setLanguage(savedLang);
  } catch (error) {
    console.error("Translation file load failed:", error);
  }
}

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem("preferredLang", lang);
    updateText();
  } else {
    console.warn(`Language '${lang}' not found in translations.`);
  }
}

export function updateText() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translated = translations[currentLang][key];
    if (translated) {
      element.textContent = translated;
    } else {
      console.warn(`Translation key '${key}' missing in '${currentLang}'`);
    }
  });
}

document.querySelectorAll(".translate-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    setLanguage(lang);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();
});
