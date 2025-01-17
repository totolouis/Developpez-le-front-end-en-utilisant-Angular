import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../core/services/olympic.service";
import {OlympicCountryParticipations} from "../core/models/Olympic";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: false
})
export class DetailComponent implements OnInit {

  olympic?: OlympicCountryParticipations;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.olympic = this.route.snapshot.data['olympic'];
    console.log(this.olympic);
    // const olympicId = this.route.snapshot.params['id'] + 1;
    // // TODO: handle beter the return of null
    // this.olympic$ = this.olympicService.getOlympicById(olympicId);
    // console.log(this.olympic$);
  }

  getTotalMedals(): number {
    return this.olympic?.participations.reduce((total, participation) => total + participation.medalsCount, 0) ?? 0;
  }

  getTotalAthletes(): number {
    return this.olympic?.participations.reduce((total, participation) => total + participation.athleteCount, 0) ?? 0;
  }
}
