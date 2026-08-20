# Design Specification: CCI Immersive 3D Experience
## Based on Reference Site: https://thewatch.60fps.fr/

---

## 1. Layout & Structure

### 1.1 Core Layout DNA
The reference site uses a **fixed full-screen WebGL canvas** as the persistent background layer, with **scrollable DOM sections** overlaid on top. This creates the signature "3D world that reacts to content" experience.

**Our adaptation for CCI:**
- Fixed `<div id="canvas-wrapper">` at `z-index: 0` containing the Three.js WebGL scene
- Scrollable `<div id="root">` at `z-index: 1` containing all DOM sections
- `pointer-events` toggling: canvas receives events when no DOM interaction is needed, DOM elements receive events on hover/click

### 1.2 Section Mapping: Reference → CCI

| Reference Section | Purpose | CCI Adaptation |
|---|---|---|
| `Intro` | Brand title, color config circles, SVG animations | **Hero** — "Transforming Ideas Into Digital Reality" with 3D product reveal, service configurator circles |
| `Colors` | 4-theme color selector | **Services Configurator** — 4 capability pillars (AI, Security, Cloud, Data) with interactive selection that changes 3D scene mood |
| `Curves` | Single part section wrapper | **Capabilities** — End-to-end service flow visualization |
| `Disassembly` | Exploded view with hover overlays | **Case Studies** — "Exploded" project reveals, hover to see tech stack breakdown |
| `Mechanism` | Real-time seconds digit display | **Live Metrics** — Animated counters (projects delivered, uptime, clients served) |
| `Movement` | Movement description with grey-line animations | **Process** — How CCI works: Discovery → Architecture → Build → Deploy → Monitor |
| `Parts` | Parts list with bar-scale animations | **Tech Stack** — Interactive technology inventory with proficiency bars |
| `Straps` | Strap description | **Integrations** — Partner ecosystem and toolchain |
| `Timeless` | Timeless description | **About / Mission** — CCI's founding story and vision |
| `VerticalText` | Vertical text fade in/out | **Testimonials** — Rotating client quotes in vertical layout |
| `Footer` | Words/chars split animation | **CTA + Footer** — "Start Your Project" with split-text reveal |
| `Images` | Image grid with scroll translation | **Showcase Grid** — Project screenshots/artifacts |

### 1.3 Grid System
- **Base unit**: Responsive `vw`-based font sizing (`html { font-size: .3125vw }` at mobile, scaling down at breakpoints)
- **Breakpoints**: 768px (tablet), 1025px (desktop), 1441px (large), 1600px (xlarge)
- **Content bounds**: Max-width constrained containers with consistent horizontal padding
- **Section spacing**: Generous vertical padding (`py-24` to `py-32` on desktop) to let 3D scene breathe
- **DOM overlay**: Text and UI elements positioned with `position: relative/absolute` over the fixed canvas

### 1.4 Typography Scale
| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| H1 | 2.25rem | 3.25rem | 3.45rem–7xl |
| H2 | 1.75rem | 2.25rem | 3rem |
| H3 | 1.125rem | 1.25rem | 1.5rem |
| Body | 0.9375rem | 1rem | 1.0625rem |
| Mono/Small | 0.6875rem | 0.75rem | 0.8125rem |

- **Primary display font**: Nekst (geometric, modern, technical presence)
- **Body font**: Inter (clean readability for long-form content)
- **Accent/Mono**: JetBrains Mono or similar for metrics, code snippets, data points

### 1.5 Color Palette

**Foundation (from reference):**
```css
--bg-primary: #000000;
--bg-secondary: #808080;
--text-primary: #ffffff;
--text-secondary: #B9B6BD;
```

**CCI Brand Integration (4-theme system):**
| Theme | Primary BG | Secondary BG | Text Primary | Text Secondary | Accent |
|---|---|---|---|---|---|
| `void` (default) | `#000000` | `#808080` | `#ffffff` | `#B9B6BD` | `#6366F1` |
| `obsidian` | `#0F172A` | `#1E293B` | `#F8FAFC` | `#94A3B8` | `#8B5CF6` |
| `aurora` | `#0C1222` | `#1A1F2E` | `#E2E8F0` | `#64748B` | `#06B6D4` |
| `mineral` | `#18181B` | `#27272A` | `#FAFAFA` | `#A1A1AA` | `#6366F1` |

**3D Scene Color Response:**
- When theme changes, the WebGL scene transitions over `1.2s` with `power3.inOut`
- 3D materials shift emissive/ambient colors to match theme accent
- Environment map intensity adjusts (`uDarknessProgress`)

---

## 2. Animations & Motion

### 2.1 Scroll-Driven Architecture

**Core stack:**
- **Lenis 1.0.42** — Smooth scrolling with `smoothWheel: true`, `syncTouch: false`, `lerp: 0.1`
- **GSAP 3.15** + **ScrollTrigger 3.15** + **EasePack 3.15** — Scroll-linked animations
- **Framer Motion** — Existing React animations (to be migrated or integrated)

**Lenis configuration:**
```javascript
const lenis = new Lenis({
  smoothWheel: true,
  syncTouch: false,
  lerp: 0.1,
});
```

### 2.2 Animation Patterns

**A. Section Reveal (on scroll into viewport)**
- Trigger: `start: "top bottom"`, `end: "bottom top"`
- Text: Characters split into `<span class="st-char">`, staggered reveal with `power3.out` / `power4.out`
- Images: `y: 48 → 0`, `opacity: 0 → 1`, scrub-linked
- 3D object: Camera orbit or model rotation synced to scroll progress

**B. Parallax Background Text**
- Large background words move at `-60vw / +60vw` with `power3.in` easing
- Creates depth between foreground content and 3D scene

**C. Scrub-Linked 3D Transforms**
- Model rotation/position tied to scroll position
- `scrub: true` or `scrub: 2` for smooth interpolation
- Example: Engine rotates from 0° to 180° as user scrolls through "Capabilities" section

**D. Hover Micro-Interactions**
- Custom cursor changes icon state: `select` → `cross` → `left-arrow` → `right-arrow`
- 3D meshes highlight on hover (emissive intensity increase)
- DOM cards: `scale(1.02)`, border color shift, shadow expansion
- Cursor follows with GSAP `quickTo`: `duration: 1.3`, `ease: "power4.out"`

**E. Loading Sequence**
1. Full-screen loader with `#0C1222` background (CCI: dark brand color)
2. SVG progress arc: `stroke-dasharray: 2168`, `stroke-dashoffset: 2168 → 0` over `1.2s ease-in-out`
3. "Now loading" text with word-by-word fade
4. Fade out loader → reveal 3D scene + first section

### 2.3 Text Splitting System
Custom utility to split text for animation:
```javascript
// Splits into: st-word → st-line → st-char
// Supports data-split attribute
// Preserves whitespace and inline elements
```

### 2.4 Color Theme Transitions
When user switches themes:
```javascript
gsap.to(':root', {
  '--first-color': newColor1,
  '--second-color': newColor2,
  duration: 1.2,
  ease: 'power3.inOut'
});
// Simultaneously animate 3D material uniforms
material.uniforms.uEnvMapIntensity.value = 0.15; // darkness progress
```

---

## 3. Behavioral Logic

### 3.1 Navigation & Scroll
- **Lenis** owns all scroll behavior; native `scroll-behavior: auto` to prevent double-smoothing
- **ScrollTrigger** animations scrob to Lenis virtual scroll via `lenis.on('scroll', ScrollTrigger.update)`
- Sections use `data-section` attributes for lifecycle management
- Each section has `init()`, `attach()`, `detach()`, `setupTimeline()` lifecycle methods

### 3.2 3D Interaction Model
1. **Idle state**: 3D model slowly rotates (auto-orbit), environment subtly shifts
2. **Scroll state**: Camera orbit/model rotation synced to scroll progress within section
3. **Hover state**: Raycaster detects hovered mesh → increase emissive → change cursor icon
4. **Click state**: 
   - Clicking interactive meshes triggers "disassembly" (exploded view)
   - Left/right arrow navigation between parts
   - Close overlay returns to assembled view
5. **Theme switch**: All materials transition colors, envmap intensity shifts

### 3.3 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| `< 768px` (mobile) | Touch-optimized, `syncTouch: false`, simplified 3D (fewer draw calls), stacked layout |
| `768px – 1024px` (tablet) | Medium complexity 3D, 2-column layouts where applicable |
| `> 1025px` (desktop) | Full 3D fidelity, multi-column layouts, custom cursor visible |
| `> 1441px` (large) | Increased canvas resolution, larger typography scale |

### 3.4 Performance Logic
```javascript
// DPR capping
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Breakpoint-based model complexity
if (breakpoint === 'mobile') {
  model.traverse(obj => {
    if (obj.isMesh && obj.material.defines.SIXTY_ARMMAP) {
      obj.material.defines.SIXTY_ARMMAP = undefined;
    }
  });
}

// Dispose on section detach
section.onDetach = () => {
  geometries.forEach(g => g.dispose());
  materials.forEach(m => m.dispose());
  textures.forEach(t => t.dispose());
};
```

### 3.5 Real-Time Data Simulation
Like the watch's real-time clock hands, CCI sections will have:
- **Live metrics counter**: Animated number increments (projects, uptime %, clients)
- **Terminal-style output**: Code snippets or log outputs that "type" in real-time
- **Pulse indicators**: Green dots on active services/status

---

## 4. 3D Assets & Visuals

### 4.1 3D Concept: "The Digital Engine"
Replace the luxury watch with an abstract **digital product engine** visualization:
- A central crystalline/core structure (representing CCI's core engineering)
- Orbiting satellite modules (AI, Security, Cloud, Data)
- Flowing data streams / particle trails connecting modules
- Geometric casing that can "explode" to reveal internal components

### 4.2 Asset Requirements

**A. Primary Model (GLB/GLTF)**
```
/cdn/models/cci-engine-core.glb
  ├── core (central crystalline shape — Icosahedron or custom beveled geometry)
  ├── ring-ai (orbiting module — soft torus with emissive nodes)
  ├── ring-security (orbiting module — shield-like geometry)
  ├── ring-cloud (orbiting module — layered disc/plate geometry)
  ├── ring-data (orbiting module — flowing ribbon/tube geometry)
  ├── particles (point cloud system)
  └── connections (tube geometries between modules)
```

**B. Model Prompts for Generation/Acquisition:**
```
Prompt for AI 3D generation (e.g., Tripo3D, CSM, Luma):
"Abstract digital engine core, luxury tech aesthetic, dark monochrome with purple 
and cyan emissive accents, crystalline central structure with 4 orbiting satellite 
modules, clean geometric shapes, PBR materials, 4K textures, GLB format, 
single mesh hierarchy with named parts: core, ring-ai, ring-security, ring-cloud, 
ring-data, particles, connections. No background, centered composition."

Alternative: Commission on Fiverr/ArtStation:
"Looking for a 3D product visualization of an abstract AI/tech engine. 
Central crystalline core with 4 orbiting modules representing AI, Security, 
Cloud, and Data. Dark materials with subtle metallic reflections, 
emissive accent lines, clean luxury-tech aesthetic. 
Deliverables: GLB with separate meshes per part, ARM texture maps, 
normal maps, 4K environment map compatible."
```

### 4.3 Texture Pipeline
| Texture Type | Purpose | Resolution |
|---|---|---|
| ARM Map (AO/Roughness/Metalness) | Base PBR material definition | 2048×2048 |
| Normal Map | Surface detail / brushed metal effect | 2048×2048 |
| Emissive Map | Glowing accent lines / active states | 1024×1024 |
| Noise Texture | Brushed metal perturbation, dial distortion | 512×512 |
| Environment Map (HDR/EXR) | IBL lighting, reflections | 1K–2K CubeUV |

### 4.4 Material Variants (CCI-Adapted)

| Material Name | Use Case | Key Properties |
|---|---|---|
| `PBR` | Core crystalline structure | ARM map, envmap rotation |
| `MetalGlossy` | Orbital modules | Gold/blue metal colors, UV1 mixing for accent zones |
| `MetalBrushed` | Casing / rings | Brushed normal perturbation, saturation adjustment |
| `Glass` | Crystal overlays | Transparent, `depthWrite: false`, edge glow |
| `Glow` | Active indicator lines | Emissive, time-animated pulse |
| `Laser` | Data stream connections | Pulse time-animated, additive blending |
| `ParticlesMaterial` | Floating data particles | Curl noise, custom attributes |
| `ShadowPlanes` | Ground shadow | Opacity controlled, additive blending |

### 4.5 Environment & Lighting
- **HDR Environment**: Dark studio setup with subtle gradient, not a physical location
- **IBL**: Custom CubeUV PMREM with roughness-based mip sampling
- **Lights**: 
  - Key light: Cool white from upper-right
  - Fill light: Purple/indigo tint from left (CCI brand color)
  - Rim light: Cyan from behind for edge definition
  - Ambient: Very low intensity for control

---

## 5. Content Integration

### 5.1 Content-to-Section Mapping

**HERO (was: Intro)**
```
Heading: "Transforming Ideas Into Digital Reality"
Subheading: "We engineer AI automation, secure cloud infrastructure, and 
            data pipelines that scale — from first commit to global deployment."
CTAs: [Start Your Project] [Explore Capabilities]
3D: Engine core fully assembled, slowly rotating, particles active
```

**SERVICES CONFIGURATOR (was: Colors)**
```
Heading: "Choose Your Stack"
4 Interactive Circles:
  1. AI & Automation — "Machine learning pipelines, NLP, computer vision"
  2. Security — "SOC, threat detection, zero-trust architecture"
  3. Cloud — "AWS/Azure/GCP, Kubernetes, serverless"
  4. Data — "Streaming, warehousing, real-time analytics"
Interaction: Clicking a circle:
  - Updates CSS theme variables
  - Highlights corresponding 3D orbital module (emissive increase)
  - Scrolls to relevant case study
  - Shows capability detail panel
```

**CAPABILITIES (was: Curves)**
```
Heading: "End-to-End Engineering"
Sub-sections:
  - Discovery → Architecture → Build → Deploy → Monitor
  - Each phase has icon, description, and associated 3D state
  - 3D: Camera pulls back to show full exploded view
```

**CASE STUDIES (was: Disassembly)**
```
Heading: "Proof in Production"
Cards:
  1. FinChain — DeFi Trading Platform ($2M+ daily volume)
  2. ShieldOps — Security Operations Center
  3. NeuralMetrics — AI Analytics Dashboard
Interaction: Hover card → 3D model rotates to show relevant subsystem
  - FinChain → Data ring highlights
  - ShieldOps → Security ring highlights
  - NeuralMetrics → AI ring highlights
```

**LIVE METRICS (was: Mechanism)**
```
Heading: "Running at Scale"
Metrics (animated counters):
  - 50+ Projects Delivered
  - 99.9% Uptime SLA
  - 2M+ Daily Transactions
  - 24/7 Monitoring Active
3D: Particles increase density, connection lines pulse faster
```

**PROCESS (was: Movement)**
```
Heading: "How We Build"
Timeline:
  Day 1–3: Discovery & Mapping
  Week 1–2: Architecture & Design
  Week 3–6: Build & Iterate
  Week 7: Deploy & Monitor
  Ongoing: Scale & Optimize
3D: Sequential module activation as user scrolls
```

**TECH STACK (was: Parts)**
```
Heading: "Our Arsenal"
Categories with proficiency indicators:
  - Frontend: React, Next.js, Svelte, TypeScript
  - Backend: Node.js, Python, Go, Rust
  - AI/ML: PyTorch, TensorFlow, LangChain, OpenCV
  - Cloud: AWS, Azure, GCP, Kubernetes
  - Data: Kafka, Spark, PostgreSQL, Redis
  - Security: SOC2, OWASP, zero-trust, SIEM
3D: Each category mapped to a module; hovering stack item highlights module
```

**INTEGRATIONS (was: Straps)**
```
Heading: "Tools We Use"
Logo grid:
  - AWS, Azure, GCP, Vercel, Docker, Kubernetes
  - GitHub, GitLab, Jenkins, Terraform
  - Datadog, Grafana, Prometheus, ELK
  - React, Three.js, Python, TensorFlow
3D: Connection tubes between modules glow when corresponding integration is hovered
```

**TESTIMONIALS (was: VerticalText)**
```
Heading: "Client Insights"
Vertical-scrolling quotes:
  - "CCI transformed our legacy system into a modern cloud-native architecture."
  - "Their AI automation reduced our operational costs by 40%."
  - "Best security audit we've ever had — thorough, fast, actionable."
3D: Background particles slow down, scene enters "reflection" mode
```

**MISSION / ABOUT (was: Timeless)**
```
Heading: "Why CCI Exists"
Body: "We believe technology should amplify human potential, not replace it. 
       Every line of code we write serves a purpose: to make businesses faster, 
       safer, and more intelligent. Founded in India, built for the world."
3D: Camera orbits to show full assembly, all modules active and connected
```

**FOOTER / CTA (was: Footer)**
```
Heading: "Ready to Build?"
Subheading: "Let's discuss your next project."
[Book a Call] [View Case Studies]
Links: Home, Services, Projects, Tech Stack, About, Contact
3D: Scene enters "idle celebration" — all particles active, gentle pulse
```

### 5.2 Brand Voice & Tone
- **Tone**: Confident, technical, premium, approachable
- **Voice**: "We engineer..." not "We provide..."
- **Descriptors**: Precise, resilient, scalable, intelligent, secure
- **Avoid**: Buzzword soup, overpromising, generic agency speak

---

## 6. Technical Blueprint

### 6.1 Project Structure
```
src/
  app/
    layout.tsx          # Root layout with font setup
    page.tsx            # Main experience entry
    watch/              # Route directory for the immersive experience
      page.tsx          # /watch route
  components/
    sections/
      Hero.tsx          # Intro / brand reveal
      ServicesConfig.tsx # 4-theme capability selector
      Capabilities.tsx  # End-to-end flow
      CaseStudies.tsx   # Disassembly-style project reveals
      LiveMetrics.tsx   # Animated counters
      Process.tsx       # Timeline / movement
      TechStack.tsx     # Parts / inventory
      Integrations.tsx  # Partner ecosystem
      Testimonials.tsx  # Vertical text quotes
      Mission.tsx       # About / timeless
      Footer.tsx        # CTA + links
    ui/
      CustomCursor.tsx  # Cursor icon states
      Loader.tsx        # SVG progress arc
      ScrollChapterRail.tsx # Chapter indicators
      SectionReveal.tsx # Base section wrapper
    webgl/
      Canvas.tsx        # Three.js canvas wrapper
      Scene.tsx         # Main 3D scene
      Materials.tsx     # Custom PBR material system
      Model.tsx         # GLB loader + hierarchy
      Particles.tsx     # Particle system
      PostProcessing.tsx # Custom shader passes
      useViewport.ts    # Resize + breakpoint detection
  lib/
    motion.ts           # Spring/ease constants
    storyArc.ts         # Section bridge data
    themes.ts           # 4-theme CSS variable configs
    splitText.ts        # Text splitting utility
```

### 6.2 State Management
```javascript
// Global event bus (mirrors reference architecture)
const state = {
  events: {
    INIT_PROJECT,
    LOADING_PROGRESS,
    ATTACH_PROJECT,
    DETACH_PROJECT,
    CONFIG_CHANGE,        // Service/theme selection
    HOVER_POSITION,
    SET_CURSOR_ICON,
    UPDATE_METRICS,       // Live counter updates
    NEXT_PREVIOUS_CARD,   // Case study navigation
    XPLOD_VIEW,           // Exploded/assembled toggle
  }
};
```

### 6.3 Animation Implementation Details

**Lenis + ScrollTrigger Integration:**
```javascript
useEffect(() => {
  const lenis = new Lenis({ smoothWheel: true, syncTouch: false, lerp: 0.1 });
  
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  
  return () => lenis.destroy();
}, []);
```

**Section Timeline Factory:**
```javascript
function createSectionTimeline(sectionRef, animations) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
  
  animations.forEach(({ target, from, to, ease }) => {
    tl.fromTo(target, from, to, ease);
  });
  
  return tl;
}
```

**Custom Cursor:**
```javascript
const cursorX = gsap.quickTo(cursorRef.current, 'x', { duration: 1.3, ease: 'power4.out' });
const cursorY = gsap.quickTo(cursorRef.current, 'y', { duration: 1.3, ease: 'power4.out' });

window.addEventListener('mousemove', (e) => {
  cursorX(e.clientX);
  cursorY(e.clientY);
});
```

### 6.4 3D Scene Architecture

**Renderer:**
```javascript
const renderer = new WebGLRenderer({
  antialias: false,
  powerPreference: 'high-performance',
  autoClear: false,
});
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(Math.min(dpr, 2));
```

**Camera:**
```javascript
const camera = new PerspectiveCamera(
  40 / Math.min(1, viewportRatio * 1.5),
  viewportRatio,
  0.1,
  100
);
camera.position.set(0, 0, 10);
```

**Material System:**
```javascript
// Custom ShaderMaterial extending Three.js PBR
const material = new ShaderMaterial({
  uniforms: {
    uColor: { value: new Color(0xffffff) },
    uMetallic: { value: 0.9 },
    uRoughness: { value: 0.1 },
    uEnvMapIntensity: { value: 1.0 },
    uGlobalEnvmapRotation: { value: new Euler() },
    // ... other SIXTY_* uniforms
  },
  vertexShader: customPBRVertex,
  fragmentShader: customPBRFragment,
});
```

**Model Hierarchy:**
```javascript
const model = await loadGLTF('/models/cci-engine-core.glb');
scene.add(model.scene);

// Part references for animation
const parts = {
  core: model.scene.getObjectByName('core'),
  ringAI: model.scene.getObjectByName('ring-ai'),
  ringSecurity: model.scene.getObjectByName('ring-security'),
  ringCloud: model.scene.getObjectByName('ring-cloud'),
  ringData: model.scene.getObjectByName('ring-data'),
  particles: model.scene.getObjectByName('particles'),
  connections: model.scene.getObjectByName('connections'),
};

// Idle animation
gsap.to(parts.ringAI.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' });
```

### 6.5 Performance Budget
| Metric | Target |
|---|---|
| Initial JS bundle | < 400KB gzipped |
| 3D model size | < 5MB (draco compressed) |
| Texture resolution | Max 2K per texture |
| Draw calls (mobile) | < 50 |
| Draw calls (desktop) | < 120 |
| Frame time | 16.67ms (60fps) |
| LCP | < 2.5s |
| FID | < 100ms |

---

## 7. Migration Path from Current CCI Site

### Phase 1: Foundation (Week 1-2)
- [ ] Set up `/watch` route in Next.js app router
- [ ] Create WebGL canvas wrapper component
- [ ] Implement Three.js scene boilerplate
- [ ] Build loader component with SVG progress arc
- [ ] Port existing CCI color variables + add 4-theme system

### Phase 2: 3D Core (Week 3-4)
- [ ] Acquire/generate CCI engine 3D model
- [ ] Implement custom PBR material system
- [ ] Set up HDR environment + PMREM
- [ ] Implement idle animations (orbit, particles)
- [ ] Add responsive breakpoints and DPR handling

### Phase 3: Sections (Week 5-6)
- [ ] Build Hero with 3D model reveal
- [ ] Build Services Configurator with theme switching
- [ ] Build Case Studies with hover-to-highlight
- [ ] Build Live Metrics with animated counters
- [ ] Port existing CCI content into new section structure

### Phase 4: Animation Polish (Week 7)
- [ ] Integrate Lenis + ScrollTrigger
- [ ] Implement text splitting + char reveals
- [ ] Add parallax background elements
- [ ] Wire 3D scroll-linked transforms
- [ ] Implement custom cursor

### Phase 5: Integration (Week 8)
- [ ] Connect existing CCI navbar to `/watch` route
- [ ] Ensure `/` homepage remains intact
- [ ] Add route transition animations
- [ ] Cross-link between homepage and experience

### Phase 6: Optimization (Week 9-10)
- [ ] Draco compression for model
- [ ] Texture atlasing and size optimization
- [ ] Mobile performance testing
- [ ] Bundle size audit
- [ ] Accessibility audit (keyboard nav, reduced motion)

---

## 8. Risk Assessment & Mitigations

| Risk | Mitigation |
|---|---|
| 3D model procurement delays | Start with abstract geometry placeholder; commission model in parallel |
| Performance on low-end devices | Implement adaptive quality: disable particles, reduce draw calls, lower texture res |
| Scroll animation conflicts with existing Framer Motion | Use `data-lenis-prevent` attributes; isolate Lenis to `/watch` route |
| Bundle size increase | Tree-shake Three.js; use dynamic imports for heavy components |
| Accessibility | Ensure `prefers-reduced-motion` disables all scroll/3D animations; provide alt content |

---

## 9. Success Criteria

- [ ] `/watch` route loads with < 3s LCP on 4G
- [ ] 3D scene maintains 60fps on desktop, 30fps on mobile
- [ ] All 4 themes switch smoothly without layout shift
- [ ] ScrollTrigger animations fire at correct scroll positions
- [ ] Custom cursor is performant and does not lag
- [ ] Existing `/` homepage is unaffected
- [ ] Lighthouse Performance score > 90
- [ ] No console errors on load or scroll

---

*Document generated: 2026-08-20*
*Reference site: https://thewatch.60fps.fr/*
*Target project: Crawl Corp India (CCI) — Next.js 16 + React 19*
