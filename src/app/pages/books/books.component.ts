import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Book } from '../../models/book';
import { BookServiceService } from '../../services/book-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

  @Input() booksData: Book[] = [];
  @Input() displayTop: number = -1;
  @Input() optionsHidden = false;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addNewBook') addNewBook!: TemplateRef<any>;

  selectedBook!: Book;
  displayedColumns: string[] = [
    'BookName',
    'Genre',
    'ISBN',
    'QuantityAvailable',
  ];

  editBookNameControl = new FormControl<string>('');
  editGenreControl = new FormControl<string>('');
  editISBNControl = new FormControl<number>(0);
  editQuantityAvailableControl = new FormControl<number>(0);

  newBookNameControl = new FormControl<string>('');
  newGenreControl = new FormControl<string>('');
  newISBNControl = new FormControl<number>(0);
  newQuantityAvailableControl = new FormControl<number>(0);

  editBookForm: FormGroup;
  addNewBookForm: FormGroup;

  constructor(
    public bookService: BookServiceService,
    public matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.editBookForm = this.formBuilder.group({
      bookName: this.editBookNameControl,
      genre: this.editGenreControl,
      isbn: this.editISBNControl,
      quantityAvailable: this.editQuantityAvailableControl,
    });
    this.addNewBookForm = this.formBuilder.group({
      bookName: this.newBookNameControl,
      genre: this.newGenreControl,
      isbn: this.newISBNControl,
      quantityAvailable: this.newQuantityAvailableControl,
    });
  }

  ngOnInit(): void {
    if (this.booksData.length === 0) {
      this.bookService.getBooks().subscribe((books) => {
        this.booksData =
          this.displayTop > 0 ? books.slice(0, this.displayTop) : books;
      });
      
    } else {
      this.booksData =
        this.displayTop > 0
          ? this.booksData.slice(0, this.displayTop)
          : this.booksData;
    }
  }

  // Open the dialog and pass the selected book for editing
  logger(selectedBook: Book) {
    this.selectedBook = selectedBook;
    this.editBookNameControl.setValue(selectedBook.BookName);
    this.editGenreControl.setValue(selectedBook.Genre);
    this.editISBNControl.setValue(selectedBook.ISBN);
    this.editQuantityAvailableControl.setValue(selectedBook.QuantityAvailable);

    const dialogRef = this.matDialog.open(this.editDialog, {
      width: '350px',
      data: { book: this.selectedBook },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // handle result if needed
      }
    });
  }

  DeleteBook() {
    console.log(this.selectedBook);
    this.booksData = this.booksData.filter(book => book.id !== this.selectedBook.id);
    this.bookService.deleteBook(this.selectedBook).subscribe(response => {
      console.log('Book deleted', response);
      // Implement component auto-refresh after completing the delete operation
    }, error => {
      console.log('We have a problem');
      console.error('Error deleting book', error);
      // handle error
    });
  }

  AddNewBook() {
    this.addNewBookForm.reset(); // Prepares a new form for User.
    const dialogRef = this.matDialog.open(this.addNewBook);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // handle result if needed
      }
    });
  }

  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addBook(){
    const newBook: Book = {
      BookName: this.addNewBookForm.value.bookName,
      Genre: this.addNewBookForm.value.genre,
      ISBN: this.addNewBookForm.value.isbn,
      QuantityAvailable: this.addNewBookForm.value.quantityAvailable,
      id: this.generateRandomId() // Generate a random ID for the new book
    };
  
    this.bookService.addBook(newBook).subscribe(response => {
      console.log('Book added', response);
      this.booksData.push(newBook);
      this.booksData = [...this.booksData];
      this.matDialog.closeAll(); // Close the dialog after adding
    }, error => {
      console.error('Error adding book', error);
    });
  }
}
