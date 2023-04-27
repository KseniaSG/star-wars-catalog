import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs';
import { CatalogService } from 'src/app/modules/catalog/services/catalog.service';
import { PersonDetails, PersonDetailsResponse, PropertyToDisplay } from 'src/app/modules/catalog/state/catalog.model';

@UntilDestroy()
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  person!: PersonDetails;
  propertiesToDisplay: PropertyToDisplay[] = [
    { valueName: 'homeworld', title: "Home"},
    { valueName: 'height', title: "Height"},
    { valueName: 'birth_year', title: "Birth Year"},
    { valueName: 'hair_color', title: "Hair Color"},
    { valueName: 'created', title: "Created"}
  ];

  constructor(
    readonly service: CatalogService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        untilDestroyed(this),
        switchMap((params: Params) => {
          return this.service.getDetailsById(params['id']);
        })
      )
      .subscribe((res: PersonDetailsResponse) => {
        this.person = res.result;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
