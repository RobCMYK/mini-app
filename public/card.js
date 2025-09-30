document.addEventListener('DOMContentLoaded', () => {

  console.log('card.js loaded');
  const addBtn = document.getElementById('add-flashcard');
    const container = document.getElementById('cards-container');
    const template = document.getElementById('card-template');
  
    if (!addBtn || !container || !template) return;
  
    let nextId = 1;
  
    function addCard() {
      const frag = template.content.cloneNode(true);
  
      // Set title
      const title = frag.querySelector('.card-title');
      if (title) title.textContent = `Card ${nextId}`;
  
      // Wire up Term
      const termInput = frag.querySelector('.card-term');
      const termLabel = frag.querySelector('label[for="card-term-__ID__"]');
      if (termInput) {
        const termId = `card-term-${nextId}`;
        termInput.id = termId;
        termInput.name = `cards[${nextId - 1}][term]`;
        if (termLabel) termLabel.setAttribute('for', termId);
      }
  
      // Wire up Definition
      const defInput = frag.querySelector('.card-definition');
      const defLabel = frag.querySelector('label[for="card-def-__ID__"]');
      if (defInput) {
        const defId = `card-def-${nextId}`;
        defInput.id = defId;
        defInput.name = `cards[${nextId - 1}][definition]`;
        if (defLabel) defLabel.setAttribute('for', defId);
      }
  
      container.appendChild(frag);
      nextId += 1;
    }
  
    addBtn.addEventListener('click', addCard);

    // Gather inputs and POST to the API
    document.getElementById('save-set')?.addEventListener('click', async () => {
      const title = document.getElementById('flashcard-title')?.value || '';
      const description = document.getElementById('flashcard-description')?.value || '';
      const cards = [...document.querySelectorAll('#cards-container section')].map(section => ({
        term: section.querySelector('.card-term')?.value || '',
        definition: section.querySelector('.card-definition')?.value || ''
      }));
    
      try {
        const res = await fetch('/api/flashcard-sets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, cards })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to save');
        alert(`Saved! id: ${data.id}`);
      } catch (err) {
        console.error(err);
        alert('Error saving set');
      }
    });
  });