import { openDB } from "../../app/db";
import { ExpHistoryRecord, LevelExpParams } from "../../app/types";


// These records are added chronologically, so the sort here should really be unnessary.
// If the records aren't sorted, the sort will have to happen in the query, not after the LIMIT.
// TODO: figure out how to sort by date string in SQLite since it's just a date string
export const getSortedExpHistory = (recordCount: number): Promise<Array<ExpHistoryRecord>> => {
    const db = openDB();
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM expHistory LIMIT ?",
            [recordCount],
            (_, { rows: { _array } }) => {
              _array.sort((a,b) => {
                return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
              })
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

  export const getLevelExpParams = (level: LevelExpParams["level"]): Promise<LevelExpParams> => {
    const db = openDB();
    return new Promise((resolve, reject) => {
      db.transaction(
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