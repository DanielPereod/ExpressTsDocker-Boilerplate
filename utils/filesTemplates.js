function initTemplate(module_name) {
  return `import { Express } from \"express\";\r\nimport ${capitalizeFirstLetter(
    module_name
  )}RouterController from \".\/routeControllers\/${module_name}.routeController\";\r\nimport Routes from \".\/routes\";\r\n\r\nexport default class ${capitalizeFirstLetter(
    module_name
  )}Module {\r\n  public routes: Routes;\r\n\r\n  constructor(app: Express) {\r\n    this.routes = new Routes(app, new ${capitalizeFirstLetter(
    module_name
  )}RouterController());\r\n  }\r\n}\r\n`;
}

function routesTemplate(module_name) {
  return `import { Express } from \"express\";\r\nimport ${capitalizeFirstLetter(
    module_name
  )}RouterController from \".\/routeControllers\/${module_name}.routeController\";\r\n\r\nexport default class Routes {\r\n  private routeController: ${capitalizeFirstLetter(
    module_name
  )}RouterController;\r\n\r\n  constructor(app: Express, routeController: ${capitalizeFirstLetter(
    module_name
  )}RouterController) {\r\n    this.routeController = routeController;\r\n    this.configureRoutes(app);\r\n  }\r\n\r\n  private configureRoutes(app: Express): void {\r\n    app.route(\"\/${module_name}\").get(this.routeController.get${capitalizeFirstLetter(
    module_name
  )}s);\r\n  }\r\n}\r\n`;
}

function routeControllerTemplate(module_name) {
  return `import ${capitalizeFirstLetter(
    module_name
  )}BusinessController from \"..\/businessControllers\/${module_name}.businessController\";\r\nimport { Request, Response } from \"express\";\r\n\r\nexport default class ${capitalizeFirstLetter(
    module_name
  )}RouterController {\r\n  private ${module_name}BusinessController: ${capitalizeFirstLetter(
    module_name
  )}BusinessController;\r\n  constructor(\r\n    ${module_name}BusinessController: ${capitalizeFirstLetter(
    module_name
  )}BusinessController = new ${capitalizeFirstLetter(
    module_name
  )}BusinessController()\r\n  ) {\r\n    this.${module_name}BusinessController = ${module_name}BusinessController;\r\n  }\r\n\r\n  get${capitalizeFirstLetter(
    module_name
  )}s = async (req: Request, res: Response): Promise<Response> => {\r\n    const ${module_name}Response = await this.${module_name}BusinessController.get${capitalizeFirstLetter(
    module_name
  )}s();\r\n\r\n    if (${module_name}Response.errors) {\r\n      return res\r\n        .status(${module_name}Response.errors.httpcode)\r\n        .send(${module_name}Response.errors.message);\r\n    }\r\n\r\n    return res.status(200).send(${module_name}Response);\r\n  };\r\n}\r\n`;
}

function repositoryTemplate(module_name) {
  return `import { getRepository, Repository } from \"typeorm\";\r\nimport { ${capitalizeFirstLetter(
    module_name
  )} } from \"..\/entities\/${capitalizeFirstLetter(
    module_name
  )}\";\r\n\r\nexport default class ${capitalizeFirstLetter(
    module_name
  )}Respository {\r\n  ${module_name}Repository: Repository<${capitalizeFirstLetter(
    module_name
  )}> = getRepository(${capitalizeFirstLetter(
    module_name
  )});\r\n\r\n  get${capitalizeFirstLetter(
    module_name
  )}s(): Promise<${capitalizeFirstLetter(
    module_name
  )}[]> {\r\n    return this.${module_name}Repository.find();\r\n  }\r\n}\r\n`;
}

function entityTemplate(module_name) {
  return `import {\r\n  CreateDateColumn,\r\n  Entity,\r\n  PrimaryGeneratedColumn,\r\n  UpdateDateColumn,\r\n} from \"typeorm\";\r\n\r\nexport interface ${capitalizeFirstLetter(
    module_name
  )}Attributes {\r\n  id?: string;\r\n  createdAt?: Date;\r\n  updatedAt?: Date;\r\n}\r\ninterface ${capitalizeFirstLetter(
    module_name
  )}Error {\r\n  message: string;\r\n  httpcode: number;\r\n}\r\nexport interface ${capitalizeFirstLetter(
    module_name
  )}Response {\r\n  ${module_name}?: ${capitalizeFirstLetter(
    module_name
  )}Attributes | ${capitalizeFirstLetter(
    module_name
  )}Attributes[];\r\n  errors?: ${capitalizeFirstLetter(
    module_name
  )}Error;\r\n}\r\n\r\n@Entity()\r\nexport class ${capitalizeFirstLetter(
    module_name
  )} implements ${capitalizeFirstLetter(
    module_name
  )}Attributes {\r\n  @PrimaryGeneratedColumn(\"uuid\")\r\n  id!: string;\r\n\r\n  @CreateDateColumn()\r\n  createdAt!: Date;\r\n\r\n  @UpdateDateColumn()\r\n  updatedAt!: Date;\r\n}\r\n`;
}

function businessControllerTemplate(module_name) {
  return `import { ${capitalizeFirstLetter(
    module_name
  )}Response } from \"..\/entities\/${capitalizeFirstLetter(
    module_name
  )}\";\r\nimport ${capitalizeFirstLetter(
    module_name
  )}Respository from \"..\/repositories\/${module_name}.repository\";\r\n\r\nexport default class ${capitalizeFirstLetter(
    module_name
  )}BusinessController {\r\n  private ${module_name}Respository: ${capitalizeFirstLetter(
    module_name
  )}Respository;\r\n  constructor(\r\n    ${module_name}Respository: ${capitalizeFirstLetter(
    module_name
  )}Respository = new ${capitalizeFirstLetter(
    module_name
  )}Respository()\r\n  ) {\r\n    this.${module_name}Respository = ${module_name}Respository;\r\n  }\r\n\r\n  async get${capitalizeFirstLetter(
    module_name
  )}s(): Promise<${capitalizeFirstLetter(
    module_name
  )}Response> {\r\n    try {\r\n      const ${module_name}s = await this.${module_name}Respository.get${capitalizeFirstLetter(
    module_name
  )}s();\r\n      if (!${module_name}s) {\r\n        return {\r\n          errors: { httpcode: 204, message: \"not found\" },\r\n        };\r\n      }\r\n      return { ${module_name}: ${module_name}s };\r\n    } catch (error) {\r\n      return {\r\n        errors: { httpcode: 500, message: error },\r\n      };\r\n    }\r\n  }\r\n}\r\n`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  initTemplate,
  routesTemplate,
  routeControllerTemplate,
  repositoryTemplate,
  entityTemplate,
  businessControllerTemplate,
};
