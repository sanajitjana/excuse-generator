# Random Excuse Generator

A simple and funny web app that generates random excuses when you didn’t finish your work, show up late, or skip a meeting.  
Now powered with an **Express.js backend API** that serves excuses dynamically!

## Features
- Generate random excuses with one click.
- Excuses served via a custom API (`/api/random-excuse`).
- Frontend (`index.html`, `script.js`, `styles.css`) hosted directly from the same Express server.
- Easy to extend by adding new excuses in `excuses.json`.

## Project Structure

excuse-generator/
│
├── index.html        # Frontend page
├── script.js         # Handles button + API calls
├── styles.css        # Styling
├── excuses.json      # List of excuses
└── server.js         # Express.js server (backend + frontend host)


## How to Run
1. Clone the repository:

   git clone <your-repo-url>
   cd excuse-generator


2. Install dependencies:

   npm install

3. Start the server:

   node server.js
   
4. Open in your browser:
   http://localhost:5000

## API Endpoint

* `GET /api/random-excuse` → returns a random excuse as JSON.
  Example:
  {
    "excuse": "My dog ate my laptop because he wanted to become a software engineer."
  }

## How to Contribute

1. Fork the repo.
2. Add your funny excuse to `excuses.json`.
3. Submit a pull request.

## License

This project is licensed under the MIT License.
