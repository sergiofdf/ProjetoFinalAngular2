import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-data-form',
  templateUrl: './skill-data-form.component.html',
  styleUrls: ['./skill-data-form.component.css']
})
export class SkillDataFormComponent implements OnInit {
  public skillForm!: FormGroup;

  constructor(
  ) { }

  ngOnInit(): void {
    this.buildSkillForm();
  }

  private buildSkillForm(): void {
    this.skillForm = new FormGroup({
      userId: new FormControl(),
      skillId: new FormControl(null, [Validators.required]),
      skillType: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      progressLevel: new FormControl(null, [Validators.required]),
    });
  }
}
