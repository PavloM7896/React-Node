# MERN Basics Starter

This repo includes a minimal MERN setup:
- React (Vite) client in `client/`
- Express + Mongoose API in `server/`
- MongoDB in-memory by default (swap to real Mongo with `MONGODB_URI`)

## Run

```bash
cd /Users/pavlomusianovych/Documents/React+Node/mern-basics
npm run dev
```

Client: `http://localhost:5180`  
API: `http://localhost:5050/api`

## Environment

For a real MongoDB, create `server/.env`:

```
PORT=5050
MONGODB_URI=mongodb://localhost:27017/mern_basics
```
