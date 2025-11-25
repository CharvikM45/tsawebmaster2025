import { Heart, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">Community Resource Hub</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Empowering our community through accessible resources, trusted information, and meaningful connections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/directory" className="hover:text-primary-400 transition-colors">
                  Resource Directory
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-primary-400 transition-colors">
                  Community Stories
                </Link>
              </li>
              <li>
                <Link href="/heatmap" className="hover:text-primary-400 transition-colors">
                  Needs Heatmap
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-primary-400 transition-colors">
                  Submit Resource
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/concierge" className="hover:text-primary-400 transition-colors">
                  AI Concierge
                </Link>
              </li>
              <li>
                <Link href="/directory?category=Emergency+Aid" className="hover:text-primary-400 transition-colors">
                  Emergency Resources
                </Link>
              </li>
              <li>
                <Link href="/resource-of-the-day" className="hover:text-primary-400 transition-colors">
                  Resource of the Day
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@communityhub.org" className="hover:text-primary-400 transition-colors">
                  info@communityhub.org
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+15551234567" className="hover:text-primary-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>123 Community Way<br />City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Community Resource Hub. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-4 md:mt-0 flex items-center space-x-1">
            Made with <Heart className="w-4 h-4 text-primary-500" /> for our community
          </p>
        </div>
      </div>
    </footer>
  )
}

