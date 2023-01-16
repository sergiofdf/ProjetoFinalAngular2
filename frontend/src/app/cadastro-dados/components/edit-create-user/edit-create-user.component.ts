import { SkillDataFormComponent } from './skill-data-form/skill-data-form.component';
import { ExperienceDataFormComponent } from './experience-data-form/experience-data-form.component';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-create-user',
  templateUrl: './edit-create-user.component.html',
  styleUrls: ['./edit-create-user.component.css']
})
export class EditCreateUserComponent implements OnInit  {

  public educationsExperienceForms!: FormGroup[];
  public socialMedia!: FormGroup;
  public userId!: string;

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  @ViewChild('skillsContainer', {read: ViewContainerRef}) skillsContainer!: ViewContainerRef;

  workExpId: number = 0;
  workExpReferences = Array<ComponentRef<ExperienceDataFormComponent>>();
  skillId:number = 0;
  skillsReferences = Array<ComponentRef<SkillDataFormComponent>>();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.updateForm();
    }
  }

  public addWorkExperienceForm(): void{
    const expComponentRef = this.container.createComponent(ExperienceDataFormComponent);

    const expComponent = expComponentRef.instance;
    expComponent.workExpId = this.workExpId++;
    expComponent.parentRef = this;

    this.workExpReferences.push(expComponentRef);
  }

  public removeWorkExperienceForm(id: number): void{
    if (this.container.length < 1) return;

    const componentRef = this.workExpReferences.filter(
      x => x.instance.workExpId == id
    )[0];

    const containerIndex: number = this.container.indexOf(componentRef.changeDetectorRef as any);

    // removing component from container
    this.container.remove(containerIndex);

    // removing component from the list
    this.workExpReferences = this.workExpReferences.filter(
      x => x.instance.workExpId !== id);
  }

  public addSkillForm(): void{
    const skillComponentRef = this.skillsContainer.createComponent(SkillDataFormComponent);

    const skillComponent = skillComponentRef.instance;
    skillComponent.skillId = this.skillId++;
    skillComponent.parentRef = this;

    this.skillsReferences.push(skillComponentRef);
  }

  public removeSkillForm(id: number): void{
    if (this.skillsContainer.length < 1) return;

    const componentRef = this.skillsReferences.filter(
      x => x.instance.skillId == id
    )[0];

    const skillsContainerIndex: number = this.skillsContainer.indexOf(componentRef.changeDetectorRef as any);

    // removing component from container
    this.skillsContainer.remove(skillsContainerIndex);

    // removing component from the list
    this.skillsReferences = this.skillsReferences.filter(
      x => x.instance.skillId !== id);
  }

  private updateForm(): void {}

}
