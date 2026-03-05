# Claude Build Directive

## Architecture: Kernel-First

All UI renders from FieldHockeyKernel structured data. NO hardcoded drills in UI components.

### Data Flow
```
kernel/taxonomy/taxonomy.json  -->  app/src/lib/kernel-data.ts  -->  UI Components
seed/curriculum/drills.json    -->  (typed imports)              -->  (render from data)
seed/curriculum/sessions.json  -->
seed/curriculum/programs.json  -->
```

### ONE-SHOT Rules
1. Every drill, session, and program is a kernel entity (JSON)
2. UI components read from kernel-data.ts — never define drill content inline
3. All generators (PDF, SVG, scripts) consume kernel types
4. Validator must pass before build: `node kernel/validators/validate.js`
5. New drills = add to seed/curriculum/drills.json, not to UI code
6. Taxonomy changes = update kernel/taxonomy/taxonomy.json

### Stack
- Next.js 14 (App Router, static export)
- TypeScript + Tailwind CSS
- jsPDF for client-side PDF generation
- SVG for field diagrams (React components)
- PWA: manifest.json + service worker
- Mobile: Capacitor config ready

### Build Commands
```bash
cd app && npm run build    # Static export to app/out/
node kernel/validators/validate.js  # Validate kernel data
```

### Generators
- **PDF**: Session plans, program workbooks, pocket practice cards (jsPDF)
- **SVG**: Field setup diagrams per drill (React SVG components)
- **YouTube Scripts**: Hook/demo/key-points/CTA format per drill
- **Storyboards**: Shot-by-shot outline per script
- **Pocket Cards**: Print-ready quick reference cards
