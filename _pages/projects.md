---
layout: page
title: projects
permalink: /projects/
description: Software, experimental systems, and research tools.
nav: true
nav_order: 3
display_categories: [projects]
horizontal: false
---

<div class="projects">
{% assign categorized_projects = site.projects | where: "category", "projects" %}
{% assign sorted_projects = categorized_projects | sort: "importance" %}
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
{% for project in sorted_projects %}
  {% include projects.liquid %}
{% endfor %}
</div>
</div>
