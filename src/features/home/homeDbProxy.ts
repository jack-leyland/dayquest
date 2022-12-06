import { DatabaseInterface, databaseInterface } from "../../app/db";
import { ExpHistoryRecord, LevelExpParams } from "./types";

class HomeDbProxy {
  db: DatabaseInterface
  constructor (db: DatabaseInterface) {
    this.db = db
  }

  getSortedExpHistory(recordCount: number): Promise<Array<ExpHistoryRecord>>{
    return new Promise((resolve, reject) => {
      this.db.connection.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM expHistory ORDER BY "timestamp" DESC LIMIT ?`,
            [recordCount],
            (_, { rows: { _array } }) => {
              resolve(_array as Array<ExpHistoryRecord>);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  getLevelExpParams(level: LevelExpParams["level"]): Promise<LevelExpParams> {
    return new Promise((resolve, reject) => {
      this.db.connection.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM levelExpParams WHERE level=?",
            [level],
            (_, { rows: { _array } }) => {
              resolve(_array[0] as LevelExpParams);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
  
}

export const homeDbProxy = new HomeDbProxy(databaseInterface)