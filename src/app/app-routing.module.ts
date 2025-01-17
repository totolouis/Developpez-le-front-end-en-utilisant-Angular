import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DetailComponent} from "./detail/detail.component";
import {OlympicResolver} from "./core/resolvers/olympic.resolver";

const routes: Routes = [
  {
    path: 'olympics/:id',
    component: DetailComponent,
    resolve: {
      olympic: OlympicResolver
    }
  },
  {
    path: 'olympics',
    component: HomeComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
