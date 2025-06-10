'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import NewAppointmentForm from '@/components/appointments/AppointmentForm';
import AppointmentList from '@/components/appointments/AppointmentList';
import AppointmentDetails from '@/components/appointments/AppointmentDetails';
import Link from 'next/link';

export default function Appointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch appointments');
      }
      
      setAppointments(data);
    } catch (error) {
      setError('Error loading appointments: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowNewForm(false);
  };

  const handleNewAppointmentClick = () => {
    setSelectedAppointment(null);
    setShowNewForm(true);
  };

  // Yeni randevu oluşturulduğunda çağrılacak fonksiyon
  const handleAppointmentCreated = (newAppointment) => {
    // Yeni randevu oluşturulduğunda randevu listesi bu fonksiyon ile güncellenir
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    setShowNewForm(false);
    setSelectedAppointment(newAppointment);
  };

  const handleMessageAdded = (appointmentId, message) => {
    const messageWithCorrectAdminStatus = {
      ...message,
      sender: {
        ...message.sender,
        isAdmin: session?.user?.isAdmin || false
      }
    };
    
    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id === appointmentId) {
          return {
            ...appointment,
            messages: [...(appointment.messages || []), messageWithCorrectAdminStatus],
          };
        }
        return appointment;
      })
    );
    
    if (selectedAppointment && selectedAppointment.id === appointmentId) {
      setSelectedAppointment({
        ...selectedAppointment,
        messages: [...(selectedAppointment.messages || []), messageWithCorrectAdminStatus],
      });
    }
  };

  // Admin kullanıcıları için yönlendirme paneli
  if (session?.user?.isAdmin) {
    return (
      <div className="py-20">
        <div className="max-w-md mx-auto bg-base-200 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-white mb-6">Yönetici Erişimi</h1>
          <p className="text-lg mb-8">Randevu İşlemleri için yönetici panelini kullanın</p>
          <Link href="/admin" className="btn btn-primary btn-lg mb-6">
            Yönetici Paneline Git
          </Link>
          
          {showNewForm ? (
            <div className="mt-10 text-left">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Yeni Randevu Oluştur</h2>
                <button 
                  onClick={() => setShowNewForm(false)}
                  className="btn btn-circle btn-sm"
                >
                  ✕
                </button>
              </div>
              <NewAppointmentForm 
                onAppointmentCreated={handleAppointmentCreated}
                onCancel={() => setShowNewForm(false)}
              />
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-base-300">
              <p className="mb-4">Eğer randevu almak istiyorsanız buraya tıklayın</p>
              <button 
                onClick={() => setShowNewForm(true)} 
                className="btn btn-secondary"
              >
                Randevu Al
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 mb-6 lg:mb-0 lg:pr-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-white">Senin Randevuların</h1>
              <button
                onClick={handleNewAppointmentClick}
                className="btn btn-primary"
              >
                Yeni Randevu
              </button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-10">
                <div className="text-accent">Randevular yükleniyor...</div>
              </div>
            ) : error ? (
              <div className="bg-red-500 text-white p-4 rounded-md">
                {error}
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-4">Henüz bir randevun yok.</p>
                <button
                  onClick={handleNewAppointmentClick}
                  className="btn btn-primary"
                >
                  İlk Randevunu Al
                </button>
              </div>
            ) : (
              <AppointmentList 
                appointments={appointments} 
                onSelectAppointment={handleSelectAppointment}
                selectedAppointmentId={selectedAppointment?.id}
              />
            )}
          </div>
          
          <div className="lg:w-2/3 lg:border-t-0 lg:border-l border-secondary pt-6 lg:pt-0 lg:pl-6">
            {showNewForm ? (
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Yeni bir randevu al</h2>
                <NewAppointmentForm 
                  onAppointmentCreated={handleAppointmentCreated}
                  onCancel={() => setShowNewForm(false)}
                />
              </div>
            ) : selectedAppointment ? (
              <AppointmentDetails 
                appointment={selectedAppointment}
                onMessageSent={handleMessageAdded}
                currentUserId={parseInt(session?.user?.id)}
                isAdmin={session?.user?.isAdmin}
              />
            ) : (
              <div className="text-center py-20 px-4">
                <h2 className="text-xl font-semibold text-gray-400 mb-4">
                  Detaylarını görüntülemek için bir randevu seç yada yeni bir tane al
                </h2>
                <button
                  onClick={handleNewAppointmentClick}
                  className="btn btn-primary"
                >
                  Yeni Randevu al
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}