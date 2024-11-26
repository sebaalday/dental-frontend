// FILE: page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageSquare, Shield, Star, Users, Video } from "lucide-react";
import VideoRecorder from '@/components/VideoRecorder';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80"
          alt="Modern dental clinic"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Smile, Our Passion
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Experience world-class dental care with our team of expert dentists.
            Your comfort and satisfaction are our top priorities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments">
              <Button size="lg" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Us
              </Button>
            </Link>
            <Link href="/video-recorder">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Video className="mr-2 h-4 w-4" />
                Record Video
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose DentalCare Plus?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-primary mb-4">
                  <Shield className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Advanced Technology
                </h3>
                <p className="text-muted-foreground">
                  State-of-the-art equipment and modern techniques for the best
                  possible care.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-primary mb-4">
                  <Users className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Expert Team
                </h3>
                <p className="text-muted-foreground">
                  Highly qualified dentists with years of experience in various
                  specialties.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-primary mb-4">
                  <Star className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Patient Satisfaction
                </h3>
                <p className="text-muted-foreground">
                  Committed to providing comfortable and stress-free dental
                  experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

