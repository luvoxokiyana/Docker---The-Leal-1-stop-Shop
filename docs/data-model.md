# Data Models

## User Object
- id: string
- email: string
- passwordHash: string (simulated)
- role: "lawyer" | "paralegal" | "admin"
- name: string
- barNumber: string (optional)

## Case Object
- id: string
- caseNumber: string
- clientName: string
- type: "civil" | "criminal" | "family" | "corporate"
...