export const getThemeStyles = (theme) => {
  const themes = {
    modern: {
      container: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff'
      }
    },
    minimalist: {
      container: {
        background: '#fafafa',
        color: '#1a202c'
      }
    },
    dark: {
      container: {
        background: '#1a1a1a',
        color: '#e0e0e0'
      }
    },
    colorful: {
      container: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: '#ffffff'
      }
    }
  };

  return themes[theme] || themes.modern;
};

export const themes = {
  modern: {
    name: 'Modern',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    text: '#ffffff',
    accent: '#a78bfa'
  },
  minimalist: {
    name: 'Minimalist',
    background: '#fafafa',
    text: '#1a202c',
    accent: '#3182ce'
  },
  dark: {
    name: 'Dark',
    background: '#1a1a1a',
    text: '#e0e0e0',
    accent: '#00d4ff'
  },
  colorful: {
    name: 'Colorful',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    text: '#ffffff',
    accent: '#fbbf24'
  }
};
