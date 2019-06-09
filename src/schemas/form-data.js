export default {
  title: 'Form Data Schema',
  description: 'Describe a form data',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    data: {
      type: 'array',
      final: true,
    },
    formId: {
      type: 'string',
    },
  },
  required: ['id', 'data', 'formId'],
}
