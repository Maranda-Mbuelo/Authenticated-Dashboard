import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() show: boolean | null = null;
  @Input() type: 'error' | 'success' | null = null;
  @Input() message: string = '';

  closePopup() {
    this.show = false;
  }
}
