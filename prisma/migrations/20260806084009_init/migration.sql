-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "secondaryPhone" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "portfolio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ResumeBase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateId" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "professionalProfile" TEXT,
    "salaryAspiration" INTEGER NOT NULL,
    "salaryCurrency" TEXT NOT NULL,
    CONSTRAINT "ResumeBase_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "academy" TEXT NOT NULL,
    "linkCredential" TEXT,
    "startDate" DATETIME NOT NULL,
    "finishDate" DATETIME,
    "isCurrent" BOOLEAN NOT NULL,
    CONSTRAINT "Education_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ResumeBaseSkill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "level" TEXT,
    "yearsExperience" INTEGER,
    "evidence" TEXT,
    CONSTRAINT "ResumeBaseSkill_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResumeBaseSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "finishDate" DATETIME,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    CONSTRAINT "Experience_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Responsibility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experienceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Responsibility_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "Project_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metric" TEXT,
    "evidence" TEXT NOT NULL,
    CONSTRAINT "Achievement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "academy" TEXT NOT NULL,
    "evidence" TEXT,
    CONSTRAINT "Language_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "companyOrProject" TEXT NOT NULL,
    CONSTRAINT "Reference_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "company" TEXT NOT NULL,
    "minEducation" TEXT NOT NULL,
    "minExperienceTime" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "JobOfferSkill" (
    "skillId" TEXT NOT NULL,
    "jobOfferId" TEXT NOT NULL,
    "required" BOOLEAN,
    "priority" INTEGER,
    "yearsRequired" INTEGER,
    CONSTRAINT "JobOfferSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JobOfferSkill_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OptimizedResume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobOfferId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "recommendations" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    CONSTRAINT "OptimizedResume_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OptimizedResume_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeBase_candidateId_key" ON "ResumeBase"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobOfferSkill_jobOfferId_key" ON "JobOfferSkill"("jobOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "OptimizedResume_jobOfferId_key" ON "OptimizedResume"("jobOfferId");
