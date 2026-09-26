# chengyangzh.github.io

Personal research website built with the [al-folio](https://github.com/alshedivat/al-folio) v1 starter/plugin architecture.

## Repository structure

- `al-folio-rebuild` is the source branch.
- GitHub Actions builds the Jekyll site from this branch and publishes the generated static site to `main`, preserving the repository's existing GitHub Pages setup.
- `_pages/` contains the main navigation pages.
- `_projects/` contains selected research and technical projects.
- `_news/` powers the homepage updates.
- `_data/socials.yml` controls contact links.

The old generated HTML site was intentionally replaced rather than incrementally modified.
