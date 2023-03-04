var Ajv = require('ajv')
var localize = require('ajv-i18n')
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // test: false,
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10',
      },
      minLength: 10,
      // format: 'test',
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}
var ajv = new Ajv({ allErrors: true, jsonPointers: true })
require('ajv-errors')(ajv)
// ajv.addFormat('test', (data) => {
//   console.log(data)
//   return data === 'haha'
// })
// 自定义关键字
ajv.addKeyword('test', {
  macor() {
    return {
      minLength: 10,
    }
  },
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'boolean',
  // },
  // validate(schema, data) {
  //   console.log(schema, data)
  //   if (schema === true) return true
  //   else return schema.length === 6
  // },
})
var validate = ajv.compile(schema)
var vaild = validate({
  name: 'haha',
  age: 18,
  pets: ['mimi', 'haha'],
  isWorker: true,
})
if (!vaild) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
