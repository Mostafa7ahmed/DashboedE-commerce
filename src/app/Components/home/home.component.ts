import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideHomeComponent } from '../side-home/side-home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SideHomeComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}
