import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { db } from '../firebase';
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  // Clean up the database after each test
  afterEach(async () => {
    const booksRef = collection(db, 'books');
    const snapshot = await getDocs(booksRef);
    const deletePromises = snapshot.docs.map(async (document) => {
      await deleteDoc(doc(db, 'books', document.id));
    });
    await Promise.all(deletePromises);
  });

  it('should add a new book', async () => {
    const bookData = { title: 'Test Book', author: 'Test Author' };
    const result = await controller.addBook(bookData);
    
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(bookData.title);
    expect(result.author).toBe(bookData.author);
  });

  it('should get the first book', async () => {
    // First add a book
    const bookData = { title: 'Test Book', author: 'Test Author' };
    await controller.addBook(bookData);

    // Then get the first book
    const result = await controller.getFirstBook();
    
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(bookData.title);
    expect(result.author).toBe(bookData.author);
  });

  it('should return null when no books exist', async () => {
    const result = await controller.getFirstBook();
    expect(result).toBeNull();
  });
});
