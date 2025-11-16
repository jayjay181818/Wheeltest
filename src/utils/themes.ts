import type { Theme } from '../types';

export const themes: Record<string, Theme> = {
  warm: {
    id: 'warm',
    name: 'Warm Theme',
    colors: ['#FF6E6E', '#FFC93C', '#FF9A3C', '#FF7C7C', '#FFB347', '#FF8066'],
    background: 'linear-gradient(135deg, #1E3D59 0%, #2B4F71 100%)',
    primaryColor: '#FF6E6E',
    secondaryColor: '#FFC93C',
    accentColor: '#FF9A3C',
    textPrimary: '#FFFFFF',
    textSecondary: '#F4DCCC'
  },
  vibrant: {
    id: 'vibrant',
    name: 'Vibrant Theme', 
    colors: ['#4CAF50', '#E91E63', '#FFC107', '#2196F3', '#9C27B0', '#FF5722'],
    background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
    primaryColor: '#E91E63',
    secondaryColor: '#4CAF50',
    accentColor: '#FFC107',
    textPrimary: '#F8F9FF',
    textSecondary: '#C9CDE4'
  },
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Theme',
    colors: ['#6C63FF', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    background: 'linear-gradient(135deg, #2C3E50 0%, #4A6741 100%)',
    primaryColor: '#6C63FF',
    secondaryColor: '#4ECDC4',
    accentColor: '#FFEAA7',
    textPrimary: '#EEF2FF',
    textSecondary: '#C0D1FF'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Theme',
    colors: ['#FF9A9E', '#FAD0C4', '#FECFEF', '#F6D365', '#FDA085', '#F093FB'],
    background: 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%)',
    primaryColor: '#FF9A9E',
    secondaryColor: '#FECFEF',
    accentColor: '#FDA085',
    textPrimary: '#FFFFFF',
    textSecondary: '#FBE2FF'
  }
};
