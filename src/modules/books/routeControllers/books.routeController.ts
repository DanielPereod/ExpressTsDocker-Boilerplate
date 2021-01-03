import BookBusinessController from "../businessControllers/books.businessController";
import { Request, Response } from "express";

export default class BooksRouterController {
  private booksBusinessController: BookBusinessController;
  constructor(
    bookBusinessController: BookBusinessController = new BookBusinessController()
  ) {
    this.booksBusinessController = bookBusinessController;
  }

  getBook = async (req: Request, res: Response): Promise<Response> => {
    const bookResponse = await this.booksBusinessController.getBooks();

    if (bookResponse.errors) {
      return res
        .status(bookResponse.errors.httpcode)
        .send(bookResponse.errors.message);
    }

    return res.status(200).send(bookResponse);
  };

  getBookById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const bookResponse = await this.booksBusinessController.getBookById(id);
    if (bookResponse.errors) {
      return res
        .status(bookResponse.errors.httpcode)
        .send(bookResponse.errors.message);
    }
    return res.status(200).send(bookResponse);
  };

  updateBookById = async (req: Request, res: Response): Promise<Response> => {
    const { isbn, name } = req.body;
    const { id } = req.params;

    const bookResponse = await this.booksBusinessController.updateBookById({
      isbn,
      id,
      name,
    });
    if (bookResponse.errors) {
      return res
        .status(bookResponse.errors.httpcode)
        .send(bookResponse.errors.message);
    }
    return res.status(200).send(bookResponse);
  };

  deleteBookById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const bookResponse = await this.booksBusinessController.deleteBookById(id);
    if (bookResponse.errors) {
      return res
        .status(bookResponse.errors.httpcode)
        .send(bookResponse.errors.message);
    }
    return res.status(200).send(bookResponse);
  };

  createBook = async (req: Request, res: Response): Promise<any> => {
    const { isbn, name } = req.body;

    const bookResponse = await this.booksBusinessController.createBook({
      isbn,
      name,
    });

    if (bookResponse.errors) {
      return res
        .status(bookResponse.errors.httpcode)
        .send(bookResponse.errors.message);
    }

    return res.status(200).send(bookResponse);
  };
}
