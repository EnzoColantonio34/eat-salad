# Configuration de déploiement Vercel

## Variables d'environnement

Si vous utilisez des APIs externes ou des clés secrètes, ajoutez-les dans votre dashboard Vercel :

```bash
# Exemple de variables (si nécessaire)
NEXT_PUBLIC_API_URL=https://votre-api.com
DATABASE_URL=postgresql://...
```

## Commandes de build

Vercel détecte automatiquement Next.js, mais vous pouvez personnaliser :

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs"
}
```

## Configuration de domaine

1. Connecter votre repository GitHub à Vercel
2. Configurer le domaine personnalisé si souhaité
3. Activer les Analytics Vercel (optionnel)

## Optimisations de production

- **Edge Functions** : Déploiement global automatique
- **Image Optimization** : CDN intégré pour les images
- **Compression automatique** : Gzip/Brotli activé
- **HTTPS** : Certificat SSL automatique

## Monitoring

- **Vercel Analytics** : Métriques de performance
- **Error Tracking** : Monitoring des erreurs en production
- **Logs** : Accès aux logs serveur en temps réel
