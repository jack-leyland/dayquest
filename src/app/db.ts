import * as SQLite from "expo-sqlite";

export const openDB = (): SQLite.WebSQLDatabase => {
  const db = SQLite.openDatabase("dayquest.db");
  return db;
};


export const buildDatabase = (): void => {
  const db = openDB();
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "quest_categories" (
            "cat_id" INTEGER PRIMARY KEY,
            "name" TEXT UNIQUE NOT NULL,
            "desc" TEXT
        );`
    );
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "objective_types" (
            "type_id" INTEGER PRIMARY KEY,
            "name" TEXT UNIQUE NOT NULL,
            "desc" TEXT
        );`
    );
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "level_exp_params" (
            "level" INTEGER PRIMARY KEY,
            "exp_needed" INTEGER NOT NULL,
            "exp_per_completion" INTEGER NOT NULL
        );`
    );
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "quests" (
            "quest_id" INTEGER PRIMARY KEY,
            "category_id" INTEGER NOT NULL,
            "active" INTEGER NOT NULL CHECK ("active" IN (0,1)),
            "start_date_utc" TEXT NOT NULL,
            "end_date_utc" TEXT NOT NULL,
            "is_priority" INTEGER NOT NULL DEFAULT 0 CHECK ("is_priority" IN (0,1)),
            FOREIGN KEY ("category_id") REFERENCES "quest_categories" ("cat_id")
        );`
    );
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "objectives" (
            "id" INTEGER PRIMARY KEY,
            "quest_id" INTEGER,
            "type_id" INTEGER,
            "name" TEXT NOT NULL,
            "desc" TEXT,
            "active" INTEGER NOT NULL,
            "enforcement_active" INTEGER NOT NULL DEFAULT 0 CHECK ("enforcement_active" IN (0,1)),
            "start_date_utc" TEXT NOT NULL,
            "end_date_utc" TEXT NOT NULL,
            "is_recurring" INTEGER NOT NULL CHECK ("is_recurring" IN (0,1)),
            "has_time" INTEGER NOT NULL DEFAULT 0 CHECK ("has_time" IN (0,1)),
            "has_location" INTEGER NOT NULL DEFAULT 0 CHECK ("has_location" IN (0,1)),
            "time_range_start" TEXT,
            "time_range_end" TEXT,
            "recurrence_pattern" TEXT,
            "completion_streak" INTEGER,
            "miss_streak" INTEGER,
            FOREIGN KEY ("quest_id") REFERENCES "quests" ("quest_id"),
            FOREIGN KEY ("type_id") REFERENCES "objective_types" ("type_id")
        );`
    );
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "events" (
            "event_id" INTEGER PRIMARY KEY,
            "objective_id" INTEGER NOT NULL,
            "recorded_on" INTEGER NOT NULL,
            "successful_completion" INTEGER NOT NULL,
            "exp_change" INTEGER NOT NULL,
            FOREIGN KEY ("objective_id") REFERENCES "objectives" ("id")
          );`
    );
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "user" (
            "user_id" TEXT PRIMARY KEY,
            "username" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "device" TEXT NOT NULL,
            "logged_in" INTEGER NOT NULL,
            "level" INTEGER NOT NULL DEFAULT 1,
            "exp" INTEGER NOT NULL DEFAULT 0,
            "last_open" TEXT
        );`
    );
  },
  (err) => {
    console.log(err)
  }
  );
};
