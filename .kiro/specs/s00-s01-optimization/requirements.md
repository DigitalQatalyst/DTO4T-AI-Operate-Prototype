# S00 + S01 Optimization - Requirements Document

## Introduction

This specification defines the optimization of existing S00 (Homepage and Platform Screens) and S01 (Marketplace Screens) to align with the approved DIA.AI shell specification. The work involves restructuring, adding missing sections, correcting branding, and ensuring all marketplace screens follow consistent patterns. S02, S03, and S04 are already built and must not be modified.

## Glossary

- **DIA.AI**: Digital Intelligence & AI Platform - the enterprise AI operating platform
- **S00**: Stage 0 screens including Homepage, Platform Orientation, and Sign In
- **S01**: Stage 1 marketplace screens organized by D4 categories
- **D4 Model**: The four-stage operating model (Discern → Design → Deploy → Drive)
- **Marketplace**: A categorized collection of AI resources, tools, or services
- **Category Page**: A hub page that links to multiple related marketplaces
- **Shell Specification**: The approved structural and content specification for the platform
- **DigitalQatalyst (DQ)**: The organization operating the DIA.AI platform

## Requirements

### Requirement 1: Branding Correction

**User Story:** As a platform stakeholder, I want consistent branding across all screens so that the platform identity is clear and professional.

#### Acceptance Criteria

1. WHEN the system renders any header component, THE System SHALL display "DIA.AI" as the platform name
2. WHEN the system renders any page title, THE System SHALL use "DIA.AI" as the platform identifier
3. WHEN the system renders any footer component, THE System SHALL display "DIA.AI" branding
4. WHEN the system renders any meta description, THE System SHALL reference "DIA.AI" as the platform name
5. THE System SHALL replace all instances of "DIA AI Hub" with "DIA.AI" across all S00 and S01 screens

### Requirement 2: S00 Homepage Structure

**User Story:** As a visitor to the platform, I want a comprehensive homepage that tells the complete DIA.AI story so that I understand the platform's value and purpose.

#### Acceptance Criteria

1. THE System SHALL render the S00 Homepage with exactly 12 sections in the specified order
2. WHEN rendering the header, THE System SHALL display navigation with "Explore" dropdown, "Request Support" button, and "Sign In" button
3. WHEN rendering the hero section, THE System SHALL display headline "The Enterprise AI Operating Platform" with the specified subheadline
4. THE System SHALL include a "WHY DIA.AI" positioning section explaining the fragmented-to-connected AI journey
5. THE System SHALL include a "THE DIA.AI STORY" section explaining human-AI collaboration
6. THE System SHALL include a "THE D4 MODEL" section with four columns representing each D4 stage
7. THE System SHALL include a "WHERE WOULD YOU LIKE TO START?" section with six role-based pathway cards
8. THE System SHALL include a "THE AI MARKETPLACES" section with four D4 marketplace category cards
9. THE System SHALL include a "HIGH-IMPACT AI USE CASES" section with 3-4 use case cards
10. THE System SHALL include a "PLATFORM OUTCOMES" section with 4-6 value metric tiles
11. THE System SHALL include a "PART OF THE DIGITAL BUSINESS PLATFORM" section explaining DBP integration
12. THE System SHALL include a final CTA section and footer with specified links

### Requirement 3: S00 Platform Orientation Screen

**User Story:** As a new user, I want a dedicated orientation screen that explains how DIA.AI works so that I can understand the platform before diving in.

#### Acceptance Criteria

1. THE System SHALL render a Platform Orientation screen with page title "How DIA.AI Works"
2. WHEN rendering the orientation screen, THE System SHALL display a platform purpose block explaining what DIA.AI is
3. THE System SHALL display a D4 Journey Flow visual showing the four stages with descriptions
4. THE System SHALL display a "Where to Start" section with guidance for four different user types
5. WHEN a user selects a starting point, THE System SHALL navigate to the appropriate marketplace or workflow screen

### Requirement 4: S00 Sign In and Authorization

**User Story:** As a user, I want a clean sign-in experience that matches the platform's visual identity so that I can access my workspace.

#### Acceptance Criteria

1. THE System SHALL render a Sign In screen with DIA.AI logo and platform name
2. WHEN rendering the sign-in form, THE System SHALL display email and password fields with a "Sign In" button
3. THE System SHALL display a "Forgot password?" link and registration option
4. WHEN a user selects registration, THE System SHALL display a registration form with fields for Full Name, Work Email, Organisation, Role, Password, and Confirm Password
5. WHEN a user successfully signs in, THE System SHALL redirect to the S02 Role-Based Workspace
6. THE System SHALL display a role-based access note explaining workspace tailoring
7. WHEN a new user signs in for the first time, THE System SHALL display a "Where would you like to start?" prompt with three quick-start options

### Requirement 5: S01 Category Pages

**User Story:** As a user exploring the platform, I want category hub pages for each D4 stage so that I can easily navigate to relevant marketplaces.

#### Acceptance Criteria

1. THE System SHALL render four D4 Category Pages: Discern, Design, Deploy, and Drive
2. WHEN rendering the Discern Category Page, THE System SHALL display three marketplace cards with "Explore" CTAs
3. WHEN rendering the Design Category Page, THE System SHALL display four marketplace cards with "Explore" CTAs
4. WHEN rendering the Deploy Category Page, THE System SHALL display five marketplace cards with "Explore" CTAs
5. WHEN rendering the Drive Category Page, THE System SHALL display six marketplace cards with "Explore" CTAs
6. WHEN a user clicks an "Explore" CTA, THE System SHALL navigate to the corresponding marketplace page

### Requirement 6: S01 Marketplace Screen Structure

**User Story:** As a user browsing marketplaces, I want a consistent structure across all marketplace screens so that I can efficiently find and filter content.

#### Acceptance Criteria

1. THE System SHALL render all S01 marketplace screens with a standard structure including header, breadcrumb, intro block, tab row, filter bar, and results grid
2. WHEN rendering any marketplace screen, THE System SHALL display the same header as S00 screens
3. WHEN rendering breadcrumb navigation, THE System SHALL display "Home > [Category] > [Marketplace Name]"
4. THE System SHALL display a marketplace intro block with title and one-line description
5. THE System SHALL display a tab row with marketplace-specific tabs as defined in the specification
6. WHEN a user selects a tab, THE System SHALL filter the results grid to show only items relevant to that tab
7. THE System SHALL display a global filter bar with Search, Content Type, Audience/Role, Status, Date, and More Filters
8. THE System SHALL display a results grid with cards showing title, type badge, description, status, date, and action button
9. THE System SHALL display pagination or load more functionality for results

### Requirement 7: Discern Marketplaces

**User Story:** As a user in the Discern stage, I want access to AI updates, learning resources, and knowledge so that I can stay informed and build capability.

#### Acceptance Criteria

1. THE System SHALL render an "AI Updates & Insights Center" marketplace with tabs: Updates, Risk & Governance, Insights
2. THE System SHALL render an "AI Learning Center" marketplace with tabs: Learning Programs, Competency & Certification, Adoption & Collaboration
3. THE System SHALL render an "AI Knowledge Center" marketplace with tabs: Strategy, Governance, Standards, Playbooks

### Requirement 8: Design Marketplaces

**User Story:** As a user in the Design stage, I want access to governance frameworks, architecture patterns, use cases, and specification tools so that I can shape AI solutions effectively.

#### Acceptance Criteria

1. THE System SHALL render an "AI Governance Frameworks" marketplace with tabs: Operating Model, Lifecycle, Accountability, Responsible AI
2. THE System SHALL render an "AI Architecture Blueprints" marketplace with tabs: LLM Patterns, RAG Patterns, Agents & Orchestration, Security & Integration
3. THE System SHALL render an "AI Use Case Marketplace" with tabs: Use Cases, Assessment, Value & Prioritisation
4. THE System SHALL render an "AI Specification Studio" with tabs: Model Specs, Agent Specs, Prompt Specs, Workflow Specs

### Requirement 9: Deploy Marketplaces

**User Story:** As a user in the Deploy stage, I want access to operational tools for models, bots, agents, workflows, and digital twins so that I can execute AI solutions.

#### Acceptance Criteria

1. THE System SHALL render an "AI Asset Library" marketplace with tabs: Prompt Assets, Agent Assets, Workflow Assets, Evaluation Assets
2. THE System SHALL render a "Model Operations (MLOps)" marketplace with tabs: Build & Train, Validate & Release, Monitor & Optimise
3. THE System SHALL render a "Conversational Systems (BotOps)" marketplace with tabs: Configuration, Testing, Release, Monitoring
4. THE System SHALL render an "Agent Operations (AgentOps)" marketplace with tabs: Orchestration, Monitoring, Permissions, Escalation
5. THE System SHALL render a "Digital Twin Operations (DTOps)" marketplace with tabs: Process Alignment, Role Mapping, Workflow Integration, Decision Ownership

### Requirement 10: Drive Marketplaces

**User Story:** As a user in the Drive stage, I want access to workspace tools, services, prompts, orchestration, performance tracking, and monitoring so that I can govern and optimize AI operations.

#### Acceptance Criteria

1. THE System SHALL render an "AI Workspace" marketplace with tabs: Role-Based Copilots, Task Assistants, Productivity Tools, Shared Workspace Tools
2. THE System SHALL render an "AI Service Marketplace" with tabs: Request Services, Available Services, Support & Enhancements
3. THE System SHALL render a "Prompt Library" marketplace with tabs: Prompt Catalogue, Role / Use Case Prompts, Performance Analytics, Version & Governance
4. THE System SHALL render an "AI Orchestration Hub" marketplace with tabs: Workflow Execution, Cross-System Coordination, Monitoring, Bottlenecks & Failures
5. THE System SHALL render an "AI Performance & Value" marketplace with tabs: Adoption, Productivity & ROI, Transformation Impact
6. THE System SHALL render an "AI Monitoring Center" marketplace with tabs: Bias & Fairness, Drift, Anomalies, Reliability

### Requirement 11: Marketplace Details Page

**User Story:** As a user viewing a specific marketplace item, I want a detailed view with relevant information and actions so that I can understand and use the item.

#### Acceptance Criteria

1. THE System SHALL render a Marketplace Details Page when a user clicks any marketplace item
2. WHEN rendering the details page, THE System SHALL display item title, type badge, status indicator, last updated date, and owner
3. THE System SHALL display an Overview tab with full description, purpose, and context
4. THE System SHALL display detail tabs with content specific to the item type
5. THE System SHALL display a "Related items" section with 3-4 related items
6. THE System SHALL display action buttons appropriate to the item type: "Save to Profile", "Request This", or "Download"
7. WHEN rendering breadcrumb navigation, THE System SHALL display "Home > [Category] > [Marketplace] > [Item Name]"

### Requirement 12: Navigation Wiring

**User Story:** As a user navigating the platform, I want all links and CTAs to work correctly so that I can move seamlessly between screens.

#### Acceptance Criteria

1. WHEN a user clicks "Explore AI Marketplaces" on S00 Homepage, THE System SHALL navigate to S01 Discern Category Page
2. WHEN a user clicks "Sign In to Your Workspace" on S00 Homepage, THE System SHALL navigate to S00 Sign In screen
3. WHEN a user clicks a role card "Get Started" CTA, THE System SHALL navigate to S00 Sign In screen
4. WHEN a user clicks a D4 marketplace card "Explore" CTA, THE System SHALL navigate to the relevant S01 Category Page
5. WHEN a user clicks "Marketplaces" in the footer, THE System SHALL navigate to S01 Discern Category Page
6. WHEN a user clicks "Sign In" in the footer, THE System SHALL navigate to S00 Sign In screen
7. WHEN a user clicks "Home" in breadcrumb navigation, THE System SHALL navigate to S00 Homepage
8. WHEN a user clicks a category in breadcrumb navigation, THE System SHALL navigate to the corresponding S01 Category Page
9. WHEN a user clicks a marketplace card on a Category Page, THE System SHALL navigate to the corresponding marketplace page
10. WHEN a user clicks a results grid item, THE System SHALL navigate to the Marketplace Details Page

### Requirement 13: Visual Design Consistency

**User Story:** As a user, I want a consistent visual experience across all screens so that the platform feels cohesive and professional.

#### Acceptance Criteria

1. THE System SHALL preserve the existing dark navy to orange-to-purple gradient visual identity across all screens
2. THE System SHALL apply consistent header structure and component style across all S00 and S01 screens
3. THE System SHALL apply consistent typography, spacing, and component patterns to all new sections
4. THE System SHALL render marketplace result cards with consistent format: title, type badge, description, status, date, action
5. THE System SHALL use realistic DIA.AI-aligned content throughout with no placeholder text
