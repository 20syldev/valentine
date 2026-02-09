# 💖 Hack My Heart

Un jeu interactif de défis en cybersécurité créé pour la Saint-Valentin. Testez vos connaissances à travers **12** challenges de difficulté croissante !

## Fonctionnalités

- **12 Challenges** de cybersécurité (SQL injection, XSS, cryptographie, réseaux, etc.)
- **Système de hints progressifs** en fonction du nombre de tentatives
- **Animations interactives** (pluie de cœurs, effet machine à écrire, transitions fluides)
- **Sauvegarde automatique** de la progression avec localStorage
- **Design responsive** avec Tailwind CSS v4
- **Navigation intuitive** entre les challenges

## Stack Technique

- **React 19** - Framework UI
- **TypeScript 5** - Typage statique
- **Vite 7** - Build tool et dev server
- **Tailwind CSS v4** - Styling (approche CSS-first)
- **Lucide React** - Icônes
- **React Router v7** - Navigation (hash routing pour GitHub Pages)
- **Framer Motion** - Animations (optionnel)

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/20syldev/valentine.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le jeu sera accessible sur [http://127.0.0.1:5173](http://127.0.0.1:5173).

## Déploiement

Le projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

```bash
# Build de production
npm run build

# Preview du build
npm run start
```

Le workflow GitHub Actions déploie automatiquement sur la branche `gh-pages` à chaque push sur `master`.
*Vous pouvez changer le nom de la branche dans le fichier [deploy.yml](.github/workflows/deploy.yml)

## Challenges

1. **SQL Injection** (Facile) - Injection SQL de base
2. **HTTP Status** (Facile) - Codes de statut HTTP
3. **Git Commit** (Facile) - Historique Git
4. **XSS Escape** (Moyen) - Cross-Site Scripting
5. **Port HTTPS** (Moyen) - Ports réseau
6. **Firewall ACL** (Moyen) - Règles de pare-feu
7. **Binary ASCII** (Moyen) - Conversion binaire
8. **Hash Collision** (Moyen) - Collisions de hash
9. **SQL Bypass** (Difficile) - Bypass d'authentification
10. **Vigenère** (Difficile) - Cryptographie classique
11. **Subnet Mask** (Expert) - Masques réseau
12. **Regex Email** (Expert) - Expressions régulières

## Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Preview du build
npm run format       # Formatter le code
npm run check        # Vérification TypeScript
npm run lint         # Linter ESLint
```

---

<div align="center">
  <h3>Joyeuse Saint-Valentin ! 🌹</h3>
</div>
