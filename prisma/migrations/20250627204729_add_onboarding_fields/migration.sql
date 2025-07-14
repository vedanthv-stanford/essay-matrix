-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "graduationYear" INTEGER,
    "highSchoolName" TEXT,
    "intendedMajor" TEXT,
    "intendedMinor" TEXT,
    "resumeUrl" TEXT,
    "isInternational" BOOLEAN,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "graduationYear", "highSchoolName", "id", "image", "intendedMajor", "intendedMinor", "name", "resumeUrl", "updatedAt") SELECT "createdAt", "email", "emailVerified", "graduationYear", "highSchoolName", "id", "image", "intendedMajor", "intendedMinor", "name", "resumeUrl", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
