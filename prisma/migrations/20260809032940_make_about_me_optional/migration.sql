-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResumeBase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateId" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "aboutMe" TEXT,
    "professionalProfile" TEXT,
    "salaryAspiration" INTEGER NOT NULL,
    "salaryCurrency" TEXT NOT NULL,
    CONSTRAINT "ResumeBase_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResumeBase" ("aboutMe", "candidateId", "id", "profession", "professionalProfile", "salaryAspiration", "salaryCurrency") SELECT "aboutMe", "candidateId", "id", "profession", "professionalProfile", "salaryAspiration", "salaryCurrency" FROM "ResumeBase";
DROP TABLE "ResumeBase";
ALTER TABLE "new_ResumeBase" RENAME TO "ResumeBase";
CREATE UNIQUE INDEX "ResumeBase_candidateId_key" ON "ResumeBase"("candidateId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
