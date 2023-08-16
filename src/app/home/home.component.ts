import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Modern_UI_Dashboard';
  totalAmount!: number;
  currentUser!: any;

  menuItems = [
    { icon: 'logo-buffer', title: 'UI_DashBoard', class: 'font-semibold ml-2' },
    { icon: 'home-outline', title: 'Home' },
    { icon: 'people-outline', title: 'Customers'},
    { icon: 'settings-outline', title: 'Settings' },
    { icon: 'logo-tableau', title: 'stats' },
    { icon: 'chatbubble-ellipses-outline', title: 'Messages' },
    { icon: 'help-outline', title: 'Help' },
    { icon: 'lock-closed-outline', title: 'Auth Password' }
  ];

  products = [
    { name: 'Dell Optiplex', price: 17899, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'CUBE 180 REACTION 200', price: 117350, payment: 'PayPal', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'ACID 260', price: 86799, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'ELITE 240', price: 154000, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'Wireless Earbuds', price: 329, payment: 'PayPal', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'Tablet', price: 7299, payment: 'Credit Card', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'X-Box Gaming Console', price: 5699, payment: 'PayPal', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'Fitness Tracker', price: 379, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'Digital Camera', price: 2599, payment: 'PayPal', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'VR Headset', price: 299, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'Wireless Earbuds', price: 329, payment: 'PayPal', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'Tablet', price: 299, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'X-Box Gaming Console', price: 5699, payment: 'PayPal', status: 'Declined', matchesSearch: false, highlighted: false },
    { name: 'Fitness Tracker', price: 379, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'Digital Camera', price: 2599, payment: 'PayPal', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'Digital Camera', price: 2599, payment: 'PayPal', status: 'Approved', matchesSearch: false, highlighted: false },
    { name: 'VR Headset', price: 299, payment: 'Credit Card', status: 'Approved', matchesSearch: false, highlighted: false },
    // Add more products here
  ];   

  lastHoveredIndex: number = -1; // Initialize with an invalid index <ion-icon name="logo-buffer"></ion-icon>

  constructor(private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private searchService: SearchService
    ){}

    async ngOnInit(): Promise<void> {
      this.activeRoute.paramMap.subscribe(async (params) => {
        const id = params.get('userId');
        if (id) {
          this.currentUser = id;
          try {
            this.currentUser = await this.getUserEmail(this.currentUser);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      });
    
      // Subscribe to changes in the search term
      this.searchService.getSearchTerm().subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
    }
    
    performSearch(searchTerm: string) {
      this.products.forEach((product) => {
        if (searchTerm) {
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
          product.matchesSearch = matchesSearch;
          product.highlighted = matchesSearch; // Set the highlighted property
        } else {
          product.matchesSearch = true; // Show all rows if search term is empty
          product.highlighted = false; // Remove highlighting
        }
      });
    }  

  setLastHovered(index: number): void {
    this.lastHoveredIndex = index;
  }

  clearLastHovered(): void {
    this.lastHoveredIndex = -1;
  }


  setHoveredIndex(index: number): void {
    this.lastHoveredIndex = index;
  }

  getTotalAmount(): number {
    return (() => {
      var amount = 0;
      this.products.forEach((product) => {
        if(product){
          if(product.status == 'Approved'){
            amount += product.price;
          } else{
            return
          }
        } else{
          return
        }
      })
      return amount;
    })();
  }

  async getUserEmail(currentUser: string): Promise<string> {
    try {
      const userEmail = await this.authService.getUserEmail(currentUser);
      const parts = userEmail.split('@');
      
      if (parts.length >= 1) {
        const username = parts[0];
        return username;
      }
      
      return userEmail;
    } catch (error) {
      console.error('Error:', error);
      return ''; // Return an empty string in case of error
    }
  }  

  blocks = [
    { value: 1250, icon: 'eye-outline', label: 'Daily Views' },
    { value: 344, icon: 'cart-outline', label: 'Sales' },
    { value: 8950, icon: 'chatbubbles-outline', label: 'Comments' },
    { value: this.getTotalAmount(), icon: 'cash-outline', label: 'Balance' },
  ];
}
