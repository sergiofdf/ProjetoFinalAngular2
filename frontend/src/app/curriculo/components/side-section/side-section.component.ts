import { Component, Input } from '@angular/core';
import { ContactData } from '../../models/contact-data.model';
import { SkillCv } from '../../models/skill-cv.model';

@Component({
  selector: 'app-side-section',
  templateUrl: './side-section.component.html',
  styleUrls: ['./side-section.component.css'],
})
export class SideSectionComponent {
  @Input() public contact!: ContactData;
  @Input() public skills!: SkillCv[];
  @Input() public languages!: SkillCv[];
}
