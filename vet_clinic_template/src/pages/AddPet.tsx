
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PlusCircle, Heart } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    color: '',
    observations: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addPet } = usePets();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpeciesChange = (value: string) => {
    setFormData({ ...formData, species: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addPet({
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        color: formData.color,
        observations: formData.observations,
      });

      toast({
        title: "Pet cadastrado com sucesso!",
        description: `${formData.name} foi adicionado à sua lista de pets`,
      });

      navigate('/pets');
    } catch (error) {
      toast({
        title: "Erro ao cadastrar pet",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-veterinary-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-veterinary-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Cadastrar Novo Pet</h1>
          <p className="mt-2 text-gray-600">Adicione as informações do seu pet</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="h-5 w-5 mr-2 text-veterinary-primary" />
              Informações do Pet
            </CardTitle>
            <CardDescription>
              Preencha todos os campos para cadastrar seu pet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Pet *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Rex, Mimi, Thor..."
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="species">Espécie *</Label>
                  <Select onValueChange={handleSpeciesChange} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a espécie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Cachorro</SelectItem>
                      <SelectItem value="cat">Gato</SelectItem>
                      <SelectItem value="bird">Pássaro</SelectItem>
                      <SelectItem value="rabbit">Coelho</SelectItem>
                      <SelectItem value="hamster">Hamster</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="breed">Raça</Label>
                  <Input
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Ex: Labrador, Persa, SRD..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Ex: Marrom, Preto, Rajado..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Idade (anos) *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    max="30"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Ex: 3"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Peso (kg) *</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Ex: 5.5"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Informações adicionais sobre o pet (alergias, comportamento, etc.)"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/pets')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-veterinary-primary hover:bg-veterinary-secondary"
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar Pet"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPet;
