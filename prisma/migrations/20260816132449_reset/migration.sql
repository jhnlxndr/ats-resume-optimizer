-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobOfferSkill" (
    "skillId" TEXT NOT NULL,
    "jobOfferId" TEXT NOT NULL,
    "required" BOOLEAN,
    "priority" INTEGER,
    "yearsRequired" INTEGER,

    PRIMARY KEY ("jobOfferId", "skillId"),
    CONSTRAINT "JobOfferSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JobOfferSkill_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobOfferSkill" ("jobOfferId", "priority", "required", "skillId", "yearsRequired") SELECT "jobOfferId", "priority", "required", "skillId", "yearsRequired" FROM "JobOfferSkill";
DROP TABLE "JobOfferSkill";
ALTER TABLE "new_JobOfferSkill" RENAME TO "JobOfferSkill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
