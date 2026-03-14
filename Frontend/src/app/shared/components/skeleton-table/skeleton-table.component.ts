import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.css']
})
export class SkeletonTableComponent {
  rows = Array(5);
}
