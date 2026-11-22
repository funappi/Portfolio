# Portfolio Funappi

Le portfolio de mes applis : une grille d'accueil, puis l'univers de chaque appli avec sa vidéo, ses captures et ses couleurs.

Le site est fait en HTML, CSS et JavaScript, sans dépendance ni étape de build. Il suffit de le servir tel quel.

## Modifier le contenu

Tout le texte est dans `js/data.js` :

- `SITE.email` et `SITE.linkedin` : remplis-les pour qu'ils s'affichent dans le contact.
- `APPS` : une entrée par appli (nom, textes FR/EN, couleurs, technos, liens, taille de la case dans la grille).
  - `size` : `big` (2×2), `wide` (2×1), `tall` (1×2) ou `sm` (1×1).
  - `colors` : `[fond profond, couleur principale, couleur 2, couleur 3]`. Elles colorent le bokeh et l'univers de l'appli.
  - `media` : `real` (vraie vidéo), `preview` (montage de captures en attendant une vidéo) ou `none` (rien encore).
  - `effort` (1 à 10), `start` (date de début) et `useful` (1 à 10) : servent aux tris « Plus chronophage », « Plus récent » et « Plus utile ».
  - `floats` : numéros des captures qui flottent autour de la carte vidéo.

## Remplacer ou ajouter une vidéo

Chaque appli a son dossier `media/<id>/` :

| Fichier | Rôle |
|---|---|
| `loop.mp4` | boucle muette de 10 à 15 s, lue dans la carte 3D |
| `demo.mp4` | démo plus longue, ouverte avec « Voir la démo » |
| `poster.jpg` | image affichée avant la lecture et dans la grille |
| `shots/01.jpg`… | captures de la galerie |
| `icon.svg` | icône de l'appli |

Pour une nouvelle vidéo enregistrée à l'écran, cette commande ffmpeg en fait une boucle légère (ici de la seconde 5 à la seconde 17) :

```bash
ffmpeg -ss 5 -t 12 -i enregistrement.mp4 -vf "scale=1280:-2,fps=30" -c:v libx264 -preset veryfast -crf 28 -pix_fmt yuv420p -movflags +faststart -an media/<id>/loop.mp4
```

Ensuite, passe `media` à `"real"` dans `js/data.js`. Si tu changes les captures ou le format d'une vidéo, mets aussi à jour `js/media.js` (dimensions de chaque fichier).

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt nommé exactement `funappi.github.io` dans l'organisation funappi.
2. Pousse le contenu de ce dossier à la racine du dépôt.
3. Dans *Settings > Pages*, choisis la branche `main` et le dossier `/ (root)`.

Le site sera à l'adresse `https://funappi.github.io/`.

## Effets

- Mode **Max** : bokeh WebGL, curseur personnalisé, carte 3D qui suit la souris, cases floues qui deviennent nettes au survol.
- Mode **Léger** : bokeh en CSS, sans curseur ni inclinaison. Il s'active tout seul sur téléphone, sur écran tactile ou si l'appareil demande moins d'animations. Le bouton « Effets » permet de changer à tout moment.

Polices : Inter et Inter Display (licence SIL Open Font License), hébergées avec le site.
