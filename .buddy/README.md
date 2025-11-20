# Configuration Buddy CI/CD

Ce dossier contient les fichiers de configuration pour les pipelines Buddy CI/CD.

## 📋 Fichiers de configuration

- `pipeline-windows.json` : Configuration pour le build Windows
- `pipeline-ios.json` : Configuration pour le build iOS
- `setup-pipelines.sh` : Script pour créer les pipelines via l'API Buddy

## 🚀 Utilisation

### Méthode 1 : Via l'API Buddy (Recommandé)

Utilisez le script `setup-pipelines.sh` pour créer automatiquement les pipelines :

```bash
# 1. Obtenez votre token API Buddy
#    Allez dans Buddy > Settings > API Tokens > Create Token

# 2. Configurez les variables d'environnement
export BUDDY_WORKSPACE="votre-workspace"
export BUDDY_PROJECT="proto-tauri"
export BUDDY_TOKEN="votre-token-api"

# 3. Exécutez le script
chmod +x .buddy/setup-pipelines.sh
.buddy/setup-pipelines.sh
```

### Méthode 2 : Via l'interface Buddy

1. **Créer le pipeline Windows :**
   - Allez dans votre projet Buddy
   - Cliquez sur "Add pipeline"
   - Nommez-le "Build Windows"
   - Utilisez `pipeline-windows.json` comme référence pour configurer les actions

2. **Créer le pipeline iOS :**
   - Créez un nouveau pipeline "Build iOS"
   - Utilisez `pipeline-ios.json` comme référence
   - **Important** : Configurez d'abord les certificats et profils de provisioning dans Buddy Settings

### Méthode 3 : Via l'API REST directement

#### Créer le pipeline Windows

```bash
curl -X POST "https://api.buddy.works/workspaces/$BUDDY_WORKSPACE/projects/$BUDDY_PROJECT/pipelines" \
  -H "Authorization: Bearer $BUDDY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @.buddy/pipeline-windows.json
```

#### Créer le pipeline iOS

```bash
curl -X POST "https://api.buddy.works/workspaces/$BUDDY_WORKSPACE/projects/$BUDDY_PROJECT/pipelines" \
  -H "Authorization: Bearer $BUDDY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @.buddy/pipeline-ios.json
```

## ⚙️ Configuration requise

### Pour Windows

- Environnement Windows avec Visual Studio Build Tools
- Rust installé
- Node.js et Yarn installés

### Pour iOS

- Environnement macOS avec Xcode installé
- Certificat Apple Developer (à configurer dans Buddy Settings > SSH Keys & Certificates)
- Profil de provisioning (à configurer dans Buddy Settings)
- Variables d'environnement :
  - `APPLE_TEAM_ID` : Votre Team ID Apple Developer
  - `APPLE_CERTIFICATE_NAME` : Nom du certificat dans Buddy
  - `APPLE_PROVISION_PROFILE_NAME` : Nom du profil de provisioning dans Buddy

## 🔧 Variables d'environnement

Les variables d'environnement sont définies directement dans les fichiers de configuration JSON. Vous devez configurer certaines variables dans Buddy Settings > Environment Variables pour qu'elles soient disponibles lors de l'exécution.

### Pipeline Windows (Mode Kiosk)

**Variables définies dans le pipeline :**
- `VITE_APP_MODE=kiosk` : Mode borne tactile (défini automatiquement)
- `VITE_USE_MOCK_DATA=false` : Désactive les données mock (défini automatiquement)
- `VITE_REFRESH_INTERVAL=300000` : Intervalle de rafraîchissement en ms (5 minutes, défini automatiquement)

**Variables à configurer dans Buddy Settings :**
- `VITE_API_URL` : URL de votre API de production (ex: `https://api-production.com/api`)
  - ⚠️ **Important** : Cette variable doit être définie dans Buddy Settings > Environment Variables avant d'exécuter le pipeline

### Pipeline iOS (Mode iPad)

**Variables définies dans le pipeline :**
- `VITE_APP_MODE=ipad` : Mode iPad (défini automatiquement)
- `VITE_USE_MOCK_DATA=false` : Désactive les données mock (défini automatiquement)

**Variables à configurer dans Buddy Settings :**
- `VITE_API_URL` : URL de votre API de production (ex: `https://api-production.com/api`)
- `APPLE_TEAM_ID` : Votre Team ID Apple Developer (ex: `ABC123DEF4`)
- `APPLE_CERTIFICATE_NAME` : Nom du certificat dans Buddy (exactement comme il apparaît dans Buddy Settings)
- `APPLE_PROVISION_PROFILE_NAME` : Nom du profil de provisioning dans Buddy (exactement comme il apparaît dans Buddy Settings)

### Comment configurer les variables dans Buddy

1. Allez dans votre projet Buddy
2. Cliquez sur "Settings" > "Environment Variables"
3. Ajoutez chaque variable avec sa valeur
4. Pour les valeurs sensibles (comme les tokens), utilisez le type "Secret" pour les masquer dans les logs

## 📝 Notes importantes

1. **Images Docker** : Les images `buddy/docker-windows` et `buddy/docker-macos` doivent être disponibles dans votre Buddy. Vérifiez les images disponibles dans votre workspace.

2. **Code Signing iOS** : 
   - Vous devez d'abord uploader vos certificats (.p12) et profils de provisioning (.mobileprovision) dans Buddy Settings
   - Les noms utilisés dans la configuration doivent correspondre exactement aux noms dans Buddy

3. **Artifacts** : Les fichiers de build sont automatiquement sauvegardés comme artifacts et peuvent être téléchargés depuis l'interface Buddy.

4. **Première exécution iOS** : La première fois, vous devrez peut-être exécuter `yarn tauri ios init` manuellement avant de lancer le pipeline.

## 🔗 Documentation

- [API Buddy - Créer un pipeline](https://buddy.works/docs/api/pipelines/add-pipeline)
- [API Buddy - Ajouter une action](https://buddy.works/docs/api/actions/add-action)
- [API Buddy - Code Sign iOS](https://buddy.works/docs/api/actions/add-action/code-sign-export)

