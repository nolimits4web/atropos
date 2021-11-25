import { Component } from '@angular/core';
import { AtroposOptions } from 'atropos/atropos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onEnter(event: Parameters<AtroposOptions['onEnter']>) {
    console.log(event);
  }
}
