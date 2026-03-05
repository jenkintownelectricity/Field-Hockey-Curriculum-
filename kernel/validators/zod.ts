import { z } from "zod";

export const DrillSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    durationDefaultS: z.number().int().positive(),
    playerMin: z.number().int().positive(),
    playerMax: z.number().int().positive(),
    spaceRequired: z.string().min(1),
    intensity: z.number().int().min(1).max(5),
    learningMode: z.string().min(1),
    steps: z.array(z.object({ title: z.string().min(1), detail: z.string().min(1) })).min(1),
    safetyNotes: z.string().min(10),
    atHomeVariants: z.array(z.object({ title: z.string().min(1), steps: z.array(z.string().min(1)).min(1) })).min(1),
    skillSlugs: z.array(z.string().min(1)).min(1),
    equipmentSlugs: z.array(z.string().min(1)).min(1),
    surfaceSlugs: z.array(z.string().min(1)).min(1),
    emotionSlugs: z.array(z.string().min(1)).min(1),
    pedagogySlugs: z.array(z.string().min(1)).min(1),
    diagramDsl: z.string().min(5)
});

export const LessonSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    hydration: z.array(z.object({ atMin: z.number().int().min(0), message: z.string().min(1) })).default([]),
    blocks: z.array(z.object({
        drillSlug: z.string().min(1),
        orderNo: z.number().int().min(1),
        durationS: z.number().int().positive()
    })).min(1)
});

export const ProgramSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    schedule: z.object({
        type: z.enum(["camp_2day", "development_6week"]),
        weeks: z.number().int().min(1).optional()
    }),
    lessonSlugsInOrder: z.array(z.string().min(1)).min(1)
});