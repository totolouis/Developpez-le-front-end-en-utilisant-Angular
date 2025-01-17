import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, map, Observable, of} from 'rxjs';
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
        // notificationService.showError(...);
        this.olympics$.next([]);
        return of([]);
      })
    );
  }

  getOlympics(): Observable<OlympicCountryParticipations[]> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<OlympicCountryParticipations> {
    console.log('getOlympicById', id);
    console.log(this.olympics$.value);
    return this.olympics$.pipe(
      map(olympics => olympics.find(value => value.id === id)),
      filter(olympic => olympic !== null && olympic !== undefined)
    );
  }

  getParticipationsById(olympicId: number) {
    return this.olympics$.pipe(
      map(olympics => {
        const olympic = olympics.find(value => value.id === olympicId);
        return olympic ? olympic.participations : [];
      }));
  }
}
