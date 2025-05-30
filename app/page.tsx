"use client"

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Music,
  Users,
  Calendar,
  BarChart3,
  MessageCircle,
  MapPin,
  Star,
  Play,
  Heart,
  TrendingUp,
  Clock,
  Mic2,
  Radio,
  Volume2,
  Sparkles,
  ArrowRight,
  Mail,
} from "lucide-react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showBoomyVibes, setShowBoomyVibes] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleJoinBetaClick = () => {
    setShowBetaModal(true);
  };

  const handleBoomyClick = () => {
    setShowBoomyVibes(true);
    setTimeout(() => {
      setShowBoomyVibes(false);
    }, 3000);
  };

  const handleJoinBeta = () => {
    setShowBetaModal(false);
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Submit to Netlify Forms
      const formData = new FormData();
      formData.append("form-name", "beta-waitlist");
      formData.append("email", email);
      formData.append("timestamp", new Date().toISOString());

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setShowEmailForm(false);
          setIsSubmitted(false);
          setEmail("");
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: MessageCircle,
      title: "AI Planning Assistant",
      description:
        "Chat with Boomy the Boombox to craft personalized weekend music experiences",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Social Collaboration",
      description:
        "Connect with friends to coordinate and share music event plans",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Music,
      title: "Live Music Discovery",
      description:
        "Find and support local musicians, venues, and live performances",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Event Analytics",
      description:
        "Interactive data tables with insights into music events and trends",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Calendar,
      title: "Festival Planning",
      description:
        "Create Gantt charts and timelines for multi-day festival experiences",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Heart,
      title: "Artist Following",
      description: "Stay updated on your favorite musicians and music venues",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const mockEvents = [
    {
      name: "Trombone Shorty",
      venue: "Tipitinas",
      time: "9:00 PM",
      genre: "Funk",
      attendees: 234,
    },
    {
      name: "Soul Rebels",
      venue: "Blue Nile",
      time: "7:30 PM",
      genre: "New Orleans Popular Music",
      attendees: 89,
    },
    {
      name: "Rebirth Brass Band",
      venue: "Maple Leaf",
      time: "8:00 PM",
      genre: "Brass",
      attendees: 133,
    },
    {
      name: "Tank & The Bangas",
      venue: "Music Box Village",
      time: "6:00 PM",
      genre: "Funk",
      attendees: 156,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hidden Netlify Form for form detection */}
      <form name="beta-waitlist" netlify netlify-honeypot="bot-field" hidden>
        <input type="email" name="email" />
        <input type="text" name="timestamp" />
      </form>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Beta Modal */}
      <Dialog open={showBetaModal} onOpenChange={setShowBetaModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              🎵 Coming Soon!
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center text-base leading-relaxed">
              Fest-Vibes is currently under development. We're working hard to
              bring you the ultimate AI-powered music festival experience!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Want to be among the first to experience Boomy and plan your
                perfect music weekends?
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleJoinBeta}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Join Beta Waitlist
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowBetaModal(false)}
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Form Modal */}
      <Dialog open={showEmailForm} onOpenChange={setShowEmailForm}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              🎧 Join the Beta Waitlist
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Enter your email to get notified when Fest-Vibes launches!
            </DialogDescription>
          </DialogHeader>
          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500 disabled:opacity-50"
                />
              </div>
              {submitError && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">
                  {submitError}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isSubmitting
                    ? "Adding you to the list..."
                    : "Get Early Access"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEmailForm(false)}
                  disabled={isSubmitting}
                  className="border-slate-600 text-gray-300 hover:bg-slate-700 disabled:opacity-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                You're on the list! 🎉
              </h3>
              <p className="text-gray-300">
                We'll notify you as soon as Fest-Vibes is ready to rock your
                weekends!
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check your email for confirmation.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Boomy Vibes Animation Overlay */}
      {showBoomyVibes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`relative transition-all duration-1000 ${
              showBoomyVibes
                ? "animate-bounce-in opacity-100 scale-100"
                : "opacity-0 scale-50"
            }`}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-purple-500/50">
              <img
                src="/boomy-vibes.png"
                alt="Boomy the Boombox in vibrant New Orleans street art style"
                className="w-96 h-96 object-cover animate-pulse-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping delay-500" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBoomyClick}
            className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
          >
            <img
              src="/boomy-nav.png"
              alt="Boomy the Boombox"
              className="w-14 h-14 rounded-lg object-cover"
            />
          </button>
          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-green-500 bg-clip-text">
            Fest Vibes Nola
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#demo"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Demo
          </a>
          <a
            href="#analytics"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Analytics
          </a>
          <Button
            onClick={handleJoinBetaClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-8 pt-20 pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Festival Planning
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Own Music
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Festival
              </span>
              <br />
              Starts Here
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform any day into a personalized music festival. Discover
              live local music, plan with friends, and experience the ultimate
              decentralized festival vibes in your pocket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleJoinBetaClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with Boomy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled
                className="border-purple-500/50 text-purple-300/50 text-lg px-8 py-4 cursor-not-allowed opacity-50"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need for the Perfect
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Music Weekend
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From AI-powered planning to social collaboration, we've got every
              aspect of your music experience covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Boomy Chat Demo */}
      <section id="demo" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Boomy, Your AI Festival Planner
            </h2>
            <p className="text-xl text-gray-300">
              Chat with our AI assistant to discover and plan your perfect music
              weekend
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/boomy-chat-demo.png"
                alt="Boomy the Boombox chat interface showing conversation about finding electronic music shows"
                className="w-full max-w-lg rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Boomy Can Help You:
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    text: "Discover local venues and hidden gems",
                  },
                  {
                    icon: Users,
                    text: "Coordinate plans with your friend group",
                  },
                  {
                    icon: Calendar,
                    text: "Create multi-day festival itineraries",
                  },
                  {
                    icon: TrendingUp,
                    text: "Get personalized music recommendations",
                  },
                  { icon: Clock, text: "Optimize timing for multiple events" },
                  {
                    icon: Star,
                    text: "Track your favorite artists and venues",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section id="analytics" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Smart Analytics for Smarter Planning
            </h2>
            <p className="text-xl text-gray-300">
              Get insights into music trends, event popularity, and discover
              what's hot in your area
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Table */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                    Trending Events This Weekend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Mic2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {event.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {event.venue} • {event.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className="bg-purple-500/20 text-purple-300"
                          >
                            {event.genre}
                          </Badge>
                          <p className="text-gray-400 text-sm mt-1">
                            {event.attendees} going
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Events This Week</p>
                      <p className="text-3xl font-bold text-white">127</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-green-400 text-sm mt-2">
                    ↗ 23% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Venues</p>
                      <p className="text-3xl font-bold text-white">45</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-blue-400 text-sm mt-2">5 new this month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Community Size</p>
                      <p className="text-3xl font-bold text-white">2.4K</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-purple-400 text-sm mt-2">
                    Music lovers connected
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Features */}
      <section className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Music is Better with Friends
            </h2>
            <p className="text-xl text-gray-300">
              Connect, share, and experience live music together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex justify-center">
              <img
                src="/social-sarah.png"
                alt="Sarah M. social post about jazz trio discovery"
                className="w-full max-w-sm rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/social-mike-new.png"
                alt="Mike R. social post about creating a 3-day festival itinerary with Boomy"
                className="w-full max-w-sm rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/social-alex-new.png"
                alt="Alex K. social post about following local artists and discovering impromptu shows"
                className="w-full max-w-sm rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Weekends?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of music lovers who've discovered their perfect
              festival experience. Start planning your next music adventure
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleJoinBetaClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Planning with Boomy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled
                className="border-purple-500/50 text-purple-300/50 text-lg px-8 py-4 cursor-not-allowed opacity-50"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-8 py-12 border-t border-slate-700/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Radio className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Fest-Vibes</span>
              </div>
              <p className="text-gray-400">
                Your decentralized music festival experience, powered by AI.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Event Discovery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Social Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Artists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Venues
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Music Lovers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Fest-Vibes. All rights reserved. Made with ❤️ for
              music lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
