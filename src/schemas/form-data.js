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
    content: {
      type: 'string',
      final: true,
    },
  },
  required: ['id', 'content'],
}
