import { IconText } from './../../models/icon-text.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() public socialMedias!: IconText[];
  @Output() public contactDataOutput: EventEmitter<FormGroup> =
    new EventEmitter();

  onFormSubmitted(formData: FormGroup): void {
    this.contactDataOutput.emit(formData);
  }
}
