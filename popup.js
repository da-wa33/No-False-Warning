document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="action"]');
  const redirectUrlInput = document.getElementById('redirectUrl');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  function updateRedirectInput() {
    const checkedValue = document.querySelector('input[name="action"]:checked')?.value;
    if (checkedValue === 'redirect') {
      redirectUrlInput.style.display = 'block';
    } else {
      redirectUrlInput.style.display = 'none';
    }
  }

  radios.forEach(radio => {
    radio.addEventListener('change', updateRedirectInput);
  });

 chrome.storage.local.get(['action', 'redirectUrl'], (data) => {
  if (data.action) {
    const radio = document.querySelector(`input[name="action"][value="${data.action}"]`);
    if (radio) radio.checked = true;
  } else {
    const defaultValue = 'back';
    const defaultRadio = document.querySelector(`input[name="action"][value="${defaultValue}"]`);
    if (defaultRadio) defaultRadio.checked = true;

    chrome.storage.local.set({ action: defaultValue });
  }
  if (data.redirectUrl) {
    redirectUrlInput.value = data.redirectUrl;
  }
  updateRedirectInput();
 });


  saveBtn.addEventListener('click', () => {
    const selectedAction = document.querySelector('input[name="action"]:checked')?.value;
    const url = redirectUrlInput.value.trim();

    if (selectedAction === 'redirect' && !url) {
      status.textContent = 'URLを入力してください。';
      return;
    }

    chrome.storage.local.set({ action: selectedAction, redirectUrl: url }, () => {
      status.textContent = '保存しました！';
      setTimeout(() => (status.textContent = ''), 2000);
    });
  });
});
