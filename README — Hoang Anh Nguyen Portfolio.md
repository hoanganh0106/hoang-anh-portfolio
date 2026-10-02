# Hoang Anh Nguyen — Personal Technical Portfolio

> **Exploring systems, intelligence, and hardware.**

A minimalist, interactive personal portfolio for **Hoang Anh Nguyen**, a third-year Electronics & Telecommunications Engineering student at Hanoi University of Science and Technology.

This website is not designed as a traditional CV or job-seeking portfolio.

It is a **technical showcase and personal R&D journal** that communicates what I have built, what I am currently exploring, and where I am heading.

The core idea is:

**Systems → Edge AI → Electronics → IC Design**

The website should communicate the feeling of a **young engineer entering the R&D world**: curious, technical, hands-on, precise, and understated.

---

# 1. Design Philosophy

The website must feel:

- Minimalist
- Technical
- Intelligent
- Calm
- Precise
- Experimental
- Young but mature
- Engineering-oriented
- Interactive without becoming flashy

It must **not** feel like:

- A generic developer portfolio
- A SaaS landing page
- A futuristic gaming website
- A cyberpunk website
- An AI-generated template
- A corporate resume website
- An exaggerated "expert engineer" portfolio

The portfolio should never overstate my current level.

I am a student exploring R&D.

The visual language should communicate **potential and curiosity**, not pretend that I am already a senior engineer.

---

# 2. Core Visual Concept

## Technical Journal × Circuit

The visual metaphor of the entire website is a **circuit**.

Circuit elements are used as a subtle interaction and navigation language:

- traces
- nodes
- connections
- grids
- signal paths
- system modules
- technical labels
- coordinates
- small annotations

However, avoid stereotypical neon circuit-board graphics.

The circuit language should be:

**minimal + physical + architectural + precise**

Think of a modern digital version of an engineering notebook.

---

# 3. Visual Material

Primary visual material:

**Light Gray / Technical Paper**

The light theme should feel like a clean engineering document or technical notebook.

The dark theme should feel like the same system viewed in a low-light laboratory environment.

Light and dark mode are not separate designs.

They are two expressions of the same design system.

---

# 4. Color Direction

Do not rely on bright accent colors.

The portfolio is fundamentally monochromatic.

### Light mode

Background:

- light gray
- technical paper gray

Primary text:

- near black
- charcoal

Secondary text:

- medium gray

Borders:

- soft gray

Circuit lines:

- neutral gray

Interaction states may use a very restrained highlight, but avoid saturated neon colors.

### Dark mode

Background:

- charcoal
- near black

Primary text:

- off-white

Secondary text:

- muted gray

Borders:

- dark gray

Circuit traces:

- subtle gray / white

Interaction states:

- restrained brightness
- very subtle cool highlight

The overall visual hierarchy must come from:

**contrast + spacing + depth + motion**

not from excessive color.

---

# 5. Typography

Primary typographic inspiration:

**Claude Sans**

Use a similar clean, modern, humanist sans-serif when an exact licensed font is unavailable.

Typography should feel:

- modern
- technical
- understated
- highly readable
- slightly editorial

Use large typography sparingly.

Do not create huge "startup hero" headlines.

The name should be dominant, but still elegant.

Recommended hierarchy:

```text
HOANG ANH NGUYEN

Exploring systems, intelligence, and hardware.

Systems
Edge AI
Electronics
IC Design
```

Optional monospace typography may be used for:

- technical metadata
- project numbers
- coordinates
- system labels
- small annotations
- code-like information

Do not overuse monospace.

---

# 6. Homepage Concept

The homepage is an **Interactive System Map**.

It is not a normal collection of cards.

The user should feel as if they are entering a lightweight engineering system.

The main visual is a central identity node:

```text
HOANG ANH NGUYEN
```

Around it are major domain nodes.

Recommended major nodes:

```text
SYSTEMS
EDGE AI
RESEARCH
ELECTRONICS
IC DESIGN
```

These represent areas of exploration.

Each major node contains smaller project nodes.

---

# 7. Node Architecture

## Level 1 — Domain Nodes

Large nodes represent areas of work.

Example:

```text
SYSTEMS
EDGE AI
RESEARCH
ELECTRONICS
IC DESIGN
```

These should have visual mass and slight 3D depth.

They are architectural modules rather than ordinary UI cards.

---

## Level 2 — Project Nodes

Smaller 3D nodes orbit or connect to their parent domain.

Example:

### SYSTEMS

```text
Cisco Networking
Linux / Windows Server
```

### EDGE AI

```text
Edge AI Stethoscope
Face Recognition
```

### RESEARCH

```text
SPMamba — 3-Source Speech Separation
MossFormer 2
```

### ELECTRONICS

```text
Signal Processing
Embedded Systems
```

### IC DESIGN

Future direction:

```text
PCB
FPGA
RF / Antenna
UAV
IC Design
```

Future items should visually communicate **direction**, not completed projects.

Do not represent future skills as completed achievements.

---

# 8. 3D Interaction

The nodes should have subtle 3D depth.

Preferred implementation:

- Three.js
- React Three Fiber
- or another lightweight WebGL implementation

The 3D effect should be restrained.

Each node may have:

- physical depth
- beveled edges
- subtle lighting
- soft shadow
- slight rotation
- parallax
- hover elevation
- active state
- connection traces

Avoid:

- floating spaceship aesthetics
- giant glowing objects
- excessive bloom
- cyberpunk neon
- gaming UI
- heavy particle systems

The physical inspiration should be closer to:

**hardware module / engineering component / lab instrument**

than a sci-fi interface.

---

# 9. Circuit Interaction

Circuit connections are part of navigation.

Example:

```text
SYSTEMS ─────────┐
                 │
                 ▼
              IDENTITY
                 ▲
                 │
EDGE AI ─────────┘
```

However, the final implementation should be visually sophisticated rather than literally diagrammatic.

Connections can:

- illuminate on hover
- animate gently
- respond to pointer movement
- connect domains to projects
- indicate the user's current location

The animation should communicate **information flow**.

---

# 10. Hero Section

The hero should immediately communicate identity.

Suggested content:

```text
HOANG ANH NGUYEN

Exploring systems, intelligence, and hardware.

Electronics & Telecommunications Engineering
Hanoi University of Science and Technology
Year 3
```

Optional small metadata:

```text
SYSTEMS
EDGE AI
ELECTRONICS
IC DESIGN
```

The hero is an identity statement.

Do not use exaggerated statements such as:

```text
AI EXPERT
LEADING EDGE AI ENGINEER
NEXT-GEN HARDWARE ARCHITECT
```

The tone must remain honest.

---

# 11. About Section

The About section should focus on the learning journey.

The central narrative:

```text
Systems
→
Edge AI
→
Electronics
→
IC Design
```

The section should communicate:

> I am exploring how intelligent systems move from software and systems toward real hardware.

Keep the writing concise.

Do not turn this into a long biography.

---

# 12. Featured Work

The website is primarily a **showcase**.

Project pages should prioritize:

1. What it is
2. What I built
3. Technical area
4. Visual result
5. Link or paper
6. Current status

Avoid long case-study storytelling.

Some projects contain internal information and cannot be fully disclosed.

For those projects:

- show only safe information
- use abstracted architecture
- use concept visualizations
- never expose private source code
- never expose internal data
- never expose confidential diagrams
- never invent missing technical details

---

# 13. Featured Research Project

## Adaptation and Extension of SPMamba from 2-Source to 3-Source Speech Separation

This is one of the primary featured projects.

Display:

```text
SPMamba
2-Source → 3-Source Speech Separation
```

Include:

- research description
- waveform visual
- technical summary
- publication/conference information
- paper link when available

Conference:

**UEC ASEAN Seminar and Workshop 2026**

Organized by:

**UEC ASEAN Research and Education Center**
**The University of Electro-Communications**

This project should be treated as a serious research achievement, while still avoiding exaggerated claims about expertise.

---

# 14. MossFormer 2

Include MossFormer 2 as another research-oriented project.

The visual identity should use:

- waveform
- spectrogram-like textures
- signal paths
- source separation metaphors

Avoid generic AI visuals.

Prefer visualizations that look related to actual signal processing.

---

# 15. Signature Project — Edge AI Stethoscope

This should be one of the most visually important projects.

Current status:

**Research prototype / near-complete prototype**

Concept pipeline:

```text
Acoustic Signal
        ↓
Signal Capture
        ↓
Heart / Lung Source Separation
        ↓
Noise Filtering
        ↓
AI Inference
        ↓
Edge Device
        ↓
On-device Display
```

The key idea is:

> AI running close to the physical device rather than depending entirely on cloud computation.

The website should communicate this project through a **minimal 3D product visualization**.

Visual direction:

- electronic stethoscope
- light gray studio background
- realistic engineering materials
- minimal details
- subtle electronics
- no exaggerated medical branding
- no futuristic neon

Important:

This project must be presented as a **prototype / research project**, not as a clinically validated medical diagnostic product.

Do not claim medical accuracy or clinical validation unless explicitly provided.

---

# 16. Face Recognition

This is an early AI project.

It represents the beginning of the AI journey.

Pipeline:

```text
Image
→
Face Recognition Model
→
Inference
→
Arduino Control Signal
```

This project should appear lower in hierarchy than the research projects.

It is valuable because it shows progression:

```text
First AI experiment
→
Model training
→
Real-time inference
→
Physical device control
```

Repository:

https://github.com/hoanganh0106/Face-recognition

---

# 17. Network / Systems

Network work should be presented as practical laboratory work.

Technology:

```text
Cisco Packet Tracer
Routing
Switching
OSPF
EIGRP
NAT
Network Topology
```

The work was completed through structured labs/tutorials and required configurations.

Do not describe it as production infrastructure engineering.

Repository:

https://github.com/hoanganh0106/Cisco-Networking-Projects

The project page can include an interactive network topology visualization.

---

# 18. Linux / Windows Server

Show this together with Systems.

Possible themes:

```text
Systems Administration
Linux
Windows Server
Networking
Infrastructure
```

Keep the visual language technical and minimal.

Avoid fake dashboards.

---

# 19. Current vs Future

This distinction is important.

## CURRENT

What I am actively exploring or have built:

```text
Systems
Network
Linux / Windows Server
Edge AI
AI Model Training
Signal Processing
Embedded
Research
```

## FUTURE

Direction I am moving toward:

```text
PCB
FPGA
RF / Antenna
UAV
IC Design
```

The website should visibly separate these two states.

Future topics can appear as:

```text
NEXT
EXPLORING
COMING NEXT
DIRECTION
```

Never label future goals as completed projects.

---

# 20. Navigation

Primary navigation:

```text
HOME
PROJECTS
RESEARCH
ABOUT
```

Optional compact utility:

```text
LIGHT / DARK
```

Navigation should be minimal.

The interactive system itself should also provide navigation.

Do not create large menus.

---

# 21. Interaction Model

Important interactions:

### Pointer interaction

Nodes respond to cursor position.

Possible effects:

- small rotation
- depth shift
- light response
- subtle scale
- trace activation

### Hover

Hover should provide enhanced feedback.

However, essential information must still work on touch devices without hover.

### Click

Clicking a domain opens the related project area.

Clicking a project opens its project detail.

### Scroll

Scroll may gradually transform the system:

```text
Identity
→
Systems
→
Research
→
Edge AI
→
Electronics
→
Future / IC Design
```

The motion should feel like exploring a system rather than scrolling through a marketing website.

---

# 22. Motion Principles

Motion should follow:

**Purpose > Decoration**

Every animation should communicate one of:

- relationship
- state
- navigation
- hierarchy
- depth
- information flow

Preferred motion:

- smooth
- slow
- precise
- lightweight
- subtle

Avoid:

- bouncing elements
- excessive parallax
- fast transitions
- giant page transitions
- constant motion
- distracting particle effects

Support:

```css
prefers-reduced-motion
```

---

# 23. Responsive Design

The system must work on:

- desktop
- laptop
- tablet
- mobile

On mobile, the 3D system should simplify gracefully.

Possible mobile behavior:

```text
Interactive Node Map
        ↓
Vertical Technical Index
```

Do not attempt to force the desktop 3D composition onto a small screen.

The experience should remain minimalist and readable.

---

# 24. Accessibility

Required:

- semantic HTML
- keyboard navigation
- visible focus states
- readable contrast
- alternative text for meaningful images
- reduced-motion support
- touch-friendly controls

3D must never become the only way to access information.

The user must be able to navigate the portfolio without WebGL.

---

# 25. Performance

The site should feel lightweight despite using 3D.

Requirements:

- lazy-load heavy project visuals
- lazy-load 3D when useful
- avoid unnecessarily large textures
- optimize images
- avoid continuous expensive calculations
- reduce animation on mobile
- respect reduced-motion preference
- keep WebGL effects lightweight

Do not sacrifice usability for visual effects.

---

# 26. Recommended Technical Stack

Recommended implementation:

```text
Next.js
TypeScript
Tailwind CSS
React
React Three Fiber
Three.js
Framer Motion or GSAP
```

Use the simplest implementation that achieves the desired visual result.

Do not introduce libraries without a reason.

---

# 27. Project Architecture

Suggested structure:

```text
app/
  page.tsx
  projects/
  research/
  about/

components/
  navigation/
  hero/
  system-map/
  domain-node/
  project-node/
  circuit/
  project-card/
  project-detail/
  theme-toggle/

lib/
  projects.ts
  domains.ts
  site-config.ts

public/
  images/
  projects/
  renders/
```

Project content should be data-driven.

Example:

```ts
type Project = {
  id: string
  title: string
  category: string
  status: "current" | "research" | "future" | "early"
  description: string
  technologies?: string[]
  github?: string
  paper?: string
  image?: string
  confidential?: boolean
}
```

This makes it easy to add projects later without rebuilding the UI.

---

# 28. Content Rules

Write like an engineer documenting work.

Prefer:

> Built and trained a speech separation model adapted from SPMamba to support three-source separation.

Avoid:

> Revolutionized speech separation with my cutting-edge AI system.

Prefer:

> Developed a prototype for on-device heart and lung sound separation and AI inference.

Avoid:

> Built a revolutionary AI medical diagnostic device.

The tone should be:

**curious + precise + honest**

---

# 29. Design Details

Use:

- generous whitespace
- thin borders
- precise alignment
- subtle grid
- restrained radius
- clean typography
- small technical labels
- minimal icons
- carefully controlled shadows
- subtle depth

Avoid:

- excessive rounded cards
- gradients everywhere
- glassmorphism
- giant shadows
- neon lighting
- random blobs
- stock illustrations
- generic AI artwork
- excessive badges

---

# 30. Footer

Simple footer.

Example:

```text
HOANG ANH NGUYEN

Electronics & Telecommunications Engineering
Hanoi University of Science and Technology

Systems → Edge AI → Electronics → IC Design

GitHub
Email
LinkedIn
```

Optional final line:

> Exploring what comes next.

---

# 31. Overall User Experience

The first impression should be:

> "This is not a normal portfolio."

The second impression:

> "This person is clearly technical."

The third impression:

> "They are still learning, but they are actually building things."

The fourth impression:

> "There is a clear direction toward deeper hardware and R&D."

The user should leave remembering:

**HOANG ANH NGUYEN**

and the idea:

**Exploring systems, intelligence, and hardware.**

---

# 32. Critical Constraints for Codex

When implementing this website:

1. Do not over-design.
2. Do not exaggerate the user's expertise.
3. Do not turn the website into cyberpunk.
4. Do not use generic AI-generated visuals.
5. Do not use excessive neon colors.
6. Do not turn every section into a card grid.
7. Do not make 3D effects more important than content.
8. Do not expose confidential project information.
9. Do not invent project results, metrics, technologies, or achievements.
10. Do not represent future goals as completed work.

The website should feel like a **real young engineer's evolving technical portfolio**, not a fictional senior engineer's showcase.

---

# 33. Final Creative Direction

The final design language can be summarized as:

```text
YOUNG ENGINEER
        +
TECHNICAL JOURNAL
        +
CIRCUIT SYSTEM
        +
3D INTERACTIVE NODES
        +
MINIMALIST UI
        +
LIGHT / DARK
        +
R&D EXPLORATION
```

Core journey:

```text
SYSTEMS
   ↓
EDGE AI
   ↓
ELECTRONICS
   ↓
IC DESIGN
```

Core statement:

> **Exploring systems, intelligence, and hardware.**

The website should feel like the digital representation of an engineer who is still exploring — but already building real things.