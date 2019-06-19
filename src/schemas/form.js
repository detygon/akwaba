export default {
  title: 'Form Schema',
  description: 'Describe a form',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    formData: {
      type: 'object',
    },
    createdBy: {
      type: 'string',
    },
  },
  required: ['id', 'name', 'formData'],
}
