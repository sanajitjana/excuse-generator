let excuses = [];

fetch('excuses.json')
  .then(response => response.json())
  .then(data => {
    excuses = data;
  })
  .catch(err => {
    console.error('Failed to load excuses:', err);
  });

document.getElementById('generate-btn').addEventListener('click', () => {
  if (excuses.length === 0) return;

  const randomIndex = Math.floor(Math.random() * excuses.length);
  const excuse = excuses[randomIndex];

  document.getElementById('excuse-display').textContent = excuse;
});