import { Book, BookAttributes, BookResponse } from "../entities/Book";
import BookRespository from "../repositories/book.repository";

export default class BookBusinessController {
  private bookRespository: BookRespository;
  constructor(bookRespository: BookRespository = new BookRespository()) {
    this.bookRespository = bookRespository;
  }

  async getBooks(): Promise<BookResponse> {
    try {
      const books = await this.bookRespository.getBooks();
      if (!books) {
        return {
          errors: { httpcode: 204, message: "not found" },
        };
      }
      return { book: books };
    } catch (error) {
      return {
        errors: { httpcode: 500, message: error },
      };
    }
  }

  async getBookById(id: string): Promise<BookResponse> {
    try {
      const book = await this.bookRespository.getBookById(id);
      if (!book) {
        return {
          errors: { httpcode: 204, message: "not found" },
        };
      }
      return { book };
    } catch (error) {
      return {
        errors: { httpcode: 500, message: error },
      };
    }
  }

  async updateBookById({
    id,
    isbn,
    name,
  }: BookAttributes): Promise<BookResponse> {
    try {
      const book = await this.bookRespository.updateBookById({
        id,
        isbn,
        name,
      });
      if (!book) {
        return {
          errors: { httpcode: 204, message: "not found" },
        };
      }
      return {
        book,
      };
    } catch (error) {
      return {
        errors: { httpcode: 500, message: error },
      };
    }
  }

  async deleteBookById(id: string): Promise<BookResponse> {
    try {
      const book = await this.bookRespository.deleteBookById(id);
      if (!book) {
        return {
          errors: { httpcode: 204, message: "not found" },
        };
      }
      return { book };
    } catch (error) {
      return {
        errors: { httpcode: 500, message: error },
      };
    }
  }

  async createBook({ isbn, name }: BookAttributes): Promise<BookResponse> {
    try {
      const book = await this.bookRespository.createBook({ isbn, name });
      return {
        book,
      };
    } catch (error) {
      console.log(error);
      return {
        errors: { httpcode: 500, message: error },
      };
    }
  }
}
