import { Express } from "express";
import BooksRouterController from "./routeControllers/books.routeController";

export default class Routes {
  private routeController: BooksRouterController;

  constructor(app: Express, routeController: BooksRouterController) {
    this.routeController = routeController;
    this.configureRoutes(app);
  }

  private configureRoutes(app: Express): void {
    app.route("/book").get(this.routeController.getBook);
    app.route("/book/:id").get(this.routeController.getBookById);
    app.route("/book/:id").put(this.routeController.updateBookById);
    app.route("/book/:id").delete(this.routeController.deleteBookById);
    app.route("/book").post(this.routeController.createBook);
  }
}
