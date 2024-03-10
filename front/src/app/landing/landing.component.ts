import { Component } from '@angular/core';
import { response } from 'express';
import { User } from '../core/models/models';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  listOfPeople: User[] = [];

  ngOnInit() {
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then(({ results }) => (this.listOfPeople = results))
      .catch(null)
  }
}
