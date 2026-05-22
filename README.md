# Resume2Role

Resume2Role is a full-stack MERN company research platform for students preparing for placements and interviews. Users enter a company and target role, then receive a polished dashboard with company context, role skills, interview topics, employee review summary, recent news placeholders, and resume-fit guidance.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- AI layer: Groq API with a mock fallback only when explicitly enabled

## Project Structure

```txt
Resume2Role/
  client/        React + Vite frontend
  server/        Express + Mongoose backend
```

## Setup

1. Install dependencies:

```bash
npm run install
```

2. Create backend environment file:

```bash
cp server/.env.example server/.env
```

3. Update `server/.env` with your MongoDB connection string:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/resume2role
PORT=5000
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
ALLOW_DEMO_FALLBACK=false
```

4. Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## API Endpoints

- `POST /api/company/analyze` - Create a new company analysis
- `GET /api/company` - List saved analyses
- `GET /api/company/:id` - Get one analysis
- `DELETE /api/company/:id` - Delete one saved analysis

## AI Mode

The backend calls Groq from `server/src/services/groqAnalysisService.js`. Normal analysis requires `GROQ_API_KEY`; if the key is missing, the API returns a clear setup error instead of fake template data. Set `ALLOW_DEMO_FALLBACK=true` only when you intentionally want mock/demo output.

## Deployment Notes

- The client is Vercel-ready as a Vite app.
- The backend includes `server/api/index.js` for a future Vercel serverless deployment and `server/src/index.js` for regular Node hosting.
- Set `VITE_API_URL` in the frontend deployment to the backend URL.
- Add production MongoDB credentials in deployment environment variables.
