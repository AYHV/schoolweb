export let translations = {}; // Store translations globally
export let currentLang = "en"; // Set default language

// Load translation data from a JSON file
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

// Set the language (either 'en' or 'lo')
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem("preferredLang", lang); // Save language preference
    updateText(); // Update the text on the page
  } else {
    console.warn(`Language '${lang}' not found in translations.`);
  }
}

// Update the text content based on the current language
export function updateText() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key]; // Change text based on language
    }
  });
}

// Set up the event listener to toggle between languages
document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations(); // Load translations when the page loads

  const toggleBtn = document.getElementById("toggle-lang-btn"); // Get the language toggle button
  toggleBtn.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "lo" : "en"; // Toggle between 'en' and 'lo'
    setLanguage(newLang); // Change the language
  });
});
