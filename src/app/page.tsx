import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from './(public)/page';

export default function RootHomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
