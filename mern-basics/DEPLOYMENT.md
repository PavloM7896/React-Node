# PaaS Deployment Guide (MERN Stack)

To deploy your MERN app for free, we'll use **Vercel** for the React Frontend and **Render** for the NestJS Backend.

## Step 1: Push your code to GitHub
Make sure all your code is committed and pushed to a repository on GitHub.

## Step 2: Deploy Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a free tier cluster.
2. In Database Access, create a database user and password.
3. In Network Access, allow access from anywhere (`0.0.0.0/0`).
4. Click "Connect", choose "Drivers", and copy your **Connection String**.

## Step 3: Deploy Backend on Render
1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
5. Go to **Environment Variables** and add:
   - `MONGODB_URI`: *<Paste your connection string from Step 2>*
6. Click **Create Web Service**. Wait for it to deploy and copy the generated **Render URL** (e.g., `https://mern-api-xxxx.onrender.com`).

## Step 4: Deploy Frontend on Vercel
1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Before clicking Deploy, configure the project:
   - **Root Directory:** Click "Edit" and type `client`.
   - **Framework Preset:** Vite
5. Open the **Environment Variables** section and add:
   - Name: `VITE_API_URL`
   - Value: *<Paste your Render Web Service URL from Step 3 without an ending slash>* (e.g., `https://mern-api-xxxx.onrender.com`)
6. Click **Deploy**.

## Step 5: Final Server Update (CORS)
Now that your frontend is deployed, you need to tell your backend to trust it!
1. Go back to your Backend Web Service on **Render**.
2. Go to **Environment Variables**.
3. Add a new variable:
   - Name: `CLIENT_URL`
   - Value: *<Paste your Vercel Frontend URL>* (e.g., `https://your-react-app.vercel.app`)
4. Save and let Render automatically restart the server.

You're done! Your app is now accessible for other people remotely.
