---
layout: page
title: work
permalink: /work/
description: Research and lab work.
nav: true
nav_order: 2
display_categories: [work]
horizontal: true
---

<div class="projects">
{% assign categorized_projects = site.projects | where: "category", "work" %}
{% assign sorted_projects = categorized_projects | sort: "importance" %}
<div class="container">
  <div class="row row-cols-1 row-cols-md-2">
  {% for project in sorted_projects %}
    {% include projects_horizontal.liquid %}
  {% endfor %}
  </div>
</div>
</div>
