import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersEffects } from './state/characters.effects';
import { charactersFeature } from './state/characters.reducer';
import { CharactersComponent } from './characters.component';
 
export const characterRoutes: Route[] = [
  {
    path: '',
    component: CharactersComponent,
    providers: [
      provideState(charactersFeature),
      provideEffects(CharactersEffects),
    ],
    children: [
      {
        path: ':name',
        component: CharacterDetailsComponent,
      },
    ]
  }
];