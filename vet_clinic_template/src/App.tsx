
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PetProvider } from "./contexts/PetContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";
import Pets from "./pages/Pets";
import AddAppointment from "./pages/AddAppointment";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PetProvider>
          <AppointmentProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-white">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 p-2 border-b bg-white">
                      <SidebarTrigger />
                      <div className="flex-1">
                        <Navigation />
                      </div>
                    </div>
                    <main className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/add-pet" element={<AddPet />} />
                        <Route path="/pets" element={<Pets />} />
                        <Route path="/add-appointment" element={<AddAppointment />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </BrowserRouter>
          </AppointmentProvider>
        </PetProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
