---
layout: page
title: work
permalink: /work/
description: Research and lab work presented as a visual index.
nav: true
nav_order: 2
display_categories: [work]
horizontal: false
---

<div class="projects">
{% assign categorized_projects = site.projects | where: "category", "work" %}
{% assign sorted_projects = categorized_projects | sort: "importance" %}
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
{% for project in sorted_projects %}
  {% include projects.liquid %}
{% endfor %}
</div>
</div>
