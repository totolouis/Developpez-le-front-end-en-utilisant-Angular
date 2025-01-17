import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountryParticipations} from "../../core/models/Olympic";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {DatasetPosition} from "../../core/models/Dataset";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {

  olympicsData: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };
  olympicsData$: BehaviorSubject<ChartData<'pie'>> = new BehaviorSubject<ChartData<'pie'>>({
    labels: [],
    datasets: []
  });
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Medals per country',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieTitle: string = 'Dashboard';
  public pieChartType: ChartType = 'pie';
  public olympics$: Observable<OlympicCountryParticipations[]> = of();
  protected readonly length = length;
  private subscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    // Pas utile de faire une subscription si on utilise pas la data en dehors de la template, donc a voir si on manipule mais pour línstant cest overkill.
    this.subscription = this.olympics$.subscribe(data => {
      if (data && data.length > 0) {
        this.olympicsData = {
          labels: data.map(item => item.country),
          datasets: [
            {
              data: data.map(item => item.participations.length),
            }
          ]
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public chartClicked({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);

    const activePoints = event?.native?.target;
    console.log(activePoints);
    console.log(active![0] as DatasetPosition);
    console.log((active![0] as DatasetPosition).index);
    console.log(`details/${(active![0] as DatasetPosition).index}`);
    // It seems that we can get the index under active[0].index, it will be the index we can use to make the redirection to a country when clicking
    this.router.navigateByUrl(`olympics/${(active![0] as DatasetPosition).index}`);
  }

  protected maximumNumberOfOlympics(): number {
    // TODO: find a better way to check if observable got data
    if (this.olympicsData.datasets[0]) {
      for (var i = 0, maxNumber = 0; i < this.olympicsData.labels!.length; i++) {
        if (this.olympicsData!.datasets![0].data[i] > maxNumber) {
          maxNumber = this.olympicsData!.datasets![0].data[i];
        }
      }
      return maxNumber;
    }
    return 0;
  }
}
