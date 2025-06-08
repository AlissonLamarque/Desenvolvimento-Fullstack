
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppointments } from '../contexts/AppointmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, Stethoscope, PlusCircle, User } from 'lucide-react';

const Appointments = () => {
  const { getUserAppointments } = useAppointments();
  const appointments = getUserAppointments();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const sortedAppointments = appointments.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-veterinary-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-veterinary-primary rounded-full p-3">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Histórico de Atendimentos</h1>
          <p className="mt-2 text-gray-600">Acompanhe todas as consultas dos seus pets</p>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma consulta agendada
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Você ainda não agendou nenhuma consulta. Comece marcando a primeira!
            </p>
            <Link to="/add-appointment">
              <Button className="bg-veterinary-primary hover:bg-veterinary-secondary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Agendar Primeira Consulta
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {appointments.length} {appointments.length === 1 ? 'consulta registrada' : 'consultas registradas'}
              </p>
              <Link to="/add-appointment">
                <Button className="bg-veterinary-primary hover:bg-veterinary-secondary">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nova Consulta
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {sortedAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-veterinary-light rounded-full p-2">
                          <Calendar className="h-5 w-5 text-veterinary-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{appointment.petName}</CardTitle>
                          <CardDescription className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">Veterinário:</span>
                      <span className="ml-2">{appointment.veterinarian}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Motivo:</span>
                      <p className="mt-1 bg-gray-50 p-2 rounded">{appointment.reason}</p>
                    </div>

                    {appointment.diagnosis && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Diagnóstico:</span>
                        <p className="mt-1 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                          {appointment.diagnosis}
                        </p>
                      </div>
                    )}

                    {appointment.treatment && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Tratamento:</span>
                        <p className="mt-1 bg-green-50 p-2 rounded border-l-4 border-green-400">
                          {appointment.treatment}
                        </p>
                      </div>
                    )}

                    {appointment.notes && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Observações:</span>
                        <p className="mt-1 bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                          {appointment.notes}
                        </p>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Criado em: {new Date(appointment.createdAt).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(appointment.createdAt).toLocaleTimeString('pt-BR')}
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

export default Appointments;
