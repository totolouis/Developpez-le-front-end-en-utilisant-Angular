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
    _state: RouterStateSnapshot): Observable<OlympicCountryParticipations | null> {
    const id = +route.params['id'];
    return this.olympicService.getOlympicById(id).pipe(
      filter(data => !!data),
      first());
  }

}
