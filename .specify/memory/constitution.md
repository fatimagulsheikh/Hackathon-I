# Physical AI Constitution

**Vision**: Create a comprehensive, hands-on learning resource that empowers beginners to intermediate learners to understand and implement physical AI systems through clear explanations, practical tutorials, and real-world examples.

**Mission**: Deliver professionally structured documentation that balances theoretical understanding with hands-on experimentation, fostering a learning community around physical AI development.

## Core Principles

### I. Hands-On Learning First
Every concept MUST be grounded in practical, runnable examples. Learners should be able to execute code samples immediately after reading the explanation. Provide complete, working code snippets with clear setup instructions and expected outputs. No theory without accompanying practice.

### II. Clarity Over Cleverness
Explanations MUST prioritize readability for beginner-to-intermediate learners. Use simple language, avoid jargon without definition, and explain WHY before diving into HOW. Code examples should be straightforward and educational, not optimized for brevity or advanced patterns.

### III. Safety and Responsible AI
Every tutorial involving hardware, sensors, or physical systems MUST include explicit safety notes. Clearly mark warnings with ⚠️ **SAFETY WARNING** sections. Document potential hazards, required precautions, and emergency procedures. Never assume user experience or safety awareness.

### IV. Progressive Complexity
Content MUST follow a logical progression from foundational concepts to advanced techniques. Each chapter assumes knowledge of previous material. Build incrementally—learners should understand Part 1 before attempting Part 2. Mark prerequisites explicitly at the start of each section.

### V. Tested Examples
Every code example MUST be tested and verified to work as written. Examples that fail verification are unacceptable. Maintain runnable code samples in version control. Test scenarios include: default usage, common edge cases, and error conditions.

### VI. Docusaurus-Compliant Structure
All content MUST follow Docusaurus documentation standards for consistent navigation and presentation. Enforce file naming conventions, sidebar strategies, markdown rules, and frontmatter metadata. Structure enables seamless publishing and user navigation.

## Content Standards

### Documentation Structure
- **Directory Layout**: Organize by learning path (fundamentals, tutorials, advanced, reference)
- **File Naming**: Use kebab-case, descriptive names; prefix with numbers for ordering (01-intro.md, 02-setup.md)
- **Frontmatter**: Every `.md` file MUST include `id`, `title`, `sidebar_position`, and `description` in YAML
- **Headings**: Use H2 (#) for top-level sections; H3 (##) for subsections. Never skip heading levels
- **Links**: Use relative links within the project; external links must be verified and up-to-date

### Code Example Standards
- **Completeness**: Include all necessary imports, setup code, and execution steps
- **Output**: Show expected console output or return values
- **Comments**: Add inline comments explaining non-obvious logic; use sparingly
- **Language Consistency**: Maintain consistent style within each language section (Python, JavaScript, etc.)
- **Version Requirements**: Specify minimum versions for dependencies and runtime environments

### Tutorial Standards
- **Objective**: Start with a clear learning objective (what will learners be able to do?)
- **Prerequisites**: List required knowledge and installed tools
- **Step-by-Step**: Number each step; keep steps focused and small
- **Checkpoints**: Include verification steps learners can run to confirm progress
- **Troubleshooting**: Provide common issues and solutions
- **Extensions**: Suggest ways to expand or modify the tutorial

### Safety and Ethical Standards
- **Safety Warnings**: Use ⚠️ notation; place near relevant hardware/code sections
- **Hardware Limitations**: Document power requirements, operating ranges, failure modes
- **Data Privacy**: Address any data collection or sensor privacy concerns
- **Environmental Impact**: Note sustainable practices where applicable
- **Accessibility**: Ensure examples work for users with different abilities/equipment

### Tone and Voice
- **Conversational but Professional**: Write as if teaching a peer; be friendly but authoritative
- **Active Voice**: Prefer "You will learn" over "It can be learned"
- **Inclusive Language**: Use inclusive pronouns; avoid gendered assumptions
- **Encouragement**: Celebrate milestones; acknowledge difficulty without being condescending
- **Consistency**: Maintain consistent terminology throughout (use "setup" not "setup" + "set up" interchangeably)

## Quality Gates

### Content Review Checklist
Before publishing any content, verify:
- [ ] All code examples execute successfully
- [ ] Safety warnings present and accurate (if applicable)
- [ ] Markdown passes linting (no syntax errors)
- [ ] Links are valid and up-to-date
- [ ] Docusaurus sidebar configuration updated
- [ ] Technical accuracy confirmed by subject matter expert
- [ ] Tone aligns with beginner-to-intermediate audience
- [ ] No unexplained jargon or undefined terminology

### Accessibility Standards
- Images include descriptive alt text
- Code examples have high contrast
- Content supports screen readers
- Sections are clearly labeled for easy navigation
- Videos (if used) include captions or transcripts

## Versioning and Release Roadmap

### Semantic Versioning: MAJOR.MINOR.PATCH
- **MAJOR** (e.g., 1.0.0 → 2.0.0): Significant restructuring, new learning path, major technology shift
- **MINOR** (e.g., 1.0.0 → 1.1.0): New chapters, new tutorials, significant expansion of existing topics
- **PATCH** (e.g., 1.0.0 → 1.0.1): Bug fixes, clarifications, updated dependencies, corrected examples

### Release Cycle
- **v1.0** (Foundation): Core concepts, basic tutorials, essential safety guidelines
- **v1.1** (Expansion): Additional tutorials, advanced techniques, community contributions
- **v1.2** (Refinement): User feedback integration, performance optimizations, expanded examples
- **v2.0** (Next Generation): New AI technologies, evolved learning paths, platform expansion

### Deprecation Policy
- Deprecated content receives a warning notice with migration instructions
- Deprecated sections remain available for 2 major versions
- Breaking changes (technology updates) require clear migration guides

## Best Practices

### Writing and Documentation
- Prefer "MUST", "MUST NOT", "SHOULD" language over vague modifiers
- Use consistent terminology across all sections
- Define domain-specific terms on first use
- Provide multiple examples showing different use cases
- Include both common and edge-case scenarios

### Technical Content
- Test all code examples in isolated environments
- Document system requirements (OS, Python version, hardware, etc.)
- Provide troubleshooting guides for common setup issues
- Include performance characteristics where relevant
- Link to official documentation for external tools

### Community and Feedback
- Include clear ways to report errors or suggest improvements
- Acknowledge community contributions
- Version feedback and use it to prioritize updates
- Maintain an errata/corrections log

## Governance

### Constitution Authority
This constitution is the authoritative document for all content decisions. When conflicts arise between principles, the most specific principle takes precedence. All PRs and contributions MUST verify compliance with these principles.

### Amendment Process
- **Minor Changes** (typos, clarifications): Single reviewer approval required
- **Principle Changes**: Requires documented justification and approval by project maintainers
- **Version Bumps**: Follow semantic versioning rules; document rationale in release notes
- **Template Updates**: Update this constitution, then synchronize dependent templates (spec.md, plan.md, tasks.md)

### Compliance Review
- Monthly review of content against this constitution
- Annual comprehensive audit of all materials
- Community feedback integrated into amendment process
- Public changelog documenting all amendments

**Version**: 1.0.1 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-08 (Implementation Validation Complete)
