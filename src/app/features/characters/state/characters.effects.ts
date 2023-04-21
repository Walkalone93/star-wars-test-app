import { of } from 'rxjs';
import { map, mergeMap, catchError, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { CharactersApiService } from 'src/app/features/characters/characters-api.service';
import { CharactersApiActions } from './characters.actions';
import { selectCharacter, selectCharactersPageState } from './characters.selectors';

@Injectable()
export class CharactersEffects {

  loadCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(CharactersApiActions.loadcharacters),
    mergeMap(({ url }) => {
      const { searchParams } = new URL(url);
      const page = Number(searchParams.get('page'));

      return this.store.select(selectCharactersPageState(page)).pipe(
        first(),
        mergeMap(cached => {
          if (cached) {
            return of({
              result: cached.characters,
              pagination: cached.pagination,
            })
          }

          return this.charactersApiService.getCharacters(url);
        }),
        map(paginatedResult => CharactersApiActions.loadcharacterssuccess({ paginatedResult })),
        catchError(error => of(CharactersApiActions.loadcharactersfailure({ error })))
      )
    })
  ));

  loadCharacterDetails$ = createEffect(() => this.actions$.pipe(
    ofType(CharactersApiActions.loadcharacterdetails),
    mergeMap(({ uid, page }) => {
      return this.store.select(selectCharacter(page, uid)).pipe(
        first(),
        mergeMap(cached => {
          if (cached?.details) {
            return of(cached.details);
          }

          return this.charactersApiService.getCharacterDetails(Number(uid));
        }),
        map(details => CharactersApiActions.loadcharacterdetailssuccess({ details, page })),
        catchError(error => of(CharactersApiActions.loadcharacterdetailsfailure({ error })))
      )
    })
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private charactersApiService: CharactersApiService
  ) { }

}
