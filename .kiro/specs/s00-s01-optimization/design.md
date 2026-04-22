# S00 + S01 Optimization - Design Document

## Overview

This design document outlines the technical approach for optimizing the existing DIA.AI prototype to align with the approved shell specification. The work focuses on restructuring S00 and S01 screens while preserving the existing visual identity and avoiding any changes to S02, S03, and S04.

## Architecture

### Current State Analysis

The existing prototype has:
- React + TypeScript + Vite architecture
- Tailwind CSS for styling
- Framer Motion for animations
- Component-based structure with pages and data files
- Routing via React Router
- Dark navy to orange/purple gradient visual identity

### Design Principles

1. **Optimize, Don't Rebuild**: Work with existing components and patterns
2. **Consistency First**: Apply uniform structure across all marketplace screens
3. **Preserve Visual Identity**: Maintain the established color palette and design system
4. **Component Reusability**: Create shared components for repeated patterns
5. **Data-Driven**: Use TypeScript data structures for marketplace content

## Components and Interfaces

### Core Layout Components

#### Header Component
```typescript
interface HeaderProps {
  variant?: 'default' | 'authenticated';
  userAvatar?: string;
}
```

Responsibilities:
- Display DIA.AI branding (corrected from "DIA AI Hub")
- Render "Explore" dropdown with links to S01 category pages
- Show "Request Support" and "Sign In" buttons (or user avatar when authenticated)
- Maintain consistent styling across all screens

#### Footer Component
```typescript
interface FooterProps {
  variant?: 'full' | 'minimal';
}
```

Responsibilities:
- Display DIA.AI branding
- Render navigation links: Home, Marketplaces, Sign In, Request Support, Privacy, Terms
- Show copyright: © 2026 DigitalQatalyst. All rights reserved.

#### Breadcrumb Component
```typescript
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}
```

Responsibilities:
- Display navigation path
- Support click navigation to parent levels
- Highlight current page

### S00 Components

#### S00 Homepage Sections

The homepage will be composed of 12 distinct section components:

1. **HeroSection**: Enhanced with correct headline and subheadline
2. **PositioningSection**: New - explains fragmented vs connected AI
3. **StorySection**: New - human-AI collaboration narrative
4. **D4ModelSection**: New - four-column D4 stage overview
5. **RolePathwaysSection**: New - six role-based entry points
6. **MarketplaceOverviewSection**: New - four D4 marketplace categories
7. **UseCasesSection**: New - 3-4 high-impact use cases
8. **ValueMetricsSection**: Enhanced - 4-6 outcome metrics
9. **DBPIntegrationSection**: New - platform ecosystem context
10. **FinalCTASection**: Call-to-action with gradient background
11. **FooterSection**: Complete footer with all links

```typescript
// Example section interface
interface SectionProps {
  className?: string;
}

interface RolePathway {
  role: string;
  description: string;
  ctaLink: string;
  icon: LucideIcon;
}

interface D4Stage {
  stage: 'Discern' | 'Design' | 'Deploy' | 'Drive';
  description: string;
  icon: LucideIcon;
}
```

#### Platform Orientation Screen

```typescript
interface OrientationProps {
  d4Stages: D4Stage[];
  startingPoints: StartingPoint[];
}

interface StartingPoint {
  userType: string;
  description: string;
  link: string;
}
```

Components:
- Page title and platform purpose block
- D4 journey flow visualization (horizontal stepper)
- "Where to Start" guidance section
- Sign-in CTA

#### Sign In / Authorization Screen

```typescript
interface SignInFormData {
  email: string;
  password: string;
}

interface RegistrationFormData {
  fullName: string;
  workEmail: string;
  organisation: string;
  role: string;
  password: string;
  confirmPassword: string;
}
```

Components:
- Centered card layout on gradient background
- Sign-in form with validation
- Registration form toggle
- Role-based access note
- First-time user quick-start prompt

### S01 Components

#### Category Page Component

```typescript
interface CategoryPageProps {
  category: 'Discern' | 'Design' | 'Deploy' | 'Drive';
  title: string;
  description: string;
  marketplaces: MarketplaceCard[];
}

interface MarketplaceCard {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  link: string;
}
```

Responsibilities:
- Display category title and description
- Render marketplace cards in grid layout
- Handle navigation to marketplace pages

#### Marketplace Page Component

```typescript
interface MarketplacePageProps {
  marketplace: MarketplaceData;
  breadcrumb: BreadcrumbItem[];
}

interface MarketplaceData {
  id: string;
  name: string;
  description: string;
  tabs: MarketplaceTab[];
  filters: FilterConfig;
}

interface MarketplaceTab {
  id: string;
  label: string;
  description: string;
  items: MarketplaceItem[];
}

interface MarketplaceItem {
  id: string;
  title: string;
  type: string;
  description: string;
  status: 'Active' | 'Draft' | 'Archived' | 'Under Review';
  lastUpdated: string;
  owner?: string;
}
```

Standard marketplace page structure:
1. Header (shared)
2. Breadcrumb navigation
3. Marketplace intro block
4. Tab row with active tab highlighting
5. Active tab description
6. Global filter bar
7. Marketplace-specific filters (sidebar or inline)
8. Results grid with cards
9. Pagination or load more

#### Filter Bar Component

```typescript
interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  availableFilters: FilterConfig;
}

interface FilterState {
  search: string;
  contentType: string[];
  audienceRole: string[];
  status: string[];
  dateRange: DateRange;
  customFilters: Record<string, any>;
}

interface FilterConfig {
  contentTypes: string[];
  roles: string[];
  statuses: string[];
  customFilters?: CustomFilter[];
}
```

Responsibilities:
- Render search bar
- Display filter dropdowns
- Handle filter state changes
- Emit filter changes to parent

#### Results Grid Component

```typescript
interface ResultsGridProps {
  items: MarketplaceItem[];
  onItemClick: (itemId: string) => void;
}

interface ResultCardProps {
  item: MarketplaceItem;
  onClick: () => void;
}
```

Responsibilities:
- Display items in responsive grid
- Render consistent card format
- Handle item click navigation

#### Marketplace Details Page

```typescript
interface MarketplaceDetailsProps {
  item: MarketplaceItemDetail;
  relatedItems: MarketplaceItem[];
  breadcrumb: BreadcrumbItem[];
}

interface MarketplaceItemDetail extends MarketplaceItem {
  overview: string;
  detailTabs: DetailTab[];
  actions: ItemAction[];
}

interface DetailTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ItemAction {
  type: 'save' | 'request' | 'download';
  label: string;
  handler: () => void;
}
```

## Data Models

### Marketplace Data Structure

```typescript
// Central marketplace registry
interface MarketplaceRegistry {
  discern: DiscernMarketplaces;
  design: DesignMarketplaces;
  deploy: DeployMarketplaces;
  drive: DriveMarketplaces;
}

// Discern marketplaces
interface DiscernMarketplaces {
  updatesInsights: MarketplaceData;
  learning: MarketplaceData;
  knowledge: MarketplaceData;
}

// Design marketplaces
interface DesignMarketplaces {
  governance: MarketplaceData;
  blueprints: MarketplaceData;
  useCases: MarketplaceData;
  specificationStudio: MarketplaceData;
}

// Deploy marketplaces
interface DeployMarketplaces {
  assetLibrary: MarketplaceData;
  mlops: MarketplaceData;
  botops: MarketplaceData;
  agentops: MarketplaceData;
  dtops: MarketplaceData;
}

// Drive marketplaces
interface DriveMarketplaces {
  workspace: MarketplaceData;
  serviceMarketplace: MarketplaceData;
  promptLibrary: MarketplaceData;
  orchestrationHub: MarketplaceData;
  performanceValue: MarketplaceData;
  monitoringCenter: MarketplaceData;
}
```

### Data File Organization

```
src/data/
├── marketplaces/
│   ├── discern/
│   │   ├── updatesInsights.ts
│   │   ├── learning.ts
│   │   └── knowledge.ts
│   ├── design/
│   │   ├── governance.ts
│   │   ├── blueprints.ts
│   │   ├── useCases.ts
│   │   └── specificationStudio.ts
│   ├── deploy/
│   │   ├── assetLibrary.ts
│   │   ├── mlops.ts
│   │   ├── botops.ts
│   │   ├── agentops.ts
│   │   └── dtops.ts
│   └── drive/
│       ├── workspace.ts
│       ├── serviceMarketplace.ts
│       ├── promptLibrary.ts
│       ├── orchestrationHub.ts
│       ├── performanceValue.ts
│       └── monitoringCenter.ts
├── homepage/
│   ├── rolePathways.ts
│   ├── useCases.ts
│   ├── valueMetrics.ts
│   └── d4Stages.ts
└── types.ts
```

## Error Handling

### Navigation Errors
- Invalid marketplace IDs: Redirect to 404 page
- Missing category pages: Redirect to homepage
- Broken breadcrumb links: Fallback to homepage

### Data Errors
- Missing marketplace data: Display error message with retry option
- Failed filter operations: Reset to default filters
- Empty results: Display "No items found" message with suggestions

### Form Errors
- Sign-in validation: Display inline error messages
- Registration validation: Highlight invalid fields
- Network errors: Display toast notification with retry option

## Testing Strategy

### Component Testing
- Unit tests for all new section components
- Integration tests for marketplace page structure
- Snapshot tests for consistent rendering

### Navigation Testing
- Test all CTA links from S00 to S01
- Test breadcrumb navigation
- Test category page to marketplace navigation
- Test marketplace item to details page navigation

### Filter Testing
- Test search functionality
- Test filter combinations
- Test filter reset
- Test tab switching

### Responsive Testing
- Test all breakpoints (mobile, tablet, desktop)
- Test touch interactions on mobile
- Test navigation menu on mobile

## Performance Considerations

### Code Splitting
- Lazy load marketplace pages
- Lazy load detail pages
- Separate bundles for S00 and S01

### Data Loading
- Preload category page data
- Lazy load marketplace item details
- Cache marketplace data in memory

### Animation Performance
- Use CSS transforms for animations
- Debounce filter changes
- Throttle scroll events

## Accessibility

### Keyboard Navigation
- Tab order follows visual flow
- All interactive elements keyboard accessible
- Escape key closes modals and dropdowns

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for complex components
- Announce filter changes
- Announce tab changes

### Visual Accessibility
- Maintain WCAG AA contrast ratios
- Focus indicators on all interactive elements
- No color-only information

## Migration Strategy

### Phase 1: Branding Correction
1. Update all "DIA AI Hub" references to "DIA.AI"
2. Update header component
3. Update footer component
4. Update page titles and meta tags

### Phase 2: S00 Homepage Optimization
1. Audit existing sections
2. Add missing sections in order
3. Update hero section content
4. Wire navigation links

### Phase 3: S00 Additional Screens
1. Build Platform Orientation screen
2. Optimize Sign In screen
3. Add registration functionality

### Phase 4: S01 Category Pages
1. Create category page component
2. Build all four category pages
3. Wire navigation from S00

### Phase 5: S01 Marketplace Screens
1. Create standard marketplace page component
2. Audit existing marketplace screens
3. Update existing screens to match standard
4. Build missing marketplace screens
5. Implement all required tabs

### Phase 6: Marketplace Details
1. Create details page template
2. Wire navigation from results grids
3. Implement related items

### Phase 7: Final Integration
1. Complete all navigation wiring
2. Test all user flows
3. Validate visual consistency
4. Performance optimization

## Routing Structure

```typescript
// Updated routing structure
const routes = [
  // S00 Routes
  { path: '/', component: Homepage },
  { path: '/how-it-works', component: PlatformOrientation },
  { path: '/sign-in', component: SignIn },
  
  // S01 Category Routes
  { path: '/discern', component: DiscernCategory },
  { path: '/design', component: DesignCategory },
  { path: '/deploy', component: DeployCategory },
  { path: '/drive', component: DriveCategory },
  
  // S01 Discern Marketplace Routes
  { path: '/discern/updates-insights', component: UpdatesInsightsMarketplace },
  { path: '/discern/updates-insights/:id', component: MarketplaceDetails },
  { path: '/discern/learning', component: LearningMarketplace },
  { path: '/discern/learning/:id', component: MarketplaceDetails },
  { path: '/discern/knowledge', component: KnowledgeMarketplace },
  { path: '/discern/knowledge/:id', component: MarketplaceDetails },
  
  // S01 Design Marketplace Routes
  { path: '/design/governance', component: GovernanceMarketplace },
  { path: '/design/governance/:id', component: MarketplaceDetails },
  { path: '/design/blueprints', component: BlueprintsMarketplace },
  { path: '/design/blueprints/:id', component: MarketplaceDetails },
  { path: '/design/use-cases', component: UseCasesMarketplace },
  { path: '/design/use-cases/:id', component: MarketplaceDetails },
  { path: '/design/specification-studio', component: SpecificationStudioMarketplace },
  { path: '/design/specification-studio/:id', component: MarketplaceDetails },
  
  // S01 Deploy Marketplace Routes
  { path: '/deploy/asset-library', component: AssetLibraryMarketplace },
  { path: '/deploy/asset-library/:id', component: MarketplaceDetails },
  { path: '/deploy/mlops', component: MLOpsMarketplace },
  { path: '/deploy/mlops/:id', component: MarketplaceDetails },
  { path: '/deploy/botops', component: BotOpsMarketplace },
  { path: '/deploy/botops/:id', component: MarketplaceDetails },
  { path: '/deploy/agentops', component: AgentOpsMarketplace },
  { path: '/deploy/agentops/:id', component: MarketplaceDetails },
  { path: '/deploy/dtops', component: DTOpsMarketplace },
  { path: '/deploy/dtops/:id', component: MarketplaceDetails },
  
  // S01 Drive Marketplace Routes
  { path: '/drive/workspace', component: WorkspaceMarketplace },
  { path: '/drive/workspace/:id', component: MarketplaceDetails },
  { path: '/drive/service-marketplace', component: ServiceMarketplace },
  { path: '/drive/service-marketplace/:id', component: MarketplaceDetails },
  { path: '/drive/prompt-library', component: PromptLibraryMarketplace },
  { path: '/drive/prompt-library/:id', component: MarketplaceDetails },
  { path: '/drive/orchestration-hub', component: OrchestrationHubMarketplace },
  { path: '/drive/orchestration-hub/:id', component: MarketplaceDetails },
  { path: '/drive/performance-value', component: PerformanceValueMarketplace },
  { path: '/drive/performance-value/:id', component: MarketplaceDetails },
  { path: '/drive/monitoring-center', component: MonitoringCenterMarketplace },
  { path: '/drive/monitoring-center/:id', component: MarketplaceDetails },
  
  // S02, S03, S04 Routes (existing - do not modify)
  { path: '/workspace/*', component: WorkspaceApp },
  
  // Catch-all
  { path: '*', component: NotFound },
];
```

## Visual Design Specifications

### Color Palette (Preserved)
- Primary: Dark navy (#0A1628)
- Accent: Orange to purple gradient
- Text: White/light gray on dark backgrounds
- Interactive: Hover states with opacity changes

### Typography
- Headings: Large, bold, clear hierarchy
- Body: Readable, appropriate line height
- Labels: Smaller, uppercase for emphasis

### Spacing
- Consistent padding and margins
- Section spacing: 4-6rem vertical
- Component spacing: 1-2rem
- Card spacing: 1rem gap in grids

### Component Patterns
- Cards: Rounded corners, subtle borders, hover effects
- Buttons: Primary (solid), Secondary (outline), Ghost
- Inputs: Dark background, light border, focus states
- Tabs: Underline active state, smooth transitions
- Filters: Dropdown menus, multi-select support

## Security Considerations

### Authentication
- Secure password handling
- Token-based session management
- Role-based access control preparation

### Input Validation
- Sanitize all user inputs
- Validate email formats
- Password strength requirements
- XSS prevention

### Navigation Security
- Validate route parameters
- Prevent unauthorized access to protected routes
- Secure external link handling

## Deployment Considerations

### Build Optimization
- Tree shaking for unused code
- Minification and compression
- Asset optimization
- Source maps for debugging

### Environment Configuration
- Development, staging, production environments
- Environment-specific API endpoints
- Feature flags for gradual rollout

### Monitoring
- Error tracking and logging
- Performance monitoring
- User analytics (privacy-compliant)
- Uptime monitoring
