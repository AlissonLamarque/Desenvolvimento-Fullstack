
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pet } from '../types';
import { useAuth } from './AuthContext';

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id' | 'ownerId' | 'createdAt'>) => void;
  getUserPets: () => Pet[];
  getPetById: (id: string) => Pet | undefined;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const usePets = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};

// Dados simbólicos para demonstração
const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    species: 'dog',
    breed: 'Labrador',
    age: 3,
    weight: 25.5,
    color: 'Dourado',
    observations: 'Pet muito carinhoso e brincalhão. Gosta de correr no parque.',
    ownerId: 'user1',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Mimi',
    species: 'cat',
    breed: 'Persa',
    age: 2,
    weight: 4.2,
    color: 'Branco com cinza',
    observations: 'Gata calma, prefere ambientes tranquilos.',
    ownerId: 'user1',
    createdAt: '2024-02-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Thor',
    species: 'dog',
    breed: 'Pastor Alemão',
    age: 5,
    weight: 35.0,
    color: 'Marrom e preto',
    observations: 'Cão guardião, muito obediente e leal.',
    ownerId: 'user1',
    createdAt: '2024-03-10T09:45:00Z'
  }
];

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedPets = localStorage.getItem('vetClinicPets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else {
      // Se não há pets salvos, use os dados mock
      setPets(mockPets);
      localStorage.setItem('vetClinicPets', JSON.stringify(mockPets));
    }
  }, []);

  const addPet = (petData: Omit<Pet, 'id' | 'ownerId' | 'createdAt'>) => {
    if (!user) return;

    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(),
      ownerId: user.id,
      createdAt: new Date().toISOString(),
    };

    const updatedPets = [...pets, newPet];
    setPets(updatedPets);
    localStorage.setItem('vetClinicPets', JSON.stringify(updatedPets));
  };

  const getUserPets = () => {
    if (!user) return [];
    return pets.filter(pet => pet.ownerId === user.id);
  };

  const getPetById = (id: string) => {
    return pets.find(pet => pet.id === id);
  };

  const value = {
    pets,
    addPet,
    getUserPets,
    getPetById,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};
