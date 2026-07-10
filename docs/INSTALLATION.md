# GUIDE D'INSTALLATION ET DÉPLOIEMENT
## Archimag - Application de Gestion Électronique des Documents

**Version** : 1.0  
**Date** : Juillet 2026  

---

## Table des Matières

1. [Prérequis](#prérequis)
2. [Installation Locale (Développement)](#installation-locale-développement)
3. [Déploiement Production](#déploiement-production)
4. [Configuration](#configuration)
5. [Vérifications Post-Installation](#vérifications-post-installation)
6. [Troubleshooting](#troubleshooting)

---

## Prérequis

### Systèmes d'Exploitation Supportés

- 🐧 **Linux** : Ubuntu 20.04+, CentOS 8+, Debian 11+
- 🍎 **macOS** : 11.0+
- 🪟 **Windows** : Windows Server 2019+, WSL2

### Logiciels Requis

#### Frontend
- **Node.js** : 16.x ou 18.x
- **npm** ou **yarn** : 8.x+
- **Git** : 2.30+

#### Backend
- **Node.js** 18.x + Express.js OU
- **Python** 3.9+ + FastAPI OU
- **Java** 11+ + Spring Boot

#### Bases de Données
- **PostgreSQL** : 14.x ou 15.x
- **Elasticsearch** : 8.x ou OpenSearch 2.x
- **Redis** : 7.x

#### Stockage
- **S3/MinIO** : Pour objets volumineux
- **Espace disque** : Min 100 GB (production)

#### Conteneurisation (Optionnel mais Recommandé)
- **Docker** : 20.10+
- **Docker Compose** : 2.0+
- **Kubernetes** (optionnel) : 1.24+

---

## Installation Locale (Développement)

### Étape 1 : Cloner le Dépôt

```bash
# Clone du repository
git clone https://github.com/Houston-prog/Archimag.git
cd Archimag

# Créer une branche de développement
git checkout -b feature/development
```

### Étape 2 : Installer les Dépendances

#### Option A : Node.js + Express (Recommandé pour démarrage rapide)

```bash
# Frontend
cd frontend
npm install
# ou
yarn install

# Backend
cd ../backend
npm install
```

#### Option B : Python + FastAPI

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Option C : Java + Spring Boot

```bash
cd backend
./mvnw clean install  # Linux/Mac
# ou
mvnw.cmd clean install  # Windows
```

### Étape 3 : Configurer les Variables d'Environnement

#### Backend (.env)

```bash
cd backend
cp .env.example .env
```

**Contenu du fichier .env** :

```env
# APPLICATION
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000

# DATABASE
DB_HOST=localhost
DB_PORT=5432
DB_NAME=archimag_dev
DB_USER=postgres
DB_PASSWORD=password123
DB_SSL=false

# ELASTICSEARCH
ELASTIC_HOST=localhost
ELASTIC_PORT=9200
ELASTIC_USER=elastic
ELASTIC_PASSWORD=changeme

# REDIS
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# STORAGE
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=archimag-documents
S3_REGION=us-east-1

# SECURITY
JWT_SECRET=votre-clé-secrète-très-longue-et-sécurisée
JWT_EXPIRY=7d

# EMAIL
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=app-password
SMTP_FROM=noreply@archimag.local

# LOGGING
LOG_LEVEL=info
LOG_FORMAT=json
```

#### Frontend (.env)

```bash
cd frontend
cp .env.example .env
```

**Contenu du fichier .env** :

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000
REACT_APP_ENVIRONMENT=development
REACT_APP_MAX_FILE_SIZE=10737418240
```

### Étape 4 : Démarrer les Services

#### Option A : Docker Compose (Recommended)

```bash
# À la racine du projet
docker-compose -f docker-compose.dev.yml up -d

# Vérifier que les services démarrent
docker-compose logs -f
```

**Fichier docker-compose.dev.yml** (à créer) :

```yaml
version: '3.9'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: archimag_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    healthcheck:
      test: ["CMD-SHELL", "curl -s http://localhost:9200/_cluster/health | grep -q '\"status\"'"]
      interval: 10s
      timeout: 5s
      retries: 5

  minio:
    image: minio/minio:latest
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - ELASTIC_HOST=elasticsearch
      - S3_ENDPOINT=http://minio:9000
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      elasticsearch:
        condition: service_healthy
      minio:
        condition: service_healthy
    command: npm run dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:3001/api
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    command: npm start

volumes:
  postgres_data:
  redis_data:
  elasticsearch_data:
  minio_data:
```

#### Option B : Démarrage Manuel

```bash
# Terminal 1 - PostgreSQL (si non conteneurisé)
postgres

# Terminal 2 - Redis
redis-server

# Terminal 3 - Elasticsearch
bin/elasticsearch

# Terminal 4 - Backend
cd backend
npm run dev

# Terminal 5 - Frontend
cd frontend
npm start
```

### Étape 5 : Initialiser la Base de Données

```bash
# Créer les tables et schémas
cd backend
npm run migrate

# (Optionnel) Remplir avec des données de démonstration
npm run seed
```

### Étape 6 : Accéder à l'Application

```
🌐 Frontend Web   : http://localhost:3000
🔗 API Backend    : http://localhost:3001/api
📊 MinIO Console  : http://localhost:9001 (user: minioadmin)
🔍 Elasticsearch  : http://localhost:9200
```

### Comptes de Démonstration

```
👤 Admin
   Email: admin@archimag.local
   Password: Admin@123456

👤 Utilisateur Standard
   Email: user@archimag.local
   Password: User@123456
```

---

## Déploiement Production

### Architecture de Production Recommandée

```
                    ┌─────────────────┐
                    │  Load Balancer  │ (Nginx/HAProxy)
                    │   (SSL/TLS)     │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         ┌──▼──┐          ┌──▼──┐         ┌──▼──┐
         │ Pod │          │ Pod │         │ Pod │ (Kubernetes)
         │ API │          │ API │         │ API │
         └──┬──┘          └──┬──┘         └──┬──┘
            │                │                │
            └────────────────┼────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
      ┌───▼───┐         ┌────▼────┐       ┌────▼────┐
      │  DB   │         │  Cache  │       │  Search │
      │  (PG) │         │ (Redis) │       │   (ES)  │
      └───────┘         └─────────┘       └─────────┘
          │
      ┌───▼────────┐
      │  Backup    │ (S3/Cloud Storage)
      │ Daily 03:00│
      └────────────┘
```

### Déploiement sur AWS (Exemple)

#### 1. Préparer l'Image Docker

```bash
# Build l'image backend
cd backend
docker build -f Dockerfile.prod -t archimag-api:latest .

# Tagger pour ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.eu-west-1.amazonaws.com

docker tag archimag-api:latest 123456789.dkr.ecr.eu-west-1.amazonaws.com/archimag-api:latest

# Push à ECR
docker push 123456789.dkr.ecr.eu-west-1.amazonaws.com/archimag-api:latest
```

#### 2. Déployer sur ECS/Kubernetes

```bash
# Utiliser Terraform ou CloudFormation
terraform apply -var-file=prod.tfvars

# Ou avec Kubernetes
kubectl apply -f k8s/production/
```

#### 3. Configurer RDS (PostgreSQL Managé)

```bash
# Via AWS CLI
aws rds create-db-instance \
  --db-instance-identifier archimag-prod \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --master-username postgres \
  --allocated-storage 100
```

#### 4. Configurer ElastiCache (Redis Managé)

```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id archimag-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
```

#### 5. S3 pour Stockage Fichiers

```bash
aws s3api create-bucket \
  --bucket archimag-documents-prod \
  --region eu-west-1 \
  --create-bucket-configuration LocationConstraint=eu-west-1

# Chiffrement
aws s3api put-bucket-encryption \
  --bucket archimag-documents-prod \
  --server-side-encryption-configuration '...'

# Versioning
aws s3api put-bucket-versioning \
  --bucket archimag-documents-prod \
  --versioning-configuration Status=Enabled
```

#### 6. Backup Automatique

```bash
# RDS Backup
aws rds create-db-instance \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00" \
  --preferred-maintenance-window "sun:04:00-sun:05:00"

# S3 Lifecycle Policy
aws s3api put-bucket-lifecycle-configuration \
  --bucket archimag-documents-prod \
  --lifecycle-configuration file://lifecycle.json
```

---

## Configuration

### Configuration SSL/TLS

```bash
# Générer certificat auto-signé (dev)
openssl req -x509 -newkey rsa:4096 -nodes \
  -out cert.pem -keyout key.pem -days 365

# Ou obtenir via Let's Encrypt (prod)
certbot certonly --standalone -d archimag.votreentreprise.com
```

### Configuration SMTP (Email)

```env
# Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=app-specific-password

# Office 365
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=votre-email@votreentreprise.com
SMTP_PASSWORD=votre-mot-de-passe
```

### Configuration LDAP/Active Directory

```javascript
// backend/config/ldap.js
module.exports = {
  url: 'ldap://ldap.votreentreprise.com:389',
  baseDN: 'dc=votreentreprise,dc=com',
  bindDN: 'cn=admin,dc=votreentreprise,dc=com',
  bindPassword: process.env.LDAP_BIND_PASSWORD,
  searchFilter: '(uid={{username}})',
  attributes: ['uid', 'mail', 'displayName', 'memberOf']
};
```

---

## Vérifications Post-Installation

### Health Checks

```bash
# API
curl http://localhost:3001/api/health

# Expected response:
# {"status": "ok", "timestamp": "2026-07-10T12:00:00Z"}

# Database
curl http://localhost:3001/api/health/db

# Expected response:
# {"database": "connected", "responseTime": "2ms"}
```

### Tests Automatisés

```bash
# Frontend
cd frontend
npm test                    # Unit tests
npm run test:e2e           # End-to-end tests

# Backend
cd backend
npm test                    # Unit tests
npm run test:integration   # Integration tests
npm run test:load          # Load tests
```

### Monitoring et Logs

```bash
# Docker logs
docker-compose logs -f backend

# Journalctl (Linux)
journalctl -u archimag-api -f

# Kubernetes logs
kubectl logs -f deployment/archimag-api
```

---

## Troubleshooting

### Erreur : "Port déjà utilisé"

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erreur : "Connexion à PostgreSQL échouée"

```bash
# Vérifier que PostgreSQL démarre
psql -U postgres -d postgres

# Vérifier les variables d'env
echo $DB_HOST  # doit être localhost ou 127.0.0.1
```

### Erreur : "Elasticsearch n'est pas disponible"

```bash
# Vérifier la connectivité
curl http://localhost:9200/_cluster/health

# Redémarrer
docker-compose restart elasticsearch
```

---

**Document** : Guide d'Installation v1.0  
**Date** : Juillet 2026  
**Statut** : Production Ready