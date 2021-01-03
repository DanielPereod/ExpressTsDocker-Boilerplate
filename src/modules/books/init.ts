import { Express } from "express";
import BooksRouterController from "./routeControllers/books.routeController";
import Routes from "./routes";

export default class BooksModule {
  public routes: Routes;

  constructor(app: Express) {
    this.routes = new Routes(app, new BooksRouterController());
  }
}
