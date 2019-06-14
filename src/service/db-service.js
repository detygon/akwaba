import * as RxDB from 'rxdb'
import FormSchema from '@/schemas/form'
import FormDataSchema from '@/schemas/form-data'

RxDB.plugin(require('pouchdb-adapter-idb'))
RxDB.plugin(require('pouchdb-adapter-http'))
RxDB.plugin(require('pouchdb-authentication'))

const useAdapter = 'idb'
const syncURL = process.env.VUE_APP_SYNC_URL || 'http://localhost:5984'
const dbName = process.env.VUE_APP_DB_NAME || 'akwaba'
const dbPass = process.env.VUE_APP_DB_PASS || '12345678'
const remote = `${syncURL}/${dbName}`

const collections = [
  {
    name: 'forms',
    schema: FormSchema,
    sync: true,
  },
  {
    name: 'contents',
    schema: FormDataSchema,
    sync: true,
  },
]

const setupDB = async () => {
  const db = await RxDB.create({
    name: dbName,
    adapter: useAdapter,
    queryChangeDetection: true,
    password: dbPass,
  })

  db.waitForLeadership().then(() => {
    document.title = '♛ ' + document.title
  })

  await Promise.all(collections.map((collection) => db.collection(collection)))

  await db.forms.sync({ remote, })

  await db.contents.sync({ remote, })

  return db
}

export default {
  __: setupDB(),
  get() {
    return this.__
  },
}
