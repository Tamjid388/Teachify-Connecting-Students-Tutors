export interface TTutor {
  tutor_id: string;
  is_verified:boolean,
  image:string,
  averageRating:number;
  rating:number;
  total_reviews:number;
  bio:string;
  subject: string;
  education: string;
  avilability_slot: string;
  rate: number;
  experience: number;
    user: {
    name: string;
  };
}


export type AvailabilityPayload = {
slots:{
    day: string;
  startTime: string;
  endTime: string;
}[]
};