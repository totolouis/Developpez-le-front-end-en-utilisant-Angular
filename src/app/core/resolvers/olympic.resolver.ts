import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {OlympicCountryParticipations} from "../models/Olympic";
import {Injectable} from "@angular/core";
import {OlympicService} from "../services/olympic.service";
import {filter, first, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OlympicResolver implements Resolve<OlympicCountryParticipations | null> {
  constructor(private olympicService: OlympicService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<OlympicCountryParticipations | null> {
    // Based on an array index so that is why i need the plus 1
    const id = +route.params['id'] + 1;
    console.log('Resolving Olympic data for ID:', id);
    return this.olympicService.getOlympicById(id).pipe(
      filter(data => !!data),
      first());
  }

}
