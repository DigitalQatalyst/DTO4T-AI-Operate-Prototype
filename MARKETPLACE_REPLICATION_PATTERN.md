# Marketplace Replication Pattern

This document provides the pattern to create the remaining 3 Design marketplaces:
1. AI Specification Studio
2. Model Cards & Documentation Registry
3. Prompt Standards & Evaluation Lab

## Completed Examples
- ✅ Blueprint Library (`/blueprint`)
- ✅ Use Case Intake & Scoring (`/usecase`)

## Pattern to Follow

### Step 1: Create Data File (`src/data/{name}Marketplace.ts`)

```typescript
import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'tab1',
    label: 'Tab Label',
    description: 'Tab description',
    type: 'insight'
  },
  // Add 3-4 tabs
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight', // or 'use_case', 'regulatory', etc.
    title: 'Item Title',
    summary: 'Item summary description',
    contentUrl: '/{route}/tab1/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Team Name',
    source: 'Internal',
    status: 'Approved',
    tags: ['tag1', 'tag2', 'tag3'],
    topic: ['Tools', 'Adoption'],
    audience: ['Developer', 'Manager'],
    theme: 'Theme Name',
    stage: 'Design',
    readTimeMins: 20
  },
  // Add 5-6 items
];
```

### Step 2: Create Marketplace Page (`src/pages/{Name}Marketplace.tsx`)

Copy `BlueprintMarketplace.tsx` or `UseCaseMarketplace.tsx` and:
1. Change component name
2. Update import from data file
3. Update breadcrumb `pageName`
4. Update page title and description
5. Update search placeholders for each tab
6. Update tab filtering logic in useEffect

### Step 3: Create Detail Page (`src/pages/{Name}Detail.tsx`)

Copy `BlueprintDetail.tsx` or `UseCaseDetail.tsx` and:
1. Change component name
2. Update import from data file
3. Update route in "Back to" link
4. Update breadcrumb route
5. Update typeLabels
6. Update tab names (keep 3 tabs)
7. Update color scheme (bg-{color}-50, text-{color}-700)

### Step 4: Add Routes to `src/App.tsx`

```typescript
// Add imports
import {Name}Marketplace from "./pages/{Name}Marketplace";
import {Name}Detail from "./pages/{Name}Detail";

// Add routes
<Route path="/{route}" element={<{Name}Marketplace />} />
<Route path="/{route}/:id" element={<{Name}Detail />} />
```

### Step 5: Update `src/components/discern/ContentCard.tsx`

Add to `getMarketplaceInfo()`:
```typescript
if (path.includes('/{route}')) return { marketplace: '{route}', title: 'Title\nLine 2' };
```

### Step 6: Update `src/components/MarketplaceSection.tsx`

Add product name mapping:
```typescript
) : p.name === "Product Name" ? (
  <Link 
    to="/{route}"
    className="mt-4 inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
  >
    {p.cta}
    <ArrowRight className="h-3 w-3" />
  </Link>
```

### Step 7: Update `src/components/discern/Breadcrumb.tsx` (if needed)

The breadcrumb already handles Design section automatically for `/design/*` routes.

## Remaining Marketplaces to Create

### 1. AI Specification Studio
- **Route**: `/specification` or `/spec-studio`
- **Product Name**: "AI Specification Studio"
- **Tabs**: Requirements, Specifications, Templates, Collaboration
- **Color**: Violet (bg-violet-50, text-violet-700)
- **Theme**: Specification

### 2. Model Cards & Documentation Registry
- **Route**: `/model-cards` or `/model-registry`
- **Product Name**: "Model Cards & Documentation Registry"
- **Tabs**: Model Cards, Data Sheets, Impact Assessments, Registry
- **Color**: Pink (bg-pink-50, text-pink-700)
- **Theme**: Documentation

### 3. Prompt Standards & Evaluation Lab
- **Route**: `/prompt-lab` or `/prompt-standards`
- **Product Name**: "Prompt Standards & Evaluation Lab"
- **Tabs**: Standards, Templates, Evaluation, Benchmarks
- **Color**: Amber (bg-amber-50, text-amber-700)
- **Theme**: Prompt Engineering

## Quick Checklist

For each marketplace:
- [ ] Create data file with 4 tabs and 6 items
- [ ] Create marketplace page
- [ ] Create detail page
- [ ] Add routes to App.tsx (import + 2 routes)
- [ ] Add to ContentCard.tsx getMarketplaceInfo()
- [ ] Add to MarketplaceSection.tsx product mapping
- [ ] Test navigation from homepage
- [ ] Test detail page navigation
- [ ] Verify breadcrumb shows "Design" section

## File Naming Convention

- Data: `{name}Marketplace.ts` (camelCase)
- Pages: `{Name}Marketplace.tsx` and `{Name}Detail.tsx` (PascalCase)
- Routes: `/{route}` (kebab-case)

## Example: Creating Specification Studio

1. Create `src/data/specificationMarketplace.ts`
2. Create `src/pages/SpecificationMarketplace.tsx`
3. Create `src/pages/SpecificationDetail.tsx`
4. Update `src/App.tsx`:
   ```typescript
   import SpecificationMarketplace from "./pages/SpecificationMarketplace";
   import SpecificationDetail from "./pages/SpecificationDetail";
   
   <Route path="/specification" element={<SpecificationMarketplace />} />
   <Route path="/specification/:id" element={<SpecificationDetail />} />
   ```
5. Update `src/components/discern/ContentCard.tsx`:
   ```typescript
   if (path.includes('/specification')) return { marketplace: 'specification', title: 'AI Specification\nStudio' };
   ```
6. Update `src/components/MarketplaceSection.tsx`:
   ```typescript
   ) : p.name === "AI Specification Studio" ? (
     <Link to="/specification" ...>
   ```

Done! The marketplace is now fully functional.
