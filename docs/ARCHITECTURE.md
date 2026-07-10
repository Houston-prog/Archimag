# ARCHITECTURE TECHNIQUE - Archimag

## Vue d'Ensemble

Ce document décrit l'architecture technique de l'application Archimag.

### Stack Recommandé

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER: PRÉSENTATION                      │
│  React / Vue.js + TypeScript → Web UI responsive            │
│  React Native → Mobile (iOS/Android)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ (HTTP/REST + GraphQL)
┌──────────────────────▼──────────────────────────────────────┐
│                 LAYER: API & SERVICES                       │
│  Node.js / Python FastAPI / Java Spring Boot               │
│  • Authentication & Authorization                           │
│  • Document Management                                      │
│  • Workflow Engine                                          │
│  • Audit & Compliance                                       │
│  • Reporting                                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼───────┐ ┌───▼───────┐ ┌──▼─────────┐
│ PostgreSQL    │ │Elasticsearch│ │S3 / MinIO  │
│ (Metadata)    │ │(Full-Text) │ │ (Files)    │
└───────────────┘ └────────────┘ └────────────┘
        │              │              │
┌───────▴──────────────┴──────────────┴────┐
│                                          │
│  LAYER: SERVICES EXTERNES               │
│  • Email (SendGrid, SMTP)                │
│  • SMS (Twilio)                          │
│  • OAuth2 / SAML (Auth providers)        │
│  • KMS (Key Management Service)          │
│  • Webhooks (External integrations)      │
└──────────────────────────────────────────┘
```

### Composants Principaux

| Composant | Rôle | Technologie |
|-----------|------|-------------|
| Frontend Web | Interface utilisateur | React/Vue.js + Material UI |
| Frontend Mobile | App mobile | React Native / Flutter |
| API Gateway | Routage et sécurité | Kong / API Gateway AWS |
| Services Backend | Logique métier | Node.js / Python / Java |
| PostgreSQL | Base de données relationnelle | PostgreSQL 14+ |
| Elasticsearch | Search & Analytics | Elasticsearch 8+ |
| S3/MinIO | Stockage de fichiers | AWS S3 ou MinIO |
| Redis | Cache & Sessions | Redis 7+ |
| Message Queue | Workflows asynchrones | RabbitMQ / Kafka |

---

## Modèle de Données

Voir `DATABASE_SCHEMA.md` pour le schéma détaillé.

---

## Points de Contact

Pour les questions d'architecture :

📧 **Architecture Team** : arch-team@houston-prog.dev