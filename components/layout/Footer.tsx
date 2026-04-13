'use client'

import Link from 'next/link'
import { t, type Language } from '@/lib/translations'

interface FooterProps {
  currentLanguage?: Language
}

export default function Footer({ currentLanguage = 'en' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🕉️ Kovil Community</h3>
            <p className="text-gray-400">
              {currentLanguage === 'ta'
                ? 'ஒரு சமூக கூட்டமை தட்டமிடுவது'
                : 'A community portal connecting members and visitors'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{currentLanguage === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-secondary">
                  {t('nav.about', currentLanguage)}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-secondary">
                  {t('nav.events', currentLanguage)}
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-secondary">
                  {t('nav.news', currentLanguage)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{currentLanguage === 'ta' ? 'தொடர்பு' : 'Contact'}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 contact@kovilcommunity.com</li>
              <li>📱 +1 (555) 000-0000</li>
              <li>{currentLanguage === 'ta' ? 'உங்கள் நகரம்' : 'Your City, Country'}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">{currentLanguage === 'ta' ? 'பின்தொடருங்கள்' : 'Follow Us'}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-secondary">Facebook</a></li>
              <li><a href="#" className="hover:text-secondary">Twitter</a></li>
              <li><a href="#" className="hover:text-secondary">Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="text-center text-gray-400">
          <p>
            © {currentYear} {t('footer.copyright', currentLanguage)}
          </p>
        </div>
      </div>
    </footer>
  )
}
