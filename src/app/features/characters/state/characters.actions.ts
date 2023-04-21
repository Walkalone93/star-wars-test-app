import { createActionGroup, props } from '@ngrx/store';
import { Character, CharacterDetails } from 'src/app/features/characters/characters.models';
import { PaginatedResult } from 'src/app/shared/models/pagination';

export const CharactersApiActions = createActionGroup({
    source: 'Characters API',
    events: {
        'Load Characters': props<{ url: string }>(),
        'Load Characters Success': props<{ paginatedResult: PaginatedResult<Character[]> }>(),
        'Load Characters Failure': props<{ error: any }>(),

        'Load Character Details': props<{ uid: string; page: number }>(),
        'Load Character Details Success': props<{ details: CharacterDetails; page: number }>(),
        'Load Character Details Failure': props<{ error: any }>(),
    }
});