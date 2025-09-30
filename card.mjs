document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-flashcard');
    const container = document.getElementById('flashcards');
    const template = document.getElementById('flashcard-template');
    let count = 0;

    function addFlashcard() {
      count += 1;
      const frag = template.content.cloneNode(true);

      const title = frag.querySelector('.flashcard-title');
      const termInput = frag.querySelector('.flashcard-term');
      const defInput = frag.querySelector('.flashcard-definition');
      const termLabel = frag.querySelector('.label-term');
      const defLabel = frag.querySelector('.label-def');

      title.textContent = `#${count}`;

      const termId = `flashcard-term-${count}`;
      const defId = `flashcard-definition-${count}`;
      termInput.id = termId;
      defInput.id = defId;

      // Optional: name fields so they serialize as an array if inside a form
      termInput.name = `flashcards[${count - 1}][term]`;
      defInput.name = `flashcards[${count - 1}][definition]`;

      termLabel.setAttribute('for', termId);
      defLabel.setAttribute('for', defId);

      container.appendChild(frag);
    }

    addBtn.addEventListener('click', addFlashcard);

    // Start with one
    addFlashcard();
  });