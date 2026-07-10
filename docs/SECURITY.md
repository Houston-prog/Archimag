# POLITIQUE DE SÉCURITÉ
## Archimag - Security & Compliance Guidelines

**Version** : 1.0  
**Date** : Juillet 2026  
**Classification** : Confidentiel Interne

---

## Table des Matières

1. [Principes de Sécurité](#principes-de-sécurité)
2. [Authentification](#authentification)
3. [Chiffrement](#chiffrement)
4. [Contrôle d'Accès](#contrôle-daccès)
5. [Conformité](#conformité)
6. [Incident Response](#incident-response)
7. [Audit et Monitoring](#audit-et-monitoring)

---

## Principes de Sécurité

### Piliers Fondamentaux

```
┌──────────────┐
│ Confidentialité  │  Seules les personnes autorisées accèdent aux données
└──────────────┘

┌──────────────┐
│ Intégrité    │  Les données ne sont pas altérées ou corrompues
└──────────────┘

┌──────────────┐
│ Disponibilité│  Les services sont accessibles quand nécessaire
└──────────────┘
```

### Responsabilités

| Rôle | Responsabilités |
|------|------------------|
| **CTO/CISO** | Stratégie sécurité, audit, incidents graves |
| **DevSecOps** | Sécurité CI/CD, infrastructure, secrets |
| **Développeurs** | Secure coding, code review, tests |
| **Administrateurs** | Accès utilisateurs, backups, monitoring |
| **Utilisateurs** | Mots de passe forts, 2FA, hygiène de sécurité |

---

## Authentification

### Politique de Mot de Passe

#### Exigences Minimales

- ✅ Longueur : Minimum 12 caractères
- ✅ Complexité : Majuscules + minuscules + chiffres + symboles
- ✅ Historique : Au moins 5 mots de passe précédents non-réutilisables
- ✅ Expiration : 90 jours (rappel à 30 jours)
- ✅ Compte bloqué : Après 5 tentatives échouées (déverrouillage manuel 30 min)

#### Exemple de Mot de Passe Valide

```
❌ MAUVAIS    : Facture2026, password123, abc123
✅ BON        : F@cture2026#ABC, Archimag$Secure2026!
```

### Authentification Multi-Facteur (MFA)

#### Obligatoire pour

- 🛑 Administrateurs
- 🛑 Compte avec droits élevés
- 🛑 Accès après 3 tentatives échouées consécutives

#### Méthodes Supportées

| Méthode | Sécurité | Utilisation |
|---------|----------|-------------|
| **TOTP** (Google Authenticator) | Très Haute | Recommandée |
| **SMS** | Moyenne | Seconde option |
| **Email** | Basse | Fallback only |
| **Clé de Sécurité** (FIDO2/U2F) | Très Haute | Premium |

### Session Management

```javascript
// Token JWT
{
  "iss": "archimag",
  "sub": "user_id",
  "aud": "api.archimag.com",
  "exp": 1657524000,        // 8 heures
  "iat": 1657503600,
  "scope": ["read", "write"]
}

// Refresh Token
// Valide 30 jours
// Renouvelé à chaque utilisation
// Stocké de manière sécurisée (httpOnly cookie)
```

#### Délais de Session

| Type | Délai |
|------|-------|
| Session Web Standard | 8 heures |
| Session Admin | 4 heures |
| Session API | 24 heures |
| Inactivité Timeout | 30 minutes |
| Refresh Token | 30 jours |

---

## Chiffrement

### En Transit (Transport Layer Security)

```
Protocole  : TLS 1.3 (minimum TLS 1.2)
Ciphers    : AES-256-GCM, ChaCha20-Poly1305
Certificate: X.509 v3 (RSA 2048+ ou ECDSA 256+)
Verification: Strict hostname verification + HSTS (1 an)
```

#### Configuration Nginx

```nginx
server {
  listen 443 ssl http2;
  ssl_protocols TLSv1.3 TLSv1.2;
  ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:...';
  ssl_prefer_server_ciphers on;
  add_header Strict-Transport-Security "max-age=31536000" always;
}
```

### Au Repos (Data Encryption)

#### Base de Données

```sql
-- PostgreSQL Encryption
CREATE EXTENSION pgcrypto;

-- Documents sensibles
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  content BYTEA,  -- Données chiffrées
  encryption_key_id UUID,  -- Référence à la clé
  created_at TIMESTAMP
);

-- Chiffrement au niveau application
ENCRYPT(document_content, encryption_key) AS encrypted_content
```

#### Fichiers (S3/MinIO)

```python
# Chiffrement côté serveur
import boto3

s3_client = boto3.client('s3')

s3_client.put_object(
    Bucket='archimag-documents',
    Key='2026/07/document.pdf',
    Body=file_content,
    ServerSideEncryption='AES256',
    Metadata={'encrypted': 'true'}
)
```

#### Gestion des Clés (KMS)

```
┌─────────────────────┐
│  AWS KMS / HashiCorp│
│   Vault / Thales    │
│  (Key Master)       │
└──────┬──────────────┘
       │
       ├─► Stockage des clés de chiffrement
       ├─► Rotation automatique (90 jours)
       ├─► Audit de chaque utilisation
       └─► Séparation des clés par environnement
```

---

## Contrôle d'Accès

### Modèle RBAC (Role-Based Access Control)

```
┌──────────────────────────────────────────┐
│          UTILISATEUR                     │
└────────────────┬─────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  Roles (1-N)   │
        ├────────────────┤
        │ Admin          │
        │ Editor         │
        │ Viewer         │
        │ Auditor        │
        └────────┬───────┘
                 │
                 ▼
        ┌────────────────┐
        │ Permissions    │
        ├────────────────┤
        │ READ           │
        │ WRITE          │
        │ DELETE         │
        │ SHARE          │
        │ ADMIN          │
        └────────────────┘
```

#### Rôles Prédéfinis

| Rôle | Permissions | Cas d'Usage |
|------|------------|------------|
| **Admin** | Tous | Administrateurs système |
| **Editor** | READ, WRITE, SHARE | Créateurs de documents |
| **Viewer** | READ | Lecteurs simples |
| **Auditor** | READ, AUDIT_LOG | Conformité/audit |
| **Guest** | READ (temps limité) | Partage temporaire |

### Least Privilege Principle

```
✅ À Faire
• Accorder le minimum de droits nécessaires
• Réviser les permissions tous les 90 jours
• Utiliser des comptes de service dédiés
• Appliquer l'MFA pour les accès critiques

❌ À Éviter
• Admin par défaut
• Partage de compte
• Permissions héritées sans vérification
• Accès permanent sans révision
```

---

## Conformité

### RGPD (Règlement Général sur la Protection des Données)

#### Droits de l'Utilisateur

| Droit | Implémentation |
|------|----------------|
| **Droit d'accès** | Endpoint `/api/users/me/data` |
| **Portabilité** | Export JSON/CSV de toutes les données |
| **Rectification** | PATCH `/api/users/me` |
| **Oubli** | DELETE `/api/users/{id}` + purge données |
| **Limitation** | Anonymisation des données |
| **Consentement** | Audit trail des consentements |

#### DPA (Data Processing Agreement)

```
Archimag agit comme SOUS-TRAITANT
  ↓
Clients (Entreprises) = Responsables de traitement
  ↓
Conditions requises:
  • Contrat DPA signé
  • Audit de sécurité annuel
  • Notification incident < 72h
  • Rapport d'audit CISO disponible
```

### Audit Trail Complet

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID,
  resource_type VARCHAR(50),
  resource_id UUID,
  action VARCHAR(20),           -- CREATE, READ, UPDATE, DELETE
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  old_values JSONB,             -- Avant modification
  new_values JSONB,             -- Après modification
  status VARCHAR(20),           -- SUCCESS, FAILED
  error_message TEXT
);

CREATE INDEX idx_audit_user ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_resource ON audit_logs(resource_id, timestamp DESC);
```

---

## Incident Response

### Classification d'Incident

| Sévérité | Temps Réponse | Exemple |
|----------|---------------|----------|
| **🔴 Critique** | 15 min | Breach données, ransomware |
| **🟠 Haute** | 1 heure | Accès non autorisé, crash système |
| **🟡 Moyenne** | 4 heures | Vulnérabilité détectée |
| **🟢 Basse** | 24 heures | Bug de sécurité mineur |

### Procédure de Réponse

```
1. DÉTECTION (0-5 min)
   • Alerte système / Rapport utilisateur
   • Vérification initiale

2. CONFINEMENT (5-30 min)
   • Isoler les systèmes affectés
   • Préserver les logs
   • Notifier équipe leadership

3. INVESTIGATION (30 min - 24h)
   • Analyse root cause
   • Périmètre de l'incident
   • Systèmes compromis

4. REMEDIATION (24h - 7j)
   • Corriger la vulnérabilité
   • Patcher les systèmes
   • Redéployer

5. COMMUNICATION (Continu)
   • Notifier clients affectés
   • Transmettre aux autorités (si requis)
   • Rapports réguliers

6. POST-INCIDENT (7-30j)
   • Rapport complet (timeline, impact, lessons learned)
   • Améliorations process
   • Audit de sécurité complémentaire
```

### Plan de Communication d'Incident

```
Tous les incidents:
  ├─► Email: security@houston-prog.dev
  ├─► Slack: #security-incidents
  ├─► Phone: +33 1 XX XX XX XX
  └─► Log central: siem.houston-prog.dev

Clients affectés:
  ├─► Notification personnalisée dans les 24h
  ├─► Détails de l'incident
  ├─► Actions recommandées
  └─► Plan de correction
```

---

## Audit et Monitoring

### SIEM (Security Information & Event Management)

```
┌────────────────┐
│   Logs Source  │
├────────────────┤
│ • Application  │
│ • Système (OS) │
│ • Réseau       │
│ • Database     │
│ • Firewall     │
└────────┬───────┘
         │
         ▼
    ┌─────────┐
    │ ELK/    │  (Elasticsearch/Logstash/Kibana)
    │ Splunk  │
    └────┬────┘
         │
         ├─► Alertes temps réel
         ├─► Dashboards
         ├─► Rapports
         └─► Threat hunting
```

### Alertes Actives

| Alerte | Seuil | Action |
|--------|-------|--------|
| **Authentification échouée** | 5 tentatives | Bloquer compte 30 min |
| **Accès en masse** | > 1000 req/min | Notifier admin |
| **Modification audit_logs** | Any | Escalade immédiate |
| **Changement permissions** | Any | Log + Audit |
| **Certificat SSL expiration** | < 30 jours | Alerte email |

### Audit Régulier

```
📅 Quotidien
  • Scan des logs d'erreur
  • Alerte anomalies réseau
  • Backups monitoring

📅 Hebdomadaire
  • Rapport sécurité incidents
  • Revue des alertes
  • Patch management status

📅 Mensuel
  • Analyse complète audit_logs
  • Revue des accès utilisateurs
  • Rapport de conformité

📅 Trimestriel
  • Audit de sécurité complet
  • Pen testing (penetration testing)
  • Revue des policies

📅 Annuel
  • Audit externe certifié (ISO, SOC2)
  • Gap analysis RGPD/normes
  • Plan d'action annuel
```

---

**Document** : Politique de Sécurité v1.0  
**Date** : Juillet 2026  
**Révision** : Q4 2026  
**Classification** : Confidentiel Interne