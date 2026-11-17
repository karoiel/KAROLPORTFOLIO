# KAROL — Portfolio prototype

A static, responsive portfolio for KAROL, made for GitHub Pages. It uses no build system or external dependencies: open `index.html` in a modern browser, or publish the folder as-is.

## Start locally

Because browser features such as hash navigation are used, a small local server is ideal:

```sh
cd karol-portfolio
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. Opening `index.html` directly also works in current browsers.

## Replace the temporary work

All six temporary projects live in the `projects` object near the top of `app.js`.

1. Replace each project’s `title`, `type`, year, description, narrative, role, client and tools fields.
2. Put a project image in `assets/` and change that project’s `asset` path. SVG, JPG, PNG, WebP and AVIF all work.
3. For a richer case study, replace the three repeated images in `projectMarkup()` with project-specific image arrays. Keep meaningful `alt` descriptions.
4. Change the index row labels in `index.html` if the new projects have different names or categories.

The supplied SVGs are original, clearly temporary abstract compositions. They may be deleted once real assets are in place.

## Replace personal details

Search the project for `[Replace` and `yourhandle` to find every intentional placeholder. In particular, update:

- the About copy in `index.html`;
- the CV rows in `index.html`;
- `hello@your-domain.com` plus social links in the Contact section;
- the introductory role or availability text if needed.

No biography, contact address or credentials have been invented.

## GitHub Pages

1. Create an empty GitHub repository and upload the contents of this `karol-portfolio` folder to its root.
2. In the GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. GitHub will publish the site at the URL it shows in that panel. It may take a few minutes for the first deployment.

`.nojekyll` is included so GitHub Pages serves the static files directly.

## Included experience details

- Swiss-modernist 12-column desktop / four-column mobile grid
- Responsive home, work index, About, CV, Contact, and hash-addressable project views
- Hover project previews on mouse devices; tap-friendly links on touch devices
- Loading intro, scroll progress, live Paris clock, work-view counter and page wipe
- Image lightbox with buttons and Escape / arrow-key support
- Browser history-compatible project navigation
- Semantic landmarks, visible keyboard focus, a skip link, descriptive image alt text, and reduced-motion support

## Files

```
index.html       Page structure and editable static sections
styles.css       Visual system and responsive layout
app.js           Projects, routing and interactions
assets/          Temporary artwork and favicon
```
