
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment } from '../types';
import { useAuth } from './AuthContext';
import { usePets } from './PetContext';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  getUserAppointments: () => Appointment[];
  getPetAppointments: (petId: string) => Appointment[];
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

// Dados simbólicos para demonstração
const mockAppointments: Appointment[] = [
  {
    id: '1',
    petId: '1',
    petName: 'Rex',
    date: '2024-06-05',
    time: '09:00',
    reason: 'Consulta de rotina e vacinação anual',
    diagnosis: 'Pet em excelente estado de saúde',
    treatment: 'Aplicação de vacina V10 e vermífugo',
    notes: 'Retornar em 1 ano para próxima vacinação',
    veterinarian: 'Dr. João Silva',
    status: 'completed',
    createdAt: '2024-05-25T10:30:00Z'
  },
  {
    id: '2',
    petId: '2',
    petName: 'Mimi',
    date: '2024-06-10',
    time: '14:30',
    reason: 'Exame de pele - coceira excessiva',
    diagnosis: 'Dermatite alérgica leve',
    treatment: 'Pomada antialérgica e mudança na ração',
    notes: 'Evitar ração com corantes. Retornar em 15 dias.',
    veterinarian: 'Dra. Maria Santos',
    status: 'completed',
    createdAt: '2024-06-01T15:20:00Z'
  },
  {
    id: '3',
    petId: '3',
    petName: 'Thor',
    date: '2024-06-15',
    time: '10:00',
    reason: 'Check-up e limpeza dentária',
    veterinarian: 'Dr. Carlos Oliveira',
    status: 'scheduled',
    createdAt: '2024-06-03T09:15:00Z'
  },
  {
    id: '4',
    petId: '1',
    petName: 'Rex',
    date: '2024-04-20',
    time: '16:00',
    reason: 'Castração',
    diagnosis: 'Procedimento realizado com sucesso',
    treatment: 'Cirurgia de castração sob anestesia geral',
    notes: 'Repouso por 10 dias. Retornar para retirada de pontos.',
    veterinarian: 'Dra. Ana Costa',
    status: 'completed',
    createdAt: '2024-04-15T11:45:00Z'
  }
];

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth();
  const { pets } = usePets();

  useEffect(() => {
    const savedAppointments = localStorage.getItem('vetClinicAppointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      // Se não há consultas salvas, use os dados mock
      setAppointments(mockAppointments);
      localStorage.setItem('vetClinicAppointments', JSON.stringify(mockAppointments));
    }
  }, []);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('vetClinicAppointments', JSON.stringify(updatedAppointments));
  };

  const getUserAppointments = () => {
    if (!user) return [];
    const userPetIds = pets.filter(pet => pet.ownerId === user.id).map(pet => pet.id);
    return appointments.filter(appointment => userPetIds.includes(appointment.petId));
  };

  const getPetAppointments = (petId: string) => {
    return appointments.filter(appointment => appointment.petId === petId);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('vetClinicAppointments', JSON.stringify(updatedAppointments));
  };

  const value = {
    appointments,
    addAppointment,
    getUserAppointments,
    getPetAppointments,
    updateAppointmentStatus,
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};
