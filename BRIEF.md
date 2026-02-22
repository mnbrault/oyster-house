# Oyster House Festival — Brief développement

> **Usage** : Ce brief sert de référence pour le développement et les modifications du site. Les sections "Modifications à apporter" et "Section Librairie photo" donnent des instructions exécutables pour Claude/code.

## Contexte
Festival annuel à l'Anse du Pô, Carnac (Morbihan). Depuis 2018, 9ème édition en 2026.
12 heures de musique, de mer et de marée. Scène posée sur une exploitation ostréicole.

---

## Structure de la landing page (dans l'ordre)

1. **Header** — Nav fixe, logo "OYSTER HOUSE", liens menu
2. **Hero** — Grand titre + accroche + CTA billetterie
3. **About** — Présentation du festival + stats
4. **Mission** — Le lieu, l'esprit, la table, la scénographie
5. **Photos** — Galerie existante (section archive rapide)
6. **Programme** — Musique, gastronomie, sports de glisse
7. **Librairie photo** — Archives par édition (nouvelle section à développer)
8. **Tickets** — CTA billetterie
9. **Footer**

---

## Textes clés

### Hero
- Badge : `DEPUIS 2018 · CARNAC · L'ANSE DU PÔ`
- Titre : `OYSTER HOUSE`
- Accroche : `12 heures de musique, de mer et de marée.`
- Meta : `L'Anse du Pô · Baie de Quiberon · Chaque été`
- CTA principal : `Réserver ma place →`
- CTA secondaire : `Voir la programmation`

### About
- Label : `LE FESTIVAL`
- Titre : `Un temps suspendu entre deux marées.`
- Corps : `Chaque année depuis 2018, nous investissons l'Anse du Pô, un spot de renommée mondiale pour les sports de glisse, niché au cœur de la Baie de Quiberon. Un lieu chargé d'histoire, de vent et d'iode, où les huîtres poussent lentement dans une eau d'exception.`
- Signature : `Collectif local · Est. 2018 · 9ème édition 2026`

### Stats
| Chiffre | Label |
|---------|-------|
| 9 | ÉDITIONS · DEPUIS 2018 |
| 12H | DE MUSIQUE PAR ÉDITION |
| 200L | FILTRÉS / HUÎTRE / JOUR |
| 4000 | EMPLOIS EN CONCHYLICULTURE |

### Mission / Lieu
- Label : `L'ESPRIT DU LIEU`
- Titre : `Brut, ancré, engagé.`
- P1 : `La baie de Quiberon n'est pas un lieu comme les autres. Terrain de jeu des windsurfeurs et kiteurs de haut niveau, c'est aussi un haut lieu de la régate mondiale et un terroir ostréicole d'exception.`
- P2 : `Nous posons notre scène directement sur l'exploitation ostréicole, les pieds dans l'estran. Le dancefloor surplombe la mer, la scénographie change au rythme des marées. Douze heures, un cycle de marée complet — du flot à la perdant.`

### Piliers (3 cartes)
1. **La table** — Huîtres tirées du parc le matin même, homards, produits de la mer cuisinés par des chefs qui respectent la matière.
2. **La scénographie** — Artistes et artisans locaux, matériaux issus des industries de la mer — cordages, bois de bateau, filets, balisage. Ce qui aurait fini en déchets devient décor.
3. **L'esprit** — Nous sommes une bande de potes qui ont grandi ici, entre les bateaux, les casiers à homards et les planches à voile.

### Programme
- Label : `PROGRAMME · MUSIQUE · GASTRONOMIE · MER`
- Titre : `Douze heures. Un territoire.`
- Corps : `Musique live, artistes locaux, scénographie éphémère. Gastronomie maritime — huîtres, homards, produits locaux. Artisans, pêcheurs, conchyliculteurs. Wing et windsurf welcome.`
- Tags : `Musique live` · `Gastronomie` · `Sports de glisse` · `Circuit court`

---

## Section Librairie photo (à développer)

### Comportement
- Onglets par année : 2018 → 2026 (2026 actif par défaut, doré)
- Grille 3 colonnes masonry avec hauteurs alternées
- Au survol d'une photo : overlay sombre semi-transparent + année en doré + bouton "↓ Télécharger"
- Footer de section : compteur de photos + "Toutes les éditions →" + "↓ Tout télécharger (ZIP)"

### Structure HTML suggérée
```html
<section class="galerie">
  <!-- Onglets -->
  <div class="galerie__tabs">
    <button class="tab active" data-year="2026">2026</button>
    <button class="tab" data-year="2025">2025</button>
    <!-- ... jusqu'à 2018 -->
  </div>

  <!-- Grille -->
  <div class="galerie__grid" id="galerieGrid">
    <div class="photo-card">
      <img src="/assets/galerie/2026/photo-01.jpg" alt="Oyster House 2026">
      <div class="photo-card__overlay">
        <span class="photo-card__year">2026</span>
        <a href="/assets/galerie/2026/photo-01.jpg" download class="photo-card__dl">
          ↓ Télécharger
        </a>
      </div>
    </div>
    <!-- Répéter pour chaque photo -->
  </div>

  <!-- Footer -->
  <div class="galerie__footer">
    <span class="galerie__count">Affichage de 6 photos · 9 éditions disponibles</span>
    <div class="galerie__cta">
      <button class="btn btn--dark">Toutes les éditions →</button>
      <a href="/assets/galerie/2026.zip" download class="btn btn--gold">↓ Tout télécharger (ZIP)</a>
    </div>
  </div>
</section>
```

### CSS clé
```css
.photo-card {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
}

.photo-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 11, 16, 0.75);
  opacity: 0;
  transition: opacity 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  gap: 8px;
}

.photo-card:hover .photo-card__overlay {
  opacity: 1;
}

.photo-card__year {
  color: #C9A96E;
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.photo-card__dl {
  display: inline-block;
  background: #C9A96E;
  color: #080B10;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 2px;
  text-decoration: none;
}
```

### Organisation des assets
```
/assets/
  galerie/
    2026/
      photo-01.jpg
      photo-02.jpg
      ...
    2025/
      photo-01.jpg
      ...
    2026.zip
    2025.zip
    ...
```

### JS pour les onglets
```js
const tabs = document.querySelectorAll('.galerie__tabs .tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const year = tab.dataset.year;
    filterGalerie(year);
  });
});

function filterGalerie(year) {
  const cards = document.querySelectorAll('.photo-card');
  cards.forEach(card => {
    card.style.display = card.dataset.year === year ? 'block' : 'none';
  });
}
```

---

## Design tokens

```css
:root {
  --bg-main:       #080B10;
  --bg-card:       #111519;
  --bg-card-alt:   #1C2228;
  --accent-gold:   #C9A96E;
  --accent-teal:   #5B9E8E;
  --text-primary:  #ECEAE4;
  --text-secondary:#8A8A7A;
  --text-muted:    #525252;
  --font-title:    'Sora', sans-serif;
  --font-body:     'Inter', sans-serif;
  --radius:        2px;
}
```

---

## Modifications à apporter (priorité)

> Ces modifications sont à implémenter par l'assistant (Claude/Code). Référence : état actuel du site vs brief.

### 1. Aligner les stats avec le brief
- Remplacer le 3ᵉ stat (320 ENTREPRISES) par : `4000` | `EMPLOIS EN CONCHYLICULTURE`
- Ajuster les labels selon le tableau brief (ligne 39-44)

### 2. Section Mission vs About
- **Option A** : Réorganiser pour que "Le lieu, l'esprit, la table, la scénographie" soient sous le label `L'ESPRIT DU LIEU` avec le titre `Brut, ancré, engagé.` (texte du brief p.47-50)
- **Option B** : Garder la structure actuelle (blocs About) mais harmoniser les textes avec les paragraphes P1/P2 du brief
- La section "L'huître, héroïne des océans" (engagement environnemental) peut rester en tant que bloc distinct après

### 3. Section Librairie photo
- À développer selon les specs (lignes 67-185)
- Créer `/assets/galerie/` avec sous-dossiers 2018 → 2026
- Implémenter les onglets par année + grille masonry + overlay au survol + footer avec ZIP

### 4. Programme
- Label : `PROGRAMME · MUSIQUE · GASTRONOMIE · MER`
- Ajouter au corps : `Wing et windsurf welcome.`
- Tags : `Musique live` · `Gastronomie` · `Sports de glisse` · `Circuit court`

### 5. About — signature
- Remplacer "2026 marque notre 9ème édition" par : `Collectif local · Est. 2018 · 9ème édition 2026`
- Label section : `LE FESTIVAL` (au lieu de `PRÉSENTATION`)

### 6. Logos
- Header / footer : logo oyster-house (texte ondulant) ✓ déjà intégré
- Section Le lieu : logo huître (gravure) ✓ déjà intégré
- Vérifier que les paths `assets/logo-oyster-house.png` et `assets/logo-huître.png` sont corrects

### 7. Hero — badge
- Format brief : `DEPUIS 2018 · CARNAC · L'ANSE DU PÔ`
- Actuel : `CARNAC · L'ANSE DU PÔ · DEPUIS 2018` — aligner si souhaité

---

## L'équipe fondatrice (source : dossier 2022)

Tous scolarisés au collège Saint Michel, navigateurs au YC Carnac, enfants du territoire.

| Nom | Rôle / Métier |
|-----|---------------|
| **Martin BRAULT** | Transition écologique, habite à Crac'h |
| **Gauthier LEBEC** | Course au large, Lorient |
| **Hugo LE POMELLEC** | Préparation mentale & événementiel, course au large Morbihan |
| **Gaël COUSIN** | Culture et vente de coquillages / crustacés / fruits de mer depuis 7 ans |
| **Jérémie FLAHAULT** | Course au large, La Trinité-sur-Mer et Lorient |

---

## Partenaires & artisans (source : dossier 2022)

| Partenaire | Activité | Ville |
|------------|----------|-------|
| Julien Bourgeois | Artisan Menuisier / Chaudronnier | Carnac |
| Antoine Pihen | Chef Cuisinier Indépendant | Carnac |
| Les Viviers de Saint-Colomban | Conchyliculteur - Mareyeur | Carnac |
| Super U / Marché des Druides | Grande Distribution | Carnac |
| Cidrerie de Carnac | Producteur artisanal de cidre et jus | Carnac |
| Huîtres Vallegant | Ostréiculteur | La Trinité-sur-Mer |
| Le Trého | Ty Producteur | La Trinité-sur-Mer |
| Erika Raïo | Artiste Plasticienne | — |
| Kervignac | Brasserie Artisanale | Vannes |
| La Huche à Pain | Boulangerie | Vannes |

---

## Photos disponibles — Édition 2022

Extraites du dossier de présentation HD. Toutes dans `/assets/galerie/2022/`.

| Fichier | Contenu | Usage suggéré |
|---------|---------|---------------|
| `galerie-equipe.jpeg` | Photo de groupe de l'équipe, T-shirts OH, végétation | Section équipe / about |
| `galerie-vue-aerienne.jpeg` | Vue aérienne de l'Anse du Pô, parcs ostréicoles, Baie de Quiberon | Hero / section lieu |
| `galerie-huitre.jpeg` | Femme chapeau rouge qui déguste une huître | Gastronomie / hero |
| `galerie-public-1.jpeg` | Public sur le site festival, ambiance extérieure jour | Galerie 2022 |
| `galerie-public-2.jpeg` | Public festival, ambiance, espace vert | Galerie 2022 |
| `galerie-gastronomie.jpeg` | Plateau de homards / crustacés | Section table / galerie |
| `galerie-concert-soir.jpeg` | Scène concert coucher de soleil, public silhouetté | Hero / programme |
| `galerie-scenographie.jpeg` | Artisan au travail sur la scénographie | Section scénographie |
| `galerie-baie.jpeg` | Baie de Quiberon, lumière dorée | Section lieu / galerie |
| `galerie-coucher-soleil.jpeg` | Silhouettes + filets, coucher de soleil, Anse du Pô | Footer / galerie |

> **Note** : Photos optimisées pour le web (max 1600px, ~150–570 Ko chacune).

---

## Notes importantes
- Le festival est ancré dans un territoire maritime réel — pas de clichés génériques
- Ton sobre, authentique, pas touristique
- Wing et windsurf welcome = public glisse bienvenu
- Photos à uploader par édition dans `/assets/galerie/ANNÉE/`
- ZIPs à préparer manuellement ou générer côté serveur
