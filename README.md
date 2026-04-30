# 🖥️ GitHMI

**Universal HMI runtime for GitPLC / GitSCADA**

ISA-101 compliant operator interface. Reads UDTs from GitPLC, tag values
from GitHub Issues, renders faceplates + navigation + alarms as a
GitHub Pages app.

## Structure

```
HMI/
├── pages/              GitHub Pages app (the runtime)
│   ├── ui/             ISA-101 dark theme + layout
│   ├── engine/         Tag binding, UDT resolver, alarm engine
│   ├── views/          Screen templates (overview, area, detail, alarms, trends)
│   ├── faceplates/     ISA-101 faceplates (motor, valve, PID, tank, alarm)
│   ├── loaders/        GitPLC repo scanner, issue tag reader
│   └── assets/         SVG symbols, P&ID elements, dynamic badges
├── index.html          Redirect → pages/
└── README.md
```

## How It Works

1. **Reads UDTs** from sibling GitPLC repo (`../PLC/`)
2. **Reads tag values** from GitHub Issues (`gitplc-config` label)
3. **Renders faceplates** per equipment type (motor → motor faceplate)
4. **Live polling** — re-fetches tag issues every 30s
5. **ISA-101 navigation** — area overview → equipment detail → faceplate
6. **Alarm banner** — ISA-18.2 priorities, acknowledgment via issue comment

## ISA-101 Compliance

- High-performance gray background (not black)
- Color reserved for abnormal states only
- Equipment faceplates: status, setpoint, feedback, alarm
- Navigation: area overview → detail → faceplate drill-down
- Alarm banner: priority-colored, sortable, acknowledgeable
