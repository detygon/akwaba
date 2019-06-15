export default {
  title: 'ResponseSchema',
  description: 'Describe a form response',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    data: {
      type: 'array',
      final: true, // Answer can not be modified later on
    },
    formId: {
      type: 'string',
    },
  },
  required: ['id', 'data', 'formId'],
}
