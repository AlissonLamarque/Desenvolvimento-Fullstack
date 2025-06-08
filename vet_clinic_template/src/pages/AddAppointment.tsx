
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import { useAppointments } from '../contexts/AppointmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar, Clock, Stethoscope } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AddAppointment = () => {
  const [searchParams] = useSearchParams();
  const preSelectedPetId = searchParams.get('petId');
  
  const [formData, setFormData] = useState({
    petId: preSelectedPetId || '',
    date: '',
    time: '',
    reason: '',
    veterinarian: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getUserPets, getPetById } = usePets();
  const { addAppointment } = useAppointments();
  const navigate = useNavigate();
  const { toast } = useToast();
  const pets = getUserPets();

  useEffect(() => {
    if (preSelectedPetId) {
      setFormData(prev => ({ ...prev, petId: preSelectedPetId }));
    }
  }, [preSelectedPetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedPet = getPetById(formData.petId);
      if (!selectedPet) {
        throw new Error('Pet não encontrado');
      }

      addAppointment({
        petId: formData.petId,
        petName: selectedPet.name,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        veterinarian: formData.veterinarian,
        notes: formData.notes,
        status: 'scheduled',
      });

      toast({
        title: "Consulta agendada com sucesso!",
        description: `Consulta para ${selectedPet.name} agendada para ${new Date(formData.date).toLocaleDateString('pt-BR')} às ${formData.time}`,
      });

      navigate('/appointments');
    } catch (error) {
      toast({
        title: "Erro ao agendar consulta",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  if (pets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-veterinary-light to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cadastre um pet primeiro
          </h1>
          <p className="text-gray-600 mb-6">
            Para agendar uma consulta, você precisa ter pelo menos um pet cadastrado.
          </p>
          <Button 
            onClick={() => navigate('/add-pet')}
            className="bg-veterinary-primary hover:bg-veterinary-secondary"
          >
            Cadastrar Pet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-veterinary-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-veterinary-primary rounded-full p-3">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Agendar Consulta</h1>
          <p className="mt-2 text-gray-600">Marque uma consulta veterinária para seu pet</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-veterinary-primary" />
              Informações da Consulta
            </CardTitle>
            <CardDescription>
              Preencha os dados para agendar a consulta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="petId">Pet *</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('petId', value)} 
                  value={formData.petId}
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.species === 'dog' ? 'Cachorro' : 
                         pet.species === 'cat' ? 'Gato' : 
                         pet.species === 'bird' ? 'Pássaro' : 
                         pet.species === 'rabbit' ? 'Coelho' : 
                         pet.species === 'hamster' ? 'Hamster' : 'Outro'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data da Consulta *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="time">Horário *</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('time', value)} 
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="08:30">08:30</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="09:30">09:30</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="10:30">10:30</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="11:30">11:30</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="14:30">14:30</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="15:30">15:30</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="16:30">16:30</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                      <SelectItem value="17:30">17:30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="veterinarian">Veterinário *</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('veterinarian', value)} 
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o veterinário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. João Silva">Dr. João Silva</SelectItem>
                    <SelectItem value="Dra. Maria Santos">Dra. Maria Santos</SelectItem>
                    <SelectItem value="Dr. Carlos Oliveira">Dr. Carlos Oliveira</SelectItem>
                    <SelectItem value="Dra. Ana Costa">Dra. Ana Costa</SelectItem>
                    <SelectItem value="Dr. Pedro Lima">Dr. Pedro Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reason">Motivo da Consulta *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Descreva o motivo da consulta (ex: consulta de rotina, vacinação, sintomas, etc.)"
                  required
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Informações adicionais que podem ser úteis para o veterinário"
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/appointments')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-veterinary-primary hover:bg-veterinary-secondary"
                >
                  {isLoading ? "Agendando..." : "Agendar Consulta"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddAppointment;
