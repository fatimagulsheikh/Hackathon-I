# Phase 0 Research: Physical AI Book Development

**Purpose**: Resolve technical unknowns and establish evidence-based decisions for Docusaurus site architecture

**Date**: 2025-12-06

---

## Research Task 1: Docusaurus Best Practices for Educational Content

### Research Question
What is the optimal Docusaurus configuration for educational content with versioning, search, and beginner-friendly navigation?

### Key Findings

**Docusaurus Versions**
- Latest stable: v2.4.1 (released Nov 2024)
- v3.0 in beta with improved React 18 support
- **Recommendation**: Use v2.4.1 stable for production book; plan v3.0 upgrade for v2.0 release

**Versioning Capabilities**
- Docusaurus provides built-in versioning via `versioned_docs/` directories
- Creates version selector in UI automatically
- Allows readers to switch between v1.0, v1.1, v2.0, etc.
- **Recommendation**: Enable versioning from v1.0; use for all future releases

**Search Implementation**
- Free: DocSearch (requires Algolia account; free tier available)
- Self-hosted: DocSearch crawls site and indexes automatically
- Offline: Lunr.js (client-side search; suitable for <10k pages)
- **Recommendation**: Use DocSearch for production (free tier sufficient for book size)

**Accessibility**
- Docusaurus preset includes Accessibility defaults (WCAG AA target)
- Dark mode support built-in (learners can choose preference)
- Mobile-responsive by default
- **Recommendation**: Use defaults; custom CSS only for brand elements

**Performance Optimization**
- Static generation: site builds to 100% static HTML/CSS/JS
- Image optimization: use next/image component or markdown plugins
- Code splitting: automatic for large bundles
- **Recommendation**: Enable image optimization plugin; lazy-load large images

---

## Research Task 2: Code Example Management and Testing Strategy

### Research Question
How should code examples be stored, tested, and kept in sync with lessons?

### Key Findings

**Storage Options**

| Option | Pros | Cons | Recommendation |
|--------|------|------|-----------------|
| Inline in markdown | Easy to read; context clear | Hard to test; version drift | Use for simple examples |
| Separate repo | Independent testing; CI/CD | Harder to keep in sync | Use for complete projects |
| docs/code-examples/ | In same repo; easy access | Mixed concerns | ✅ Best balance |
| External gists | Centralized; versioned | Breaks if gist deleted | Avoid |

**Testing Approach**
- CI/CD workflow: run code examples on every commit
- Language-specific: Python examples via pytest or direct execution; JavaScript via Node.js
- Success criteria: code runs without errors; output matches documented expected output
- **Recommendation**: GitHub Actions workflow that tests all code examples on PR

**File Organization**
```
code-examples/
├── quick-start/
│   └── 01-your-first-ai-program.py
├── part-1/
│   ├── 01-hello-world.py
│   ├── 02-simple-classifier.py
│   └── 03-basic-circuit.py
├── part-2/
│   ├── 01-read-temperature.py
│   ├── 02-process-data.py
│   └── 03-multi-sensor.py
├── part-3/
│   ├── 01-real-time.py
│   ├── 02-train-model.py
│   └── 03-complete-system.py
└── README.md (setup instructions)
```

**Sync Strategy**
- Single source of truth: markdown lesson files contain code
- Examples extracted/tested via CI pipeline
- Code in `code-examples/` directory for download and reuse
- **Recommendation**: Use GitHub Actions to auto-extract code from markdown into code-examples/ on each release

---

## Research Task 3: Content Workflow and Collaboration

### Research Question
What workflow enables efficient content creation, review, and quality assurance?

### Key Findings

**Git-Based Workflow** (Recommended)
```
1. Author creates feature branch: git checkout -b lesson/01-intro
2. Author writes lesson in Markdown following template
3. Author tests code examples locally
4. Author creates pull request (PR)
5. Automated checks run:
   - Markdown linting (markdownlint)
   - Link validation (markdown-link-check)
   - Code example testing (pytest/node)
   - Build verification (npm run build)
6. Code review: subject matter expert reviews for accuracy and clarity
7. Approval and merge to main branch
8. Automated deployment to production
```

**Quality Gates Checklist**
- [ ] Follows lesson template structure
- [ ] All code examples tested and working
- [ ] Expected output documented for all code
- [ ] Safety warnings included (if hardware involved)
- [ ] Prerequisites clearly marked
- [ ] No undefined jargon
- [ ] Tone appropriate for target audience
- [ ] Markdown linting passes
- [ ] All links verified
- [ ] Mobile rendering checked

**Tools**
- Version control: GitHub (already in use)
- Linting: markdownlint-cli
- Link checking: markdown-link-check
- Code testing: pytest (Python), Node.js/npm (JavaScript)
- CI/CD: GitHub Actions (free for public repos)
- Deployment: GitHub Pages or Netlify (both free, auto-deploy on main)

---

## Research Task 4: Mobile Optimization and Device Testing

### Research Question
How can we ensure optimal experience on mobile devices for learners reading on phones/tablets?

### Key Findings

**Docusaurus Mobile Support** ✅
- Built on React with responsive design
- Mobile-first CSS approach
- Sidebar collapses to hamburger menu on small screens
- Touch-friendly navigation
- No manual mobile optimization needed for core features

**Testing Strategy**
```
Devices:
- iPhone (12/13/14 series) - iOS 16+
- Android phones (Samsung Galaxy, Pixel) - Android 12+
- iPad, Android tablets

Testing checklist:
- [ ] Sidebar opens/closes correctly
- [ ] Code examples readable (no horizontal scroll)
- [ ] Images scale appropriately
- [ ] Buttons clickable (48px minimum touch target)
- [ ] Read time < 5s for typical lesson load
```

**Recommendations**
- Test with Chrome DevTools device emulator during development
- Deploy to Netlify preview for real device testing
- Use Lighthouse mobile audit (target > 90)
- Optimize images: use WebP with PNG fallback
- Lazy-load images below the fold

---

## Research Task 5: Versioning and Release Management Strategy

### Research Question
How should versions be managed as the book evolves from v1.0 through v2.0?

### Key Findings

**Semantic Versioning for Books**
- **MAJOR** (1.0 → 2.0): Major restructure, new technology, breaking changes
- **MINOR** (1.0 → 1.1): New chapters/lessons, expansions, improvements
- **PATCH** (1.0 → 1.0.1): Bug fixes, typos, clarifications, code updates

**Version Release Process**

v1.0 (Initial Release)
- Date: After Phase A-E complete
- Tag: `v1.0` in git
- Create version snapshot: `versioned_docs/version-1.0/`
- Release notes document all content

v1.1 (Expansion)
- New lessons or chapters added
- Existing lessons expanded with new projects
- Code examples updated for new tools
- Reader can still access v1.0 if preferred

v1.2 (Refinement)
- Bug fixes and clarifications
- Code examples updated for compatibility
- No new lessons

v2.0 (Next Generation)
- Significant restructuring (if needed)
- New learning paths
- Major technology updates (if applicable)
- v1.x remains accessible with migration guide

**Docusaurus Version Support**
- Latest version: always on `/` and in version selector
- Previous versions: accessible via version selector
- Archived versions: can disable but still accessible
- Version-specific URLs: `/docs/version-1.0/lesson-name/`

**Recommendation**: Use Docusaurus versioning feature for all releases; maintain at least 2 previous versions

---

## Research Task 6: Security and Maintenance Considerations

### Research Question
What security practices and maintenance procedures ensure long-term sustainability?

### Key Findings

**Content Security**
- Static site generation: no runtime vulnerabilities
- Dependencies: keep npm packages updated
- Secrets management: no API keys in code; use environment variables if needed
- Access control: GitHub branch protection on main

**Maintenance Practices**
- Quarterly dependency updates
- Annual link validation (external links break)
- Version support: maintain latest + 2 previous versions
- Deprecation warnings: 1 major version before removing content

**Deployment Security**
- Use HTTPS only (GitHub Pages and Netlify provide automatic)
- Enable branch protection: require PR review before merge
- Automated tests must pass before deployment
- Deployment logs for audit trail

---

## Research Task 7: Hardware Reference and Compatibility

### Research Question
How should we document hardware requirements and ensure examples work across different board/sensor variants?

### Key Findings

**Recommended Hardware Stack** (for examples)

Microcontroller: Arduino (most beginner-friendly)
- Arduino Uno (most common)
- Arduino Nano (compact)
- Arduino Mega (more I/O)

Sensors: Common hobbyist sensors (< $20 each)
- DHT22 (temperature/humidity)
- HC-SR04 (ultrasonic distance)
- LDR (light sensor)
- PIR (motion sensor)

Single-Board Computer: Raspberry Pi
- Raspberry Pi 4 (recommended for lessons)
- Raspberry Pi Zero W (budget alternative)

**Documentation Strategy**
- Lesson specifies recommended hardware (e.g., "Arduino Uno or compatible")
- Pinout diagrams show exact pin connections
- Code includes comments for pin numbering
- Alternative components documented in troubleshooting
- "Tested on" section lists verified combinations

**Code Compatibility**
- Target: Python 3.8+ (widely available)
- Libraries: use pip-installable packages with stable APIs
- Version pinning: specify minimum versions in requirements.txt
- Example: `python>=3.8, numpy>=1.19.0, pandas>=1.1.0`

---

## Decision Summary

| Decision | Choice | Rationale | Confidence |
|----------|--------|-----------|------------|
| Docusaurus version | v2.4.1 stable | Latest stable, proven in production, excellent docs | Very High |
| Versioning | Docusaurus built-in | Native support, clean UI, readers choose version | Very High |
| Code examples | Separate `code-examples/` folder with CI testing | Can test independently, reproducible, maintainable | High |
| Workflow | Git PR-based with automated checks | Transparent, traceable, prevents errors | Very High |
| Mobile optimization | Docusaurus defaults + Lighthouse testing | No custom work needed; default is mobile-first | Very High |
| Deployment | GitHub Pages or Netlify | Free, automatic, secure, no maintenance | Very High |
| Hardware docs | Arduino + Raspberry Pi + common sensors | Widely available, affordable, well-documented | High |
| Search | DocSearch/Algolia | Free tier sufficient, fast, good UX | High |

---

## Technical Unknowns Resolved

✅ All NEEDS CLARIFICATION items resolved

**Previously unclear**:
- Docusaurus configuration complexity → Resolved: simple config with defaults
- Code example testing strategy → Resolved: CI/CD workflow with automated testing
- Version management complexity → Resolved: Docusaurus handles versioning automatically
- Hardware compatibility → Resolved: target Arduino + Raspberry Pi + common sensors
- Mobile experience → Resolved: Docusaurus provides mobile-first by default

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Code examples break as libraries update | High | Quarterly dependency updates; pin versions; test examples in CI |
| External links rot over time | Medium | Annual link audit; maintain errata page |
| Hardware availability changes | Medium | Document alternatives; avoid proprietary components |
| Docusaurus breaking changes in major versions | Low | Test upgrades in non-production; maintain version support window |

---

## Recommendations for Phase 1

1. **Finalize Docusaurus Configuration**
   - Use provided docusaurus-config.js template
   - Test with actual lesson content
   - Configure GitHub Actions for CI/CD

2. **Set Up Code Example Testing**
   - Create GitHub Actions workflow to test all code examples
   - Document setup for local testing
   - Include version requirements in each example

3. **Establish Content Review Process**
   - Identify subject matter experts for review
   - Create PR template with quality checklist
   - Train content authors on workflow

4. **Plan for Mobile Testing**
   - Test every lesson on real mobile devices
   - Use Lighthouse for automated scoring
   - Target > 90 score for performance and accessibility

---

**Phase 0 Research**: COMPLETE ✅

**Readiness for Phase 1**: APPROVED ✅

All technical uncertainties resolved. Architecture decisions evidence-based. Ready to proceed with design phase.
