import { createActionGroup, props } from '@ngrx/store';
import { Character } from 'src/app/features/characters/characters.models';
import { PaginatedResult } from 'src/app/shared/models/pagination';

export const CharactersApiActions = createActionGroup({
    source: 'Characters API',
    events: {
        'LoadCharacters': props<{ url: string }>(),
        'LoadCharactersSuccess': props<{ paginatedResult: PaginatedResult<Character[]> }>(),
        'LoadCharactersFailure': props<{ error: any }>(),
    }
});