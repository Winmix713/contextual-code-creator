import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MatchSelection from "@/components/MatchSelection";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const NewPredictions = () => {
  useDocumentTitle("Create Prediction");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="relative">
        <MatchSelection />
      </main>
      <Footer />
    </div>
  );
};

export default NewPredictions;
