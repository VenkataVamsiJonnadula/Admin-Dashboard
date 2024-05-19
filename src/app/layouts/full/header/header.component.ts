import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebarWidth = new EventEmitter<void>();

  constructor() { } 
  toggleSidebar(){
    this.toggleSidebarWidth.emit();
  }

}
