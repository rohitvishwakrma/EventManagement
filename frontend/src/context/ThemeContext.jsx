import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Theme state with primary color support
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    const saved = localStorage.getItem('primaryColor');
    return saved || '#2563eb'; // Default primary blue from your screenshots
  });

  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem('accentColor');
    return saved || '#059669'; // Default accent green
  });

  // Apply theme changes to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Apply primary color to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  // Apply accent color to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', accentColor);
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  // Theme colors based on mode
  const themeColors = useMemo(() => ({
    background: isDarkMode ? '#1f2937' : '#f3f4f6',
    surface: isDarkMode ? '#374151' : '#ffffff',
    text: isDarkMode ? '#f9fafb' : '#111827',
    textSecondary: isDarkMode ? '#9ca3af' : '#6b7280',
    border: isDarkMode ? '#4b5563' : '#e5e7eb',
    primary: primaryColor,
    accent: accentColor,
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  }), [isDarkMode, primaryColor, accentColor]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Set custom primary color
  const setThemePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  // Set custom accent color
  const setThemeAccentColor = (color) => {
    setAccentColor(color);
  };

  // Reset to default colors
  const resetThemeColors = () => {
    setPrimaryColor('#2563eb');
    setAccentColor('#059669');
  };

  // Get CSS variables as object
  const getCSSVariables = useMemo(() => ({
    '--bg-primary': themeColors.background,
    '--bg-secondary': themeColors.surface,
    '--text-primary': themeColors.text,
    '--text-secondary': themeColors.textSecondary,
    '--border-color': themeColors.border,
    '--primary-color': themeColors.primary,
    '--accent-color': themeColors.accent,
    '--success-color': themeColors.success,
    '--warning-color': themeColors.warning,
    '--error-color': themeColors.error,
    '--info-color': themeColors.info,
  }), [themeColors]);

  // Get color shades (for gradients, hover effects)
  const getColorShades = useMemo(() => {
    // This is a simplified version - in production you might want a proper color manipulation library
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgb = hexToRgb(primaryColor);
    
    return {
      light: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` : 'rgba(37, 99, 235, 0.1)',
      lighter: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)` : 'rgba(37, 99, 235, 0.05)',
      dark: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)` : 'rgba(37, 99, 235, 0.8)',
      darker: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)` : 'rgba(37, 99, 235, 0.9)',
    };
  }, [primaryColor]);

  // Apply theme to match your screenshots
  const value = {
    // State
    isDarkMode,
    primaryColor,
    accentColor,
    
    // Theme data
    colors: themeColors,
    shades: getColorShades,
    cssVariables: getCSSVariables,
    
    // Actions
    toggleTheme,
    setPrimaryColor: setThemePrimaryColor,
    setAccentColor: setThemeAccentColor,
    resetThemeColors,
    
    // Utility functions
    getColor: (colorName) => themeColors[colorName] || colorName,
    isDark: isDarkMode,
    isLight: !isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {/* Apply CSS variables to root */}
      <div style={getCSSVariables}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook for theme-aware styling
export const useThemeStyles = () => {
  const { colors, isDarkMode } = useTheme();

  const getClassName = (baseClass, darkClass = '') => {
    return isDarkMode ? `${baseClass} ${darkClass}` : baseClass;
  };

  const getStyle = (lightStyle, darkStyle) => {
    return isDarkMode ? darkStyle : lightStyle;
  };

  return {
    getClassName,
    getStyle,
    colors,
    isDarkMode
  };
};