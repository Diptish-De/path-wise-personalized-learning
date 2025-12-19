This document explains how to set up a MongoDB database with Prisma and import question data into it.

1) Install dependencies

Using npm:

```powershell
npm install prisma @prisma/client
npx prisma generate
```

2) Configure database (MongoDB)

You can use a local MongoDB instance or MongoDB Atlas. For a local instance we provide a docker-compose snippet below.

Create a `.env` file in the project root with your MongoDB connection string, for example:

```
DATABASE_URL="mongodb://localhost:27017/pathwise"
```

3) Run a local MongoDB via Docker (optional)

Create `docker-compose.yml` with the following content and run `docker compose up -d`:

```yaml
version: '3.8'
services:
  mongo:
    image: mongo:6
    restart: always
    ports:
      - 27017:27017
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

4) Push Prisma schema to MongoDB

Generate the client and push the Prisma schema to your MongoDB database:

```powershell
npx prisma generate
npx prisma db push
```

Prisma will create the collections according to `prisma/schema.prisma`.

5) Import questions

To import CSV data (your file `class10_quiz.csv` is included in the project root) run:

```powershell
# If the filename has a space, quote it
node scripts/import-csv.js "class10_quiz.csv"
```

Or, if you prefer working with JSON datasets, use:

```powershell
node scripts/import-questions.js data/sample_questions.json
```

6) Verify

Quick CLI check using Prisma Client:

```powershell
node -e "const {PrismaClient}=require('@prisma/client');(async()=>{const p=new PrismaClient();console.log('Subjects:',await p.subject.count());console.log('Chapters:',await p.chapter.count());console.log('Questions:',await p.question.count());console.log('Choices:',await p.choice.count());await p.$disconnect();})()"
```

7) Notes

- Prisma's MongoDB connector uses `ObjectId` under the hood. The `prisma/schema.prisma` in this project has been converted to use `String` ids with `@db.ObjectId` and relations are stored as ObjectId strings.
- For production we recommend using a managed MongoDB (MongoDB Atlas) or a robust self-hosted setup.
- If you want, I can also add a `docker-compose` service for the app and a one-command script to run the import with the DB automatically.

If you'd like me to run the import for you in this workspace, I can attempt to:
- create a `.env` with a local MongoDB URL (requires Docker to run locally),
- run `docker compose up -d` to start MongoDB,
- run `npx prisma generate && npx prisma db push`, and
- run `node scripts/import-csv.js "class10_quiz.csv"` and report the results.
