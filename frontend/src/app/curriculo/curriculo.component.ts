import { SkillCv } from './models/skill-cv.model';
import { User } from 'src/app/cadastro-dados/models/user.model';
import { Skill } from 'src/app/cadastro-dados/models/skill.model';
import { UserComplete } from './../cadastro-dados/models/userComplete.model';
import { ExperienceContainer } from './models/experience-container.model';
import { FormGroup } from '@angular/forms';
import { IconText } from './models/icon-text.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../cadastro-dados/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from '../cadastro-dados/models/experience.model';
import { SocialMedia } from './../cadastro-dados/models/social-media.model';
import { ContactData } from './models/contact-data.model';
import { ExperienceCv } from './models/experience-cv.model';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css'],
})
export class CurriculoComponent implements OnInit {
  public title = 'curriculo';

  public userId!: string;

  public skillBars: SkillCv[] = [];
  public contact: ContactData = {
    imageUrl: '',
    contactInfo: []
  };
  public experiencesContainers: ExperienceContainer[] = [
    {
      icon: '',
      title: '',
      experiences: []
    },
    {
      icon: '',
      title: '',
      experiences: []
    }
  ];
  public socialMedias: IconText[] = [];
  public languageBars: SkillCv[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCurriculoData();
  }

  public getCurriculoData(): void {
    this.userId = this.route.snapshot.params['id'];
    this.usersService.getUserCompleteById(this.userId).subscribe({
      next: (res: UserComplete) => {
        let { skills, experiences, socialMediaInfos, ...rest } = res;
        this.parseContactInfo(rest);
        this.parseSkillInfo(skills);
        this.parseExperiencesInfo(experiences);
        this.parseSocialMediaInfo(socialMediaInfos);
      },
      error: (err) => console.log(err),
    });
  }

  parseContactInfo(contactData: User): void {
    this.contact.imageUrl = contactData.profileImageUrl;
    const contactInfo = [
      {
        icon: 'bi bi-person-fill',
        text: contactData.name,
      },
      {
        icon: 'bi bi-house-door-fill',
        text: `${contactData.city} - ${contactData.state}`,
      },
      {
        icon: 'bi bi-mailbox2',
        text: contactData.email,
      },
      {
        icon: 'bi bi-telephone-fill',
        text: contactData.phoneNumber,
      },
    ];
    this.contact.contactInfo = contactInfo;
  }

  parseSkillInfo(skillData: Skill[]): void {
    skillData.map((skill) => {
      const skillParsed: SkillCv = {
        skillTitle: skill.title,
        skillLevel: skill.progressLevel.toString(),
      };
      if (skill.skillType != 'Idiomas') {
        this.skillBars.push(skillParsed);
      } else {
        this.languageBars.push(skillParsed);
      }
    });
  }

  parseExperiencesInfo(experiences: Experience[]): void {
    this.experiencesContainers[0].icon = 'bi bi-bag-fill';
    this.experiencesContainers[0].title = 'Experiência Profissional';
    this.experiencesContainers[1].icon = 'bi bi-mortarboard-fill';
    this.experiencesContainers[1].title = 'Experiência Acadêmica';

    experiences.map((experience) => {
      let initialDateParsed = this.parseDateFormat(experience.initialDate);
      let finalDateParsed = this.parseDateFormat(experience.finalDate);
      const experienceParsed: ExperienceCv = {
        titleElement: experience.title,
        textDateElement: `${initialDateParsed} - ${finalDateParsed}`,
        paragElement: experience.expDescription,
      };
      if (experience.experienceType == 'Profissional') {
        this.experiencesContainers[0].experiences.push(experienceParsed);
      } else {
        this.experiencesContainers[1].experiences.push(experienceParsed);
      }
    });
  }

  parseDateFormat(date: string): any {
    if (date.toUpperCase() != 'ATUAL') {
      let i = 0;
      let formatedDate = '';
      while (date[i]) {
        if (i == 2 || i == 4)
          if (date[i] != '/' && date[i + 1] != '/') {
            formatedDate += '/';
          }
        formatedDate += date[i];
        i++;
      }
      return formatedDate;
    }
    else {
      return date;
    }
  }

  parseSocialMediaInfo(socialMediaInfos: SocialMedia): void {
    if (socialMediaInfos.facebookUrl != null) {
      this.socialMedias.push({
        icon: 'bi bi-facebook',
        text: socialMediaInfos.facebookUrl,
      });
    }
    if (socialMediaInfos.instagramUrl != null) {
      this.socialMedias.push({
        icon: 'bi bi-instagram',
        text: socialMediaInfos.instagramUrl,
      });
    }
    if (socialMediaInfos.githubUrl != null) {
      this.socialMedias.push({
        icon: 'bi bi-github',
        text: socialMediaInfos.githubUrl,
      });
    }
    if (socialMediaInfos.linkedinUrl != null) {
      this.socialMedias.push({
        icon: 'bi bi-linkedin',
        text: socialMediaInfos.linkedinUrl,
      });
    }
  }

  onContactFormData(formData: FormGroup): void {
    console.log(formData.value);
  }
}
