export const Tables = [
    `CREATE TABLE IF NOT EXISTS "users" (
        "userId" TEXT PRIMARY KEY,
        "username" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "device" TEXT NOT NULL,
        "isOfflineUser" INTEGER NOT NULL DEFAULT 0 CHECK ("isOfflineUser" IN (0,1)),
        "level" INTEGER NOT NULL DEFAULT 1,
        "exp" INTEGER NOT NULL DEFAULT 0
    );`,
    `CREATE TABLE IF NOT EXISTS "questCategories" (
        "catId" INTEGER PRIMARY KEY,
        "name" TEXT UNIQUE NOT NULL,
        "desc" TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS "objectiveTypes" (
        "typeId" INTEGER PRIMARY KEY,
        "name" TEXT UNIQUE NOT NULL,
        "desc" TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS "levelExpParams" (
        "level" INTEGER PRIMARY KEY,
        "expNeeded" INTEGER NOT NULL,
        "expPerCompletion" INTEGER NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS "quests" (
        "questId" INTEGER,
        "userId" TEXT NOT NULL,
        "categoryId" INTEGER NOT NULL,
        "active" INTEGER NOT NULL CHECK ("active" IN (0,1)),
        "startDateUtc" TEXT NOT NULL,
        "endDateUtc" TEXT NOT NULL,
        "isPriority" INTEGER NOT NULL DEFAULT 0 CHECK ("isPriority" IN (0,1)),
        FOREIGN KEY ("categoryId") REFERENCES "questCategories" ("catId"),
        CONSTRAINT "userId"
          FOREIGN KEY ("userId") 
          REFERENCES "users" ("userId")
          ON DELETE CASCADE,
        PRIMARY KEY ("questId", "userId")
    );`,
    `CREATE TABLE IF NOT EXISTS "objectives" (
        "objectiveId" INTEGER PRIMARY KEY AUTOINCREMENT,
        "questId" INTEGER NOT NULL,
        "typeId" INTEGER NOT NULL,
        "userId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "desc" TEXT,
        "active" INTEGER NOT NULL,
        "enforcementActive" INTEGER NOT NULL DEFAULT 0 CHECK ("enforcementActive" IN (0,1)),
        "startDateUtc" TEXT NOT NULL,
        "endDateUtc" TEXT NOT NULL,
        "isRecurring" INTEGER NOT NULL CHECK ("isRecurring" IN (0,1)),
        "hasTime" INTEGER NOT NULL DEFAULT 0 CHECK ("hasTime" IN (0,1)),
        "hasLocation" INTEGER NOT NULL DEFAULT 0 CHECK ("hasLocation" IN (0,1)),
        "timeRangeStart" TEXT,
        "timeRangeEnd" TEXT,
        "recurrencePattern" TEXT,
        "completionStreak" INTEGER,
        "missStreak" INTEGER,
        FOREIGN KEY ("typeId") REFERENCES "objectiveTypes" ("typeId"),
        CONSTRAINT "userId"
          FOREIGN KEY ("userId") 
          REFERENCES "users" ("userId")
          ON DELETE CASCADE,
        CONSTRAINT "questId"
          FOREIGN KEY ("questId") 
          REFERENCES "quests" ("questId")
          ON DELETE CASCADE,
        UNIQUE ("objectiveId", "userId")
    );`,
    `CREATE TABLE IF NOT EXISTS "objectiveProgressHistory" (
        "id" INTEGER PRIMARY KEY,
        "objectiveId" INTEGER NOT NULL,
        "recordedOn" TEXT NOT NULL,
        "successfulCompletion" INTEGER NOT NULL,
        "expChange" INTEGER NOT NULL
      );`,
      `CREATE TABLE IF NOT EXISTS "expHistory" (
        "userId" TEXT NOT NULL,
        "timestamp" TEXT NOT NULL,
        "expChange" INTEGER NOT NULL,
        CONSTRAINT "userId"
          FOREIGN KEY ("userId") 
          REFERENCES "userId" ("userId")
          ON DELETE CASCADE,
        PRIMARY KEY ("userId", "timestamp")
      );`
]