document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display existing flashcard sets
  async function loadSets() {
    const setsList = document.getElementById('sets-list');
    const setDetails = document.getElementById('set-details');
    if (!setsList) return;
    setsList.innerHTML = '<div class="text-muted">Loading...</div>';
    setDetails.innerHTML = '';
    try {
      const res = await fetch('/api/flashcard-sets');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch sets');
      if (!data.items.length) {
        setsList.innerHTML = '<div class="text-muted">No sets found.</div>';
        return;
      }
      setsList.innerHTML = '';
      data.items.forEach(set => {
        // Normalize id from possible shapes: id, _id.$oid, _id
        const id = set.id || set._id?.$oid || set._id;
        const item = document.createElement('button');
        item.className = 'list-group-item list-group-item-action';
        item.textContent = set.title || '(Untitled)';
        item.onclick = () => showSetDetails(id, set.title, set.description);
        setsList.appendChild(item);
      });
    } catch (err) {
      setsList.innerHTML = '<div class="text-danger">Error loading sets</div>';
    }
  }

  // Fetch and show details for a single set
  async function showSetDetails(id, title, description) {
    const setDetails = document.getElementById('set-details');
    setDetails.innerHTML = '<div class="text-muted">Loading set...</div>';
    try {
      const res = await fetch(`/api/flashcard-sets/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch set');
      const cards = Array.isArray(data.cards) ? data.cards : [];
      setDetails.innerHTML = `<div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description || ''}</p>
          <h6 class="mt-3">Cards:</h6>
          <ul class="list-group mb-2">
            ${cards.map(card => `<li class="list-group-item"><strong>${card.term}</strong>: ${card.definition}</li>`).join('')}
          </ul>
        </div>
      </div>`;
    } catch (err) {
      setDetails.innerHTML = '<div class="text-danger">Error loading set details</div>';
    }
  }

  // Initial load
  loadSets();

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