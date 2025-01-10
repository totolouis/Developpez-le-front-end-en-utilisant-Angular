import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {OlympicCountryParticipations} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountryParticipations[]>([]);

  constructor(private http: HttpClient) {}

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
}
