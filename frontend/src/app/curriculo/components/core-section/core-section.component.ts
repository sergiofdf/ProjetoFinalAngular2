import { Experience } from './../../models/experience.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-core-section',
  templateUrl: './core-section.component.html',
  styleUrls: ['./core-section.component.css'],
})
export class CoreSectionComponent {
  @Input() public iconElement!: string;
  @Input() public textElement!: string;
  @Input() public experiences!: Experience[];
}
