
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { User, LogOut } from 'lucide-react';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-12 items-center">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">{user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-veterinary-primary hover:bg-veterinary-secondary">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
