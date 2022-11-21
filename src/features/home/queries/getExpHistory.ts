import { openDB } from "../../../app/db";
import { ExpHistoryRecord } from "../../../app/types";

export const getExpHistory = (recordCount: number): Promise<Array<ExpHistoryRecord>> => {
    const db = openDB();
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM expHistory LIMIT ?",
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