import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OlympicCountryParticipations} from "../../core/models/Olympic";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {Location} from "@angular/common";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: false
})
export class DetailComponent implements OnInit {

  olympic?: OlympicCountryParticipations;

  olympicsData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Medals per olympic',
      },
      legend: {
        display: false,
      },
    },
  };
  public lineChartType: ChartType = 'line';

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.olympic = this.route.snapshot.data['olympic'];
    this.olympicsData = {
      labels: this.olympic?.participations.map(value => value.year),
      datasets: [
        {
          data: this.olympic?.participations.map(value => value.medalsCount) ?? []
        }]
    };
  }

  getTotalMedals(): number {
    return this.olympic?.participations.reduce((total, participation) => total + participation.medalsCount, 0) ?? 0;
  }

  getTotalAthletes(): number {
    return this.olympic?.participations.reduce((total, participation) => total + participation.athleteCount, 0) ?? 0;
  }

  goToPreviousPage(): void {
    this.location.back();
  }
}
