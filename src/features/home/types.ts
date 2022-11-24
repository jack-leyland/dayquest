export type ExpHistoryRecord = {
    userId: string,
    timestamp: string,
    expChange: number 
}

export type LevelExpParams = {
    level: number,
    expNeeded: number,
    expPerCompletion: number 
}