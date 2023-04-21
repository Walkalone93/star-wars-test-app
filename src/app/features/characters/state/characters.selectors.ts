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

export const selectCharactersPageState = (currentPage: number) => createSelector(
    selectCharactersState,
    state => state.entities[currentPage]
)

export const selectCharactersViewModel = createSelector(
    selectCharactersState,
    selectQueryParam('page'),
    selectRouteParam('name'),
    (charactersState, pageNumber, activeCharacterName): CharactersViewModel => {
        const page = charactersState.entities[Number(pageNumber) || 1];
        const activeCharacter = activeCharacterName && page
            ? page.characters.find(character => character.name === activeCharacterName) ?? null
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
    selectRouteParam('name'),
    (charactersState, pageNumber, activeCharacterName) => {
        const page = charactersState.entities[Number(pageNumber) || 1];
        const character = activeCharacterName && page
            ? page.characters.find(character => character.name === activeCharacterName) ?? null
            : null;
        return { character };
    }
);
