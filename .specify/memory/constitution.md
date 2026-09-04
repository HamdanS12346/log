<!--
Sync Impact Report
Version change: placeholder scaffold -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME placeholder -> I. Brand-Aligned Visual Restraint
- PRINCIPLE_2_NAME placeholder -> II. Responsive Layout Discipline
- PRINCIPLE_3_NAME placeholder -> III. Semantic And Accessible Interfaces
- PRINCIPLE_4_NAME placeholder -> IV. Tokenized Design Systems
- PRINCIPLE_5_NAME placeholder -> V. Component Size And State Discipline
Added sections:
- Frontend Anti-Patterns
- Compliance Review
Removed sections:
- Placeholder Section 2
- Placeholder Section 3
Follow-up TODOs: None
-->
# Log Project Constitution

## Core Principles

### I. Brand-Aligned Visual Restraint

Generated pages and components MUST use clean, brand-aligned palettes and layouts instead of
generic AI-styled visual defaults. Implementations MUST NOT default to slate or near-black
backgrounds paired with purple or indigo gradients, glow effects, blurred orb backgrounds, mesh
gradients, grid overlays, or decorative rings unless the active specification explicitly requires
them.

Visual grouping MUST use hierarchy, spacing, typography, and proportion before adding cards,
borders, or shadows. Components MUST NOT give every field, statistic, or text block equal visual
weight through repeated heavy card treatment. Icons MUST serve a clear informational or action
purpose and MUST NOT be added as generic decoration.

Rationale: The product must feel specific to its requirements, not like a generated template.

### II. Responsive Layout Discipline

Frontend layouts MUST be mobile-first, defining base behavior for small viewports before adding
larger viewport enhancements. Multi-column grids MUST include mobile fallbacks, such as a single
column base layout before wider breakpoint columns.

Structural layout code MUST use design system spacing, sizing, and breakpoint tokens. Arbitrary
pixel values for layout structures, such as fixed widths, offsets, or fractional padding, are
prohibited unless required to match a provided asset or externally constrained embed. Main page
wrappers MUST NOT use `100vh` or `h-screen`; they MUST use dynamic viewport-safe sizing such as
`min-h-dvh` or equivalent structural containers. Scrollbars MUST remain visible for scrollable
dynamic content unless the specification explicitly requires a marquee or comparable treatment.

Rationale: Responsive failures are product failures, especially on mobile browsers.

### III. Semantic And Accessible Interfaces

Generated interface code MUST use semantic HTML appropriate to the surface, including landmarks and
interactive elements such as `main`, `header`, `nav`, `aside`, `section`, `article`, `form`,
`label`, and `button` where applicable. Pages MUST NOT be built as undifferentiated nested `div`
structures.

Clickable controls MUST use native `button` elements with explicit `type` attributes when they
perform button actions. Non-button elements MUST NOT receive click handlers to act as buttons.
Inputs MUST have accessible labels or explicit accessible names; placeholders alone MUST NOT serve
as the primary label.

Rationale: Semantic and accessible structure improves correctness, usability, testing, and
maintainability.

### IV. Tokenized Design Systems

Frontend code MUST use semantic design tokens or CSS variables for colors, surfaces, text, borders,
and key layout values. Hardcoded hex values MAY appear only in token definitions or when the active
specification requires an exact brand value. Application code MUST consume those values through
tokens such as background, foreground, border, primary, and accent equivalents.

Generated UI MUST avoid centered SaaS hero defaults unless the specification calls for that
composition. Layout choices MUST reflect the actual product workflow, content density, and user
task rather than generic marketing-page structure.

Rationale: Tokens keep the interface consistent and make future changes safer.

### V. Component Size And State Discipline

UI files exceeding 150 lines of code MUST be reviewed for decomposition. If the file contains
nested sub-views, repeated UI sections, or mixed responsibilities, those parts MUST be extracted
into focused components or helpers before the work is considered complete.

Interdependent form fields, view modes, and UI steps MUST use coherent structured state rather than
fragmented independent state variables that can drift out of sync. State shape MUST reflect the
user workflow and validation requirements.

Rationale: Small, cohesive components and structured state reduce defects as interfaces evolve.

## Frontend Anti-Patterns

The following patterns are prohibited unless explicitly required by an active specification:

- AI purple or indigo dark themes using slate backgrounds, purple gradients, glow effects, or
  blurred orb decoration.
- Floating decorative background elements, abstract mesh gradients, grid overlays, or glowing
  rings.
- Heavy card wrappers around every individual field, statistic, or text block.
- Decorative icon use that does not communicate meaning or improve interaction clarity.
- Center-aligned generic hero layouts with a headline, subtitle, and two stacked calls to action
  used as a default page structure.
- Layout magic numbers, arbitrary breakpoint choices, hardcoded desktop-only grids, and fixed
  viewport-height main wrappers.
- Hidden scrollbar hacks on dynamic scroll containers.
- Non-semantic `div`-only page structures.
- Click handlers on non-interactive elements acting as buttons.
- Placeholder-only form labeling.

## Compliance Review

Every feature plan, implementation, and review involving frontend work MUST check this constitution
before accepting the work. A violation of any MUST or MUST NOT rule in this constitution is a build
failure unless the active specification explicitly overrides it with a narrower requirement.

Reviews MUST verify mobile behavior, semantic structure, accessible labels, token usage, and
component size before marking frontend work complete. Exceptions MUST be documented in the relevant
specification or plan with the reason, scope, and expected duration.

## Governance

This constitution supersedes informal project preferences for generated UI, layout, accessibility,
and frontend code quality. Amendments MUST be made by updating this document and including a Sync
Impact Report that describes changed principles, added sections, removed sections, and any deferred
follow-up.

Versioning follows semantic versioning:

- MAJOR version changes redefine or remove existing governance rules in a way that can invalidate
  prior compliant work.
- MINOR version changes add new principles, sections, or materially expanded guidance.
- PATCH version changes clarify wording, fix typos, or refine guidance without changing compliance
  expectations.

Compliance with this constitution MUST be reviewed during specification planning, task generation,
implementation, and code review for all frontend-facing changes.

**Version**: 1.0.0 | **Ratified**: 2026-09-04 | **Last Amended**: 2026-09-04
