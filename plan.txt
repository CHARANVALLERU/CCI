# Plan: Clone "The Watch" — FS 60P Luxury Watch 3D Experience

## Goal
Replicate https://thewatch.60fps.fr/ as a high-fidelity clone: Svelte + Vite single-page app, Three.js WebGL watch renderer, GSAP/ScrollTrigger scroll animations, Lenis smooth scroll, custom cursor, 4 color themes, and section-based DOM overlay.

## Stack & Dependencies
- **Framework**: Svelte 4/5 + Vite
- **3D**: Three.js r162 (embedded or npm)
- **Animations**: GSAP 3.15 + ScrollTrigger + EasePack
- **Smooth scroll**: Lenis 1.0.42
- **Fonts**: Nekst + Inter (self-hosted woff2/woff/ttf) + Adobe Fonts fallback
- **Build**: Vite with asset hashing

## Project Structure
```
src/
  lib/
    components/
      App.svelte
      Loader.svelte
      CanvasWrapper.svelte
      Cursor.svelte
      sections/
        Intro.svelte
        Colors.svelte
        Curves.svelte
        Disassembly.svelte
        Images.svelte
        Mechanism.svelte
        Movement.svelte
        Parts.svelte
        Straps.svelte
        Timeless.svelte
        VerticalText.svelte
        Footer.svelte
    stores/
      viewport.js
      scroll.js
      config.js
    webgl/
      renderer.js
      scene.js
      camera.js
      materials/
        PBR.js
        MetalGlossy.js
        Glass.js
        Dial.js
        Glow.js
        Particles.js
      shaders/
        sixtyPBR.js
        particles.js
        postProcessing.js
      assets/
        loader.js
        envmap.js
      sections/
        base.js
      watch/
        model.js
        hands.js
    utils/
      splitText.js
      lerp.js
  app.html
  app.css
  main.js
```

## Implementation Phases

### Phase 1: Scaffold & Layout
- [ ] Init Vite + Svelte project
- [ ] Configure Vite for asset hashing and font handling
- [ ] Create `app.html` shell: `<div id="app">`, `<div id="loader">`, `<div id="canvas-wrapper">`, `<div id="root">`
- [ ] Create `app.css`:
  - Font-face declarations for Nekst & Inter (all weights)
  - Global reset (`user-select:none`, `box-sizing`)
  - Responsive `html { font-size: .3125vw }` with breakpoints at 768px, 1025px, 1441px, 1600px
  - `#root { font-size: 11px }` base
  - `body, #app { pointer-events:none }` with `#canvas-wrapper { pointer-events:auto }`
  - Loader styles: fixed `#EBEBEB` bg, SVG arc with `stroke-dasharray: 2168`, `fill-circle` keyframe 1.2s ease-in-out
  - Utility font classes `.font-nekst-*`, `.font-inter-*`
- [ ] Implement Loader component with SVG progress arc animation
- [ ] Implement responsive typography system using vw-based font sizing

### Phase 2: Three.js WebGL Core
- [ ] Create `webgl/renderer.js`: WebGLRenderer with `antialias:false`, `powerPreference:"high-performance"`, `autoClear:false`, `setClearColor(0xffffff, 0)`
- [ ] Create `webgl/camera.js`: PerspectiveCamera with dynamic FOV `40 / Math.min(1, ratio * 1.5)`, initial z=10
- [ ] Create `webgl/scene.js`: Scene + PMREMGenerator + custom IBL CubeUV envmap pipeline
- [ ] Implement renderer lifecycle (attach/detach on resize, tick events)
- [ ] Implement viewport tool with ResizeObserver, DPR capping, breakpoint detection (mobile/tablet/desktop)

### Phase 3: Custom PBR Material System
- [ ] Implement custom shader chunks (`sixtyPBR.js`) replacing Three.js standard PBR:
  - Uniforms: `uColor`, `uMetallic`, `uRoughness`, `uEmissiveColor`, `uAmbientColor`, `uAmbientIntensity`, `uAlphaTest`, `uOpacity`, `uEnvMapRotation`, `uEnvMapIntensity`, `uAdditiveEnvMapRotation`, `uAdditiveEnvMapIntensity`, `uNormalScale`, `uGlobalEnvmapRotation`, `uDarknessProgress`
  - Map transforms: `uMapTransform`, `uArmMapTransform`, `uAoMapTransform`, `uEmissiveMapTransform`, `uNormalMapTransform`
  - Defines: `SIXTY_MAP`, `SIXTY_ARMMAP`, `SIXTY_AOMAP`, `SIXTY_EMISSIVEMAP`, `SIXTY_NORMALMAP`, `SIXTY_ENVMAP`, `SIXTY_ADDITIVEENVMAP`, `SIXTY_ALPHAMAP`, `USE_MORPHTARGETS`, `USE_INSTANCING`, `TRANSMISSION_FULL`, `DOUBLE_SIDED`, `DEBUG`
- [ ] Implement material variants:
  - `PBR` (base with ARM map)
  - `MetalGlossy` (with `uGoldMetalColor` / `uBlueMetalColor` + UV1 mixing)
  - `MetalBrushed` / `MetalBrushedExt` (brushed normal perturbation)
  - `MetalGlossyExt` (noise-based normal distortion)
  - `Glass` (transparent, `depthWrite:false`, edge glow normal factor)
  - `Glow` (emissive time-animated)
  - `Laser` (pulse time-animated)
  - `Ruby`, `Dial`, `DialNumbersAo`, `Numbers`, `ShadowPlanes`, `Overlay`, `ParticlesMaterial`, `StickerMaterial`
- [ ] Implement envmap IBL: `getIBLIrradiance`, `getIBLRadiance`, roughness-based mip sampling, per-material rotation

### Phase 4: 3D Model & Assets
- [ ] **Model procurement**: Acquire or create a luxury watch GLB model with parts: `case`, `bezel`, `dial`, `secondsHand`, `hoursHand`, `minutesHand`, `mainplate`, `tourbillon`, `crystal`, `strap`
- [ ] Implement `webgl/assets/loader.js`:
  - DRACOLoader + GLTFLoader pipeline (or custom JSON-based loader if original uses private configs)
  - Draco decoder path configuration
  - Model hierarchy mapping to material names
- [ ] Implement `webgl/assets/envmap.js`:
  - Load HDR/EXR environment map via RGBELoader/EXRLoader
  - Generate CubeUV PMREM for IBL
- [ ] Implement texture pipeline:
  - ARM maps (AO/Roughness/Metalness packed)
  - Normal maps
  - Emissive maps
  - Alpha maps
  - Noise textures (for brushed metal, dial distortion)
- [ ] Optimize: draco compression, texture size caps (max 2K), instancing where applicable, dispose patterns

### Phase 5: Animation System
- [ ] Integrate GSAP 3.15 + ScrollTrigger 3.15 + EasePack 3.15
- [ ] Integrate Lenis 1.0.42:
  - `smoothWheel: true`, `syncTouch: false`, `lerp: 0.1`
  - Custom `onVirtualScroll` with `data-lenis-prevent`, `data-lenis-prevent-touch`, `data-lenis-prevent-wheel`
  - CSS classes: `lenis-stopped`, `lenis-locked`, `lenis-smooth`, `lenis-scrolling`
  - Touch inertia multiplier 35, custom easing `Math.min(1, 1.001 - Math.pow(2, -10 * E))`
- [ ] Implement `splitText.js` utility:
  - Split text into words/lines/chars with `st-word`, `st-line`, `st-char` spans
  - Support `data-split` attribute
- [ ] Implement section base class with lifecycle: `init()`, `attach()`, `detach()`, `setupTimeline()`
- [ ] Implement cursor system:
  - GSAP `quickTo` cursor with `duration: 1.3`, `ease: "power4.out"`
  - Icons: `select`, `cross`, `left-arrow`, `right-arrow`
  - States: `visible`, `large`, `transparent`
- [ ] Implement color theme system (4 configs):
  - `first`: `#2B282E` / `#B9B6BD` / white text
  - `second`: `#000000` / `#2B2B2B` / white text
  - `third`: `#B3A07C` / `#FFFFE1` / white text
  - `fourth`: `#D7CFC8` / `#B3A99F` / `#333333` text
  - GSAP timeline transition over 1.2s `power3.inOut`
- [ ] Implement real-time clock:
  - Seconds hand: `2 * PI * seconds / 60` (continuous rotation)
  - Minutes hand: `2 * PI * (minutes + seconds/60) / 60`
  - Hours hand: `2 * PI * ((hours % 12) + minutes/60 + seconds/3600) / 12`
  - Day indicator: rotate from day 8 to day 31
  - Support `?debugTime=HH:MM:SS` and `?debugDay=DD` URL params

### Phase 6: Svelte Section Components
- [ ] `Intro.svelte`: Title, color config circles, SVG animations, `data-section="Intro"`
- [ ] `Colors.svelte`: 4 theme selector with interactive circles, `data-section="Colors"`
- [ ] `Curves.svelte`: Single part section wrapper, `data-section="Curves"`
- [ ] `Disassembly.svelte`: Exploded view with hover overlays, background text parallax (`-60vw` / `+60vw`), `data-section="Disassembly"`
- [ ] `Images.svelte`: Image grid with `--translate-progress` CSS variable, `data-section="Images"`
- [ ] `Mechanism.svelte`: Real-time seconds digit display, `data-section="Mechanism"`
- [ ] `Movement.svelte`: Movement description with grey-line color animations, `data-section="Movement"`
- [ ] `Parts.svelte`: Parts list with bar-scale animations and image reveal, `data-section="Parts"`
- [ ] `Straps.svelte`: Strap description, `data-section="Straps"`
- [ ] `Timeless.svelte`: Timeless description with grey-line animations, `data-section="Timeless"`
- [ ] `VerticalText.svelte`: Vertical text fade in/out, `data-section="VerticalText"`
- [ ] `Footer.svelte`: Text with words/chars split animation, `data-section="Footer"`

### Phase 7: Scroll & Interaction Wiring
- [ ] Wire Lenis to ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add`
- [ ] Implement per-section GSAP timelines:
  - `scrub: true` or `scrub: 2` for scroll-linked animations
  - `start: "top bottom"`, `end: "bottom top"`
  - Staggered char-by-char reveals with `power3.out` / `power4.out`
  - Parallax: background letters at `-60vw` / `+60vw` with `power3.in`
- [ ] Implement pointer event toggling between WebGL canvas and DOM
- [ ] Implement hover/click mesh detection for 3D interactivity
- [ ] Implement disassembly navigation (left/right arrows, close overlay)

### Phase 8: Post-Processing & Polish
- [ ] Implement custom post-processing pass:
  - Contrast / gamma / noise / fisheye controls
  - Optional: bloom, vignette (if needed for luxury feel)
- [ ] Implement particles system if required (curl noise, custom attributes)
- [ ] Add audio context (if original had sounds — not confirmed)
- [ ] Implement contact shadows or shadow planes if needed
- [ ] Performance optimization:
  - `renderer.setPixelRatio(Math.min(dpr, 2))`
  - `requestAnimationFrame` tick loop
  - Material/texture disposal on section detach
  - LOD consideration for mobile

### Phase 9: Responsive & Mobile
- [ ] Verify breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1025px)
- [ ] Adjust camera FOV and model scale per breakpoint
- [ ] Ensure touch events work with Lenis (`syncTouch:false`, `smoothWheel:true`)
- [ ] Test WebGL performance on mobile (reduce draw calls, texture sizes)

### Phase 10: Asset Replacement & Finalization
- [ ] Replace placeholder watch model with production-quality GLB
- [ ] Bake/obtain ARM maps, normal maps, emissive maps matching material variants
- [ ] Configure envmap HDR for luxury studio lighting
- [ ] Verify all 4 color themes render correctly
- [ ] Audit bundle size (main bundle was ~676KB with Three.js embedded)
- [ ] Add loading screen asset manifest with progress tracking

## Key Risks & Unknowns
- **Model source**: The original watch GLB is private. A replacement model must be acquired or created with matching material channels.
- **Config files**: Original loads materials/textures from private JSON configs. We must replicate via explicit JS config.
- **Post-processing chain**: Custom post-processing exists but full composer pipeline is unknown; may need reverse-engineering or equivalent.
- **Audio**: No audio confirmed in code, but luxury watch experiences often include mechanical ticking sounds.

## Validation
- [ ] Build succeeds with Vite
- [ ] Three.js scene renders watch model with correct materials
- [ ] Real-time seconds hand updates every second
- [ ] ScrollTrigger animations fire on section entry/exit
- [ ] Lenis smooth scroll works on desktop and mobile
- [ ] Custom cursor follows mouse with correct icons
- [ ] 4 color themes switch with smooth transitions
- [ ] Loader arc animation completes before showing app
- [ ] Responsive layout adapts at 768px, 1025px, 1441px, 1600px
- [ ] No console errors on load
