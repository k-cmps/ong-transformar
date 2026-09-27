"use strict";
// Progressive enhancement: HTML pages continue navigable without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
});
const themeButton = document.querySelector('.theme-toggle');
const themeKey = 'ong-transformar-theme';
try { if (localStorage.getItem(themeKey) === 'dark') document.documentElement.dataset.theme = 'dark'; } catch (_) { /* storage unavailable */ }
function syncTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
}
syncTheme();
themeButton?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  try { localStorage.setItem(themeKey, dark ? 'dark' : 'light'); } catch (_) { /* storage unavailable */ }
  syncTheme();
});
const projects = [
  { icon: '♡', title: 'Alimentação solidária', tag: 'Assistência', description: 'Ações ilustrativas de arrecadação e distribuição de alimentos.' },
  { icon: '✦', title: 'Educação e oportunidades', tag: 'Educação', description: 'Atividades comunitárias para compartilhar conhecimentos.' },
  { icon: '❀', title: 'Rede de voluntários', tag: 'Voluntariado', description: 'Mobilização de pessoas interessadas em colaborar com projetos sociais.' }
];
const list = document.querySelector('#projetos-lista');
if (list) {
  for (const project of projects) {
    const article = document.createElement('article');
    article.className = 'card';
    const icon = document.createElement('span'); icon.className = 'card-icon'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = project.icon;
    const title = document.createElement('h3'); title.textContent = project.title;
    const tag = document.createElement('span'); tag.className = 'badge'; tag.textContent = project.tag;
    const desc = document.createElement('p'); desc.textContent = project.description;
    article.append(icon, title, tag, desc); list.append(article);
  }
}
const form = document.querySelector('#cadastro-form');
const dialog = document.querySelector('#success-dialog');
const closeDialog = document.querySelector('#close-dialog');
let previousFocus = null;
const toast = document.querySelector('#toast');
let toastTimeout;
function notify(message) {
  if (!toast) return;
  toast.textContent = message; toast.hidden = false;
  clearTimeout(toastTimeout); toastTimeout = setTimeout(() => { toast.hidden = true; }, 4500);
}
function validateField(field) {
  const error = document.querySelector('#erro-' + field.id);
  if (!error) return true;
  const valid = field.checkValidity();
  const messages = { valueMissing: 'Este campo é obrigatório.', typeMismatch: 'Confira o formato informado.', patternMismatch: 'Confira o formato indicado para este campo.', tooShort: 'Digite pelo menos 3 caracteres.' };
  let message = '';
  if (!valid) {
    const key = Object.keys(messages).find(k => field.validity[k]);
    message = messages[key] || 'Verifique este campo.';
  }
  error.textContent = message;
  if (valid) { field.removeAttribute('aria-invalid'); field.removeAttribute('aria-describedby'); }
  else { field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', error.id); }
  return valid;
}
function hideDialog() {
  if (!dialog) return;
  dialog.hidden = true;
  previousFocus?.focus();
}
if (form) {
  const fields = [...form.querySelectorAll('input, select')];
  fields.forEach(field => { field.addEventListener('blur', () => validateField(field)); field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); }); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = fields.filter(field => !validateField(field));
    if (invalid.length) { invalid[0].focus(); notify('Revise os campos destacados.'); return; }
    previousFocus = document.activeElement;
    dialog.hidden = false; closeDialog.focus();
    form.reset(); fields.forEach(validateField);
  });
  form.addEventListener('reset', () => setTimeout(() => fields.forEach(validateField), 0));
  closeDialog?.addEventListener('click', hideDialog);
  dialog?.addEventListener('click', event => { if (event.target === dialog) hideDialog(); });
  dialog?.addEventListener('keydown', event => {
    if (event.key === 'Escape') hideDialog();
    if (event.key === 'Tab') { event.preventDefault(); closeDialog.focus(); }
  });
}
