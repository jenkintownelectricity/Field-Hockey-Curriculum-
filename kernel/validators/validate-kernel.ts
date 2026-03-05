import fs from "node:fs";
import path from "node:path";
import { DrillSchema, LessonSchema, ProgramSchema } from "./zod";

type Result = { ok: boolean; errors: string[] };

function readJson(p: string) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
}

function validateAll(): Result {
    const errors: string[] = [];
    const base = path.join(process.cwd(), "seed", "curriculum");

    const drillsPath = path.join(base, "drills.derived.json");
    const lessonsPath = path.join(base, "lessons.derived.json");
    const programsPath = path.join(base, "programs.derived.json");

    if (!fs.existsSync(drillsPath)) errors.push(`Missing ${drillsPath}`);
    if (!fs.existsSync(lessonsPath)) errors.push(`Missing ${lessonsPath}`);
    if (!fs.existsSync(programsPath)) errors.push(`Missing ${programsPath}`);

    if (errors.length) return { ok: false, errors };

    const drills = readJson(drillsPath);
    const lessons = readJson(lessonsPath);
    const programs = readJson(programsPath);

    for (const d of drills) {
        const parsed = DrillSchema.safeParse(d);
        if (!parsed.success) errors.push(`Drill ${d?.slug ?? "unknown"} invalid: ${parsed.error.message}`);
        // fail-closed publishing requirements baked into schema (safetyNotes, atHomeVariants, diagramDsl, tags)
    }

    for (const l of lessons) {
        const parsed = LessonSchema.safeParse(l);
        if (!parsed.success) errors.push(`Lesson ${l?.slug ?? "unknown"} invalid: ${parsed.error.message}`);
    }

    for (const p of programs) {
        const parsed = ProgramSchema.safeParse(p);
        if (!parsed.success) errors.push(`Program ${p?.slug ?? "unknown"} invalid: ${parsed.error.message}`);
    }

    return { ok: errors.length === 0, errors };
}

const res = validateAll();
if (!res.ok) {
    console.error("Kernel validation FAILED:");
    for (const e of res.errors) console.error(" -", e);
    process.exit(1);
}
console.log("Kernel validation OK.");