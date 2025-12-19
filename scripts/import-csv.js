#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function parseCSV(content) {
  const rows = []
  let cur = ''
  let row = []
  let inQuotes = false
  for (let i = 0; i < content.length; i++) {
    const ch = content[i]
    if (ch === '"') {
      if (inQuotes && content[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      row.push(cur)
      cur = ''
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (cur !== '' || row.length > 0) {
        row.push(cur)
        rows.push(row)
        row = []
        cur = ''
      }
      if (ch === '\r' && content[i + 1] === '\n') i++
    } else {
      cur += ch
    }
  }
  if (cur !== '' || row.length > 0) {
    row.push(cur)
    rows.push(row)
  }
  return rows
}

function mapDifficulty(level) {
  if (!level) return null
  const s = level.toLowerCase()
  if (s.includes('easy')) return 1
  if (s.includes('medium')) return 3
  if (s.includes('hard')) return 5
  const n = parseInt(level)
  return isNaN(n) ? null : n
}

async function importCSV(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs)
    process.exit(1)
  }
  const raw = fs.readFileSync(abs, 'utf8')
  const rows = parseCSV(raw)
  if (!rows || rows.length < 2) {
    console.error('No data found in CSV')
    process.exit(1)
  }

  const header = rows[0].map(h => h.trim())
  const dataRows = rows.slice(1).filter(r => r.length >= header.length)

  console.log(`Parsed ${dataRows.length} rows`)

  let created = 0
  for (const cols of dataRows) {
    const obj = {}
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = (cols[i] || '').trim()
    }

    const subjectName = obj['Subject'] || 'General'
    const chapterTitle = obj['Topic'] || obj['Chapter'] || 'General'
    const topicTitle = obj['Topic'] || null
    const text = obj['Question'] || obj['Question ' ] || ''

    const choices = []
    const optionCols = ['Option_A','Option_B','Option_C','Option_D']
    for (const oc of optionCols) {
      if (obj[oc] && obj[oc].length) choices.push({ text: obj[oc] })
    }

    const correctLetter = (obj['Correct_Answer'] || obj['Correct Answer'] || '').trim()
    let correctIndex = -1
    if (correctLetter) {
      const map = { 'A':0,'B':1,'C':2,'D':3 }
      correctIndex = map[correctLetter.toUpperCase()] ?? -1
    }

    const difficulty = mapDifficulty(obj['Difficulty_Level'] || obj['Difficulty'] || obj['Difficulty Level'])

    let subject = await prisma.subject.findUnique({ where: { name: subjectName } })
    if (!subject) subject = await prisma.subject.create({ data: { name: subjectName } })

    let chapter = await prisma.chapter.findFirst({ where: { title: chapterTitle, subjectId: subject.id } })
    if (!chapter) chapter = await prisma.chapter.create({ data: { title: chapterTitle, subjectId: subject.id } })

    let topic = null
    if (topicTitle) {
      topic = await prisma.topic.findFirst({ where: { title: topicTitle, chapterId: chapter.id } })
      if (!topic) topic = await prisma.topic.create({ data: { title: topicTitle, chapterId: chapter.id } })
    }

    const question = await prisma.question.create({ data: {
      externalId: null,
      text: text,
      difficulty: difficulty,
      explanation: null,
      topicId: topic ? topic.id : null,
    }})

    for (let i = 0; i < choices.length; i++) {
      const isCorrect = (i === correctIndex)
      await prisma.choice.create({ data: { text: choices[i].text, isCorrect, questionId: question.id } })
    }

    created++
  }

  console.log(`Imported ${created} questions from CSV`)
}

const fileArg = process.argv[2] || 'class10_quiz .csv'

importCSV(fileArg)
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
