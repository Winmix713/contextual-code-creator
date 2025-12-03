import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Phase9Dashboard from '@/components/phase9';
import Footer from '@/components/Footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const Phase9Page = () => {
  useDocumentTitle("Phase 9 - Advanced Features");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
        <div className="container mx-auto px-4 py-12">
          <Phase9Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Phase9Page;
