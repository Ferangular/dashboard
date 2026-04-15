// Script para resetear el tema del localStorage
if (typeof localStorage !== 'undefined') {
  localStorage.removeItem('darkMode');
  localStorage.removeItem('accessibility-preferences');
  console.log('Theme reset completed');
} else {
  console.log('localStorage not available');
}
