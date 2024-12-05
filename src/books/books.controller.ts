import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getFirstBook() {
    return this.booksService.getFirstBook();
  }

  @Post()
  addBook(@Body() bookData: any) {
    return this.booksService.addBook(bookData);
  }
} 