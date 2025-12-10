# Phase 1: Content Data Model

**Purpose**: Define the structure, entities, relationships, and validation rules for Physical AI book content

**Date**: 2025-12-06

---

## Overview

The Physical AI book content follows a hierarchical structure: Learning Path → Parts → Lessons → Concepts/Projects → Code Examples → Checkpoints. This document defines each entity, its properties, validation rules, and relationships.

---

## Entity: Lesson

**Purpose**: Individual learning unit containing a single topic with clear learning objectives, theory, practical code, hands-on project, and verification steps.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| id | string | Yes | Unique kebab-case identifier | Pattern: `^[a-z0-9]+(-[a-z0-9]+)*$`; must match filename |
| title | string | Yes | Display title | Length: 10-100 characters; descriptive |
| part | enum | Yes | Which part contains this lesson | Values: "quick-start", "part-1", "part-2", "part-3", "appendices" |
| sidebar_position | integer | Yes | Order within part | Minimum: 1; unique within part |
| description | string | Yes | 2-3 sentence summary | Length: 30-200 characters; readable by non-experts |
| learning_objective | string | Yes | What learner can do after lesson | Starts with verb (learn, understand, build, create); single sentence |
| prerequisites | array | Yes | Required prior knowledge | Array of lesson IDs or descriptions; cannot reference lessons from later parts |
| introduction | string | Yes | Real-world context | 2-3 paragraphs; explains why learner should care |
| concepts | array | Yes | Major topics covered | Array of Concept objects; at least 2 concepts |
| hands_on_project | object | Yes | Practical building project | Concept object with project-specific fields |
| checkpoints | array | Yes | Progress verification steps | Array of 3+ Checkpoint objects; must cover concepts |
| troubleshooting | array | Yes | Common issues and solutions | Array of 3+ TroubleshootingIssue objects |
| extensions | array | Yes | Ways to expand learning | Array of 5+ extension ideas |
| safety_warnings | array | No | Hardware safety notes | Required if lesson involves hardware; array of SafetyWarning objects |
| estimated_time | integer | Yes | Time to complete | Minutes; between 20-120 |
| difficulty | enum | Yes | Target learner skill level | Values: "beginner", "intermediate", "advanced" |

**Relationships**:
- Belongs to: 1 Part
- Contains: 2+ Concepts
- Contains: 1 Hands-On Project
- Contains: 3+ Checkpoints
- References: 0+ Code Examples
- Contains: 0+ Safety Warnings (conditional)

**Validation Rules**:
1. Lesson IDs must be unique within entire book
2. Prerequisites must not create circular dependencies
3. Prerequisites must reference lessons from same part or earlier parts only
4. All concepts must have working code examples
5. Hands-on project must use only concepts covered in lesson
6. All code examples must be tested and verified
7. Safety warnings required if: hardware involved, power > 5V, moving parts, sensors
8. Checkpoints must be independently verifiable without external tools

**Example**:
```json
{
  "id": "part-1-ai-basics",
  "title": "AI Basics for Beginners",
  "part": "part-1",
  "sidebar_position": 2,
  "description": "Learn the fundamentals of machine learning without advanced mathematics. Understand how computers learn from data and make decisions.",
  "learning_objective": "Build and train a simple decision tree classifier using real sensor data",
  "prerequisites": [
    "part-1-what-is-physical-ai",
    "Basic Python understanding (variables, loops, functions)"
  ],
  "concepts": [
    {
      "name": "Machine Learning Basics",
      "theory": "...",
      "code_examples": [...]
    }
  ],
  "estimated_time": 45,
  "difficulty": "beginner"
}
```

---

## Entity: Part

**Purpose**: Grouping of 3 related lessons organized by topic and progression level.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| id | string | Yes | Unique identifier | Values: "quick-start", "part-1", "part-2", "part-3", "appendices" |
| title | string | Yes | Display title | Should end with topic name or number |
| description | string | Yes | Purpose and scope | 1-2 sentences |
| sidebar_position | integer | Yes | Order in book | 0 (quick-start), 1-3 (main parts), 4 (appendices) |
| lessons | array | Yes | Lesson IDs in order | Exactly 3 lessons (or 3 for appendices); ordered |
| target_audience | string | Yes | Learner background | e.g., "Python beginners with no robotics experience" |

**Relationships**:
- Contains: exactly 3 Lessons
- Ordered by: sidebar_position

**Validation Rules**:
1. Quick-start part must come first
2. Main parts (1, 2, 3) must be sequential
3. Each part must contain exactly 3 lessons
4. Lessons must be in order (sidebar_position 1, 2, 3)
5. Part 2 lessons cannot have prerequisites from Part 3
6. Appendices part (position 4) contains reference/support materials

**Example**:
```json
{
  "id": "part-1",
  "title": "Part 1: Fundamentals",
  "sidebar_position": 1,
  "lessons": [
    "part-1-what-is-physical-ai",
    "part-1-ai-basics",
    "part-1-hardware-introduction"
  ],
  "target_audience": "Learners with Python basics; no prior robotics experience"
}
```

---

## Entity: Concept

**Purpose**: Major topic within a lesson, containing theory explanation and code examples.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| name | string | Yes | Concept title | Length: 5-50 characters |
| theory | string | Yes | Explanation in simple terms | 2-4 paragraphs; uses analogies; defines jargon |
| code_examples | array | Yes | Code demonstrating concept | Array of 1-3 CodeExample objects |
| explanation | string | Yes | How the code works | Walks through key lines |

**Relationships**:
- Belongs to: 1 Lesson
- Contains: 1+ Code Examples
- References: 0+ Concepts (may reference prior lessons)

**Validation Rules**:
1. Theory must be understandable to target audience (no undefined jargon)
2. Each code example must demonstrate the concept
3. At least one code example required per concept
4. All concepts in a lesson must be covered by hands-on project or checkpoints

---

## Entity: Code Example

**Purpose**: Complete, working code snippet demonstrating a concept with documentation of expected behavior.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| id | string | Yes | Unique within lesson | Format: `[lesson-id]-[concept-number]-[example-number]` |
| title | string | Yes | What this example shows | Length: 20-80 characters |
| language | enum | Yes | Programming language | Values: "python", "javascript", "bash", "json" |
| code | string | Yes | Complete working code | Must include all imports and setup |
| comments | string | No | Inline explanations | For non-obvious logic only |
| expected_output | string | Yes | What code prints/returns | Must match actual execution |
| prerequisites | array | No | Required knowledge | References to earlier code examples or concepts |
| tested | boolean | Yes | Verified to work | Must be true before publication |
| test_environment | string | Yes | Where tested | e.g., "Python 3.9, Ubuntu 22.04" |
| min_version | string | Yes | Minimum language/library version | e.g., "Python 3.8", "numpy>=1.19" |

**Relationships**:
- Belongs to: 1 Concept (indirectly via Lesson)
- References: 0+ Prior Code Examples (prerequisites)

**Validation Rules**:
1. Code must be complete (not pseudocode)
2. Code must include all necessary imports
3. Code must execute without errors in stated test_environment
4. expected_output must match actual execution exactly
5. Comments must be sparse and explain WHY, not WHAT
6. tested field must be true before lesson publication
7. min_version requirements must be realistic and documented

**Example**:
```json
{
  "id": "part-1-ai-basics-1-2",
  "title": "Building a Simple Decision Tree",
  "language": "python",
  "code": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\n# Training data\nX = np.array([[0, 0], [1, 1], [2, 2]])\ny = np.array([0, 1, 1])\n\n# Create and train classifier\nclf = DecisionTreeClassifier()\nclf.fit(X, y)\n\n# Make prediction\nresult = clf.predict([[1, 1]])\nprint(f'Prediction: {result[0]}')",
  "expected_output": "Prediction: 1",
  "tested": true,
  "test_environment": "Python 3.9, scikit-learn 1.0",
  "min_version": "Python 3.8, scikit-learn>=0.24"
}
```

---

## Entity: Hands-On Project

**Purpose**: Practical application where learner builds something using the lesson's concepts.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| title | string | Yes | Project name | Length: 20-80 characters |
| objective | string | Yes | What learner will build | 1-2 sentences; starts with verb |
| hardware_required | array | No | Physical components | Array of hardware items with quantities and models |
| libraries_required | array | Yes | Software dependencies | Array of package names with versions |
| estimated_time | integer | Yes | Time to complete | Minutes; 20-60 typically |
| step_by_step | array | Yes | Instructions | Array of 5-10 steps with verification |
| output | string | Yes | How to verify success | What learner should see/feel/measure |
| notes | string | No | Additional guidance | Tips, common mistakes, variations |

**Relationships**:
- Belongs to: 1 Lesson
- References: Concepts covered in lesson
- Uses: Code Examples (can reference earlier examples)
- Verified by: Checkpoints

**Validation Rules**:
1. Must use only hardware and libraries introduced in lesson or earlier
2. Each step must be small, focused, and independently verifiable
3. Estimated time must be realistic for target audience
4. Output must be clearly observable/measurable
5. All referenced code examples must be working

---

## Entity: Checkpoint

**Purpose**: Verification step where learner confirms understanding before progressing.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| step_number | integer | Yes | Order within lesson | 1, 2, 3+ |
| title | string | Yes | What to verify | Length: 20-60 characters |
| action | string | Yes | What learner does | Specific, measurable instruction |
| expected_result | string | Yes | Expected outcome | What indicates success |
| success_criteria | array | Yes | How to measure | Checklist of observable outcomes |

**Relationships**:
- Belongs to: 1 Lesson
- References: Concepts in lesson

**Validation Rules**:
1. At least 3 checkpoints per lesson
2. Checkpoints must be independent (can verify one without others)
3. Learner must be able to complete checkpoint using only lesson content
4. Success criteria must be clearly observable
5. Checkpoints should progressively verify more complex understanding

**Example**:
```json
{
  "step_number": 1,
  "title": "Sensor Reading Verification",
  "action": "Run the temperature sensor code example and observe the output",
  "expected_result": "Console displays temperature in Celsius, updated every 2 seconds",
  "success_criteria": [
    "Code runs without errors",
    "Output shows 3+ readings",
    "Readings change between 20-30°C range"
  ]
}
```

---

## Entity: Safety Warning

**Purpose**: Document potential hazards and required precautions for lessons involving hardware, electricity, or physical systems.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| hazard_type | enum | Yes | Category of danger | Values: "electrical", "mechanical", "chemical", "heat", "other" |
| hazard_description | string | Yes | What could go wrong | Specific and clear |
| required_precautions | array | Yes | How to prevent | Array of 2+ specific actions |
| emergency_procedure | string | Yes | How to respond if it happens | Step-by-step safety instructions |
| severity | enum | Yes | Level of danger | Values: "low", "medium", "high" |

**Relationships**:
- Belongs to: 1 Lesson
- References: Specific hardware or code sections

**Validation Rules**:
1. Required if lesson involves: electricity, moving parts, heat > 40°C, sharp objects
2. Multiple safety warnings allowed per lesson
3. Must be prominent (marked with ⚠️ notation)
4. Emergency procedure must be clear and actionable
5. Never assume prior safety knowledge

**Example**:
```json
{
  "hazard_type": "electrical",
  "hazard_description": "Reversed polarity on power supply can damage Arduino and sensor",
  "required_precautions": [
    "Always verify red wire connects to positive (+)",
    "Always verify black wire connects to ground (-)",
    "Double-check connections before power"
  ],
  "emergency_procedure": "If smoke or burning smell: Immediately disconnect power; allow to cool; do not touch",
  "severity": "high"
}
```

---

## Entity: Troubleshooting Issue

**Purpose**: Document common problems learners encounter and their solutions.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| issue_number | integer | Yes | Order (1, 2, 3+) | Minimum 3 per lesson |
| title | string | Yes | Problem name | Length: 20-60 characters |
| symptom | string | Yes | How learner knows something is wrong | What they see/experience |
| cause | string | Yes | Why the problem occurs | Technical explanation in simple terms |
| solution | array | Yes | How to fix it | Step-by-step instructions (2-5 steps) |
| prevention | string | No | How to avoid in future | Tips to prevent recurrence |

**Relationships**:
- Belongs to: 1 Lesson
- References: Code examples or hardware from lesson

**Validation Rules**:
1. Minimum 3 issues per lesson
2. Symptoms must match common learner experiences
3. Solutions must be actionable without external tools
4. At least one issue should address setup/environment problems
5. At least one issue should address code logic problems

---

## Entity: Learning Path

**Purpose**: Ordered progression through the entire book for a specific learner goal.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|-----------|
| id | string | Yes | Unique path identifier | e.g., "complete-path", "sensors-only" |
| title | string | Yes | Display name | e.g., "Complete Physical AI Journey" |
| description | string | Yes | Purpose and outcome | 2-3 sentences |
| parts | array | Yes | Ordered parts | Array of part IDs in order |
| estimated_duration | integer | Yes | Total time | Hours; typically 40-60 |
| target_audience | string | Yes | Who should take path | e.g., "Python developers new to robotics" |
| learning_outcomes | array | Yes | Specific skills acquired | Array of 5+ outcomes |

**Relationships**:
- Contains: 1+ Parts
- Defines progression for: Lessons

**Validation Rules**:
1. Must include quick-start first
2. Main path must include parts 1, 2, 3 in order
3. Total estimated duration must be realistic
4. All lessons in path must have clear prerequisites

**Example**:
```json
{
  "id": "complete-path",
  "title": "Complete Physical AI Journey",
  "parts": ["quick-start", "part-1", "part-2", "part-3"],
  "estimated_duration": 50,
  "learning_outcomes": [
    "Understand AI fundamentals and machine learning",
    "Work with sensors and hardware",
    "Process and interpret real-world sensor data",
    "Build real-time physical AI systems",
    "Deploy complete projects"
  ]
}
```

---

## State Transitions

### Lesson Lifecycle

```
Draft → In Review → Published → Deprecated → Archived

Draft: Author writing, not ready for review
In Review: Author submitted for expert review
Published: Ready for learners; in active book
Deprecated: New version available; still readable; shows warning
Archived: No longer accessible; moved to version history
```

### Code Example Status

```
Untested → Tested & Verified → Published → Compatibility Issue → Updated

Untested: Code written but not executed
Tested: Code runs successfully
Published: Included in live lesson
Compatibility Issue: Library update breaks code
Updated: Code fixed and re-tested
```

---

## Data Integrity Constraints

### Referential Integrity

| Constraint | Rule | Enforcement |
|-----------|------|------------|
| Lesson prerequisites | Must reference valid lesson IDs | Validate on lesson creation |
| Code examples | All must exist before lesson publication | CI/CD check |
| Part lessons | Must be valid lesson IDs | Sidebar.js validation |
| Checkpoint references | Must reference concepts in lesson | Manual review |

### Uniqueness Constraints

| Entity | Unique Field | Scope |
|--------|-------------|-------|
| Lesson | id | Entire book |
| Part | id | Entire book |
| Code Example | id | Within lesson |
| Checkpoint | step_number | Within lesson |
| Safety Warning | hazard_type | Within lesson (multiple allowed) |

### Logical Constraints

| Constraint | Rule |
|-----------|------|
| No circular prerequisites | Lesson A references B, B cannot reference A |
| Forward-only references | Later parts cannot be prerequisites for earlier parts |
| Completeness | All code examples referenced by lesson must be published |
| Timing | Hands-on project duration ≤ (lesson time - concept time) |

---

## Summary: Entity Relationships Diagram

```
Learning Path (1)
    ↓
    └─→ Part (1..n)
            ↓
            └─→ Lesson (3)
                    ↓
                    ├─→ Concept (2+)
                    │       ↓
                    │       └─→ Code Example (1+)
                    │
                    ├─→ Hands-On Project (1)
                    │       ↓
                    │       └─→ Code Examples (referenced from Concepts)
                    │
                    ├─→ Checkpoint (3+)
                    │
                    ├─→ Troubleshooting (3+)
                    │
                    └─→ Safety Warning (0+, conditional)
```

---

**Data Model**: COMPLETE ✅

**Readiness for Content Creation**: APPROVED ✅

All entities defined with clear validation rules. Ready for content authors to use as specification for lesson creation.
