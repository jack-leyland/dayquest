import * as SQLite from "expo-sqlite";
import { User } from "../common/types";
import { Tables } from "../common/constants/Tables"

// This file exports a base class instance that can be imported into the respective files defining classes for 
// database interaction at the feature-level


// Base class providing an interface to interact with the local SQLite database instance for the app.
// Each feature of the app implements their own database class using the composition pattern, taking this class
// as an argument. The feature database classes contain the specific queries needed by the feature as methods.

// A database connection is opened when the object is created. We rely on the garbage collector to close the connection.

// Query methods should return promises to the caller.

export class DatabaseInterface {

  connection: SQLite.WebSQLDatabase

  constructor() {
    this.connection = SQLite.openDatabase("dayquest.db");
  }

  initializeDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.transaction((tx) => {
        for (let i = 0; i < Tables.length; i++){
          tx.executeSql(Tables[i])
        }
      },(err) => {
        console.error("Database initialization failure: ", err)
        reject(err)
      }, () => {
        resolve()
      })
    })
  }

  //Dev only 
  drop() {
    return new Promise<void>((resolve, reject) => {
      this.connection.transaction(
          (tx) => {
            tx.executeSql(
              `DROP TABLE IF EXISTS expHistory`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS questCategories`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS objectiveTypes`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS levelExpParams`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS quests`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS objectives`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS events`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS objectiveProgressHistory`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS users`
            );
            tx.executeSql(
              `DROP TABLE IF EXISTS expHistory`
            );
          },(err)=>{console.log(err)},()=>{console.log("Table Dropped")})
    })
  }
}

// Class for interaction with the User data

class UserDbProxy {

  db: DatabaseInterface
  constructor(db: DatabaseInterface) {
    this.db = db
  }

  getUserRecord(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.connection.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM users WHERE userId=? AND active=1",
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

  saveNewUserRecord(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.connection.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO users VALUES (?,?,?,?,?,?,?,?)",
            [
              user.userId,
              user.username,
              user.email,
              user.deviceId,
              user.isOfflineUser ? 1 : 0,
              user.level,
              user.exp,
              1
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

  userExists(userId: string): Promise<0|1> {
    return new Promise((resolve, reject) => {
      this.db.connection.transaction((tx) => {
        tx.executeSql(`SELECT EXISTS(SELECT 1 FROM users WHERE userId=? AND active=1) AS "success"`,
        [userId],
        (_, { rows: { _array } }) => {
          resolve(_array[0]["success"]);
        }
        )
      },
      (err) => {
        reject(err);
      }
      )
    })
  }

  setUserInactive(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.connection.transaction((tx) => {
        tx.executeSql(`UPDATE users SET active=0 WHERE userId=?`),
        [userId], 
        () => resolve()
      },
      (err) => {
        reject(err);
      }
      )
    })
  }
}

export const databaseInterface = new DatabaseInterface()
export const userDbProxy = new UserDbProxy(databaseInterface)


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
