// module.exports = function(plop) {
//   plop.setGenerator('basics', {
//     description: 'this is a skeleton plopfile',
//     prompt: [],// array of inquirer prompts
//     actions: [] // array of actions
//   })
// }

module.exports = function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: 'plop-templates/controller.hbs',
      },
    ],
  })
}
