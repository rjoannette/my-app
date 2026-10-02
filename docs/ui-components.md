# UI Component Architecture

## Overview

This application uses **shadcn/ui** as the sole component library. All UI elements must be built using shadcn/ui components. Custom components are strictly prohibited.

## Key Principles

1. **shadcn/ui only**: All UI must come from shadcn/ui
2. **No custom components**: Do not create custom wrappers or new components
3. **Composition over customization**: Compose shadcn/ui components to create features
4. **Consistency**: Use existing installed components; request new installations if needed

## Installation & Setup

### Adding Components

Use the shadcn/ui CLI to install components:

```bash
npx shadcn-ui@latest add <component-name>
```

**Examples:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
```

Components are installed to `components/ui/` and are fully customizable via generated files.

### Configuration

shadcn/ui is configured in `components.json`:

```json
{
  "rsc": true,
  "style": "default",
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  }
}
```

## Component Usage

### Basic Pattern

```typescript
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

### Common Components

| Component | Use Case | Import |
|-----------|----------|--------|
| Button | Actions, navigation | `@/components/ui/button` |
| Card | Content containers | `@/components/ui/card` |
| Dialog | Modals, popups | `@/components/ui/dialog` |
| Input | Text fields | `@/components/ui/input` |
| Select | Dropdowns | `@/components/ui/select` |
| Table | Data display | `@/components/ui/table` |
| Form | Form handling | `@/components/ui/form` |
| Checkbox | Boolean inputs | `@/components/ui/checkbox` |
| Radio | Radio buttons | `@/components/ui/radio-group` |
| Tabs | Tabbed content | `@/components/ui/tabs` |

## Styling & Customization

### Tailwind CSS Classes

Customize shadcn/ui components using Tailwind CSS classes:

```typescript
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button className="w-full bg-blue-600 hover:bg-blue-700">
      Full Width Button
    </Button>
  );
}
```

### Variant System

shadcn/ui components use `class-variance-authority` for variants:

```typescript
import { Button } from "@/components/ui/button";

// Use variant prop
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Use size prop
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Dark Mode

All shadcn/ui components support dark mode via Tailwind CSS:

```typescript
// Components automatically adapt to dark mode
// No additional configuration needed
```

## Composition Examples

### Card with Form Fields

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FormCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        <Button className="w-full">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### Dialog Modal

```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Common Patterns

### Button Group

```typescript
import { Button } from "@/components/ui/button";

<div className="flex gap-2">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="ghost">Delete</Button>
</div>
```

### Form Section

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label>Label</Label>
      <Input placeholder="Enter value" />
    </div>
  </CardContent>
</Card>
```

## Do's and Don'ts

✅ **Do**
- Use shadcn/ui components for all UI elements
- Compose components to create complex layouts
- Customize using Tailwind CSS classes
- Check if component exists before creating custom version
- Use the component variants system for different styles
- Import components from `@/components/ui/`

❌ **Don't**
- Create custom components (use shadcn/ui instead)
- Use other UI libraries (Bootstrap, Material UI, etc.)
- Ignore component variants (duplicate code instead)
- Hardcode styles (use Tailwind classes)
- Modify installed component files (regenerate instead)
- Import components from node_modules directly

## Requesting New Components

If a needed component isn't installed:

1. Check the [shadcn/ui documentation](https://ui.shadcn.com)
2. Install using: `npx shadcn-ui@latest add <component-name>`
3. Update this guide if it's a commonly used component

## Resources

- **shadcn/ui Docs**: https://ui.shadcn.com
- **Component Library**: https://ui.shadcn.com/docs/components
- **Tailwind CSS**: https://tailwindcss.com
- **Class Variance Authority**: https://cva.style
