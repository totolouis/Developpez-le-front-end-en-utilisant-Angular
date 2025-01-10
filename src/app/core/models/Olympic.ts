import {Participation} from "./Participation";

export interface OlympicCountryParticipations {
  id: number;
  countryName: string;
  participations: Participation[];
}
