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
  division: string;
  tourType: string;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  guides: IGuide[];
}


interface IDivision {
  _id: string;
  name: string;
}

interface ITourType {
  _id: string;
  name: string;
}

interface IGuide {
  _id: string;
  name: string;
}
