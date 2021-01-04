const fs = require("fs");
const path = require("path");
const {
  initTemplate,
  routesTemplate,
  routeControllerTemplate,
  repositoryTemplate,
  entityTemplate,
  businessControllerTemplate,
} = require("./filesTemplates");

module.exports = {
  createModule: function (config) {
    let module_name = config.module_name;
    /* FOLDERS PATH */
    const modulesPath = path.join(__dirname, `../src/modules/${module_name}`);
    const businessControllerPath = path.join(
      modulesPath,
      `businessControllers`
    );
    const entitiesPath = path.join(modulesPath, `entities`);
    const repositoriesPath = path.join(modulesPath, `repositories`);
    const routeControllersPath = path.join(modulesPath, `routeControllers`);

    /* FILES PATH */
    const businessControllerFile = path.join(
      businessControllerPath,
      `${module_name}.businessController.ts`
    );
    const entitiesFile = path.join(
      entitiesPath,
      `${capitalizeFirstLetter(module_name)}.ts`
    );
    const repositoriesFile = path.join(
      repositoriesPath,
      `${module_name}.repository.ts`
    );
    const routeControllersFile = path.join(
      routeControllersPath,
      `${module_name}.routeController.ts`
    );
    const initFile = path.join(modulesPath, "init.ts");
    const routeFile = path.join(modulesPath, "routes.ts");

    if (!fs.existsSync(modulesPath)) {
      fs.mkdirSync(modulesPath);
      fs.mkdirSync(businessControllerPath);
      fs.mkdirSync(entitiesPath);
      fs.mkdirSync(repositoriesPath);
      fs.mkdirSync(routeControllersPath);

      fs.writeFileSync(
        businessControllerFile,
        businessControllerTemplate(module_name)
      );
      fs.writeFileSync(entitiesFile, entityTemplate(module_name));
      fs.writeFileSync(repositoriesFile, repositoryTemplate(module_name));
      fs.writeFileSync(
        routeControllersFile,
        routeControllerTemplate(module_name)
      );
      fs.writeFileSync(initFile, initTemplate(module_name));
      fs.writeFileSync(routeFile, routesTemplate(module_name));

      return "Sucessfully created";
    }

    return "Module already exists";
  },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

require("make-runnable");
