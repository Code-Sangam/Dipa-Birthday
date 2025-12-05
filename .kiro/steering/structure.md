# Project Structure & Conventions

## Directory Organization

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with font config
│   ├── page.jsx           # Main page with screen orchestration
│   ├── globals.css        # Global styles and animations
│   └── favicon.ico
└── components/
    ├── GradientButton.jsx # Reusable button component
    └── screens/           # Screen components for each stage
        ├── LoaderScreen.jsx
        ├── IntroScreen.jsx
        ├── CakeScreen.jsx
        ├── BalloonScreen.jsx
        ├── PhotosScreen.jsx
        └── MessageScreen.jsx

public/
├── gifs/                  # Animated GIFs for screens
└── images/                # Photos for gallery
```

## Code Conventions

### Component Structure
- All components use **function declarations** (not arrow functions for exports)
- Client components marked with `"use client"` directive
- Props destructured with defaults where applicable
- Callbacks passed via `onNext`, `onDone` pattern

### Styling Patterns
- **Tailwind utility classes** for all styling
- Gradient backgrounds: `from-[color] via-[color] to-[color]`
- Responsive: mobile-first with `md:` breakpoints
- Custom animations defined in `globals.css` (spinner, flicker, cake)
- Text gradients: `text-transparent bg-clip-text bg-gradient-to-r`
- Glow effects: `shadow-[0_0_28px_rgba(...)]` or `drop-shadow`

### Animation Approach
- **Framer Motion** for screen transitions and element animations
- `AnimatePresence` with `mode="wait"` for screen changes
- Common pattern: `initial`, `animate`, `exit` props
- Fade + scale transitions for smooth feel
- Custom CSS keyframe animations for special effects (cake flame, spinner)

### State Management
- Simple `useState` for screen navigation
- Screen index controls which component displays
- Each screen receives callback to advance to next

### File Naming
- Components: PascalCase (e.g., `LoaderScreen.jsx`)
- Screens: `[Name]Screen.jsx` pattern
- Use `.jsx` extension for React components
- Use `.js` for config files

### Asset Organization
- GIFs in `public/gifs/`
- Photos in `public/images/`
- Reference with absolute paths: `/gifs/intro.gif`

## Key Patterns

### Screen Flow
Main page manages screen progression via array index. Each screen component is self-contained and triggers navigation via callback.

### Reusable Components
Shared UI elements (like `GradientButton`) extracted to `components/` root. Screen-specific components in `screens/` subdirectory.

### Customization Points
- Messages and names in screen components
- Photos in `public/images/`
- Watermark in `page.jsx`
- Font in `layout.js`
