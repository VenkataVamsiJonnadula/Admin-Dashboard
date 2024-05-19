import { Component, OnDestroy, ViewChild, signal } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavItem } from './nav-item';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnDestroy {
  private breakPointSubscription: Subscription;
  @ViewChild('sidenav') sidenav!: MatSidenav; // Initialize using ViewChild
  sidebarWidth: string = '200px'; // Default width

  navItems = signal<NavItem[]>([
    ...navItems,
  ]);
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakPointSubscription = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.sidebarWidth = '60px'; // Decrease width for tablet and handset
        } else {
          this.sidebarWidth = '200px'; // Full width for desktop and above
        }
      });
  }
  ngOnDestroy(): void {
    this.breakPointSubscription.unsubscribe();
  }

  toggleSidebarWidth() {
    this.sidebarWidth = this.sidebarWidth === '200px' ? '60px' : '200px';
  }
}
