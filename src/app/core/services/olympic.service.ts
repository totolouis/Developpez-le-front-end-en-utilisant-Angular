import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {OlympicCountryParticipations} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountryParticipations[]>([]);

  constructor(private http: HttpClient) {
  }

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]);
        return of([]);
      })
    );
  }

  getOlympics(): Observable<OlympicCountryParticipations[]> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<OlympicCountryParticipations> {
    return this.olympics$.pipe(
      map(olympics => olympics.find(value => value.id === id)),
      map(olympic => {
        if (!olympic) {
          throw new Error(`${id} not found`);
        }
        return olympic;
      }),
    );
  }
}
