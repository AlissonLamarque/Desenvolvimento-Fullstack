
import React from 'react';
import { Link } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Heart, PlusCircle, Calendar, Weight, Palette } from 'lucide-react';

const Pets = () => {
  const { getUserPets } = usePets();
  const pets = getUserPets();

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐱';
      case 'bird':
        return '🐦';
      case 'rabbit':
        return '🐰';
      case 'hamster':
        return '🐹';
      default:
        return '🐾';
    }
  };

  const getSpeciesName = (species: string) => {
    switch (species) {
      case 'dog':
        return 'Cachorro';
      case 'cat':
        return 'Gato';
      case 'bird':
        return 'Pássaro';
      case 'rabbit':
        return 'Coelho';
      case 'hamster':
        return 'Hamster';
      default:
        return 'Outro';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-veterinary-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-veterinary-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Pets</h1>
          <p className="mt-2 text-gray-600">Gerencie as informações dos seus pets</p>
        </div>

        {pets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum pet cadastrado
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Você ainda não cadastrou nenhum pet. Comece adicionando o primeiro!
            </p>
            <Link to="/add-pet">
              <Button className="bg-veterinary-primary hover:bg-veterinary-secondary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Cadastrar Primeiro Pet
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {pets.length} {pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'}
              </p>
              <Link to="/add-pet">
                <Button className="bg-veterinary-primary hover:bg-veterinary-secondary">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar Pet
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <Card key={pet.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getSpeciesIcon(pet.species)}</span>
                        <div>
                          <CardTitle className="text-lg">{pet.name}</CardTitle>
                          <CardDescription>{getSpeciesName(pet.species)}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-veterinary-primary text-veterinary-primary">
                        {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pet.breed && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Raça:</span>
                        <span className="ml-2">{pet.breed}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Weight className="h-4 w-4 mr-2" />
                      <span>{pet.weight} kg</span>
                    </div>

                    {pet.color && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Palette className="h-4 w-4 mr-2" />
                        <span>{pet.color}</span>
                      </div>
                    )}

                    {pet.observations && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">Observações:</span>
                        <p className="mt-1">{pet.observations}</p>
                      </div>
                    )}

                    <div className="pt-3 border-t">
                      <Link to={`/add-appointment?petId=${pet.id}`}>
                        <Button variant="outline" className="w-full border-veterinary-primary text-veterinary-primary hover:bg-veterinary-primary hover:text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar Consulta
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Pets;
