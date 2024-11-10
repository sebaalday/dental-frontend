"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Clock, CalendarCheck, Search } from "lucide-react";

const DENTISTS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialties: ["General Dentistry", "Cosmetic Dentistry"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialties: ["Orthodontics", "Pediatric Dentistry"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Dr. Emily Martinez",
    specialties: ["Cosmetic Dentistry", "Restorative Dentistry"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200"
  },
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const SPECIALTIES = Array.from(
  new Set(DENTISTS.flatMap(dentist => dentist.specialties))
).sort();

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDentist, setSelectedDentist] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  const filteredDentists = selectedSpecialty
    ? DENTISTS.filter(dentist => dentist.specialties.includes(selectedSpecialty))
    : DENTISTS;

  const handleBookAppointment = () => {
    if (!date || !selectedDentist || !selectedTime) {
      toast.error("Please select all required fields");
      return;
    }

    toast.success("Appointment booked successfully!", {
      description: `Your appointment is scheduled for ${date.toLocaleDateString()} at ${selectedTime} with ${selectedDentist}`,
    });

    // Reset form
    setDate(undefined);
    setSelectedDentist("");
    setSelectedTime("");
    setSelectedSpecialty("");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filter by Specialty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="---">All Specialties</SelectItem>
                {SPECIALTIES.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5" />
                Select Date & Dentist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date() || date.getDay() === 0}
              />
              
              <div className="space-y-4">
                {filteredDentists.map((dentist) => (
                  <div
                    key={dentist.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedDentist === dentist.name
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedDentist(dentist.name)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={dentist.image}
                        alt={dentist.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{dentist.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {dentist.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Select Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedTime(time)}
                    disabled={!date || !selectedDentist}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleBookAppointment}
                disabled={!date || !selectedDentist || !selectedTime}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}