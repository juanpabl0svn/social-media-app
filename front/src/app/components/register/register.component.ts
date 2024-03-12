import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(public dataService: DataService) {}


  ngOnInit(){
    this.dataService.print();
  }

  

}
