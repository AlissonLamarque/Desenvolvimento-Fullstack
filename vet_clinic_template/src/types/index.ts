
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  color: string;
  observations?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  date: string;
  time: string;
  reason: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  veterinarian: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}
