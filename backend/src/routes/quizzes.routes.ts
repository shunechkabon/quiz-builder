import { Router } from "express";

export const quizzesRouter = Router();

let quizzes: any[] = [];

// GET /quizzes
quizzesRouter.get("/", (_req, res) => {
    res.json(
        quizzes.map((q) => ({
            id: q.id,
            title: q.title,
            questionCount: q.questions.length,
        }))
    );
});

// GET /quizzes/:id
quizzesRouter.get("/:id", (req, res) => {
    const quiz = quizzes.find((q) => q.id === req.params.id);

    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
});

// POST /quizzes
quizzesRouter.post("/", (req, res) => {
    const quiz = {
        id: crypto.randomUUID(),
        title: req.body.title,
        questions: req.body.questions ?? [],
    };

    quizzes.push(quiz);

    res.status(201).json({
        id: quiz.id,
        title: quiz.title,
        questionCount: quiz.questions.length,
    });
});

// DELETE /quizzes/:id
quizzesRouter.delete("/:id", (req, res) => {
    quizzes = quizzes.filter((q) => q.id !== req.params.id);
    res.status(204).send();
});
