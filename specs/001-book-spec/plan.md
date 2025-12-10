# Implementation Plan: Physical AI Book in Docusaurus

**Branch**: `001-book-spec` | **Date**: 2025-12-06 | **Spec**: [specs/001-book-spec/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-book-spec/spec.md`

## Summary

Build a comprehensive Physical AI educational book in Docusaurus for beginner-to-intermediate learners. The book contains 12 learning units (3 Quick Start lessons + 3 lessons each in Fundamentals, Sensors & Hardware, and Advanced Techniques + 3 appendices) with standardized lesson format, hands-on projects, working code examples, safety warnings, and Docusaurus integration. Technical approach: Set up Docusaurus site with custom configuration, establish standardized lesson template system, implement progressive learning path structure, and deploy with versioning support.

## Technical Context

**Language/Version**: Markdown + Node.js 18+ (Docusaurus runtime)

**Primary Dependencies**:
- Docusaurus v2.4+ (documentation framework)
- React v17+ (UI components)
- Prism.js (code syntax highlighting)
- MDX (Markdown with JSX support)

**Storage**: N/A (static site generation; markdown files as source)

**Testing**:
- Docusaurus build verification (tests that site builds without errors)
- Link validation (tests that all internal/external links work)
- Content quality checks (code examples execute, safety warnings present)
- Manual learner testing (sample learners follow content end-to-end)

**Target Platform**: Web browser (desktop, tablet, mobile); serverless deployment (GitHub Pages, Netlify, or Vercel)

**Project Type**: Single documentation site with static content generation

**Performance Goals**:
- Site builds in < 2 minutes
- Page load time < 2 seconds on 4G network
- Lighthouse score > 90 (performance, accessibility, best practices)
- Mobile Core Web Vitals passing

**Constraints**:
- < 200MB total site size (generated static files)
- < 100MB source markdown + assets
- All code examples MUST execute successfully (no broken tutorials)
- No external API dependencies (fully static)
- Backward compatibility: v1.x content remains accessible when v2.0 released

**Scale/Scope**:
- 12 primary lesson files + 3 appendices
- ~50 code example snippets across all lessons
- ~30 images/diagrams for explanations
- ~5,000 lines of markdown content
- Support for 1 major version release per year

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I: Hands-On Learning First** ✅ PASS
- Plan includes working code examples in every lesson
- Hands-on projects as core learning deliverable
- Checkpoint verification steps built into structure
- Runnable code with expected output documented

**Principle II: Clarity Over Cleverness** ✅ PASS
- Standardized lesson format ensures consistency
- Simple language required (beginner-to-intermediate friendly)
- Code examples kept straightforward and educational
- Tone guidelines enforce accessibility

**Principle III: Safety and Responsible AI** ✅ PASS
- Safety warnings required for all hardware lessons
- ⚠️ notation enforced in lesson template
- Hardware limitations and emergency procedures documented
- Plan includes safety review as quality gate

**Principle IV: Progressive Complexity** ✅ PASS
- Book organized in 3 parts with explicit progression
- Each lesson states prerequisites clearly
- Content builds sequentially (Part 1 → Part 2 → Part 3)
- Quick Start provides prerequisite knowledge before Part 1

**Principle V: Tested Examples** ✅ PASS
- All code examples MUST be tested before publication
- Quality checklist includes code execution verification
- Expected output documented for every code snippet
- Test scenarios: default usage, edge cases, error conditions

**Principle VI: Docusaurus-Compliant Structure** ✅ PASS
- Directory structure follows Docusaurus best practices
- Frontmatter metadata for every file
- Kebab-case file naming with numeric prefixes
- Sidebar configuration for automatic navigation generation

**Conclusion**: All constitution principles align with implementation plan. ✅ GATE PASSES - Ready for Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-book-spec/
├── plan.md                          # This file
├── research.md                       # Phase 0 output (planning decisions)
├── data-model.md                     # Phase 1 output (content structure)
├── quickstart.md                     # Phase 1 output (site setup guide)
├── contracts/                        # Phase 1 output (content standards)
│   ├── lesson-template.md            # Standardized lesson structure
│   ├── frontmatter-schema.json       # YAML frontmatter format
│   └── docusaurus-config.js          # Core configuration template
└── checklists/
    └── requirements.md               # Quality validation
```

### Source Code (Docusaurus Site Root)

```text
docusaurus-site/
├── docusaurus.config.js              # Main Docusaurus configuration
├── sidebars.js                        # Navigation structure
├── package.json                       # Dependencies
├── static/                            # Static assets (images, downloads)
│   └── img/
│       ├── diagrams/                  # Concept diagrams
│       ├── hardware/                  # Hardware reference images
│       └── screenshots/               # Tool screenshots
│
├── docs/                              # Content source
│   ├── index.md                       # Home page
│   │
│   ├── quick-start/
│   │   ├── _category_.json            # Section metadata
│   │   ├── 01-system-requirements.md
│   │   ├── 02-environment-setup.md
│   │   └── 03-your-first-ai-program.md
│   │
│   ├── part-1-fundamentals/
│   │   ├── _category_.json
│   │   ├── 01-what-is-physical-ai.md
│   │   ├── 02-ai-basics.md
│   │   └── 03-hardware-introduction.md
│   │
│   ├── part-2-sensors/
│   │   ├── _category_.json
│   │   ├── 01-sensor-fundamentals.md
│   │   ├── 02-reading-and-processing.md
│   │   └── 03-multi-sensor-integration.md
│   │
│   ├── part-3-advanced/
│   │   ├── _category_.json
│   │   ├── 01-real-time-processing.md
│   │   ├── 02-machine-learning-basics.md
│   │   └── 03-building-complete-systems.md
│   │
│   └── appendices/
│       ├── _category_.json
│       ├── troubleshooting-guide.md
│       ├── glossary.md
│       └── resources.md
│
├── code-examples/                    # Runnable code snippets
│   ├── part-1/
│   ├── part-2/
│   ├── part-3/
│   └── quick-start/
│
├── build/                            # Generated static site (ignored in git)
└── node_modules/                     # Dependencies (ignored in git)
```

**Structure Decision**: Single Docusaurus site with all content in `docs/` directory. Content organized by learning path (quick-start, part-1, part-2, part-3, appendices) matching the lesson progression defined in specification. Code examples stored separately in `code-examples/` for easy extraction and testing. Static assets (images, diagrams) in `static/img/` organized by topic.

## Phase 0: Outline & Research

### Research Tasks

1. **Docusaurus Best Practices**
   - Task: Research optimal Docusaurus configuration for educational content (versioning, search, SEO)
   - Resolution: Use latest Docusaurus v2.4+; enable versioning from v1.0 forward; configure Algolia search for discoverability

2. **Code Example Hosting**
   - Task: Determine best approach for maintaining and testing code examples
   - Resolution: Store code examples in separate `code-examples/` directory with Git structure matching lesson organization; include README with setup instructions

3. **Content Management Workflow**
   - Task: Research efficient workflow for content creation, review, and publication
   - Resolution: Use GitHub pull requests for content review; automated checks for markdown linting, link validation, and code example testing

4. **Mobile Optimization**
   - Task: Verify Docusaurus mobile support and optimization strategies
   - Resolution: Docusaurus provides responsive design by default; test with mobile devices; ensure sidebar collapses to hamburger menu

5. **Image and Asset Management**
   - Task: Determine strategy for diagrams, hardware reference images, and screenshots
   - Resolution: Store in `static/img/` with semantic subdirectories; use relative paths in markdown; optimize PNG/JPG for web

### Research Output: research.md

**Decision 1: Docusaurus Version and Configuration**
- Chosen: Docusaurus v2.4+ with TypeScript support
- Rationale: Latest stable version with excellent documentation, active community, great plugin ecosystem for custom features
- Alternatives: Jekyll (GitHub native but limited customization), Hugo (fast but less JavaScript integration), Sphinx (Python-focused)

**Decision 2: Content Storage and Organization**
- Chosen: Markdown files in `docs/` with semantic directory structure; code examples in separate `code-examples/` folder
- Rationale: Clear separation of concerns; code can be tested independently; easy to browse and find content
- Alternatives: Single monolithic file (unmaintainable), separate repo for code (harder to sync with lessons)

**Decision 3: Versioning Strategy**
- Chosen: Docusaurus versioning feature (snapshots); v1.0 is initial release; v1.1, v1.2 for updates; v2.0 for major changes
- Rationale: Readers stay on stable version; new versions published alongside previous; migration guides provided
- Alternatives: Single rolling version (breaks learners mid-course), manual version folders (complex)

**Decision 4: Build and Deployment**
- Chosen: Static site generation with GitHub Pages or Netlify; automated builds on commit to main
- Rationale: Free, scalable, no server maintenance, automatic HTTPS
- Alternatives: Self-hosted (higher cost, maintenance burden), paid hosting (unnecessary for static content)

**Decision 5: Content Review Workflow**
- Chosen: Git-based workflow with pull requests; automated checks (markdown linting, link validation, code testing)
- Rationale: Transparent collaboration, version control, automated quality gates ensure standard compliance
- Alternatives: Shared document editing (loses version history), wiki-style editing (hard to maintain consistency)

### Phase 0 Output

**research.md** created with detailed decision rationale for:
- Docusaurus version and core configuration
- Content storage and file organization
- Code example management and testing
- Versioning and release strategy
- Build, deployment, and CI/CD approach
- Mobile optimization and accessibility

---

## Phase 1: Design & Contracts

### 1. Content Data Model (data-model.md)

**Entities** extracted from specification:

**Lesson**
- Fields: id, title, learning_objective, prerequisites (list), content, code_examples (list), hands_on_project, checkpoints (list), troubleshooting (list), extensions (list), safety_warnings (optional)
- Relationships: belongs_to Part; references zero-or-more Code Examples; has one Hands-On Project
- Validation: All fields required except safety_warnings (conditional); code_examples must have expected_output documented

**Part**
- Fields: id, title, description, order (1-3 in main parts, 0 for quick-start), lessons (list of Lesson ids)
- Relationships: contains exactly 3 Lessons (or 3 for Quick Start)
- Validation: Lessons MUST be ordered; prerequisites MUST reference earlier lessons

**Code Example**
- Fields: id, language, code_snippet, expected_output, explanation, prerequisites (list), tested (boolean)
- Relationships: belongs_to Lesson; references zero-or-more Prerequisites
- Validation: code_snippet must be complete and runnable; expected_output MUST match actual execution; tested=true before publication

**Safety Note**
- Fields: hazard_description, precaution, emergency_procedure, hardware_involved
- Relationships: belongs_to Lesson
- Validation: Required if lesson involves hardware; must include all three fields

**Checkpoint**
- Fields: step_number, description, verification_action, expected_result
- Relationships: belongs_to Lesson
- Validation: At least 3 checkpoints per lesson; each must be independently verifiable

**Learning Path**
- Fields: id, name, parts (ordered list), total_duration_hours
- Relationships: contains multiple Parts in order
- Validation: Path must flow from Part 1 → Part 2 → Part 3 with no gaps

---

### 2. Content Contracts (contracts/)

**File: lesson-template.md**

```markdown
---
id: lesson-id-format
title: Lesson Title
sidebar_position: 1
description: Two to three sentence summary for navigation listings
---

# [Lesson Title]

## Learning Objective

[Single sentence describing what learner can do after completing this lesson]

## Prerequisites

- [Prior lesson: title and brief description]
- [Required hardware: specific models if applicable]
- [Required knowledge: e.g., "Basic Python understanding"]
- [Estimated time to complete: XX minutes]

## Introduction

[2-3 paragraphs providing real-world context and why this matters]

## Concept: [First Major Concept]

### Theory

[Clear explanation in simple terms; use analogies where helpful]

### Code Example 1: [Specific Example Title]

\`\`\`python
[Complete, working code with all imports]
[Comments for non-obvious logic]
\`\`\`

**Expected Output:**
\`\`\`
[Actual console output when code runs]
\`\`\`

### How It Works

[Explanation of key code lines or concepts]

## [Additional Concepts]

[Repeat above structure for each concept]

## Hands-On Project: [Project Title]

### Objective

[What learner will build]

### Requirements

- Hardware: [Specific components needed]
- Libraries: [Python packages, versions]
- Time: [Estimated completion time]

### Step-by-Step Instructions

1. [First action with verification step]
2. [Second action]
3. [Continue...]

## Checkpoints

- [ ] Checkpoint 1: [Specific verifiable action]
- [ ] Checkpoint 2: [Specific verifiable action]
- [ ] Checkpoint 3: [Specific verifiable action]

## Troubleshooting

### Issue 1: [Common Problem]

**Symptom**: [What learner observes]
**Solution**: [Step-by-step fix]

### Issue 2: [Common Problem]

**Symptom**: [What learner observes]
**Solution**: [Step-by-step fix]

### Issue 3: [Common Problem]

**Symptom**: [What learner observes]
**Solution**: [Step-by-step fix]

## Extensions: Beyond This Lesson

[5 ideas for extending the project or exploring related concepts]

## Safety Warnings ⚠️

[Include ONLY if lesson involves hardware]

**⚠️ SAFETY WARNING**

- Hazard: [What could go wrong]
- Required precaution: [What to do to prevent it]
- Emergency procedure: [How to stop safely]

[Additional warnings if applicable]
```

**File: frontmatter-schema.json**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Lesson Frontmatter Schema",
  "type": "object",
  "required": ["id", "title", "sidebar_position", "description"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$",
      "description": "Kebab-case identifier matching filename"
    },
    "title": {
      "type": "string",
      "minLength": 10,
      "maxLength": 100,
      "description": "Display title for navigation"
    },
    "sidebar_position": {
      "type": "integer",
      "minimum": 1,
      "description": "Order within section"
    },
    "description": {
      "type": "string",
      "minLength": 30,
      "maxLength": 200,
      "description": "Two to three sentence summary"
    }
  }
}
```

**File: docusaurus-config.js**

```javascript
// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI: A Hands-On Learning Guide',
  tagline: 'Learn to build intelligent physical systems from fundamentals to advanced techniques',
  url: 'https://physicalai-book.example.com', // TODO: Update to actual domain
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/physicalai/book/tree/main',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Physical AI',
        logo: {
          alt: 'Physical AI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Read Book',
          },
          {
            href: 'https://github.com/physicalai/book',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learning',
            items: [
              { label: 'Quick Start', to: '/' },
              { label: 'Part 1: Fundamentals', to: '/part-1-fundamentals/01-what-is-physical-ai' },
              { label: 'Part 2: Sensors', to: '/part-2-sensors/01-sensor-fundamentals' },
              { label: 'Part 3: Advanced', to: '/part-3-advanced/01-real-time-processing' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'Troubleshooting', to: '/appendices/troubleshooting-guide' },
              { label: 'Glossary', to: '/appendices/glossary' },
              { label: 'External Links', to: '/appendices/resources' },
            ],
          },
        ],
        copyright: `Copyright © 2025 Physical AI Project. All lesson code examples are provided under MIT license.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'javascript', 'bash', 'json'],
      },
      algolia: {
        // TODO: Configure Algolia search after site launch
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'physicalai-book',
      },
    }),
};

module.exports = config;
```

---

### 3. Quick Start Guide (quickstart.md)

**Title**: Setting Up the Physical AI Docusaurus Site

**Audience**: Developers and content authors setting up the project

**Contents**:

1. Prerequisites
   - Node.js 18 or higher
   - npm or yarn package manager
   - Git
   - Code editor (VS Code recommended)

2. Initial Setup
   - Clone the repository
   - Install dependencies (`npm install`)
   - Create necessary directories
   - Set up git branches

3. Local Development
   - Start development server (`npm start`)
   - Access site at `http://localhost:3000`
   - Hot reload on file changes
   - Build for production (`npm run build`)

4. Content Creation Workflow
   - Copy lesson template
   - Fill in all sections
   - Save with kebab-case filename
   - Add frontmatter metadata
   - Update sidebars.js if new top-level section
   - Commit with descriptive message

5. Testing and Validation
   - Run linting checks
   - Test markdown syntax
   - Verify code examples (run them!)
   - Check links
   - Test on mobile device

6. Publishing
   - Create pull request with changes
   - Wait for automated checks
   - Get code review approval
   - Merge to main branch
   - Automated deployment to production

---

## Phase 1 Output

**Artifacts Created**:

✅ **data-model.md** - Complete content data model with 6 entities, relationships, validations

✅ **contracts/** directory with:
- `lesson-template.md` - Standardized lesson format template
- `frontmatter-schema.json` - Frontmatter validation schema
- `docusaurus-config.js` - Core Docusaurus configuration

✅ **quickstart.md** - Step-by-step setup and development workflow guide

---

## Complexity Tracking

No constitution check violations. All design decisions align with principles:

| Area | Alignment | Justification |
|------|-----------|---------------|
| Static site generation | ✅ Compliant | Simpler than dynamic system; better alignment with "hands-on learning" (no API layers) |
| Single site structure | ✅ Compliant | Sufficient for 12 lessons; future scaling can add versioning without restructure |
| Git-based content | ✅ Compliant | Enables version control; transparent collaboration; tested examples in code repo |
| Mobile-first design | ✅ Compliant | Constitutional requirement; Docusaurus provides this by default |

---

## Content Development Phases with Milestones

### Phase A: Foundation (Weeks 1-2)

**Milestone A1: Project Setup and Infrastructure**
- Set up Docusaurus project with configuration
- Create directory structure
- Initialize code-examples repository
- Set up CI/CD pipeline for builds and validation
- Create lesson template and documentation

**Deliverables**:
- Working Docusaurus site (builds successfully)
- All directories created and documented
- Automated build and validation pipeline
- Lesson template available for authors

**Success Criteria**:
- `npm run build` completes in < 2 minutes
- `npm start` launches development server successfully
- GitHub Actions workflow configured and passing
- Lesson template is complete and tested

**Milestone A2: Quick Start Content**
- Write all 3 Quick Start lessons
- Set up system requirements and environment setup
- Create "your first AI program" tutorial
- Write "Understanding the Learning Path" guide
- Test all instructions and code examples

**Deliverables**:
- 3 complete Quick Start lessons
- Working setup guide with verification steps
- Sample code that executes successfully
- Screenshots or diagrams for clarity

**Success Criteria**:
- All 3 lessons follow template format
- 100% of code examples execute without errors
- A complete beginner can follow Quick Start successfully
- Mobile view renders correctly

---

### Phase B: Core Content - Part 1 (Weeks 3-4)

**Milestone B1: Fundamentals Lessons**
- Write Lesson 1-1: What is Physical AI?
- Write Lesson 1-2: AI Basics for Beginners
- Write Lesson 1-3: Introduction to Hardware
- Create diagrams and explanatory images
- Test all code examples and hardware references

**Deliverables**:
- 3 complete Part 1 lessons
- Concept explanations with code examples
- Hands-on projects for each lesson
- Troubleshooting sections with common issues

**Success Criteria**:
- All lessons follow standardized format
- 100% of code examples tested and working
- Prerequisites clearly marked
- Progressive complexity verified (1-1 → 1-2 → 1-3)

---

### Phase C: Core Content - Part 2 (Weeks 5-6)

**Milestone C1: Sensors and Hardware Lessons**
- Write Lesson 2-1: Sensor Fundamentals
- Write Lesson 2-2: Processing and Interpreting Data
- Write Lesson 2-3: Multi-Sensor Integration
- Create sensor reference diagrams
- Include safety warnings for all hardware-related lessons

**Deliverables**:
- 3 complete Part 2 lessons
- Sensor reference materials
- Data visualization examples
- Safety warnings for all hardware interactions

**Success Criteria**:
- All lessons include ⚠️ safety warnings where applicable
- Code examples use realistic sensor data
- Checkpoint verification steps are clear
- Prerequisites correctly reference Part 1

---

### Phase D: Core Content - Part 3 (Weeks 7-8)

**Milestone D1: Advanced Techniques Lessons**
- Write Lesson 3-1: Real-Time Processing
- Write Lesson 3-2: Machine Learning Integration
- Write Lesson 3-3: Building Complete Systems
- Create system architecture diagrams
- Demonstrate integration of all learned concepts

**Deliverables**:
- 3 complete Part 3 lessons
- Advanced project demonstrations
- System integration examples
- Extension ideas for further learning

**Success Criteria**:
- All lessons assume Part 1 and Part 2 knowledge
- Code examples show real-time responsiveness
- ML integration examples are practical
- Final project consolidates all learning

---

### Phase E: Appendices and Polish (Weeks 9-10)

**Milestone E1: Appendices Content**
- Write Troubleshooting Guide (organized by topic)
- Create Glossary with 50+ terms
- Compile Resources and Further Reading
- Add bibliography and attribution

**Deliverables**:
- Comprehensive troubleshooting guide
- Complete glossary with examples
- Resource links verified and organized
- Community contribution guidelines

**Milestone E2: Quality Assurance and Testing**
- Conduct full quality review against checklist
- Test all links (internal and external)
- Verify mobile responsiveness
- Perform lighthouse audit
- Get subject matter expert review

**Deliverables**:
- Quality checklist with 100% pass rate
- Link validation report
- Lighthouse report (> 90 score)
- Subject matter expert sign-off

---

### Phase F: Release and Documentation (Week 11)

**Milestone F1: v1.0 Release**
- Tag repository as v1.0
- Generate version snapshot in Docusaurus
- Publish to production deployment
- Create release notes and changelog
- Notify community and gather feedback

**Deliverables**:
- Published v1.0 site
- Complete changelog
- Release announcement
- Feedback collection mechanism

---

## Recommended File and Folder Structure

### Directory Organization Rationale

**By Learning Path** (not by content type)
```
docs/
├── quick-start/         # Setup and first experience
├── part-1-fundamentals/ # Theory foundations
├── part-2-sensors/      # Hardware interaction
├── part-3-advanced/     # Integration and deployment
└── appendices/          # Reference materials
```

*Why*: Mirrors the learner's journey; easy to navigate by progression; semantic grouping for newcomers

**Code Examples Separate from Docs**
```
code-examples/
├── quick-start/
├── part-1/
├── part-2/
├── part-3/
└── README.md            # Instructions for running examples
```

*Why*: Can test code independently; can extract into tutorials; version control separate from lessons; easier CI/CD integration

**Assets by Type and Purpose**
```
static/img/
├── diagrams/            # Concept illustrations
├── hardware/            # Component reference photos
├── screenshots/         # Tool/output screenshots
└── icons/               # UI elements
```

*Why*: Clear categorization; easy to find what you need; follows Docusaurus conventions

### File Naming Convention

**Lessons**: `NN-short-title.md` where NN is order number
- `01-system-requirements.md`
- `02-environment-setup.md`
- `03-your-first-ai-program.md`

**Sections/Metadata**: `_category_.json` (Docusaurus standard)
- Located in each part directory
- Specifies section title and ordering

**Code Examples**: `lesson-name.py` or `lesson-name.js`
- Match lesson filename but in code-examples/
- Include version comments if needed

**Images**: Semantic names with type suffix
- `iot-system-diagram.png` (diagram)
- `arduino-uno-pinout.png` (hardware reference)
- `vscode-terminal-screenshot.png` (tool screenshot)

---

## Markdown Standards and Conventions

### File Header Template
```markdown
---
id: part-1-sensor-basics
title: Sensor Fundamentals
sidebar_position: 1
description: Learn how sensors work and how to read data from them using Python. Build your first sensor-based project.
---

# Sensor Fundamentals
```

### Code Block Standards
\`\`\`language
code here
\`\`\`

Supported languages: `python`, `javascript`, `bash`, `json`, `yaml`, `markdown`, `html`, `css`

### Relative Links
- To sibling lessons: `../02-next-lesson.md`
- To parent section: `../../part-2-sensors/01-intro.md`
- To images: `../../assets/images/diagrams/sensor-types.png`

### Safety Warning Format
```markdown
## Safety Warnings ⚠️

**⚠️ SAFETY WARNING: [Hazard Name]**
- **Hazard**: [What could go wrong and why]
- **Precaution**: [How to prevent it]
- **Emergency**: [How to stop safely]
```

### Code Examples with Expected Output
\`\`\`python
# Complete code
\`\`\`

**Expected Output:**
\`\`\`
output/result here
\`\`\`

### Headings Hierarchy
- H1 (#): Lesson title (only once per file)
- H2 (##): Main sections (Introduction, Theory, Project, etc.)
- H3 (###): Subsections (Code Example 1, Troubleshooting Issue 1, etc.)
- H4 (####): Sub-subsections (rarely needed; keep content shallow)

### Lists
- Ordered lists (1. 2. 3.) for steps and procedures
- Unordered lists (-) for features, items, options
- Nested lists for sub-items with 2-space indentation

---

## Docusaurus-Specific Configuration

### _category_.json Template
```json
{
  "label": "Part 1: Fundamentals",
  "position": 1,
  "link": {
    "type": "generated-index",
    "description": "Learn fundamental concepts of Physical AI"
  }
}
```

### sidebars.js Structure
```javascript
module.exports = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome'
    },
    {
      type: 'category',
      label: 'Quick Start',
      items: [
        'quick-start/01-system-requirements',
        'quick-start/02-environment-setup',
        'quick-start/03-your-first-ai-program'
      ]
    },
    // ... additional sections
  ]
};
```

### Versioning Setup
Once v1.0 is released, Docusaurus maintains version snapshots:
- Latest development → `/docs` (main branch)
- v1.0 → `/versioned_docs/version-1.0/`
- v1.1 → `/versioned_docs/version-1.1/`

When preparing v2.0:
1. Create snapshot of v1.x
2. Update version in docusaurus.config.js
3. Deployment shows both versions with version selector

---

## Content Creation Best Practices

### Before Writing
- [ ] Review specification for this lesson
- [ ] Verify prerequisites are correct
- [ ] Plan hands-on project scope
- [ ] Identify safety concerns (if hardware involved)
- [ ] Gather any reference materials or diagrams

### While Writing
- [ ] Use simple language (explain WHY before HOW)
- [ ] Include working code examples
- [ ] Test code examples before committing
- [ ] Add comments to non-obvious code
- [ ] Include expected output for every code block
- [ ] Create at least 3 checkpoints

### Before Publishing
- [ ] Follow lesson template exactly
- [ ] Markdown linting passes
- [ ] All links verified
- [ ] Code examples execute successfully
- [ ] Safety warnings included (if applicable)
- [ ] Mobile view renders correctly
- [ ] Subject matter expert review passed

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Build time | < 2 minutes | `npm run build` execution time |
| Site load time | < 2 seconds | Lighthouse performance score |
| Code example pass rate | 100% | Run all code examples; verify output |
| Safety coverage | 100% of hardware lessons | Checklist audit |
| Mobile usability | Functional on all devices | Manual testing + Lighthouse mobile score |
| Content quality | 100% checklist pass | Quality review against checklist |
| Learner satisfaction | 4+/5 stars | Post-learning survey |
| Accessibility | WCAG AA | Lighthouse accessibility score |

---

## Next Steps

1. **Phase 0 Completion**: Run `/sp.research` to resolve technical uncertainties and finalize research.md
2. **Phase 1 Completion**: Create data-model.md with full content entity definitions, generate lesson templates, and finalize Docusaurus config
3. **Phase 2 (sp.tasks)**: Break down Phase A-F milestones into specific, actionable tasks for content creation, testing, and deployment
4. **Implementation**: Begin Phase A (Foundation) with project setup and Quick Start content

---

**Revision**: 1.0
**Last Updated**: 2025-12-06
**Phase**: Planning Complete (Phases 0-1 Ready)