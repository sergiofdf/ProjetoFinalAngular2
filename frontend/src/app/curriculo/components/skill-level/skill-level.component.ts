import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-level',
  templateUrl: './skill-level.component.html',
  styleUrls: ['./skill-level.component.css'],
})
export class SkillLevelComponent {
  @Input() public skillTitle!: string;
  @Input() public skillLevel!: string;
}
