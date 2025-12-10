# Tasks: Physical AI Book Development

**Input**: Design documents from `/specs/001-book-spec/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1=Progressive Learning, US2=Content Consistency, US3=Site Navigation)
- Exact file paths included in descriptions
- Checkboxes for tracking completion

---

## Phase 1: Docusaurus Setup (Shared Infrastructure)

**Purpose**: Initialize Docusaurus project with all dependencies and core configuration
**Duration**: 2 days
**Owner**: DevOps/Tech Lead

### T001-T010: Project Initialization

- [x] **T001** [P] [Setup] Create Docusaurus project root directory and initial structure
  **Action**:
  ```bash
  mkdir physical-ai-book && cd physical-ai-book
  npx create-docusaurus@latest . classic
  ```
  **Deliverable**: Empty Docusaurus project with default structure at project root
  **Status**: ✅ COMPLETED

- [x] **T002** [P] [Setup] Initialize package.json with project metadata and dependencies
  **Action**:
  ```bash
  # Run npm init (already done by create-docusaurus)
  # Update package.json with:
  # - name: "physical-ai-book"
  # - version: "1.0.0-alpha"
  # - description: "Physical AI: Hands-On Learning Guide"
  # - Add test script: "test:code": "node scripts/test-code-examples.js"
  ```
  **Deliverable**: Updated `package.json` with metadata and custom test script
  **Status**: ✅ COMPLETED

- [x] **T003** [P] [Setup] Install additional dependencies for code testing and validation
  **Action**:
  ```bash
  npm install --save-dev \
    markdown-it \
    markdown-link-check \
    markdownlint \
    markdownlint-cli \
    @babel/parser
  ```
  **Deliverable**: `node_modules/` with all testing dependencies; `package-lock.json` committed
  **Status**: ✅ COMPLETED

- [ ] **T004** [P] [Setup] Create GitHub Actions workflow for CI/CD
  **Action**: Create `.github/workflows/build-and-test.yml` with:
  - Markdown linting check
  - Link validation
  - Code example testing
  - Automated tests on PR and push

  **Deliverable**: `.github/workflows/build-and-test.yml` (50+ lines)

- [x] **T005** [P] [Setup] Create project directory structure and placeholder directories
  **Action**:
  ```bash
  mkdir -p docs/{quick-start,part-1-fundamentals,part-2-sensors,part-3-advanced,appendices}
  mkdir -p code-examples/{quick-start,part-1,part-2,part-3}
  mkdir -p static/img/{diagrams,hardware,screenshots}
  mkdir -p scripts
  ```
  **Deliverable**: Complete directory tree as defined in plan.md
  **Status**: ✅ COMPLETED

- [x] **T006** [P] [Setup] Create core configuration files (docusaurus.config.js, sidebars.js)
  **Action**: Copy and customize from contracts/:
  - `docusaurus.config.js` → `./docusaurus.config.js` (update URL placeholder)
  - Create `sidebars.js` with skeleton structure for all parts

  **File**: `docusaurus.config.js` (updated with real domain), `sidebars.js`
  **Deliverable**: Site configures with navbar, footer, versioning enabled
  **Status**: ✅ COMPLETED

- [x] **T007** [P] [Setup] Create home page (docs/index.md)
  **Action**: Write compelling home page with:
  - Vision statement from constitution
  - Quick value proposition
  - Learning path overview (3 parts)
  - Call-to-action ("Start Quick Start")
  - Link to resources

  **Deliverable**: `docs/index.md` (150-200 lines)
  **Status**: ✅ COMPLETED

- [x] **T008** [P] [Setup] Create _category_.json for each part section
  **Action**: Create sidebar metadata for:
  - `docs/quick-start/_category_.json`
  - `docs/part-1-fundamentals/_category_.json`
  - `docs/part-2-sensors/_category_.json`
  - `docs/part-3-advanced/_category_.json`
  - `docs/appendices/_category_.json`

  Using template:
  ```json
  {
    "label": "Part Name",
    "position": 1,
    "link": {
      "type": "generated-index",
      "description": "Section description"
    }
  }
  ```

  **Deliverable**: 5 `_category_.json` files with consistent structure
  **Status**: ✅ COMPLETED

- [ ] **T009** [P] [Setup] Create code example testing script
  **Action**: Create `scripts/test-code-examples.js` that:
  - Finds all markdown files in docs/
  - Extracts code blocks marked with ```python or ```javascript
  - Tests Python code with subprocess (python -c)
  - Tests JavaScript code with Node.js
  - Reports pass/fail with line numbers
  - Exits non-zero on any failure

  **Deliverable**: `scripts/test-code-examples.js` (~100 lines)

- [ ] **T010** [P] [Setup] Verify Docusaurus setup with test build
  **Action**:
  ```bash
  npm run build
  ```
  Expected output:
  - Build completes without errors
  - `build/` directory created with static files
  - All pages generated
  - Build time < 2 minutes

  **Deliverable**: Successful build output, clean `build/` directory

**Checkpoint**: Docusaurus infrastructure ready. Site builds successfully. Ready for content creation.

---

## Phase 2: Content Infrastructure & Templates

**Purpose**: Establish standardized templates and guidelines for all content
**Duration**: 1 day
**Owner**: Content Lead/Editor

- [ ] **T011** [P] [Infrastructure] Copy lesson template to docs/ as reference
  **Action**: Create `docs/LESSON-TEMPLATE.md` from contracts/lesson-template.md
  - Keep comments explaining each section
  - Add examples for frontmatter
  - Add checklist for authors

  **Deliverable**: `docs/LESSON-TEMPLATE.md` (comprehensive with examples)

- [ ] **T012** [P] [Infrastructure] Create author guidelines document
  **Action**: Create `docs/AUTHOR-GUIDELINES.md` with:
  - How to use lesson template
  - Code example standards (completeness, output, comments)
  - Safety warning requirements
  - Tone and voice guidelines
  - Quality checklist before publishing
  - How to create diagrams and screenshots

  **Deliverable**: `docs/AUTHOR-GUIDELINES.md` (200+ lines)

- [ ] **T013** [P] [Infrastructure] Create code-examples/README.md
  **Action**: Document how to:
  - Add code examples to directory
  - Test code examples locally
  - Naming conventions
  - Version requirements format
  - How extraction/sync works

  **Deliverable**: `code-examples/README.md` (100+ lines)

- [ ] **T014** [P] [Infrastructure] Create CONTRIBUTION.md for community contributions
  **Action**: Document:
  - How to suggest improvements
  - GitHub issue/PR process
  - Content review criteria
  - License information
  - Attribution guidelines

  **Deliverable**: `CONTRIBUTION.md` in repository root

**Checkpoint**: Templates and guidelines ready. Authors can begin content creation.

---

## Phase 3: User Story 1 - Learner Follows Progressive Learning Path (Priority: P1) 🎯 MVP

**Goal**: Build the Quick Start (3 lessons) and Part 1: Fundamentals (3 lessons) to establish the progressive learning path foundation.

**Independent Test**: A Python beginner can complete all 6 lessons sequentially, understand concepts, and complete hands-on projects without external guidance.

### Setup for User Story 1

- [x] **T015** [P] [US1] Create Quick Start lesson 1: System Requirements
  **File**: `docs/quick-start/01-system-requirements.md`
  **Status**: ✅ COMPLETED - 450+ lines with all required sections

- [x] **T016** [P] [US1] Create Quick Start lesson 2: Environment Setup
  **File**: `docs/quick-start/02-environment-setup.md`
  **Status**: ✅ COMPLETED - 180+ lines with all required sections

- [x] **T017** [P] [US1] Create Quick Start lesson 3: Your First AI Program
  **File**: `docs/quick-start/03-your-first-ai-program.md`
  **Status**: ✅ COMPLETED - 280+ lines with all required sections

---

### Part 1: Fundamentals - Lesson 1 (Detailed Example)

- [x] **T018** [US1] Create Part 1 lesson 1: What is Physical AI?
  **File**: `docs/part-1-fundamentals/01-what-is-physical-ai.md`
  **Status**: ✅ COMPLETED - 550+ lines with all required sections
  **File**: `docs/part-1-fundamentals/01-what-is-physical-ai.md`

  **DETAILED SPECIFICATION** (This serves as template for other lessons):

  **Frontmatter**:
  ```yaml
  ---
  id: part-1-what-is-physical-ai
  title: What is Physical AI?
  sidebar_position: 1
  description: Understand what Physical AI means and how it differs from regular AI. Explore real-world examples and applications.
  ---
  ```

  **Content Structure**:

  1. **Learning Objective**
     - Single sentence: "Understand what Physical AI is and why it matters in the real world"

  2. **Prerequisites**
     ```
     - Completed: Quick Start (all 3 lessons)
     - Knowledge: Basic Python (variables, loops, if statements)
     - Hardware: No hardware required for this lesson
     - Time: 20-30 minutes
     ```

  3. **Introduction** (2-3 paragraphs)
     - Hook: "Imagine a robot that can recognize objects in real time and adjust its movements..."
     - Context: Bridge from abstract AI to physical applications
     - Learning promise: "By end of lesson, you'll understand Physical AI and be ready to build it"

  4. **Concept 1: Understanding Physical AI**

     **Theory** (2-3 paragraphs):
     - Define: "Physical AI refers to artificial intelligence systems that interact with the physical world through sensors and actuators"
     - Contrast with abstract AI: "Unlike game-playing or text generation, Physical AI must work in real time with real sensors"
     - Key characteristic: "It sees the world, makes decisions, and takes action"

     **Code Example 1: Conceptual Pseudocode**
     ```python
     # This is how a Physical AI system works at high level:

     # 1. SENSE: Read data from sensors
     sensor_reading = read_temperature_sensor()  # Gets real value

     # 2. PROCESS: Use AI to make decision
     decision = ai_model.predict(sensor_reading)

     # 3. ACT: Control physical output
     if decision > threshold:
         turn_on_fan()
     else:
         turn_off_fan()
     ```

     **Expected Output**:
     ```
     (This is conceptual; shows the pattern Physical AI follows)
     ```

     **How It Works**:
     - Sense phase: Sensor reads real-world data
     - Process phase: AI algorithm makes decision in milliseconds
     - Act phase: System controls physical device

  5. **Concept 2: Real-World Examples**

     **Theory** (2-3 paragraphs):
     - Example 1: Smart thermostat
       - Senses: Room temperature, occupancy
       - Decides: Target temperature
       - Acts: Heating/cooling
     - Example 2: Self-driving car
       - Senses: Camera, lidar, radar
       - Decides: Steering angle, acceleration
       - Acts: Motor control
     - Example 3: Robotic arm (manufacturing)

     **Code Example 2: Temperature Control Pattern**
     ```python
     # Real example: Smart temperature control

     def control_temperature(current_temp, target_temp):
         """
         Simple AI decision: should we heat or cool?
         """
         # Sensor reading
         difference = target_temp - current_temp

         # AI decision (very simple decision tree)
         if difference > 2:
             action = "HEAT"
         elif difference < -2:
             action = "COOL"
         else:
             action = "OFF"

         return action

     # Example usage
     current = 20  # Current temperature in Celsius
     target = 22   # Desired temperature

     action = control_temperature(current, target)
     print(f"Action: {action}")  # Output: Action: HEAT

     # Simulate: after 5 minutes of heating
     current = 22
     action = control_temperature(current, target)
     print(f"Action: {action}")  # Output: Action: OFF
     ```

     **Expected Output**:
     ```
     Action: HEAT
     Action: OFF
     ```

     **How It Works**:
     - Function takes current and target temperature
     - Compares them to decide heating/cooling
     - Returns action code
     - When temperature matches, stops heating

  6. **Concept 3: Why Physical AI Matters**

     **Theory** (2 paragraphs):
     - Autonomy: Systems make decisions without humans
     - Efficiency: Optimize resource use (energy, water)
     - Safety: Handle dangerous tasks (hazardous environments)
     - Productivity: Automate repetitive work

  7. **Hands-On Project: Design a Physical AI System**

     **Objective**: Design (not build) a simple Physical AI system for a real problem

     **Requirements**:
     - Paper/pen or text document
     - 10-15 minutes

     **Step-by-Step**:
     1. Choose a problem in your home
        - Example: "Keep room temperature comfortable"
        - Example: "Turn on lights when someone enters"
        - Example: "Water plant when soil is dry"

     2. Identify the three phases
        - SENSE: What does system need to measure? (temperature, light, moisture)
        - PROCESS: What decision should AI make? (heat/cool, on/off, water/don't)
        - ACT: What should system control? (heater, lights, pump)

     3. Write pseudocode
        ```
        function control_my_problem():
            sensor_data = read_sensors()
            decision = ai_model.decide(sensor_data)
            execute_action(decision)
        ```

     4. Document one real-world challenge
        - What could go wrong?
        - How would AI handle it?

  8. **Checkpoints** (verify understanding):
     - [ ] Checkpoint 1: "Explain the three phases of Physical AI (Sense-Process-Act) in your own words"
     - [ ] Checkpoint 2: "Name three real-world Physical AI applications you encounter daily"
     - [ ] Checkpoint 3: "Design a Physical AI system for a problem in your life and write the three phases"

  9. **Troubleshooting**

     **Issue 1: "This seems complicated. How will I actually build this?"**
     - Symptom: Feeling overwhelmed by complexity
     - Solution: Physical AI breaks into small parts. You'll learn each part in upcoming lessons. Start with one sensor, one simple decision, one output.
     - Prevention: Remember: every complex system started as a simple idea.

     **Issue 2: "I don't have hardware. Can I still learn?"**
     - Symptom: No sensors/boards available
     - Solution: We'll start with simulated data. Later lessons work with real hardware, but you can complete them with simulations.
     - Prevention: Hardware is optional for foundation lessons.

     **Issue 3: "The code examples look hard"**
     - Symptom: Code examples feel advanced
     - Solution: We start simple. These are just examples. Focus on understanding the PATTERN (Sense-Process-Act), not every code detail.
     - Prevention: Ask yourself: "What is this code sensing? What decision is it making? What is it controlling?"

  10. **Extensions: Go Deeper**
      - Research one Physical AI company (e.g., Tesla, Boston Dynamics, Roboflow)
      - Find an image of their system and analyze the Sense-Process-Act phases
      - Watch a 2-minute video of Physical AI in action (YouTube)
      - Think of a physical AI problem you'd like to solve

  11. **Safety Warnings**
     - (Not applicable for this lesson; no hardware involved)

  **Deliverable**: Complete lesson 01 (500+ lines with all sections filled)

---

- [ ] **T019** [US1] Create Part 1 lesson 2: AI Basics for Beginners
  **File**: `docs/part-1-fundamentals/02-ai-basics.md`

  **Content Outline** (High-level; use same detailed approach as T018):
  - Frontmatter
  - Learning Objective: "Build and train a simple AI model without advanced math"
  - Prerequisites: "Completed Part 1 Lesson 1"
  - Introduction: Why AI is learnable without math
  - Concept 1: Machine Learning Basics
    - Training data concept
    - Learning from examples
  - Code Example: Decision Tree classifier
    ```python
    from sklearn.tree import DecisionTreeClassifier
    import numpy as np

    # Training data: flower measurements → species
    features = [[5.1, 3.5], [7.0, 3.2], [6.3, 2.9]]
    labels = ['setosa', 'virginica', 'versicolor']

    model = DecisionTreeClassifier()
    model.fit(features, labels)

    prediction = model.predict([[6.2, 3.1]])
    print(f"Predicted species: {prediction[0]}")
    ```
  - Concept 2: Training vs Predicting
  - Concept 3: Accuracy and Limitations
  - Hands-On Project: Train model on custom data
  - Checkpoints: 3 verification steps
  - Troubleshooting: 3 issues
  - Extensions: Try different models

  **Deliverable**: Complete lesson 02 (500+ lines)

- [ ] **T020** [US1] Create Part 1 lesson 3: Hardware Introduction
  **File**: `docs/part-1-fundamentals/03-hardware-introduction.md`

  **Content Outline**:
  - Frontmatter
  - Learning Objective: "Understand basic electronic components and how to control them"
  - Prerequisites: "Completed Parts 1 Lessons 1 & 2"
  - Introduction: Hardware bridges digital and physical
  - Concept 1: Electronic Components
    - Microcontroller (Arduino)
    - Sensors (detect)
    - Actuators (control)
  - Code Example: Simple LED control (conceptual)
  - Concept 2: GPIO (General Purpose Input/Output)
  - Concept 3: Digital Signals (high/low, 1/0)
  - Hands-On Project: Wire LED and button circuit
    - Diagram (ASCII or image)
    - Step-by-step instructions
    - Verification steps
  - Checkpoints: 3 steps
  - Troubleshooting: 3 hardware issues
  - **Safety Warnings**:
    - ⚠️ Electrical Safety
      - Hazard: Incorrect wiring can damage Arduino or create fire hazard
      - Precautions: Double-check wiring before power; use correct voltage
      - Emergency: If smoke/burning smell, disconnect power immediately
  - Extensions: Add second LED, create pattern

  **Deliverable**: Complete lesson 03 (500+ lines with hardware diagrams)

---

### Create Supporting Assets

- [ ] **T021** [P] [US1] Create hardware reference image for Part 1 Lesson 3
  **Files**: `static/img/hardware/arduino-uno-pinout.png`, `static/img/hardware/led-circuit-diagram.png`

  **Action**:
  - Image 1: Arduino Uno pinout diagram (labeled pins)
  - Image 2: LED + resistor + button wiring diagram
  - Both images with clear labels and alt-text ready

  **Deliverable**: 2 PNG images (100KB each max), clear and labeled for beginners

- [ ] **T022** [P] [US1] Create concept diagrams
  **Files**: `static/img/diagrams/ai-vs-physical-ai.png`, `static/img/diagrams/sense-process-act.png`

  **Action**:
  - Diagram 1: Compare abstract AI vs Physical AI (side-by-side)
  - Diagram 2: Show Sense-Process-Act flow
  - Both with simple colors, clear labels

  **Deliverable**: 2 PNG diagrams (100KB max each)

---

### Testing for User Story 1

- [ ] **T023** [P] [US1] Test all code examples in Quick Start lessons
  **Action**:
  ```bash
  node scripts/test-code-examples.js
  ```

  Tests to pass:
  - Quick Start Lesson 3: `test-install.py` runs successfully
  - Quick Start Lesson 3: Output matches "✅ All libraries installed"
  - Quick Start Lesson 3: First AI program runs successfully

  **Deliverable**: All tests pass; test output saved to `test-results.txt`

- [ ] **T024** [P] [US1] Test all code examples in Part 1 lessons
  **Action**:
  ```bash
  node scripts/test-code-examples.js
  ```

  Tests to pass:
  - Part 1 Lesson 2: Decision tree classifier runs
  - Part 1 Lesson 2: Output matches expected (prediction value)
  - Part 1 Lesson 3: Hardware reference images exist and display

  **Deliverable**: Code test results logged; images verified to exist

- [ ] **T025** [US1] Verify markdown linting and link validation
  **Action**:
  ```bash
  markdownlint docs/quick-start/*.md docs/part-1-fundamentals/*.md
  markdown-link-check docs/quick-start/*.md docs/part-1-fundamentals/*.md
  ```

  Expected:
  - No markdown errors
  - No broken links (internal and external)

  **Deliverable**: Clean lint output; all links valid

- [ ] **T026** [US1] Build site and verify US1 content renders
  **Action**:
  ```bash
  npm run build
  ```

  Verify:
  - Build succeeds
  - `build/` contains all Quick Start + Part 1 content
  - Sidebar shows all lessons in order
  - Navigation links work

  **Deliverable**: Successful build; all lessons accessible via sidebar

- [ ] **T027** [US1] Manual testing: Learner can follow Quick Start end-to-end
  **Action**:
  - Open site locally (`npm start`)
  - Follow Quick Start Lesson 1 (system requirements)
    - Verify all instructions are clear
    - Check that verification steps work
  - Follow Quick Start Lesson 2 (environment setup)
    - Confirm commands are accurate
    - Verify library installation works
  - Follow Quick Start Lesson 3 (first program)
    - Run the AI example
    - Confirm output matches documentation
  - Take notes on any unclear sections

  **Deliverable**: Test report documenting learner experience; any fixes needed

**Checkpoint: User Story 1 Complete**
- All 6 lessons complete (Quick Start 3 + Part 1 Fundamentals 3)
- Code examples tested and working
- Images and diagrams in place
- Markdown validated
- Site builds successfully
- Learner can follow progressive path end-to-end
- **MVP**: Minimal viable product for progressive learning path is ready

---

## Phase 4: User Story 2 - Author Creates Consistent Content (Priority: P2)

**Goal**: Build Part 2: Sensors & Hardware (3 lessons) using standardized template to demonstrate content consistency.

**Independent Test**: Different authors can create 3 lessons using only the template and guidelines, and all 3 lessons are visually/structurally identical without additional instruction.

### Part 2: Sensors & Hardware

- [ ] **T028** [P] [US2] Create Part 2 lesson 1: Sensor Fundamentals
  **File**: `docs/part-2-sensors/01-sensor-fundamentals.md`

  **Content Outline**:
  - Frontmatter
  - Learning Objective: "Read data from different sensor types and understand sensor characteristics"
  - Prerequisites: "Completed Part 1 (all 3 lessons)"
  - Introduction: Sensors are Physical AI's eyes and ears
  - Concept 1: Types of Sensors (temperature, light, motion, etc.)
  - Code Example: Reading temperature sensor (simulated)
    ```python
    import random
    import time

    class TemperatureSensor:
        def __init__(self):
            self.base_temp = 20  # Base temperature in Celsius

        def read(self):
            # Simulate sensor reading with small variations
            noise = random.uniform(-0.5, 0.5)
            return self.base_temp + noise

    sensor = TemperatureSensor()
    for i in range(5):
        temp = sensor.read()
        print(f"Reading {i+1}: {temp:.1f}°C")
        time.sleep(1)
    ```
  - Concept 2: Sensor Accuracy and Calibration
  - Concept 3: Reading Rates and Timing
  - Hands-On Project: Read from multiple simulated sensors
  - Checkpoints: 3 steps
  - Troubleshooting: 3 issues
  - **Safety Warnings**: ⚠️ If using real hardware (power, wiring)
  - Extensions: Add different sensor types

  **Deliverable**: Complete lesson 01 (500+ lines)

- [ ] **T029** [P] [US2] Create Part 2 lesson 2: Processing Sensor Data
  **File**: `docs/part-2-sensors/02-reading-and-processing.md`

  **Content Outline**:
  - Frontmatter
  - Learning Objective: "Clean, filter, and extract meaningful patterns from raw sensor data"
  - Prerequisites: "Completed Part 2 Lesson 1"
  - Introduction: Raw data is noisy; processing reveals truth
  - Concept 1: Data Cleaning
    - Remove outliers
    - Handle errors
  - Code Example: Moving average filter
    ```python
    def moving_average(readings, window_size=3):
        """
        Smooth noisy sensor readings using moving average
        """
        filtered = []
        for i in range(len(readings)):
            if i < window_size - 1:
                filtered.append(readings[i])
            else:
                window = readings[i-window_size+1:i+1]
                avg = sum(window) / len(window)
                filtered.append(avg)
        return filtered

    # Raw sensor readings with noise
    raw_data = [20.1, 20.8, 19.9, 21.2, 20.3, 20.0, 21.1, 20.2]

    # Apply filter
    smooth_data = moving_average(raw_data)

    print("Raw readings:", [f"{x:.1f}" for x in raw_data])
    print("Filtered:    ", [f"{x:.1f}" for x in smooth_data])
    ```
  - Concept 2: Data Visualization
  - Concept 3: Feature Extraction
  - Hands-On Project: Build data processing pipeline
  - Checkpoints: 3 steps
  - Troubleshooting: 3 issues
  - Safety Warnings: None for this lesson
  - Extensions: Try different filters

  **Deliverable**: Complete lesson 02 (500+ lines)

- [ ] **T030** [P] [US2] Create Part 2 lesson 3: Multi-Sensor Integration
  **File**: `docs/part-2-sensors/03-multi-sensor-integration.md`

  **Content Outline**:
  - Frontmatter
  - Learning Objective: "Combine multiple sensors to make intelligent decisions"
  - Prerequisites: "Completed Part 2 Lessons 1 & 2"
  - Introduction: One sensor limited; many sensors powerful
  - Concept 1: Sensor Fusion
  - Code Example: Combine temperature + humidity
    ```python
    class EnvironmentalMonitor:
        def __init__(self):
            self.temp_reading = 22.0
            self.humidity_reading = 60.0

        def get_conditions(self):
            """
            Classify conditions based on two sensors
            """
            if self.temp_reading < 15:
                temp_class = "COLD"
            elif self.temp_reading > 25:
                temp_class = "HOT"
            else:
                temp_class = "COMFORTABLE"

            if self.humidity_reading > 70:
                humidity_class = "HUMID"
            else:
                humidity_class = "DRY"

            return f"{temp_class}, {humidity_class}"

    monitor = EnvironmentalMonitor()
    print(f"Conditions: {monitor.get_conditions()}")
    ```
  - Concept 2: Synchronizing Multiple Sensors
  - Concept 3: Handling Conflicting Data
  - Hands-On Project: Build multi-sensor system
  - Checkpoints: 3 steps
  - Troubleshooting: 3 issues
  - **Safety Warnings**: ⚠️ Multiple hardware connections, power management
  - Extensions: Add more sensors or conditions

  **Deliverable**: Complete lesson 03 (500+ lines)

---

### Content Quality Validation

- [ ] **T031** [US2] Review all Part 2 lessons against standardized template
  **Action**:
  - Checklist for each lesson:
    - [ ] Has all required frontmatter fields
    - [ ] Has learning objective (single sentence, starts with verb)
    - [ ] Has prerequisites section with time estimate
    - [ ] Has introduction (2-3 paragraphs)
    - [ ] Has 2+ concepts with theory + code examples
    - [ ] Has hands-on project with step-by-step
    - [ ] Has 3+ checkpoints
    - [ ] Has 3+ troubleshooting issues
    - [ ] Has safety warnings (if hardware)
    - [ ] Has extensions
    - [ ] Code examples are complete and runnable
    - [ ] Code examples have expected output documented
    - [ ] No undefined jargon
    - [ ] Tone is conversational and encouraging

  **Deliverable**: Completed checklist for all 3 Part 2 lessons; fixes applied

- [ ] **T032** [US2] Verify consistency across all lessons (Quick Start + Part 1 + Part 2)
  **Action**:
  - Spot check: Compare lesson structure across all 9 lessons
  - Verify: Same template sections appear in same order
  - Verify: Tone/style consistent across authors
  - Verify: Code examples all have expected output
  - Verify: Safety warnings consistent in format

  **Deliverable**: Consistency report; any standardization issues documented

- [ ] **T033** [US2] Test all Part 2 code examples
  **Action**:
  ```bash
  node scripts/test-code-examples.js
  ```
  Expected: All Part 2 code runs and output matches documentation

  **Deliverable**: Test results pass; any failing examples fixed

- [ ] **T034** [US2] Build and verify Part 2 renders correctly in sidebar
  **Action**:
  ```bash
  npm run build
  npm start
  ```
  - Verify sidebar shows Part 2 with all 3 lessons in order
  - Verify sidebar_position values create correct ordering
  - Navigate through all lessons to confirm links work

  **Deliverable**: Successful build; sidebar navigation verified

**Checkpoint: User Story 2 Complete**
- Part 2 (3 lessons) complete with standardized format
- All lessons follow template structure
- Content consistency validated
- Code examples tested
- Site builds and renders correctly
- **Result**: Content standardization demonstrated; quality template works

---

## Phase 5: User Story 3 - Reader Navigates Book via Documentation Site (Priority: P3)

**Goal**: Complete Part 3 (3 lessons) and Appendices (3 sections), then optimize site navigation and publishing.

**Independent Test**: Readers can navigate from home to any lesson in <2 clicks; sidebar is functional on all devices; site performance meets targets.

### Part 3: Advanced Techniques (Content Only Outline - Same Structure as US1 & US2)

- [ ] **T035** [P] [US3] Create Part 3 lesson 1: Real-Time Processing
  **File**: `docs/part-3-advanced/01-real-time-processing.md`
  **Outline**: Latency, threading, optimization, bottleneck identification
  **Deliverable**: Complete lesson (500+ lines)

- [ ] **T036** [P] [US3] Create Part 3 lesson 2: Machine Learning Integration
  **File**: `docs/part-3-advanced/02-machine-learning-basics.md`
  **Outline**: Training, evaluation, deployment, online learning
  **Deliverable**: Complete lesson (500+ lines)

- [ ] **T037** [P] [US3] Create Part 3 lesson 3: Building Complete Systems
  **File**: `docs/part-3-advanced/03-building-complete-systems.md`
  **Outline**: System architecture, error handling, monitoring, deployment
  **Deliverable**: Complete lesson (500+ lines)

### Appendices

- [ ] **T038** [P] [US3] Create Troubleshooting Guide
  **File**: `docs/appendices/troubleshooting-guide.md`
  **Content**:
  - Organization by topic (Setup, Code, Hardware, Performance)
  - 10+ common issues with solutions
  - Cross-references to relevant lessons
  - Code snippets for debugging

  **Deliverable**: Complete guide (300+ lines)

- [ ] **T039** [P] [US3] Create Glossary
  **File**: `docs/appendices/glossary.md`
  **Content**:
  - 50+ terms defined simply
  - Organized alphabetically
  - Each term includes: definition + example + related terms
  - Terms referenced from lessons

  **Deliverable**: Complete glossary (200+ lines)

- [ ] **T040** [P] [US3] Create Resources
  **File**: `docs/appendices/resources.md`
  **Content**:
  - Links to official documentation
  - Community forums and resources
  - Hardware supplier links
  - Advanced reading suggestions
  - All links verified to be working

  **Deliverable**: Complete resources (150+ lines)

---

### Site Navigation and UX Optimization

- [ ] **T041** [US3] Update sidebars.js with complete structure
  **Action**:
  - Add all 12 lessons + 3 appendices to sidebar configuration
  - Verify sidebar_position values match file order
  - Test sidebar in browser
  - Verify generated sidebar index pages work

  **File**: `sidebars.js` (complete structure)
  **Deliverable**: Complete sidebar with all content; navigation verified

- [ ] **T042** [US3] Create navigation links between lessons
  **Action**:
  - Add "Next Lesson" link at end of each lesson
  - Add "Previous Lesson" link at start of each lesson
  - Add links from prerequisites to those lessons
  - Add cross-references between related content

  **Format**: Relative markdown links `[Next: Lesson Name](../next-lesson.md)`
  **Deliverable**: All 15 lessons have proper navigation links

- [ ] **T043** [US3] Optimize site for mobile
  **Action**:
  - Test on mobile device (phone size)
  - Verify hamburger menu works
  - Confirm code blocks don't overflow (no horizontal scroll)
  - Verify images scale properly
  - Test touch interactions

  **Deliverable**: Mobile testing report; any responsive issues fixed

- [ ] **T044** [US3] Run Lighthouse audit and optimize performance
  **Action**:
  ```bash
  npm run build
  npx lighthouse http://localhost:3000 --view
  ```

  Targets:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90

  Optimizations:
  - Minimize large images
  - Enable code splitting
  - Optimize CSS delivery

  **Deliverable**: Lighthouse report with all scores > 90

- [ ] **T045** [P] [US3] Verify all links (internal and external)
  **Action**:
  ```bash
  markdown-link-check docs/**/*.md
  ```

  Expected:
  - All internal links valid
  - All external links valid and responding

  **Deliverable**: Link check report; broken links fixed

---

### Final Testing and Quality Assurance

- [ ] **T046** [P] [US3] Test all code examples across entire site
  **Action**:
  ```bash
  node scripts/test-code-examples.js --all
  ```

  Expected:
  - 100% of code examples pass
  - All expected outputs match documentation

  **Deliverable**: Full test report; all tests pass

- [ ] **T047** [US3] Full site build and deployment simulation
  **Action**:
  ```bash
  npm run build
  npm run serve  # Serve production build locally
  ```

  Verify:
  - Build succeeds
  - All pages render
  - Navigation works
  - Performance acceptable
  - Mobile works

  **Deliverable**: Production build succeeds; site fully functional

- [ ] **T048** [US3] Create sitemap and search index
  **Action**:
  - Docusaurus auto-generates sitemap.xml
  - Configure Algolia search (or use default Lunr)
  - Test search functionality with key terms

  **Deliverable**: Working search; sitemap accessible

**Checkpoint: User Story 3 Complete**
- Part 3 and Appendices complete
- Navigation optimized
- Mobile-responsive verified
- Performance > 90 Lighthouse
- All links valid
- Code examples 100% tested
- Ready for v1.0 release

---

## Phase 6: Release and Documentation (Final Polish)

**Purpose**: Prepare v1.0 for publication

- [ ] **T049** [P] [Polish] Create CHANGELOG.md
  **Content**:
  - v1.0 release notes
  - What's included (12 lessons, 3 appendices)
  - Known limitations
  - Future roadmap (v1.1, v1.2, v2.0)

  **Deliverable**: `CHANGELOG.md` (100+ lines)

- [ ] **T050** [P] [Polish] Create README.md for project root
  **Content**:
  - Project overview
  - Quick links (book link, GitHub)
  - How to contribute
  - License information
  - Installation/development instructions

  **Deliverable**: `README.md` in repo root (150+ lines)

- [ ] **T051** [P] [Polish] Document deployment process
  **File**: `DEPLOYMENT.md`
  **Content**:
  - How to deploy to GitHub Pages or Netlify
  - Domain configuration
  - Automated deployment setup
  - Manual deployment steps (if needed)

  **Deliverable**: `DEPLOYMENT.md` (100+ lines)

- [ ] **T052** [Polish] Tag v1.0 release in Git
  **Action**:
  ```bash
  git tag -a v1.0 -m "Physical AI Book v1.0: Complete foundation with Quick Start, Part 1-3, Appendices"
  git push origin v1.0
  ```

  **Deliverable**: Git tag created; visible on GitHub releases page

- [ ] **T053** [Polish] Create GitHub release notes
  **Action**:
  - Go to GitHub Releases
  - Create release for v1.0
  - Add release notes from CHANGELOG
  - Add links to key resources

  **Deliverable**: Public release announcement visible on GitHub

- [ ] **T054** [Polish] Update project documentation index
  **Action**:
  - Link from main README to DEPLOYMENT, CONTRIBUTION, CHANGELOG
  - Verify all documentation discoverable

  **Deliverable**: Complete documentation index

**Checkpoint: v1.0 Release Ready**
- All code complete and tested
- Documentation complete
- Site optimized and deployed
- Release tagged in Git
- Public announcement ready

---

## Summary: Task Execution Path

### Critical Path (Shortest Route to MVP)

```
T001-T010 (Setup) [2 days]
    ↓
T011-T014 (Infrastructure) [1 day]
    ↓
T015-T027 (US1: Quick Start + Part 1) [5 days]
    ↓
T028-T034 (US2: Part 2) [3 days]
    ↓
T035-T045 (US3: Part 3 + Appendices + Navigation) [5 days]
    ↓
T046-T054 (Release) [2 days]
```

**Total: ~18 days (can be parallelized with team)**

### Parallel Execution (with multiple developers)

```
Developer A: T001-T014 (Infrastructure setup)  [3 days]
    ↓ (Infrastructure ready)
Developer B: T015-T027 (User Story 1)          [5 days in parallel]
Developer C: T028-T034 (User Story 2)          [3 days in parallel]
Developer D: T035-T045 (User Story 3)          [5 days in parallel]
    ↓ (All stories complete)
Developer A: T046-T054 (Final QA + Release)    [2 days]
```

**Total with team: ~8 days**

---

## Acceptance Criteria by Phase

### Phase 1 Acceptance
- [ ] Docusaurus builds successfully
- [ ] All directories created
- [ ] GitHub Actions CI/CD configured
- [ ] No build errors

### Phase 2 Acceptance
- [ ] Templates and guidelines in place
- [ ] Authors can follow LESSON-TEMPLATE.md
- [ ] Code testing infrastructure works

### Phase 3 Acceptance (MVP)
- [ ] 6 lessons complete (Quick Start + Part 1)
- [ ] 100% code examples pass testing
- [ ] Progressive learning path verified with sample learner
- [ ] All checkpoints working
- [ ] Mobile navigation verified

### Phase 4 Acceptance
- [ ] 3 additional lessons complete (Part 2)
- [ ] Content consistency validated
- [ ] All code examples pass testing
- [ ] Sidebar navigation verified

### Phase 5 Acceptance
- [ ] 3 final lessons complete (Part 3)
- [ ] 3 appendices complete
- [ ] Site navigation optimized
- [ ] Lighthouse score > 90
- [ ] Mobile fully responsive

### Phase 6 Acceptance
- [ ] v1.0 tagged and released
- [ ] All documentation complete
- [ ] Public release announcement published
- [ ] Site deployed and accessible

---

## Notes & Best Practices

- **Code First**: Test every code example before committing
- **Template Adherence**: All lessons MUST follow the template from LESSON-TEMPLATE.md
- **Commit Often**: Commit after each task completion with descriptive message
- **Parallel Work**: Tasks marked [P] can be worked on simultaneously
- **Dependencies**: Respect phase order - Phase 1 & 2 must complete before User Stories
- **Quality Gates**: Each checkpoint should pass quality checks before continuing
- **Documentation**: Update CHANGELOG as you go, not at the end

---

**Tasks Document**: COMPLETE ✅

**Total Tasks**: 54 actionable tasks across 6 phases
**Estimated Duration**: 18 days (single developer) or 8 days (4-person team)
**MVP Checkpoint**: After T027 (Quick Start + Part 1 complete)
**Full Release**: After T054 (All phases complete)

Ready for implementation!