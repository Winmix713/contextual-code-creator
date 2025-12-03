import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, TrendingUp, Zap, Target, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 ml-0 md:ml-[84px] lg:ml-64">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide">
            <Zap className="w-4 h-4" />
            AI-Powered Predictions
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Intelligent Football
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Prediction System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            WinMix TipsterHub uses cutting-edge machine learning to predict match outcomes with precision. 
            Advanced pattern recognition, real-time analysis, and AI-driven insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button
              size="lg"
              onClick={() => navigate("/predictions/new")}
              className="group text-base h-12 px-8 rounded-lg"
            >
              Create New Prediction
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-base h-12 px-8 rounded-lg"
            >
              View Dashboard
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Predictions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ensemble learning from multiple models for higher accuracy predictions.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pattern Recognition</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Identify historical patterns and tactical anomalies in team performance.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Live updates on injury reports, form changes, and market movements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
