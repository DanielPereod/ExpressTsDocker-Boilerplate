import { getRepository, Repository } from "typeorm";
import { Book, BookAttributes } from "../entities/Book";

export default class BookRespository {
  bookRepository: Repository<Book> = getRepository(Book);

  getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  getBookById(id: string): Promise<Book | undefined> {
    return this.bookRepository.findOne(id);
  }

  updateBookById({ id, isbn, name }: BookAttributes): Promise<any> {
    const updatedBook = this.bookRepository.create({ id, isbn, name });
    return this.bookRepository.save(updatedBook);
  }

  deleteBookById(id: string): Promise<any> {
    return this.bookRepository.delete(id);
  }

  createBook({ isbn, name }: BookAttributes): Promise<Book> {
    const newBook = this.bookRepository.create({ isbn, name });
    return this.bookRepository.save(newBook);
  }
}
