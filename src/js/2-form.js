const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

restoreForm();

form.addEventListener('input', onFormInput);

form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
}

function restoreForm() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved) ?? {};

    formData.email = parsed.email ?? '';
    formData.message = parsed.message ?? '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error(error);
  }
}
