# DOCUMENTATION API
## Archimag - REST API Reference

**Version** : 1.0  
**Base URL** : `https://api.archimag.votreentreprise.com/api`  
**Authentication** : Bearer Token (JWT)

---

## Table des Matières

1. [Authentification](#authentification)
2. [Erreurs](#erreurs)
3. [Endpoints Utilisateurs](#endpoints-utilisateurs)
4. [Endpoints Documents](#endpoints-documents)
5. [Endpoints Dossiers](#endpoints-dossiers)
6. [Endpoints Permissions](#endpoints-permissions)
7. [Endpoints Workflows](#endpoints-workflows)
8. [Endpoints Recherche](#endpoints-recherche)
9. [Rate Limiting](#rate-limiting)

---

## Authentification

### POST /auth/login

**Connexion utilisateur**

```http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200)** :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "fullName": "Jean Dupont",
    "role": "user",
    "avatar": "https://..."
  },
  "expiresIn": 86400
}
```

### POST /auth/refresh

**Renouveler le token**

```http
POST /auth/refresh HTTP/1.1
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/logout

**Déconnexion**

```http
POST /auth/logout HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (204)** : No Content

---

## Erreurs

### Format d'Erreur Standard

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token invalide ou expiré",
    "details": {
      "field": "authorization",
      "reason": "token_expired"
    },
    "timestamp": "2026-07-10T12:00:00Z",
    "requestId": "req_123456789"
  }
}
```

### Codes d'Erreur Courants

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Token manquant ou invalide |
| `FORBIDDEN` | 403 | Permissions insuffisantes |
| `NOT_FOUND` | 404 | Ressource non trouvée |
| `VALIDATION_ERROR` | 400 | Données invalides |
| `CONFLICT` | 409 | Ressource déjà existante |
| `RATE_LIMIT_EXCEEDED` | 429 | Trop de requêtes |
| `INTERNAL_ERROR` | 500 | Erreur serveur |

---

## Endpoints Utilisateurs

### GET /users/me

**Récupérer les infos utilisateur courant**

```http
GET /users/me HTTP/1.1
Authorization: Bearer TOKEN
```

**Response (200)** :

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "fullName": "Jean Dupont",
  "avatar": "https://...",
  "role": "user",
  "department": "Finance",
  "createdAt": "2026-01-15T10:30:00Z",
  "lastLogin": "2026-07-10T09:15:00Z",
  "preferences": {
    "language": "fr",
    "theme": "light",
    "notifications": true
  }
}
```

### PATCH /users/me

**Mettre à jour son profil**

```http
PATCH /users/me HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "fullName": "Jean Dupont",
  "avatar": "data:image/jpeg;base64,...",
  "preferences": {
    "language": "fr",
    "theme": "dark"
  }
}
```

### GET /users

**Lister les utilisateurs (Admin)**

```http
GET /users?page=1&limit=50&search=jean&role=user HTTP/1.1
Authorization: Bearer TOKEN
```

**Response (200)** :

```json
{
  "data": [
    {
      "id": "...",
      "email": "jean@example.com",
      "fullName": "Jean Dupont",
      "role": "user",
      "status": "active",
      "lastLogin": "2026-07-10T09:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 125,
    "pages": 3
  }
}
```

---

## Endpoints Documents

### POST /documents

**Uploader un document**

```http
POST /documents HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

Content:
  file: (binary)
  folderId: 550e8400-e29b-41d4-a716-446655440000
  name: "Rapport_Q2_2026.pdf"
  description: "Rapport financier Q2"
  metadata: {"department": "Finance", "classification": "Internal"}
```

**Response (201)** :

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Rapport_Q2_2026.pdf",
  "size": 2457600,
  "mimeType": "application/pdf",
  "owner": "jean@example.com",
  "createdAt": "2026-07-10T12:00:00Z",
  "updatedAt": "2026-07-10T12:00:00Z",
  "url": "https://.../documents/550e8400-e29b-41d4-a716-446655440001",
  "metadata": {...},
  "version": 1
}
```

### GET /documents/{id}

**Récupérer les infos d'un document**

```http
GET /documents/550e8400-e29b-41d4-a716-446655440001 HTTP/1.1
Authorization: Bearer TOKEN
```

### GET /documents/{id}/download

**Télécharger un document**

```http
GET /documents/550e8400-e29b-41d4-a716-446655440001/download HTTP/1.1
Authorization: Bearer TOKEN
```

**Response** : Fichier binaire avec Content-Disposition

### PUT /documents/{id}

**Mettre à jour les métadonnées**

```http
PUT /documents/550e8400-e29b-41d4-a716-446655440001 HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Rapport_Q2_2026_Final.pdf",
  "description": "Version finalisée",
  "metadata": {
    "department": "Finance",
    "status": "Approved"
  }
}
```

### DELETE /documents/{id}

**Supprimer un document**

```http
DELETE /documents/550e8400-e29b-41d4-a716-446655440001 HTTP/1.1
Authorization: Bearer TOKEN
```

**Response (204)** : No Content

### GET /documents/{id}/versions

**Lister les versions d'un document**

```http
GET /documents/550e8400-e29b-41d4-a716-446655440001/versions HTTP/1.1
Authorization: Bearer TOKEN
```

**Response (200)** :

```json
{
  "versions": [
    {
      "version": 3,
      "createdAt": "2026-07-10T15:30:00Z",
      "createdBy": "jean@example.com",
      "size": 2457600,
      "changes": "Updated metadata"
    },
    {
      "version": 2,
      "createdAt": "2026-07-09T14:20:00Z",
      "createdBy": "marie@example.com",
      "size": 2345600,
      "changes": "Fixed typos"
    }
  ]
}
```

---

## Endpoints Dossiers

### POST /folders

**Créer un dossier**

```http
POST /folders HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Factures 2026",
  "parentId": "550e8400-e29b-41d4-a716-446655440000",
  "description": "Factures de l'année 2026",
  "color": "#FF5733"
}
```

### GET /folders/{id}

**Récupérer les infos d'un dossier**

```http
GET /folders/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Authorization: Bearer TOKEN
```

### GET /folders/{id}/contents

**Lister le contenu d'un dossier**

```http
GET /folders/550e8400-e29b-41d4-a716-446655440000/contents?page=1&limit=50 HTTP/1.1
Authorization: Bearer TOKEN
```

**Response (200)** :

```json
{
  "items": [
    {
      "type": "document",
      "id": "...",
      "name": "Invoice_001.pdf",
      "size": 102400,
      "createdAt": "2026-07-10T10:00:00Z"
    },
    {
      "type": "folder",
      "id": "...",
      "name": "Factures Payées",
      "createdAt": "2026-07-05T09:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### PUT /folders/{id}

**Mettre à jour un dossier**

```http
PUT /folders/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Factures 2026 - Finalisées",
  "description": "..."
}
```

### DELETE /folders/{id}

**Supprimer un dossier**

```http
DELETE /folders/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Authorization: Bearer TOKEN
```

---

## Endpoints Permissions

### POST /permissions

**Partager un document/dossier**

```http
POST /permissions HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "resourceId": "550e8400-e29b-41d4-a716-446655440001",
  "resourceType": "document",
  "recipientEmail": "marie@example.com",
  "level": "edit",
  "expiresAt": "2026-08-10T23:59:59Z"
}
```

**Levels disponibles** :
- `view` - Lecture seule
- `edit` - Modification
- `admin` - Administration complète

### GET /permissions/{resourceId}

**Lister les permissions d'une ressource**

```http
GET /permissions/550e8400-e29b-41d4-a716-446655440001 HTTP/1.1
Authorization: Bearer TOKEN
```

### DELETE /permissions/{permissionId}

**Révoquer une permission**

```http
DELETE /permissions/550e8400-e29b-41d4-a716-446655440050 HTTP/1.1
Authorization: Bearer TOKEN
```

---

## Endpoints Workflows

### POST /workflows

**Créer un workflow**

```http
POST /workflows HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Approbation Factures",
  "description": "Workflow d'approbation des factures",
  "trigger": {
    "type": "document_uploaded",
    "filters": {
      "folderId": "550e8400-e29b-41d4-a716-446655440000"
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "notify",
      "recipient": "marie@example.com",
      "message": "Veuillez approuver {documentName}"
    },
    {
      "id": "step_2",
      "type": "approve",
      "approver": "marie@example.com",
      "timeout": 604800
    }
  ]
}
```

### GET /workflows/{id}

**Récupérer les détails d'un workflow**

### GET /workflows/{id}/instances

**Lister les instances d'exécution**

```http
GET /workflows/550e8400-e29b-41d4-a716-446655440100/instances HTTP/1.1
Authorization: Bearer TOKEN
```

---

## Endpoints Recherche

### GET /search

**Recherche simple**

```http
GET /search?q=facture&type=document&limit=50 HTTP/1.1
Authorization: Bearer TOKEN
```

### POST /search/advanced

**Recherche avancée**

```http
POST /search/advanced HTTP/1.1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "keywords": "facture",
  "filters": {
    "type": "document",
    "author": "jean@example.com",
    "createdAfter": "2026-07-01T00:00:00Z",
    "createdBefore": "2026-07-10T23:59:59Z",
    "classification": "internal"
  },
  "sort": "relevance",
  "page": 1,
  "limit": 50
}
```

**Response (200)** :

```json
{
  "results": [
    {
      "id": "...",
      "type": "document",
      "name": "Facture_001.pdf",
      "excerpt": "...",
      "score": 0.98,
      "url": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 234,
    "pages": 5
  },
  "facets": {
    "type": [{"value": "document", "count": 234}],
    "author": [{"value": "jean@example.com", "count": 150}]
  }
}
```

---

## Rate Limiting

### Limites par Rôle

| Rôle | Requêtes/min | Requêtes/jour |
|------|-------------|---------------|
| Utilisateur | 100 | 10,000 |
| Admin | 500 | 50,000 |
| API Key | 1,000 | 100,000 |

### Headers de Réponse

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1657524000
```

### Exemple d'Erreur

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Trop de requêtes",
    "retryAfter": 60
  }
}
```

---

**Documentation** : API Reference v1.0  
**Date** : Juillet 2026  
**URL Interactive** : https://api.archimag.votreentreprise.com/api/docs (Swagger/OpenAPI)