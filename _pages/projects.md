---
layout: page
title: projects
permalink: /projects/
description: Software, experimental systems, and research tools.
nav: true
nav_order: 3
display_categories: [projects]
horizontal: true
---

<div class="projects">
{% assign categorized_projects = site.projects | where: "category", "projects" %}
{% assign sorted_projects = categorized_projects | sort: "importance" %}
<div class="container">
  <div class="row row-cols-1 row-cols-md-2">
  {% for project in sorted_projects %}
    {% include projects_horizontal.liquid %}
  {% endfor %}
  </div>
</div>
</div>
