import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Character } from 'src/app/features/characters/characters.models';
import { Pagination } from 'src/app/shared/models/pagination';
import { CharactersApiActions } from './characters.actions';

export interface CharactersState extends EntityState<CharactersPage> {
  loading: boolean;
  error: string | null;
}

export interface CharactersPage {
  characters: Character[];
  pagination: Pagination;
}

export const adapter: EntityAdapter<CharactersPage> = createEntityAdapter<CharactersPage>({
  selectId: page => page.pagination.currentPage,
});


const initialState: CharactersState = adapter.getInitialState({
  loading: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(CharactersApiActions.loadcharacters, state => ({
    ...state,
    loading: true,
  })),
  on(CharactersApiActions.loadcharacterssuccess, (state, { paginatedResult }) => {
    const { result, pagination } = paginatedResult;
    const page = {
      characters: result,
      pagination
    };
    
    return adapter.setOne(page, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(CharactersApiActions.loadcharactersfailure, state => ({
    ...state,
    loading: false,
    error: 'Error loading characters'
  })),
);

export const charactersFeature = createFeature({
  name: 'characters',
  reducer
});

const {
  selectIds,
  selectEntities,
  selectAll,
} = adapter.getSelectors();

export const selectCharactersIds = selectIds;
export const selectCharactersEntities = selectEntities;
export const selectAllCharacters = selectAll;