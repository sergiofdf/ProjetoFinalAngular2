import { ExperienceContainer } from './models/experience-container.model';
import { User } from './../cadastro-dados/models/user.model';
import { FormGroup } from '@angular/forms';
import { IconText } from './models/icon-text.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../cadastro-dados/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComplete } from '../cadastro-dados/models/userComplete.model';
import { Skill } from '../cadastro-dados/models/skill.model';
import { Experience } from '../cadastro-dados/models/experience.model';
import { SocialMedia } from './../cadastro-dados/models/social-media.model';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css'],
})


export class CurriculoComponent implements OnInit{
  public title = 'curriculo';


  public userId!: string;

  public skillBars!: Skill[];
  public contact!: User;
  public experiencesContainers!: Experience[]
  public socialMedias!: SocialMedia

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.usersService.getUserCompleteById(this.userId).subscribe({
      next: (res: any) => {
        // let { userComplete.skills, userComplete.experiences, userComplete.socialMedias, ...rest } = res;
        const userComplete : UserComplete = res;
        this.skillBars = userComplete.skills;
        this.experiencesContainers = userComplete.experiences;
        this.socialMedias = userComplete.socialMediaInfos;
        const rest: any = { ... userComplete}
        delete rest.skills
        delete rest.experiences
        delete rest.socialMediaInfos
        this.contact = rest;
        console.log(this.contact);

      },
      error: (err) => console.log(err)
  });

  }

  /*public skillBars: Skill[] = [
    {
      skillTitle: 'C#',
      skillLevel: '90',
    },
    {
      skillTitle: 'SQL',
      skillLevel: '90',
    },
    {
      skillTitle: 'WEB API',
      skillLevel: '80',
    },
    {
      skillTitle: 'HTML & CSS',
      skillLevel: '90',
    },
    {
      skillTitle: 'JavaScript',
      skillLevel: '80',
    },
    {
      skillTitle: 'Angular',
      skillLevel: '60',
    },
  ];

  public languageBars: Skill[] = [
    {
      skillTitle: 'Portuguese',
      skillLevel: '100',
    },
    {
      skillTitle: 'English',
      skillLevel: '90',
    },
    {
      skillTitle: 'French',
      skillLevel: '30',
    },
  ];

  public contact: ContactData = {
    imageUrl:
      'https://github.com/matteabk/ProjetoAngularI/blob/main/src/assets/FOTO_PERFIL_-_Matheus_A.jpg?raw=true',
    contactInfo: [
      {
        icon: 'bi bi-person-fill',
        text: 'Matheus Alencastro',
      },
      {
        icon: 'bi bi-wallet-fill',
        text: 'Full Stack Developer',
      },
      {
        icon: 'bi bi-house-door-fill',
        text: 'Recife - PE',
      },
      {
        icon: 'bi bi-mailbox2',
        text: 'alencastromatheus@gmail.com',
      },
      {
        icon: 'bi bi-telephone-fill',
        text: '(81) 99597-4698',
      },
    ],
  };

  public experiencesContainers: ExperienceContainer[] = [
    {
      icon: 'bi bi-bag-fill',
      title: 'Experiência Profissional',
      experiences: [
        {
          titleElement: 'Full-Stack Developer / Banco Safra',
          textDateElement: 'Jun-2022  -  Dez-2022',
          paragElement:
            "Contratado pelo programa Top Coders, em parceria com a Ada (antiga Let's Code). Programa consiste em treinamento Full Stack, mesclado com experiências e treinamentos internos administrados pelo Banco Safra.",
        },
        {
          titleElement: 'Estagiário de Planejamento e Gestão / N&A Consultores',
          textDateElement: 'Jan-2021  -  Mai-2022',
          paragElement:
            'Estágio focado no planejamento e gestão de projetos de redes solares, tendo como escopo o acompanhamento e a fiscalização da execução e entregas de serviços em obra, além de realizra o controle do faturamento na compra de materiais e em medições.',
        },
        {
          titleElement: 'Estagiário de Qualidade / TPF Engenharia',
          textDateElement: 'Ago-2020  -  Jan-2021',
          paragElement:
            'Estágio focado na fiscalização das entregas de obras de restauração, realizando sempre um controle de qualidade com a elaboração de relatórios através do Power BI.',
        },
        {
          titleElement: 'Analista de Projetos / Poli Junior Engenharia',
          textDateElement: 'Jun-2019  -  Ago-2020',
          paragElement:
            'Capacitação e elaboração de projetos de engenharia civil, utilizando tecnologias como AutoCAD e Revit, além de realizar visitas técnicas em projetos atuantes.',
        },
      ],
    },
    {
      icon: 'bi bi-mortarboard-fill',
      title: 'Experiência Acadêmica',
      experiences: [
        {
          titleElement: 'Engenharia Civil - Poli UPE',
          textDateElement: 'Jan-2018  -  Current',
          paragElement:
            'Bacharelado em Engenharia Civil pela Escola Politécnica de Pernambuco (Universidade de Pernambuco).',
        },
        {
          titleElement: 'Formação WEB Full Stack - ADA',
          textDateElement: 'Mai-2022  -  Current',
          paragElement:
            'Curso realizado através do programa Top Coders, em conjunto com o Banco Safra para formação WEB Full Stack, com foco em C# para Back-end e JS / Angular para o Front-end.',
        },
        {
          titleElement:
            'Curso Intensivo de Inglês - Language Studies International (LSI)',
          textDateElement: 'Jan-2019  -  Mar-2019',
          paragElement:
            'Curso de inglês, realizado em intercâmbio em Londres, com enfoque em conversação e troca de experiências entre alunos.',
        },
      ],
    },
  ];

  public socialMedias: IconText[] = [
    {
      icon: 'bi bi-github',
      text: 'https://github.com/matteabk',
    },
    {
      icon: 'bi bi-facebook',
      text: 'https://facebook.com',
    },
    {
      icon: 'bi bi-instagram',
      text: 'https://instagram.com',
    },
    {
      icon: 'bi bi-linkedin',
      text: 'https://www.linkedin.com/in/matheus-kenderessy/',
    },
  ];

  onContactFormData(formData: FormGroup): void {
    console.log(formData.value);
  }*/
}
