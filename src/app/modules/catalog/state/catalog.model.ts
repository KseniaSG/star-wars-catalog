export interface CatalogResponse {
  message: string;
  next: string;
  previous: Nullable<string>;
  results: Person[];
  total_pages: number;
  total_records: number;
}

export interface Person {
  name: string;
  uid: string;
  url: string;
}

export interface PersonDetailsResponse {
  message: string;
  result: PersonDetails;
}

export interface PersonDetails {
  description: string;
  properties: {
    birth_year: string;
    created: Date;
    edited: Date;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string
    skin_color: string;
    url: string;
  }
}
