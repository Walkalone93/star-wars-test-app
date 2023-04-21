import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { Character, CharactersResponse } from './characters.models';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {

  private readonly url = 'https://swapi.dev/api/people';

  constructor(private httpClient: HttpClient) { }

  getCharacters(url: string): Observable<PaginatedResult<Character[]>> {
    const { searchParams } = new URL(url);
    const currentPage = Number(searchParams.get('page'));

    return this.httpClient.get<CharactersResponse>(url).pipe(
      map((response: CharactersResponse) => {
        return {
          result: response.results,
          pagination: {
            next: response.next,
            prev: response.previous,
            currentPage,
            totalPages: Math.ceil(response.count / 10)
          }
        }
      })
    );
  }

  generateUrl(page: number): string {
    const httpParams = new HttpParams({
      fromObject: {
        page,
        limit: 10
      }
    });
    return `${this.url}?${httpParams.toString()}`;
  }
}
