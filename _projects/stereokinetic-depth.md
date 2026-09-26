---
layout: page
title: Stereokinetic Depth in VR
description: Building a controlled VR paradigm for a classic depth illusion.
importance: 4
---

I built and iteratively refined a VR experiment for stereokinetic depth perception using **Unity/C#**, SteamVR/OpenXR, custom logging, and shader-based stimuli.

The difficult part was not simply rendering a rotating trefoil. Small changes in headset orientation, calibration, hand-tracking data, stimulus geometry, or trial timing could introduce confounds large enough to change the perceptual result. I repeatedly rebuilt parts of the paradigm, added instrumentation, and created inspection tools so that experimental failures could be diagnosed rather than guessed at.

This project shaped how I think about operationalization: a clean scientific question often requires a surprisingly engineered experimental system.

[Code](https://github.com/xvr2e7/trefoil-depth) · [Trace inspector](https://xvr2e7.github.io/trefoil-trace-inspector/)
