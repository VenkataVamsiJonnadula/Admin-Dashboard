import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
logger(row: any) {
  console.log(row);
}
timeOfTheDay: any;
booksData: Book[] = [];
dataSource: any;
displayedColumns: string[] = ['BookName', 'Genre', 'ISBN', 'QuantityAvailable'];

  ngOnInit(): void {

    const currentHour = new Date().getHours();
    if (currentHour <= 12) {
      this.timeOfTheDay = 'Morning';
    } else if (currentHour > 12 && currentHour <= 17) {
      this.timeOfTheDay = 'Afternoon';
    } else {
      this.timeOfTheDay = 'Evening';
    }

    this.bookService.getBooks().subscribe((books) => this.booksData = books.slice(0, 5)); // Displays only first 5 books
  }
  constructor(private bookService: BookServiceService){}
}
