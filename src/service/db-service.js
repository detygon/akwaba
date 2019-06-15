import * as RxDB from 'rxdb'
import FormSchema from '@/schemas/form'
import ResponseSchema from '@/schemas/response'

RxDB.plugin(require('pouchdb-adapter-idb'))
RxDB.plugin(require('pouchdb-adapter-http'))
RxDB.plugin(require('pouchdb-authentication'))

const useAdapter = 'idb'
const dbName = process.env.VUE_APP_DB_NAME || 'akwaba'
const dbUsername = process.env.VUE_APP_DB_USERNAME || 'admin'
const dbPass = process.env.VUE_APP_DB_PASS || '12345678'

export const collections = [
  {
    name: 'forms',
    schema: FormSchema,
    sync: true,
  },
  {
    name: 'responses',
    schema: ResponseSchema,
    sync: true,
  },
]

export const setupDB = async () => {
  const db = await RxDB.create({
    name: dbName,
    adapter: useAdapter,
    queryChangeDetection: true,
    password: dbPass,
    pouchSettings: {
      skip_setup: true,
      auth: {
        username: dbUsername,
        password: dbPass,
      },
    },
  })

  db.waitForLeadership().then(() => (document.title = '♛ ' + document.title))

  await Promise.all(collections.map((collection) => db.collection(collection)))

  return db
}

export default {
  __: setupDB(),
  get() {
    return this.__
  },
}
