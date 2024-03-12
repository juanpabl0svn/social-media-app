import { Component } from '@angular/core';
import { IUSER } from '../../models/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  listOfPeople: IUSER[] = [];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then(({ results }) => (this.listOfPeople = results))
      .catch(null);

  }
}
