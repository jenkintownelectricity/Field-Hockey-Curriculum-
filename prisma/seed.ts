import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { PrismaClient } from "@prisma/client";
const KERNEL_SCHEMA_VERSION = "0.1.0" as const;

const prisma = new PrismaClient();

function loadYaml<T>(file: string): T {
    const p = path.join(process.cwd(), "kernel", "taxonomy", file);
    const raw = fs.readFileSync(p, "utf8");
    return yaml.load(raw) as T;
}

async function upsertKernelMeta() {
    await prisma.kernelMeta.upsert({
        where: { id: "kernel" },
        update: { schemaVer: KERNEL_SCHEMA_VERSION },
        create: { id: "kernel", schemaVer: KERNEL_SCHEMA_VERSION }
    });
}

async function seedTaxonomy() {
    const materials = loadYaml<any[]>("materials.yml");
    const surfaces = loadYaml<any[]>("surfaces.yml");
    const skills = loadYaml<any[]>("skills.yml");
    const emotions = loadYaml<any[]>("emotions.yml");
    const pedagogy = loadYaml<any[]>("pedagogy.yml");
    const environments = loadYaml<any[]>("environments.yml");
    const constraints = loadYaml<any[]>("constraints.yml");

    // Materials
    for (const m of materials) {
        await prisma.material.upsert({
            where: { slug: m.slug },
            update: {
                name: m.name,
                type: m.type,
                durability: m.durability ?? null,
                grip: m.grip ?? null,
                bounce: m.bounce ?? null,
                abrasion: m.abrasion ?? null,
                wetBehavior: m.wet_behavior ?? null,
                usageContext: m.usage_context ?? null
            },
            create: {
                slug: m.slug,
                name: m.name,
                type: m.type,
                durability: m.durability ?? null,
                grip: m.grip ?? null,
                bounce: m.bounce ?? null,
                abrasion: m.abrasion ?? null,
                wetBehavior: m.wet_behavior ?? null,
                usageContext: m.usage_context ?? null
            }
        });
    }

    // Surfaces + surface-material links
    for (const s of surfaces) {
        const surface = await prisma.surface.upsert({
            where: { slug: s.slug },
            update: {
                name: s.name,
                category: s.category,
                frictionEstimate: s.friction_estimate ?? null,
                ballBehaviorNotes: s.ball_behavior_notes ?? null,
                footwearGuidance: s.footwear_guidance ?? null,
                safetyNotes: s.safety_notes ?? null
            },
            create: {
                slug: s.slug,
                name: s.name,
                category: s.category,
                frictionEstimate: s.friction_estimate ?? null,
                ballBehaviorNotes: s.ball_behavior_notes ?? null,
                footwearGuidance: s.footwear_guidance ?? null,
                safetyNotes: s.safety_notes ?? null
            }
        });

        const materialSlugs: string[] = s.materials ?? [];
        for (const ms of materialSlugs) {
            const material = await prisma.material.findUnique({ where: { slug: ms } });
            if (!material) continue;
            await prisma.surfaceMaterial.upsert({
                where: { surfaceId_materialId: { surfaceId: surface.id, materialId: material.id } },
                update: {},
                create: { surfaceId: surface.id, materialId: material.id }
            });
        }
    }

    // Skills
    for (const sk of skills) {
        await prisma.skill.upsert({
            where: { slug: sk.slug },
            update: {
                name: sk.name,
                coachingCues: sk.coaching_cues ?? null,
                commonMistakes: sk.common_mistakes ?? null
            },
            create: {
                slug: sk.slug,
                name: sk.name,
                coachingCues: sk.coaching_cues ?? null,
                commonMistakes: sk.common_mistakes ?? null
            }
        });
    }

    // Emotion tags
    for (const e of emotions) {
        await prisma.emotionTag.upsert({
            where: { slug: e.slug },
            update: { name: e.name },
            create: { slug: e.slug, name: e.name }
        });
    }

    // Pedagogy tags
    for (const p of pedagogy) {
        await prisma.pedagogyTag.upsert({
            where: { slug: p.slug },
            update: { name: p.name },
            create: { slug: p.slug, name: p.name }
        });
    }

    // Environments/constraints are taxonomy-only right now (files are source of truth).
    // They’ll be used by app filters + derived drill variants. No DB table needed yet.
    void environments;
    void constraints;
}

async function main() {
    await upsertKernelMeta();
    await seedTaxonomy();
    console.log("Seeded taxonomy + kernel meta.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
