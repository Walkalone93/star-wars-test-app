import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { CharacterViewModel, selectCharacterViewModel } from 'src/app/features/characters/state/characters.selectors';

@Component({
  selector: 'star-wars-test-app-character-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent {  

  vm$: Observable<CharacterViewModel> = this.store.select(selectCharacterViewModel);

  constructor(private store: Store<AppState>) {}

}
