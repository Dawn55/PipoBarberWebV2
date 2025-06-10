import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatButton from '@/components/messages/ChatButton';

export const metadata = {
  title: 'Pipo Berber Hoşgeldiniz',
  description: 'Professional barbershop services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary text-white flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <ChatButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}