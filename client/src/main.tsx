import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import "./App.css";
import { AppInitializer } from './lib/AppInitializer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppInitializer>
      <Routes />
    </AppInitializer>
  </StrictMode>,
)
