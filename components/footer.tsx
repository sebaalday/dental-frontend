import { Tooth } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Tooth className="h-6 w-6 text-primary" />
              <span className="font-bold">DentalCare Plus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional dental care services with a focus on patient comfort and satisfaction.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>General Dentistry</li>
              <li>Cosmetic Dentistry</li>
              <li>Orthodontics</li>
              <li>Dental Implants</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Dental Street</li>
              <li>New York, NY 10001</li>
              <li>contact@dentalcare.plus</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mon-Fri: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DentalCare Plus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}