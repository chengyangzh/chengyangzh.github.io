---
layout: page
title: Category-Based Historical Phonology
description: Structured reconstruction across historical Chinese sound systems.
importance: 1
---

### Question

Can historical phonological reconstruction be formulated at the level that philologists actually reason about—**categories and systems**—rather than as independent character-level predictions?

### Approach

I am developing a category-based optimization framework with Prof. Weiwei Sun at the University of Cambridge. The model represents phonological categories in distinctive-feature space and reconstructs multiple historical time planes jointly, using evidence from modern dialect reflexes, fanqie and rhyme-table structure, historical annotations, Sino-Xenic readings, and cross-period constraints.

A central design choice is to preserve historically meaningful category structure while still allowing each time plane to learn a distinct realization. This makes it possible to compare computational reconstructions with expert systems such as Wang Li's while keeping the optimization problem explicit and falsifiable.

### Current direction

I am extending the framework across additional historical periods and building stronger external evaluation, ablations, and evidence pipelines so that improvements can be attributed to specific historical constraints rather than to added model flexibility.
