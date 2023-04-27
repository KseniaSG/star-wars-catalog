import { Component, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { akitaDevtools } from '@datorama/akita';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  constructor(private ngZone: NgZone) {
    if (!environment.production) {
      akitaDevtools(this.ngZone, { maxAge: 20 });
    }
  }
}
