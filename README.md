Overview

ReelReview is a full-stack web application that allows users to browse, review, and rate movies while managing their personal watchlists.
It’s built with a secure JWT-based authentication system, optimized REST APIs, and a responsive React front-end for real-time interaction.
This project was developed to practice full-stack development, improve performance optimization, and learn how to handle authentication, database schema design, and user-driven interactivity at scale.


Features

JWT Authentication for secure login and protected routes
Movie reviews, likes, and rating system with live updates
Personal watchlists
Optimized RESTful APIs with caching and query improvements
MongoDB schema's connected to user's information
Responsive React UI
Integration with TMDB API

Tech Stack

Frontend: React, Next.js, TailwindCSS, Axios

Backend: Node.JS, Express, MongoDB, JWT, Mongoose

Deployment: Vercel, Render


Future Improvements

* Integrate OAuth login with Google
* Add AI-powered review summarization
* Add more social features like following, and friends



Setup & Installation

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/reelreview.git
cd reelreview
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run the backend server:**
```bash
cd server
npm run dev
```

**4. Run the frontend:**
```bash
cd client
npm run dev
```

**5. Create .env files:**
```bash
MONGO_URI=<your connection string>
JWT_SECRET=<your secret key>
TMDB_API_KEY=<your API key>
```



