import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Index = () => {
  const navigate = useNavigate();
  useDocumentTitle("WinMix TipsterHub");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="relative">
        <HeroSection />

        {/* CTA Section */}
        <section className="ml-0 md:ml-[84px] lg:ml-64 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    Ready for AI-Powered Predictions?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Select 8 matches and WinMix's advanced pattern recognition engine will instantly generate detailed predictive analysis with confidence scores.
                  </p>
                  <Button
                    onClick={() => navigate('/predictions/new')}
                    size="lg"
                    className="group inline-flex items-center gap-2 h-12 px-8"
                  >
                    Create New Prediction
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="w-full lg:w-auto">
                  <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-foreground">Live AI Analysis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium text-foreground">Real-time Updates</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm font-medium text-foreground">Pattern Recognition</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="ml-0 md:ml-[84px] lg:ml-64 py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Why Choose WinMix?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by thousands of football enthusiasts worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Fast & Accurate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get predictions in seconds with industry-leading accuracy rates powered by ensemble learning.
                </p>
              </div>

              <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Secure & Private</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Enterprise-grade security with encrypted data transmission and strict privacy policies.
                </p>
              </div>

              <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Data-Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Analyze historical patterns, team form, and market movements with comprehensive dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
