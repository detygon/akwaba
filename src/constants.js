export const dbName = process.env.VUE_APP_DB_NAME || 'akwaba'
export const syncURL = process.env.VUE_APP_SYNC_URL || 'http://localhost:5984'
export const dbRemote = `${syncURL}/${dbName}`
export const API_BASE_URL = process.env.VUE_APP_API || 'http://localhost:1337'
