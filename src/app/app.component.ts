import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
  ],
  selector: 'star-wars-test-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Star Wars App';
}
