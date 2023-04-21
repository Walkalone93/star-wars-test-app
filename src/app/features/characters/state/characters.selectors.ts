import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Character } from 'src/app/features/characters/characters.models';
import { selectQueryParam, selectRouteParam } from 'src/app/store/selectors/router.selectors';
import { charactersFeature } from './characters.reducer';
import * as fromCharacters from './characters.reducer';

export interface CharactersViewModel {
    page: fromCharacters.CharactersPage | null;
    activeCharacter: Character | null;
    loading: boolean;
    error: string | null;
}

export interface CharacterViewModel {
    character: Character | null;
}

export const selectCharactersState = createFeatureSelector<fromCharacters.CharactersState>(charactersFeature.name);

export const selectCharactersPageState = (pageNumber: number) => createSelector(
    selectCharactersState,
    state => state.entities[pageNumber]
)

export const selectCharacter = (pageNumber: number, uid: string) => createSelector(
    selectCharactersState,
    state => {
        const pageState = state.entities[pageNumber];
        return pageState?.characters.find(character => character.uid === uid)
    }
);

export const selectCharactersViewModel = createSelector(
    selectCharactersState,
    selectQueryParam('page'),
    selectRouteParam('uid'),
    (charactersState, pageNumber, characterId): CharactersViewModel => {
        const page = charactersState.entities[Number(pageNumber) || 1];
        const activeCharacter = characterId && page
            ? page.characters.find(character => character.uid === characterId) ?? null
            : null;
        return {
            page: page ?? null,
            activeCharacter,
            loading: charactersState.loading,
            error: charactersState.error
        };
    }
);

export const selectCharacterViewModel = createSelector(
    selectCharactersState,
    selectQueryParam('page'),
    selectRouteParam('uid'),
    (charactersState, pageNumber, characterId) => {
        const page = charactersState.entities[Number(pageNumber) || 1];
        const character = characterId && page
            ? page.characters.find(character => character.uid === characterId) ?? null
            : null;

        return { character };
    }
);
