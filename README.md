# PawCare

## Deploy with Docker Compose

This deployment runs the React frontend and Express backend from Docker Hub images. MongoDB remains hosted by MongoDB Atlas; Compose does not start a local database container.

### Requirements

- Docker Engine or Docker Desktop with the Docker Compose plugin
- Access to the PawCare Docker Hub images
- MongoDB Atlas connection details and an Atlas network rule that allows connections from the deploying computer

### 1. Create the backend environment file

Create a separate `Backend/.env` on every computer that will run the application. From the repository root, copy the template:

```powershell
Copy-Item Backend/.env.example Backend/.env
```

Edit `Backend/.env` and provide the real `MONGODB_URI` and a private `JWT_SECRET` (at least 32 characters). Keep the other values appropriate for this deployment. Do not commit `Backend/.env` or share its contents. Compose supplies these variables to the backend container at runtime; the Docker images do not contain the file.

### 2. Validate, download, and start

Run these commands from the repository root after creating `Backend/.env`:

```powershell
docker compose config --quiet
# Only needed if the Docker Hub repositories are private:
docker login
docker compose pull
docker compose up -d
```

Compose pulls:

- `senura2002/pawcare-frontend:latest`
- `senura2002/pawcare-backend:latest`

The frontend is available at <http://localhost:5173>. Nginx serves the frontend and proxies `/api/` requests to the backend over the private Compose network. The backend health endpoint is also mapped to <http://localhost:5000/api/health> on the local computer.

### 3. Check the deployment

```powershell
docker compose ps
Invoke-WebRequest http://localhost:5173
Invoke-WebRequest http://localhost:5000/api/health
docker compose logs --tail=100 backend frontend
```

The backend health response should report `"database":"connected"`. To follow logs while testing registration or login, run `docker compose logs -f backend frontend`.

### Stop the services

```powershell
docker compose down
```

The backend runs in production mode, so authentication cookies use the `Secure` attribute. This Compose setup does not terminate TLS. For non-localhost access, put the services behind an HTTPS reverse proxy or load balancer; do not weaken cookie security to make plain HTTP access work.
