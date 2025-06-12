# 💼 API Produits – Sun CO.

Une API RESTful construite avec **NestJS 11**, **TypeORM** et **PostgreSQL**, permettant de créer, lister et consulter des produits. Chaque produit peut avoir plusieurs images stockées en local (`/upload`). La documentation Swagger est incluse.

---

## 🚀 Fonctionnalités

* Création de produit avec images
* Génération automatique d'un **slug** unique basé sur le nom du produit
* Récupération de tous les produits
* Récupération d’un produit via son `slug`
* Stockage local des fichiers images (`upload/`)
* Swagger pour tester les endpoints

---

## 📁 Arborescence (résumé)

```
src/
├── main.ts
├── app.module.ts
├── product/
│   ├── product.controller.ts
│   ├── product.service.ts
│   ├── product.entity.ts
│   ├── dto/
│   │   └── create-product.dto.ts
upload/
├── [images stockées ici]
```

---

## ⚙️ Installation

```bash
npm install
```

Assure-toi d’avoir PostgreSQL configuré et accessible. Crée un fichier `.env` si nécessaire.

---

## 🛠️ Démarrage du serveur

```bash
npm run start:dev
```

API disponible sur : [http://localhost:3000](http://localhost:3000)

---

## 📦 Endpoints

| Méthode | Route              | Description                   |
| ------- | ------------------ | ----------------------------- |
| `POST`  | `/products`        | Créer un produit (JSON)       |
| `GET`   | `/products`        | Récupérer tous les produits   |
| `GET`   | `/products/:slug`  | Récupérer un produit par slug |

---

## 🔍 Swagger (Documentation API)

Accès : [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 📸 Upload d'images

* Route : `POST /products/upload`
* Formulaire : `multipart/form-data`
* Champ : `images`
* Réponse : liste des noms de fichiers enregistrés

---

## 🥪 Exemple de corps de requête pour `POST /products`

```json
{
  "name_product": "Chaussures Running",
  "description_product": "Des chaussures légères et confortables.",
  "images_product": ["chaussures1.jpg", "chaussures2.jpg"],
  "price_product": 79.99
}
```

Les images doivent d'abord être uploadées via `/products/upload`.

---

## 🖼️ Exemple d’URL d’image

```text
http://localhost:3000/upload/chaussures1.jpg
```

---