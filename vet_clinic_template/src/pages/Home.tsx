
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, Stethoscope, PlusCircle, Calendar, List, UserPlus } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-veterinary-light to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-veterinary-primary rounded-full p-4">
                <Heart className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Bem-vindo à <span className="text-veterinary-primary">VetCare</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Cuidando dos seus pets com amor, carinho e profissionalismo. 
              Sua clínica veterinária de confiança.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isAuthenticated ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Olá, {user?.name}! 👋
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                O que você gostaria de fazer hoje?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <PlusCircle className="h-6 w-6 text-veterinary-primary group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">Cadastrar Pet</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Adicione um novo pet ao seu perfil
                  </CardDescription>
                  <Link to="/add-pet">
                    <Button className="w-full bg-veterinary-primary hover:bg-veterinary-secondary">
                      Cadastrar
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <List className="h-6 w-6 text-veterinary-primary group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">Meus Pets</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Visualize todos os seus pets cadastrados
                  </CardDescription>
                  <Link to="/pets">
                    <Button variant="outline" className="w-full border-veterinary-primary text-veterinary-primary hover:bg-veterinary-primary hover:text-white">
                      Ver Pets
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-veterinary-primary group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">Agendar Consulta</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Agende um atendimento para seu pet
                  </CardDescription>
                  <Link to="/add-appointment">
                    <Button className="w-full bg-veterinary-primary hover:bg-veterinary-secondary">
                      Agendar
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="h-6 w-6 text-veterinary-primary group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">Atendimentos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Visualize o histórico de consultas
                  </CardDescription>
                  <Link to="/appointments">
                    <Button variant="outline" className="w-full border-veterinary-primary text-veterinary-primary hover:bg-veterinary-primary hover:text-white">
                      Ver Histórico
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Acesse sua conta para começar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Faça login ou crie uma conta para gerenciar seus pets e agendar consultas veterinárias.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-veterinary-primary text-veterinary-primary hover:bg-veterinary-primary hover:text-white">
                  Fazer Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="bg-veterinary-primary hover:bg-veterinary-secondary">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Criar Conta
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-veterinary-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-veterinary-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cuidado Especializado</h3>
                <p className="text-gray-600">Profissionais qualificados para cuidar do seu pet com todo carinho</p>
              </div>
              
              <div className="text-center">
                <div className="bg-veterinary-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-veterinary-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Agendamento Fácil</h3>
                <p className="text-gray-600">Sistema simples para marcar consultas e acompanhar o histórico</p>
              </div>
              
              <div className="text-center">
                <div className="bg-veterinary-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-veterinary-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Atendimento Completo</h3>
                <p className="text-gray-600">Consultas, exames e tratamentos para manter seu pet sempre saudável</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
