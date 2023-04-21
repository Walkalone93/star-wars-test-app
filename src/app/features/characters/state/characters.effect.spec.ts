import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { CharactersApiActions } from 'src/app/features/characters/state/characters.actions';
import { CharactersPage, adapter } from 'src/app/features/characters/state/characters.reducer';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { Character } from 'src/app/features/characters/characters.models';
import { CharactersApiService } from 'src/app/features/characters/characters-api.service';
import { CharactersEffects } from './characters.effects';

describe(CharactersEffects.name, () => {

    let effects: CharactersEffects;
    let store: Store;
    let charactersApiService: CharactersApiService;

    const actions = new ActionsSubject();
    const url = 'http://example.com?page=1';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CharactersEffects,
                provideMockStore({
                    initialState: {
                        characters: adapter.getInitialState({
                            loading: false,
                            error: null
                        })
                    }
                }),
                provideMockActions(() => actions),
                {
                    provide: CharactersApiService,
                    useValue: {
                        getCharacters: jest.fn()
                    }
                }
            ]
        });

        effects = TestBed.inject(CharactersEffects);
        store = TestBed.inject(Store);
        charactersApiService = TestBed.inject(CharactersApiService);
    });

    describe('load characters', () => {
        it(`dispatches [Characters API] LoadCharactersSuccess event`, done => {
            const paginatedResult: PaginatedResult<Character[]> = {
                result: [],
                pagination: {
                    next: '',
                    prev: '',
                    currentPage: 1,
                    totalPages: 1
                }
            };
            jest.spyOn(charactersApiService, 'getCharacters').mockReturnValue(of(paginatedResult));

            actions.next(CharactersApiActions.loadcharacters({ url }));

            effects.loadCharacters$.subscribe(action => {
                expect(action).toEqual(CharactersApiActions.loadcharacterssuccess({ paginatedResult }));
                done();
            });
        });

        it(`dispatches [Characters API] LoadCharactersFailure event`, done => {
            const error = new Error('Failed to load characters');
            jest.spyOn(charactersApiService, 'getCharacters').mockImplementation(() => {
                throw error
            });

            actions.next(CharactersApiActions.loadcharacters({ url }));

            effects.loadCharacters$.subscribe(action => {
                expect(action).toEqual(CharactersApiActions.loadcharactersfailure({ error }));
                done();
            });
        });

        it('uses cached value', done => {
            const charactersPageMock: CharactersPage = {
                characters: [],
                pagination: {
                    next: '',
                    prev: '',
                    currentPage: 1,
                    totalPages: 1
                }
            };
            const paginatedResult: PaginatedResult<Character[]> = {
                result: charactersPageMock.characters,
                pagination: charactersPageMock.pagination,
            };
            const getCharactersSpy = jest.spyOn(charactersApiService, 'getCharacters');
            jest.spyOn(store, 'select').mockReturnValue(of(charactersPageMock));

            actions.next(CharactersApiActions.loadcharacters({ url }));

            effects.loadCharacters$.subscribe(action => {
                expect(getCharactersSpy).toBeCalledTimes(0);
                expect(action).toEqual(CharactersApiActions.loadcharacterssuccess({ paginatedResult }));
                done();
            });
        });
    });
})
