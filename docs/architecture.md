# Application Architecture

## Component Tree
- App Shell
  - Navigation
  - Content Area
    - Dashboard
    - Cases Module
    - Documents Module
    - Calendar Module
    - Messages Module

## Data Flow
User Action → Event Handler → State Update → localStorage Write → UI Re-render

## Module Communication
Modules communicate through a central AppState object...