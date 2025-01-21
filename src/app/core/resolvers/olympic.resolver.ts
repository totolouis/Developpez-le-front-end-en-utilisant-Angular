import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {OlympicCountryParticipations} from "../models/Olympic";
import {Injectable} from "@angular/core";
import {OlympicService} from "../services/olympic.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class OlympicResolver implements Resolve<OlympicCountryParticipations | null> {
  constructor(private olympicService: OlympicService,
              private router: Router) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<OlympicCountryParticipations | null> {
    const id = +route.params['id'];
    return this.olympicService.getOlympicById(id).pipe(
      catchError((error) => {
        // TODO: faire une meilleure redirection sur une page not-found
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

}
