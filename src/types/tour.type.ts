export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  arrivalLocation: string;
  departureLocation: string;
  location: string;
  description: string;
  costFrom: number;
  maxGuest: number;
  minAge: number;
  division: IDivision;
  tourType: ITourType;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  guides: IGuide[];
}

export interface IDivision {
  _id: string;
  name: string;
}

export interface ITourType {
  _id: string;
  name: string;
}

export interface IGuide {
  _id: string;
  name: string;
}
