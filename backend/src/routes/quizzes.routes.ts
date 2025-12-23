import { Router } from "express";
import { prisma } from "../prisma";

export const quizzesRouter = Router();

// GET /quizzes 
quizzesRouter.get("/", async (_req, res) => {
    const quizzes = await prisma.quiz.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            _count: { select: { questions: true } },
        },
    });

    res.json(
        quizzes.map((q) => ({
            id: q.id,
            title: q.title,
            questionCount: q._count.questions,
        }))
    );
});

// GET /quizzes/:id 
quizzesRouter.get("/:id", async (req, res) => {
    const quiz = await prisma.quiz.findUnique({
        where: { id: req.params.id },
        include: {
            questions: {
                include: { options: true },
            },
        },
    });

    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
});

// POST /quizzes 
quizzesRouter.post("/", async (req, res) => {
    const { title, questions } = req.body as {
        title?: string;
        questions?: any[];
    };

    if (!title || typeof title !== "string") {
        return res.status(400).json({ message: "Title is required" });
    }

    const created = await prisma.quiz.create({
        data: {
            title,
            questions: {
                create: (questions ?? []).map((q) => ({
                    text: q.text,
                    type: q.type,
                    booleanAnswer: q.booleanAnswer ?? null,
                    textAnswer: q.textAnswer ?? null,
                    options: {
                        create: (q.options ?? []).map((o: any) => ({
                            text: o.text,
                            isCorrect: Boolean(o.isCorrect),
                        })),
                    },
                })),
            },
        },
        select: {
            id: true,
            title: true,
            _count: { select: { questions: true } },
        },
    });

    res.status(201).json({
        id: created.id,
        title: created.title,
        questionCount: created._count.questions,
    });
});

// DELETE /quizzes/:id 
quizzesRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const quiz = await prisma.quiz.findUnique({ where: { id } });
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    await prisma.quiz.delete({ where: { id } });
    res.status(204).send();
});
