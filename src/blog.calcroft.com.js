// Disabling ESLint as this is ES5 code
/* eslint-disable */
var LIGHT = 'light';
var DARK = 'dark';
var STORAGE_KEY = 'theme';

function getCurrentTheme() {
  return document.body.className;
}

function getThemeToggle() {
  return document.querySelector('.theme-toggle');
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function setSavedTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

function setThemeToggleText(theme) {
  getThemeToggle().innerHTML = 'Enable ' + (theme === DARK ? LIGHT : DARK) + ' mode';
}

function setTheme(newTheme) {
  setThemeToggleText(newTheme);
  document.body.classList.replace(getCurrentTheme(), newTheme);
  setSavedTheme(newTheme);
}

if (window.matchMedia) {
  var userPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (userPrefersDarkMode) {
    setTheme(DARK);
  }
}

const currentSavedTheme = getSavedTheme();
if (currentSavedTheme !== null) {
  setTheme(currentSavedTheme);
}

getThemeToggle().addEventListener('click', function() {
  if (getCurrentTheme() === LIGHT) setTheme(DARK);
  else if (getCurrentTheme() === DARK) setTheme(LIGHT);
});
