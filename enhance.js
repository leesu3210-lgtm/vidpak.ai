(() => {
  const toast = (message) => {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.remove('hidden');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.add('hidden'), 2600);
  };

  const findStudio = () => document.getElementById('studio');
  const findPrompt = () => {
    const studio = findStudio();
    if (!studio) return null;
    return studio.querySelector('textarea');
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const label = (button.textContent || '').trim().toLowerCase();
    if (!label.includes('generate')) return;

    const prompt = findPrompt();
    const value = prompt ? prompt.value.trim() : '';
    if (!value) {
      toast('✍️ پہلے اپنا video idea/prompt لکھیں۔');
      if (prompt) prompt.focus();
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    const studio = findStudio();
    const output = studio && studio.querySelector('.output');
    if (output) {
      output.innerHTML = `
        <div class="preview" aria-label="VidPak generated preview">🎬</div>
        <div style="margin-top:14px"><strong>Preview ready</strong><br><span class="muted">Your idea: ${escapeHtml(value.slice(0, 120))}</span><br><span class="muted">Prototype preview — AI video API will be connected next.</span></div>
      `;
    }
    toast('✅ Preview تیار ہے!');
  }, true);

  function escapeHtml(text) {
    return text.replace(/[&<>\"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[ch]));
  }
})();
