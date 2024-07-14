import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private baseUrl = 'https://node-express-firebase-five.vercel.app/api';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getBooks`);
  }
  
  deleteBook(book: Book){
    let bookIDs = [] as number [];
    bookIDs.push(parseInt(book.id? book.id : '0'));
    console.log(bookIDs)
    return this.http.delete(`${this.baseUrl}/deleteBook`, {body: {bookIDs}})
  }

  addBook(book: Book){
    return this.http.post(`${this.baseUrl}/addBook`, book)
  }
}
