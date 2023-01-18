import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.css']
})
export class SocialMediaFormComponent implements OnInit {

  public socialMediaForm!: FormGroup;

  constructor(
  ) { }

  ngOnInit(): void {
    this.buildsocialMediaForm();
  }

  private buildsocialMediaForm(): void {
    this.socialMediaForm = new FormGroup({
      userId: new FormControl(),
      socialMediaInfoId: new FormControl(null),
      facebookUrl: new FormControl(null),
      instagramUrl: new FormControl(null),
      githubUrl: new FormControl(null),
      linkedinUrl: new FormControl(null),
    });
  }
}
