import * as SQLite from "expo-sqlite";
import { User } from "./types";

export const openDB = (): SQLite.WebSQLDatabase => {
  const db = SQLite.openDatabase("dayquest.db");
  return db;
};

export const getUserRecord = (userId: string): Promise<User> => {
  const db = openDB();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM users WHERE userId=?",
          [userId],
          (_, { rows: { _array } }) => {
            resolve(_array[0] as User);
          }
        );
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export const saveNewUserRecord = (user: User): Promise<User> => {
  const db = openDB();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO users VALUES (?,?,?,?,?,?,?)",
          [
            user.userId,
            user.username,
            user.email,
            user.deviceId,
            user.isOfflineUser ? 1 : 0,
            user.level,
            user.exp,
          ],
          () => {
            resolve(user);
          }
        );
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export const buildDatabase = (): void => {
  const db = openDB();
  // db.transaction(
  //   (tx) => {
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS expHistory`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS questCategories`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS objectiveTypes`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS levelExpParams`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS quests`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS objectives`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS events`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS objectiveProgressHistory`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS users`
  //     );
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS expHistory`
  //     );
  //   },(err)=>{console.log(err)},()=>{console.log("Table Dropped")})

  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "users" (
            "userId" TEXT PRIMARY KEY,
            "username" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "device" TEXT NOT NULL,
            "isOfflineUser" INTEGER NOT NULL DEFAULT 0 CHECK ("isOfflineUser" IN (0,1)),
            "level" INTEGER NOT NULL DEFAULT 1,
            "exp" INTEGER NOT NULL DEFAULT 0
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "questCategories" (
            "catId" INTEGER PRIMARY KEY,
            "name" TEXT UNIQUE NOT NULL,
            "desc" TEXT
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "objectiveTypes" (
            "typeId" INTEGER PRIMARY KEY,
            "name" TEXT UNIQUE NOT NULL,
            "desc" TEXT
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "levelExpParams" (
            "level" INTEGER PRIMARY KEY,
            "expNeeded" INTEGER NOT NULL,
            "expPerCompletion" INTEGER NOT NULL
        );`
      );
      tx.executeSql(
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
        );`
      );
      tx.executeSql(
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
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "objectiveProgressHistory" (
            "id" INTEGER PRIMARY KEY,
            "objectiveId" INTEGER NOT NULL,
            "recordedOn" TEXT NOT NULL,
            "successfulCompletion" INTEGER NOT NULL,
            "expChange" INTEGER NOT NULL
          );`
      );
      tx.executeSql(
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
      );
    },
    (err) => {
      console.log(err);
    }
  );
};
