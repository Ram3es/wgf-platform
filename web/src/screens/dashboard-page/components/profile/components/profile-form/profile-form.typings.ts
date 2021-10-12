import { ChangeEvent } from 'react';

export interface IProfileFormProps {
  profileData: IProfileData | null;
  initialProfileData: IProfileData | null;
  profileFormSubmit: () => void;
  profileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isProfileEdit: boolean;
  cancelEditProfile: () => void;
  countryList: string[];
  selectedCountry: string;
  setSelectedCountry: (selected: string) => void;
}
