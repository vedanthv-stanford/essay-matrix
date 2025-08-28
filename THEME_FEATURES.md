# Theme Features & Logo Visibility

This document describes the new theme system and logo visibility improvements implemented using Logo.dev's latest features.

## 🎨 **New Theme System**

### **Available Themes**
- **Light Mode**: Optimized for light backgrounds
- **Dark Mode**: Optimized for dark backgrounds  
- **Auto Mode**: Automatically detects system preference

### **How It Works**
1. **Theme Detection**: Automatically detects your system's color scheme
2. **Logo Adaptation**: Logos automatically adjust contrast for optimal visibility
3. **Seamless Switching**: Change themes instantly without page refresh
4. **Persistent Settings**: Your theme preference is saved in localStorage

## 🌟 **Logo.dev Integration**

### **New Theme Parameters**
Logo.dev now supports theme parameters for better visibility:

```typescript
// Light mode - dark logos on light backgrounds
https://img.logo.dev/stanford.edu?theme=light&size=256&format=png

// Dark mode - light logos on dark backgrounds  
https://img.logo.dev/stanford.edu?theme=dark&size=256&format=png

// Auto mode - system preference (default)
https://img.logo.dev/stanford.edu?theme=auto&size=256&format=png
```

### **Benefits**
- **No More Invisible Logos**: Logos are always visible regardless of background
- **Automatic Contrast**: Smart contrast optimization for any theme
- **Better Accessibility**: Improved visibility for all users
- **Professional Look**: Consistent logo appearance across themes

## 🛠 **Implementation Details**

### **Theme Context**
```typescript
// src/contexts/theme-context.tsx
const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();

// Available values:
// theme: 'light' | 'dark' | 'auto'
// resolvedTheme: 'light' | 'dark' (actual applied theme)
```

### **CollegeLogo Component**
```typescript
<CollegeLogo
  collegeName="Stanford University"
  domain="stanford.edu"
  size={64}
  theme="auto"           // 'auto', 'light', or 'dark'
  showThemeToggle={true} // Show individual logo theme toggle
/>
```

### **Theme Toggle Component**
```typescript
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Dropdown with Light, Dark, and System options
<ThemeToggle />
```

## 📱 **Usage Examples**

### **1. Basic Usage with Auto Theme**
```typescript
<CollegeLogo
  collegeName="Harvard University"
  domain="harvard.edu"
  size={80}
/>
// Automatically uses system theme preference
```

### **2. Force Light Theme**
```typescript
<CollegeLogo
  collegeName="MIT"
  domain="mit.edu"
  size={64}
  theme="light"
/>
// Always shows dark logos (optimized for light backgrounds)
```

### **3. Force Dark Theme**
```typescript
<CollegeLogo
  collegeName="Yale University"
  domain="yale.edu"
  size={64}
  theme="dark"
/>
// Always shows light logos (optimized for dark backgrounds)
```

### **4. Individual Logo Theme Toggle**
```typescript
<CollegeLogo
  collegeName="Princeton University"
  domain="princeton.edu"
  size={80}
  showThemeToggle={true}
  theme="auto"
/>
// Shows theme toggle button on each logo
```

## 🎯 **Theme Detection Logic**

### **System Preference Detection**
```typescript
// Automatically detects:
// - CSS dark mode classes (.dark)
// - System color scheme preference
// - Media query: (prefers-color-scheme: dark)
```

### **Theme Resolution Priority**
1. **Manual Selection**: User explicitly chooses light/dark
2. **System Preference**: Follows OS/browser theme setting
3. **Default Fallback**: Light mode if no preference detected

## 🔧 **API Integration**

### **Logo API Route**
```typescript
// GET /api/logo?name={college}&theme={theme}
// theme: 'auto' | 'light' | 'dark'

// Example:
GET /api/logo?name=Stanford+University&theme=dark&size=256
```

### **Cache Key Generation**
```typescript
// Cache includes theme for proper separation
const cacheKey = `college_logo_cache_${name}_${size}_${highQuality}_${theme}`;
```

### **Response Headers**
```typescript
// API returns theme information
'X-Theme': 'dark'
'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
```

## 🎨 **CSS Integration**

### **Dark Mode Classes**
```css
/* Automatically applied based on theme */
.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  /* ... other dark mode variables */
}
```

### **Theme Transitions**
```css
/* Smooth theme switching */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## 📱 **Responsive Design**

### **Mobile Optimization**
- Touch-friendly theme toggle buttons
- Responsive logo sizing
- Optimized for mobile themes

### **Accessibility Features**
- High contrast mode support
- Screen reader compatibility
- Keyboard navigation support

## 🚀 **Performance Features**

### **Caching Strategy**
- **Theme-Specific Caching**: Separate cache for each theme
- **7-Day Cache Duration**: Logos cached for a week
- **Automatic Cleanup**: Expired cache entries removed

### **Optimization**
- **Lazy Loading**: Logos load only when needed
- **Preloading**: Popular logos preloaded
- **Compression**: Optimized image delivery

## 🔍 **Debugging & Monitoring**

### **Console Logs**
```typescript
// Theme detection logs
[ThemeContext] Theme changed to: dark
[ThemeContext] Resolved theme: dark

// Logo loading logs  
[CollegeLogo] Using cached logo for Stanford University with theme dark
[CollegeLogo] Fetching logo from API: /api/logo?name=Stanford+University&theme=dark
```

### **Network Tab**
- Check `X-Theme` header in logo API responses
- Monitor cache hit/miss rates
- Verify theme parameter in requests

## 🎯 **Best Practices**

### **1. Use Auto Theme by Default**
```typescript
// Let users choose their preference
theme="auto"
```

### **2. Provide Theme Toggle**
```typescript
// Always include theme toggle in header
<ThemeToggle />
```

### **3. Test Both Themes**
```typescript
// Ensure logos work in both light and dark modes
// Test with showThemeToggle={true}
```

### **4. Monitor Performance**
```typescript
// Check cache hit rates
// Monitor API call frequency
// Verify theme switching speed
```

## 🔮 **Future Enhancements**

### **Planned Features**
- **Custom Theme Colors**: User-defined color schemes
- **Logo Previews**: Show logo in different themes before applying
- **Bulk Theme Switching**: Change all logos at once
- **Theme Presets**: Predefined theme combinations

### **Integration Ideas**
- **User Preferences**: Save theme preference per user
- **Time-Based Themes**: Auto-switch based on time of day
- **Location-Based Themes**: Different themes for different regions
- **Accessibility Themes**: High contrast and colorblind-friendly options

## 📚 **Resources**

- **Logo.dev Documentation**: [Theme Parameters](https://logo.dev/docs/themes)
- **Demo Page**: `/theme-demo` - Interactive theme testing
- **API Reference**: `/api/logo` - Logo API with theme support
- **Component Library**: `@/components/ui/theme-toggle` - Theme toggle component

---

**Note**: These features require Logo.dev's latest theme support. Ensure your API key has access to theme parameters for optimal functionality.
