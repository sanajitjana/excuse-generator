document.getElementById('generate-btn').addEventListener('click', () => {
  fetch('/api/random-excuse')
    .then(res => res.json())
    .then(data => {
      document.getElementById('excuse-display').textContent = data.excuse;
    })
    .catch(err => {
      console.error('Failed to fetch excuse:', err);
      document.getElementById('excuse-display').textContent = "Error loading excuse!";
    });
});
