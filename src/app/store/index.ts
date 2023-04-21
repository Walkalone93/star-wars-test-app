import { charactersFeature } from '../features/characters/state/characters.reducer';
import * as fromCharacters from '../features/characters/state/characters.reducer';

export interface AppState {
    [charactersFeature.name]: fromCharacters.CharactersState
}
