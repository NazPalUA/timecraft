import { APP_NAME, ROUTES } from '@/lib/constants'
import { Language } from '@/localization'
import { getDictionary } from '@/localization/server'
import Link from 'next/link'

type FooterSection = {
  heading: string
  subtitle?: string
  links: {
    href: string
    label: string
  }[]
}

export async function Footer({ lang }: { lang: Language }) {
  const {
    public: {
      layout: { footer: dict }
    }
  } = await getDictionary(lang)

  const sections: FooterSection[] = [
    {
      heading: APP_NAME,
      subtitle: dict.description,
      links: []
    },
    {
      heading: dict.quickLinks,
      links: [
        {
          href: ROUTES.HOME.FEATURES.SECTION(lang),
          label: dict.features
        },
        {
          href: ROUTES.HOME.PRICING.SECTION(lang),
          label: dict.pricing
        },
        {
          href: ROUTES.DASHBOARD.INDEX(lang),
          label: dict.dashboard
        },
        { href: ROUTES.CONTACT(lang), label: dict.contact }
      ]
    },
    {
      heading: dict.legal,
      links: [
        { href: ROUTES.TERMS(lang), label: dict.termsOfService },
        { href: ROUTES.PRIVACY(lang), label: dict.privacyPolicy }
      ]
    },
    {
      heading: dict.support,
      links: [
        { href: ROUTES.SUPPORT(lang), label: dict.helpCenter },
        { href: ROUTES.CONTACT(lang), label: dict.contactSupport }
      ]
    }
  ]

  return (
    <footer className="border-border/40 bg-muted text-muted-foreground border-b py-12 dark:bg-black">
      <div className="container mx-auto px-4">
        {/**
         * Use a single grid container to place each section
         * in its own column on md+ screens,
         * and stack as 1 column on mobile.
         */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-4">
          {sections.map(section => (
            <div key={section.heading}>
              <h4 className="text-accent-foreground mb-2 text-lg font-semibold">
                {section.heading}
              </h4>

              {section.subtitle && <p className="mb-2">{section.subtitle}</p>}

              {section.links.length > 0 && (
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-border mt-8 border-t pt-8 text-center">
          <p>{`© 2025 ${APP_NAME}. ${dict.copyright}`}</p>
        </div>
      </div>
    </footer>
  )
}
