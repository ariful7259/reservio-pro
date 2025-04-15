
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EyeDropper, Check } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

// সাধারণ কালার প্যালেট
const DEFAULT_COLORS = [
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', 
  '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#000000',
  '#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', 
  '#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d',
  '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309',
  '#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [inputColor, setInputColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputColor(color);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  const handleSubmit = () => {
    onChange(inputColor);
    setIsOpen(false);
  };

  const handleColorSelect = (selectedColor: string) => {
    setInputColor(selectedColor);
    onChange(selectedColor);
  };

  // হেক্স কালার কোড ভ্যালিডেশন
  const isValidHex = (hex: string) => {
    return /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 h-10"
          onClick={() => setIsOpen(true)}
        >
          <div 
            className="h-5 w-5 rounded border"
            style={{ backgroundColor: color }}
            ref={colorRef}
          />
          <span>{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex gap-2">
              <Input 
                value={inputColor} 
                onChange={handleColorChange}
                className={!isValidHex(inputColor) ? 'border-red-500' : ''}
              />
              <Button 
                size="icon" 
                variant="outline"
                onClick={handleSubmit}
                disabled={!isValidHex(inputColor)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
            {!isValidHex(inputColor) && (
              <p className="text-xs text-red-500">অবৈধ হেক্স কালার কোড</p>
            )}
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {DEFAULT_COLORS.map((colorValue, index) => (
              <button
                key={index}
                className={`h-6 w-6 rounded-md border ${colorValue === inputColor ? 'ring-2 ring-primary' : ''}`}
                style={{ backgroundColor: colorValue }}
                onClick={() => handleColorSelect(colorValue)}
              />
            ))}
          </div>
          
          <div 
            className="h-20 rounded-md border"
            style={{ 
              backgroundColor: isValidHex(inputColor) ? inputColor : '#ffffff',
              backgroundImage: !isValidHex(inputColor) ? 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px)' : 'none'
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
