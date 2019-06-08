export default {
  title: 'User Schema',
  description: 'Describe a user',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    username: {
      type: 'string',
      unique: true,
    },
    email: {
      type: 'string',
      unique: true,
    },
    role: {
      type: 'string',
    },
    organisation: {
      type: 'string',
    },
    required: ['username', 'id'],
  },
}
