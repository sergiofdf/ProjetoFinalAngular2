import { SocialMedia } from './social-media.model';
import { Experience } from './experience.model';
import { Skill } from "./skill.model";

export interface UserComplete {
  userId: string | number;
  name: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  profileImageUrl: string;
  userRole: string;
  password: string;
  skills: Skill[];
  experiences: Experience[];
  socialMediaInfos: SocialMedia;
}
