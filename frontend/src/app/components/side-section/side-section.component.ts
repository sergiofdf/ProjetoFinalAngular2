import { Component, Input } from '@angular/core';
import { ContactData } from 'src/app/models/contact-data.model';
import { Skill } from 'src/app/models/skill.model';

@Component({
  selector: 'app-side-section',
  templateUrl: './side-section.component.html',
  styleUrls: ['./side-section.component.css'],
})
export class SideSectionComponent {
  @Input() public contact!: ContactData;
  @Input() public skills!: Skill[];
  @Input() public languages!: Skill[];
}
