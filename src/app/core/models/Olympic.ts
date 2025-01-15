import {Participation} from "./Participation";

export interface OlympicCountryParticipations {
  id: number;
  country: string;
  participations: Participation[];
}
