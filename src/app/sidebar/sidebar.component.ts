import { Component, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  ionIcon: string = '<ion-icon name="{{ menuItem.icon }}" class="text-xl"></ion-icon>';
  isAuthenticated: boolean = false;
  sidebarOpen: boolean = false;

  menuItems = [
    { icon: 'logo-buffer', title: 'DashBoard_UI', link: '#', class: 'font-semibold ml-2' },
    { icon: 'home-outline', title: 'Home', link: 'home' },
    { icon: 'people-outline', title: 'Customers', link: '#' },
    { icon: 'settings-outline', title: 'Settings', link: '#' },
    { icon: 'chatbubble-ellipses-outline', title: 'Messages', link: '#' },
    { icon: 'help-outline', title: 'Help', link: '#' },
    { icon: 'log-out-outline', title: 'Sign-Out', link: 'signup' },
    { icon: 'lock-closed-outline', title: 'Password', link: '#' }
  ];


  constructor(private authService: AuthService) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  handleMenuItemClick(menuItem: any): void {
    if (menuItem.title === 'Sign-Out') {
      this.authService.logOut();
    }
  }
}
