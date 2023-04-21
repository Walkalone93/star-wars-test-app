import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharactersViewModel, selectCharactersViewModel } from 'src/app/features/characters/state/characters.selectors';
import { AppState } from 'src/app/store';
import { CharactersApiActions } from 'src/app/features/characters/state/characters.actions';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Character } from './characters.models';
import { CharactersApiService } from './characters-api.service';

@Component({
  selector: 'star-wars-test-app-characters',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    PaginatorComponent,
    ListComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  
  vm$: Observable<CharactersViewModel> = this.store.select(selectCharactersViewModel);

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private charactersApiService: CharactersApiService) { }

  ngOnInit(): void {
    const page = this.route.snapshot.queryParams['page'] ?? 1;
    const url = this.charactersApiService.generateUrl(page);
    this.loadCharacters(url);
  }

  onPaginationChange(url: string) {
    this.updateUrl(url);
    this.loadCharacters(url); 
  }

  showCharacterDetails(character: Character) {
    const currentPage = this.getPageNumberFromUrl(window.location.href)
    this.router.navigate(
      [character.uid],
      {
        relativeTo: this.route,
        queryParams: { page: currentPage }, 
        queryParamsHandling: 'merge',
      }
    );

    this.loadCharacterDetails(character.uid);
  }

  private updateUrl(url: string) {
    const currentPage = this.getPageNumberFromUrl(url)
    this.router.navigate(
      ['/characters'], 
      {
        queryParams: { page: currentPage }, 
        queryParamsHandling: 'merge',
      });
  }

  private getPageNumberFromUrl(url: string): number {
    const { searchParams } = new URL(url);
    const pageQP = searchParams.get('page');
    return pageQP ? Number(pageQP) : 1;
  }

  private loadCharacters(url: string) {
    this.store.dispatch(CharactersApiActions.loadCharacters({ url }));
  }

  private loadCharacterDetails(uid: string) {
    const page = this.route.snapshot.queryParams['page'] ?? 1;
    this.store.dispatch(CharactersApiActions.loadCharacterDetails({ uid, page }));
  }
}
