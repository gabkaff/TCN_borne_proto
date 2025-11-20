#!/bin/bash

# Script pour créer les pipelines Buddy via l'API
# Usage: ./setup-pipelines.sh

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérification des variables d'environnement
if [ -z "$BUDDY_WORKSPACE" ]; then
    echo -e "${RED}Erreur: BUDDY_WORKSPACE n'est pas défini${NC}"
    echo "Exemple: export BUDDY_WORKSPACE='mon-workspace'"
    exit 1
fi

if [ -z "$BUDDY_PROJECT" ]; then
    echo -e "${RED}Erreur: BUDDY_PROJECT n'est pas défini${NC}"
    echo "Exemple: export BUDDY_PROJECT='proto-tauri'"
    exit 1
fi

if [ -z "$BUDDY_TOKEN" ]; then
    echo -e "${RED}Erreur: BUDDY_TOKEN n'est pas défini${NC}"
    echo "Obtenez votre token depuis: Buddy > Settings > API Tokens"
    exit 1
fi

# URL de base de l'API Buddy
API_BASE="https://api.buddy.works/workspaces/$BUDDY_WORKSPACE/projects/$BUDDY_PROJECT"
API_HEADER="Authorization: Bearer $BUDDY_TOKEN"

echo -e "${GREEN}🚀 Création des pipelines Buddy...${NC}"
echo ""

# Fonction pour créer un pipeline
create_pipeline() {
    local pipeline_file=$1
    local pipeline_name=$2
    
    echo -e "${YELLOW}Création du pipeline: $pipeline_name${NC}"
    
    # Vérifier si le fichier existe
    if [ ! -f "$pipeline_file" ]; then
        echo -e "${RED}Erreur: Fichier $pipeline_file introuvable${NC}"
        return 1
    fi
    
    # Créer le pipeline
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE/pipelines" \
        -H "$API_HEADER" \
        -H "Content-Type: application/json" \
        -d @"$pipeline_file")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ Pipeline '$pipeline_name' créé avec succès${NC}"
        echo "$body" | jq -r '.url' 2>/dev/null || echo ""
        return 0
    else
        echo -e "${RED}❌ Erreur lors de la création du pipeline (HTTP $http_code)${NC}"
        echo "$body" | jq -r '.message' 2>/dev/null || echo "$body"
        return 1
    fi
}

# Créer le pipeline Windows
echo -e "${YELLOW}📦 Pipeline Windows${NC}"
create_pipeline ".buddy/pipeline-windows.json" "Build Windows"
echo ""

# Créer le pipeline iOS
echo -e "${YELLOW}🍎 Pipeline iOS${NC}"
create_pipeline ".buddy/pipeline-ios.json" "Build iOS"
echo ""

echo -e "${GREEN}✨ Terminé!${NC}"
echo ""
echo "Prochaines étapes:"
echo "1. Configurez les certificats iOS dans Buddy Settings > SSH Keys & Certificates"
echo "2. Configurez les variables d'environnement dans chaque pipeline"
echo "3. Testez les pipelines en les exécutant manuellement"

