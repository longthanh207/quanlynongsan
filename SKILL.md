Generate for me a SKILL.md file used for an AI coding agent.

## Project Overview

My project is a MERN stack application (MongoDB, ExpressJS, React, NodeJS) for an agricultural product management system.

The system has 3 main roles:

* Farmer (nông dân)
* User (khách hàng)
* Admin (quản trị viên)

The current system is already implemented and working, and the source code is available. The goal is NOT to rebuild from scratch, but to RE-STRUCTURE and CLEAN the architecture.

---

## Main Requirements

The AI agent must follow these principles:

### 1. Preserve Existing Functionality

* DO NOT remove or break any existing features.
* All current business logic must remain intact.
* APIs and data flow should still work as before.

### 2. Preserve UI/UX

* DO NOT redesign UI.
* Keep layout, pages, and user experience unchanged.
* Only refactor code structure, not visual behavior.

### 3. Focus on Restructuring

The goal is to:

* Improve code organization
* Apply clean architecture (preferably MVC or layered architecture)
* Improve maintainability and scalability

---

## Agent Model Selection

The agent MUST choose model weight based on task complexity to optimize performance and cost.

| Task Type                                  | Model Weight |
| ------------------------------------------ | ------------ |
| Small UI fix, CSS, minor bug               | Light        |
| CRUD logic update, API integration         | Medium       |
| Refactoring modules, restructuring folders | Heavy        |
| Cross-file changes, architecture redesign  | Heavy        |
| Unclear or ambiguous tasks                 | Heavy        |

Rules:

* ALWAYS default to Light for simple, isolated changes
* Use Medium for logic-related tasks
* Use Heavy ONLY when necessary (complex refactor, multi-file impact)
* Never use Heavy for simple styling or small fixes
* Prefer efficiency over brute force

---

## Architecture Guidelines

Use a clear separation of concerns:

Frontend:

* pages/ → main pages (farmer, user, admin)
* components/ → reusable UI components
* services/ → API calls (pure HTTP only)
* hooks/ or mutations/ → business logic and state handling

Backend:

* models/ → MongoDB schemas
* controllers/ → handle request/response
* services/ → business logic
* routes/ → API endpoints

Rules:

* No business logic inside UI components
* No direct API calls inside components (must go through service/mutation)
* Controllers should be thin, services handle logic

---

## Refactoring Strategy

The agent should:

1. Analyze existing structure
2. Map old structure → new structure
3. Refactor step-by-step (DO NOT rewrite everything)
4. Ensure system still runs after each step

---

## Component Rules

* Reuse existing components whenever possible
* Do not duplicate logic
* If creating new components:

  * Use consistent naming convention
  * Keep them modular and reusable

---

## Data Flow

Strict flow:

UI Component
→ Mutation / Hook (business logic)
→ Service (API call)
→ Backend API
→ Response → UI

---

## Code Quality Checklist

* [ ] No unnecessary console.log
* [ ] No dead code
* [ ] Clear naming conventions
* [ ] No duplicated logic
* [ ] Components are reusable
* [ ] No API calls directly inside components
* [ ] Business logic is NOT inside UI
* [ ] Project still runs after refactor

---

## Anti-Patterns to Avoid

* Rewriting entire project from scratch
* Changing UI behavior
* Mixing business logic into UI
* Calling APIs directly inside components
* Breaking existing APIs
* Overusing Heavy model for simple tasks

---

## Output Format

The SKILL.md file should:

* Be structured clearly (like the Movie Management System sample)
* Be strict and rule-based so the agent can follow it as a guideline
* Focus on maintainability, not feature expansion
