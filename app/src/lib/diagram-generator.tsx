// SVG Field Diagram Generator
// Renders field hockey drill setups as SVG diagrams

import React from 'react';

interface Player {
  x: number;
  y: number;
  label?: string;
  team?: 'attack' | 'defense' | 'neutral';
}

interface Cone {
  x: number;
  y: number;
}

interface Arrow {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  color?: string;
}

interface Ball {
  x: number;
  y: number;
}

interface DiagramConfig {
  width?: number;
  height?: number;
  showGoal?: boolean;
  showCircle?: boolean;
  halfField?: boolean;
  players?: Player[];
  cones?: Cone[];
  arrows?: Arrow[];
  balls?: Ball[];
  title?: string;
}

const FIELD_GREEN = '#2d8a4e';
const LINE_WHITE = '#ffffff';
const ATTACK_COLOR = '#3b82f6';
const DEFENSE_COLOR = '#ef4444';
const CONE_COLOR = '#f59e0b';
const BALL_COLOR = '#ffffff';

export function FieldDiagram({ config }: { config: DiagramConfig }) {
  const w = config.width || 400;
  const h = config.height || 300;
  const pad = 20;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Field background */}
      <rect x={pad} y={pad} width={w - pad * 2} height={h - pad * 2} fill={FIELD_GREEN} rx={4} />

      {/* Field border */}
      <rect x={pad} y={pad} width={w - pad * 2} height={h - pad * 2} fill="none" stroke={LINE_WHITE} strokeWidth={2} rx={4} />

      {/* Center line */}
      {!config.halfField && (
        <line x1={w / 2} y1={pad} x2={w / 2} y2={h - pad} stroke={LINE_WHITE} strokeWidth={1} strokeDasharray="4,4" />
      )}

      {/* Shooting circle */}
      {config.showCircle && (
        <path
          d={`M ${w - pad - 80} ${h / 2 - 60} A 60 60 0 0 1 ${w - pad - 80} ${h / 2 + 60}`}
          fill="none" stroke={LINE_WHITE} strokeWidth={1.5}
        />
      )}

      {/* Goal */}
      {config.showGoal && (
        <rect x={w - pad - 4} y={h / 2 - 20} width={4} height={40} fill={LINE_WHITE} rx={1} />
      )}

      {/* Arrows (movement/pass lines) */}
      <defs>
        <marker id="arrowHead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={LINE_WHITE} />
        </marker>
        <marker id="arrowHeadBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={ATTACK_COLOR} />
        </marker>
        <marker id="arrowHeadRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={DEFENSE_COLOR} />
        </marker>
      </defs>

      {config.arrows?.map((arrow, i) => (
        <line
          key={`arrow-${i}`}
          x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2}
          stroke={arrow.color || LINE_WHITE}
          strokeWidth={1.5}
          strokeDasharray={arrow.dashed ? '6,3' : undefined}
          markerEnd={`url(#arrowHead${arrow.color === ATTACK_COLOR ? 'Blue' : arrow.color === DEFENSE_COLOR ? 'Red' : ''})`}
        />
      ))}

      {/* Cones */}
      {config.cones?.map((cone, i) => (
        <g key={`cone-${i}`}>
          <polygon
            points={`${cone.x},${cone.y - 6} ${cone.x - 5},${cone.y + 4} ${cone.x + 5},${cone.y + 4}`}
            fill={CONE_COLOR} stroke="#d97706" strokeWidth={1}
          />
        </g>
      ))}

      {/* Players */}
      {config.players?.map((player, i) => (
        <g key={`player-${i}`}>
          <circle
            cx={player.x} cy={player.y} r={10}
            fill={player.team === 'defense' ? DEFENSE_COLOR : player.team === 'attack' ? ATTACK_COLOR : '#6b7280'}
            stroke={LINE_WHITE} strokeWidth={1.5}
          />
          {player.label && (
            <text x={player.x} y={player.y + 4} textAnchor="middle" fill={LINE_WHITE} fontSize={10} fontWeight="bold">
              {player.label}
            </text>
          )}
        </g>
      ))}

      {/* Balls */}
      {config.balls?.map((ball, i) => (
        <circle key={`ball-${i}`} cx={ball.x} cy={ball.y} r={5} fill={BALL_COLOR} stroke="#333" strokeWidth={1} />
      ))}

      {/* Title */}
      {config.title && (
        <text x={w / 2} y={14} textAnchor="middle" fill="#374151" fontSize={12} fontWeight="bold">
          {config.title}
        </text>
      )}
    </svg>
  );
}

// Pre-built diagram configs for seed drills
export const drillDiagrams: Record<string, DiagramConfig> = {
  drill_indian_dribble: {
    title: 'Indian Dribble Relay',
    showGoal: false,
    cones: [
      { x: 100, y: 150 }, { x: 140, y: 150 }, { x: 180, y: 150 },
      { x: 220, y: 150 }, { x: 260, y: 150 }, { x: 300, y: 150 },
    ],
    players: [{ x: 60, y: 150, label: 'P', team: 'attack' }],
    arrows: [
      { x1: 75, y1: 150, x2: 95, y2: 145, color: ATTACK_COLOR },
      { x1: 105, y1: 145, x2: 135, y2: 155, dashed: true, color: ATTACK_COLOR },
      { x1: 145, y1: 155, x2: 175, y2: 145, dashed: true, color: ATTACK_COLOR },
    ],
  },
  drill_push_pass_pairs: {
    title: 'Push Pass Pairs',
    players: [
      { x: 100, y: 150, label: 'A', team: 'attack' },
      { x: 300, y: 150, label: 'B', team: 'attack' },
    ],
    cones: [{ x: 200, y: 150 }],
    arrows: [
      { x1: 115, y1: 148, x2: 190, y2: 148, color: ATTACK_COLOR },
      { x1: 285, y1: 152, x2: 210, y2: 152, color: ATTACK_COLOR },
    ],
    balls: [{ x: 115, y: 150 }],
  },
  drill_trap_and_turn: {
    title: 'Trap and Turn',
    width: 400,
    height: 300,
    players: [
      { x: 100, y: 150, label: 'A', team: 'attack' },
      { x: 300, y: 150, label: 'B', team: 'attack' },
    ],
    arrows: [
      { x1: 115, y1: 148, x2: 280, y2: 148, color: ATTACK_COLOR },
      { x1: 300, y1: 135, x2: 300, y2: 100, dashed: true, color: ATTACK_COLOR },
      { x1: 300, y1: 100, x2: 340, y2: 80, color: ATTACK_COLOR },
    ],
    balls: [{ x: 115, y: 150 }],
    cones: [
      { x: 80, y: 120 }, { x: 80, y: 180 }, { x: 320, y: 120 }, { x: 320, y: 180 },
    ],
  },
  drill_circle_shooting: {
    title: 'Circle Entry & Shoot',
    showGoal: true,
    showCircle: true,
    players: [
      { x: 200, y: 80, label: 'F', team: 'neutral' },
      { x: 120, y: 130, label: 'F', team: 'neutral' },
      { x: 280, y: 130, label: 'F', team: 'neutral' },
      { x: 260, y: 200, label: 'S', team: 'attack' },
    ],
    arrows: [
      { x1: 210, y1: 88, x2: 260, y2: 185, dashed: true, color: LINE_WHITE },
      { x1: 270, y1: 200, x2: 360, y2: 150, color: ATTACK_COLOR },
    ],
    balls: [{ x: 200, y: 75 }],
  },
  drill_jab_tackle: {
    title: 'Jab & Block Tackle',
    cones: [
      { x: 90, y: 100 }, { x: 90, y: 200 },
      { x: 310, y: 100 }, { x: 310, y: 200 },
    ],
    players: [
      { x: 130, y: 150, label: 'A', team: 'attack' },
      { x: 250, y: 150, label: 'D', team: 'defense' },
    ],
    arrows: [{ x1: 145, y1: 150, x2: 235, y2: 150, color: ATTACK_COLOR }],
    balls: [{ x: 140, y: 145 }],
  },
  drill_3v2_overload: {
    title: '3v2 Overload Attack',
    showGoal: true,
    showCircle: true,
    players: [
      { x: 120, y: 100, label: 'A', team: 'attack' },
      { x: 200, y: 80, label: 'A', team: 'attack' },
      { x: 280, y: 100, label: 'A', team: 'attack' },
      { x: 250, y: 170, label: 'D', team: 'defense' },
      { x: 310, y: 140, label: 'D', team: 'defense' },
    ],
    arrows: [
      { x1: 210, y1: 85, x2: 270, y2: 98, dashed: true, color: ATTACK_COLOR },
      { x1: 280, y1: 110, x2: 340, y2: 150, color: ATTACK_COLOR },
    ],
    balls: [{ x: 200, y: 75 }],
  },
  drill_lead_receive: {
    title: 'Lead and Receive Square',
    cones: [
      { x: 100, y: 80 }, { x: 300, y: 80 },
      { x: 300, y: 220 }, { x: 100, y: 220 },
    ],
    players: [
      { x: 100, y: 80, label: '1', team: 'attack' },
      { x: 300, y: 80, label: '2', team: 'attack' },
      { x: 300, y: 220, label: '3', team: 'attack' },
      { x: 100, y: 220, label: '4', team: 'attack' },
    ],
    arrows: [
      { x1: 115, y1: 80, x2: 280, y2: 80, color: ATTACK_COLOR },
      { x1: 300, y1: 95, x2: 300, y2: 200, color: ATTACK_COLOR },
      { x1: 285, y1: 220, x2: 120, y2: 220, color: ATTACK_COLOR },
      { x1: 100, y1: 205, x2: 100, y2: 100, color: ATTACK_COLOR },
    ],
    balls: [{ x: 105, y: 75 }, { x: 305, y: 215 }],
  },
  drill_cone_slalom: {
    title: 'Cone Slalom Speed Dribble',
    cones: [
      { x: 80, y: 120 }, { x: 120, y: 180 }, { x: 160, y: 120 }, { x: 200, y: 180 },
      { x: 240, y: 120 }, { x: 280, y: 180 }, { x: 320, y: 120 }, { x: 360, y: 180 },
    ],
    players: [{ x: 45, y: 150, label: 'P', team: 'attack' }],
    arrows: [
      { x1: 58, y1: 145, x2: 75, y2: 125, dashed: true, color: ATTACK_COLOR },
    ],
  },
  drill_freeze_tag_hockey: {
    title: 'Hockey Freeze Tag',
    width: 400,
    height: 300,
    cones: [
      { x: 40, y: 40 }, { x: 360, y: 40 }, { x: 40, y: 260 }, { x: 360, y: 260 },
    ],
    players: [
      { x: 100, y: 100, label: 'P', team: 'attack' },
      { x: 250, y: 80, label: 'P', team: 'attack' },
      { x: 150, y: 200, label: 'P', team: 'attack' },
      { x: 300, y: 220, label: 'P', team: 'attack' },
      { x: 200, y: 150, label: 'T', team: 'defense' },
      { x: 320, y: 130, label: 'T', team: 'defense' },
    ],
    arrows: [
      { x1: 210, y1: 148, x2: 240, y2: 85, color: DEFENSE_COLOR },
      { x1: 310, y1: 135, x2: 260, y2: 210, color: DEFENSE_COLOR },
    ],
  },
};
