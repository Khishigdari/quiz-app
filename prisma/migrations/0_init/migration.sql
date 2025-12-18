[dotenv@17.2.3] injecting env (4) from .env -- tip: ⚙️  override existing env vars with { override: true }
[dotenv@17.2.3] injecting env (4) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "summary" TEXT,
    "userid" INTEGER,
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
 
-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "question" TEXT,
    "options" TEXT[],
    "answer" TEXT,
    "articleid" INTEGER NOT NULL,
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);
 
-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "clerkid" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50),
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
 
-- CreateTable
CREATE TABLE "userscores" (
    "id" SERIAL NOT NULL,
    "quizid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "score" INTEGER,
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT "userscores_pkey" PRIMARY KEY ("id")
);
 
-- CreateTable
CREATE TABLE "students" (
    "name" VARCHAR(50) NOT NULL,
    "id" SERIAL NOT NULL,
    "age" INTEGER,
    "gender" VARCHAR(50),
 
    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);
 
-- CreateIndex
CREATE UNIQUE INDEX "users_clerkid_key" ON "users"("clerkid");
 
-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
 
-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_articleid_fkey" FOREIGN KEY ("articleid") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
-- AddForeignKey
ALTER TABLE "userscores" ADD CONSTRAINT "userscores_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
-- AddForeignKey
ALTER TABLE "userscores" ADD CONSTRAINT "userscores_userid_fkey" FOREIGN KEY ("userid") REFERENCES "quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;