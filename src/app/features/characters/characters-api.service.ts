import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { Character, CharacterDetails, CharacterDetailsResponse, CharactersResponse } from './characters.models';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {

  private readonly url = 'https://swapi.tech/api/people';

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
            totalPages: response.total_pages,
          }
        }
      })
    );
  }

  getCharacterDetails(uid: number): Observable<CharacterDetails> {
    return this.httpClient.get<CharacterDetailsResponse>(`${this.url}/${uid}`).pipe(
      map((response: CharacterDetailsResponse) => {
        return {
          uid: response.result.uid,
          description: response.result.description,
          ...response.result.properties
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
