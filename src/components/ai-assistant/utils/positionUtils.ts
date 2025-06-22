
export const calculatePanelPosition = (
  iconPosition: { x: number; y: number }
) => {
  const panelWidth = 384; // w-96 = 384px
  const panelHeight = 600;
  const margin = 20;
  
  let panelX = iconPosition.x;
  let panelY = iconPosition.y;
  
  // Adjust horizontal position if panel would go off screen
  if (typeof window !== 'undefined') {
    if (iconPosition.x + panelWidth > window.innerWidth) {
      panelX = iconPosition.x - panelWidth - 70; // Move to left of icon
    } else {
      panelX = iconPosition.x + 70; // Move to right of icon
    }
    
    // Adjust vertical position if panel would go off screen
    if (iconPosition.y + panelHeight > window.innerHeight) {
      panelY = window.innerHeight - panelHeight - margin;
    }
    
    if (panelY < margin) {
      panelY = margin;
    }
  }
  
  return { x: panelX, y: panelY };
};

export const getInitialPosition = () => ({
  x: typeof window !== 'undefined' ? window.innerWidth - 80 : 300,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 - 50 : 100
});
