#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function upsertSubject(name) {
  let s = await prisma.subject.findUnique({ where: { name } })
  if (!s) s = await prisma.subject.create({ data: { name } })
  return s
}

async function findOrCreateChapter(title, subjectId) {
  let c = await prisma.chapter.findFirst({ where: { title, subjectId } })
  if (!c) c = await prisma.chapter.create({ data: { title, subjectId } })
  return c
}

async function findOrCreateTopic(title, chapterId) {
  let t = await prisma.topic.findFirst({ where: { title, chapterId } })
  if (!t) t = await prisma.topic.create({ data: { title, chapterId } })
  return t
}

async function importFile(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs)
    process.exit(1)
  }

  const raw = fs.readFileSync(abs, 'utf8')
  const items = JSON.parse(raw)
  console.log(`Importing ${items.length} questions from ${abs}`)

  let created = 0
  for (const q of items) {
    const subject = await upsertSubject(q.subject || 'General')
    const chapter = q.chapter ? await findOrCreateChapter(q.chapter, subject.id) : null
    const topic = q.topic && chapter ? await findOrCreateTopic(q.topic, chapter.id) : null

    let question = null
    if (q.externalId) {
      question = await prisma.question.findUnique({ where: { externalId: q.externalId } })
    }

    if (!question) {
      question = await prisma.question.create({
        data: {
          externalId: q.externalId,
          text: q.text,
          difficulty: q.difficulty || null,
          explanation: q.explanation || null,
          topicId: topic ? topic.id : null,
        },
      })
      created++
    } else {
      // Optionally update text/difficulty
      await prisma.question.update({ where: { id: question.id }, data: { text: q.text, difficulty: q.difficulty || null, explanation: q.explanation || null } })
    }

    // Choices: delete existing and recreate to ensure correctness
    if (q.choices && Array.isArray(q.choices)) {
      await prisma.choice.deleteMany({ where: { questionId: question.id } })
      for (const c of q.choices) {
        await prisma.choice.create({ data: { text: c.text, isCorrect: !!c.isCorrect, questionId: question.id } })
      }
    }
  }

  console.log(`Import complete. Created ${created} new questions.`)
}

const fileArg = process.argv[2] || 'data/sample_questions.json'

importFile(fileArg)
  .catch((e) => {
    console.error(e)
  })
  .finally(() => prisma.$disconnect())
