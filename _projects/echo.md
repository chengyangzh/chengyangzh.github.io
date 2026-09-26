---
layout: page
title: Echo
description: An agent that retrieves analogies by structure rather than surface similarity.
importance: 2
---

Humans often solve unfamiliar problems by recognizing that they have seen the *same kind of structure* somewhere else. Echo is my attempt to turn that idea into an agent architecture.

Instead of retrieving memories or precedents only through embedding similarity, Echo first represents a problem through **goals, constraints, entities, relations, and causal roles**. It then searches for structurally compatible cases, maps the useful parts of a precedent onto the new problem, and turns that mapping into an actionable plan.

The project includes persistent sessions, tool use, structured traces, and evaluation hooks for separating genuine structural transfer from lexical overlap.

[View the repository](https://github.com/chengyangzh/Echo-ailoha-).
