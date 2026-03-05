# FieldHockeyKernel Diagram DSL (v0.1)

Goal: deterministic drill diagrams that render to SVG and print in a playbook style.

## Coordinate System
- Field is normalized to 0..100 (x) and 0..60 (y)
- Origin (0,0) is bottom-left when viewing the diagram.

## Primitives
### FIELD
Defines the canvas.
Example:
FIELD width=100 height=60

### CONE
CONE x=20 y=10 label="A"

### PLAYER
PLAYER x=30 y=20 label="P1" team="home|away"

### BALL
BALL x=25 y=18

### ARROW
ARROW from=(20,10) to=(40,20) style="solid|dashed" label="pass"

### ZONE
ZONE x=10 y=10 w=30 h=20 label="grid"

## Minimal Diagram Example
FIELD width=100 height=60
CONE x=20 y=10 label="Start"
PLAYER x=20 y=12 label="P1" team="home"
BALL x=20 y=11
ARROW from=(20,11) to=(40,20) style="solid" label="dribble"

## Rules (fail-closed)
- Every drill MUST include a diagramDsl string with at least FIELD + one primitive.
- Parser must reject unknown primitives and missing required params.