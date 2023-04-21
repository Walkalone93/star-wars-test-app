import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';
import { CharacterViewModel, selectCharacterDetailsViewModel } from 'src/app/features/characters/state/characters.selectors';
import { CharactersApiActions } from 'src/app/features/characters/state/characters.actions';

@Component({
  selector: 'star-wars-test-app-character-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {  

  vm$: Observable<CharacterViewModel> = this.store.select(selectCharacterDetailsViewModel);

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.loadCharacterDetails();
  }

  private loadCharacterDetails() {
    const uid = this.route.snapshot.params['uid'];
    const page = this.route.snapshot.queryParams['page'];
    this.store.dispatch(CharactersApiActions.loadCharacterDetails({ uid, page }));
  }

}
