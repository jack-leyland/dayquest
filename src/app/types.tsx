export type User = {
    userId: string,
    username: string,
    email: string, 
    deviceId: string, 
    isOfflineUser: boolean,
    level: number,
    exp: number 
}

export type ExpHistoryRecord = {
    userId: string,
    timestamp: string,
    expChange: number 
}

export type JWT = {
    exp: number,
    iat: number
    user: {
        userId: string,
        username: string,
    }
    
}