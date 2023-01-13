import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-text',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.css'],
})
export class InfoTextComponent {
  @Input() public titleElement!: string;
  @Input() public paragElement!: string;
  @Input() public textElement!: string;
}
