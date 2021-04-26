import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comic } from './Comic';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
 
  public getComics():Observable<Comic[]>{
    return this.http.get<Comic[]>(`${this.apiServerUrl}/comics`);
  }

  public addComic(comic : Comic):Observable<Comic>{
    return this.http.post<Comic>(`${this.apiServerUrl}/comics`,comic);
  }

  public deleteComic(comicId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/comics/${comicId}`);
  }
  public updateComic(comic: Comic): Observable<Comic> {
    console.log(comic);

    return this.http.put<Comic>(`${this.apiServerUrl}/comics/${comic._id}`, comic,);
  }
}
