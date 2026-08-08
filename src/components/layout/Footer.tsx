import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { Phone, Mail, MapPin } from "lucide-react";

const exploreLinks = [
  { label: "All tours", href: "/tours" },
  { label: "Division", href: "/division" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contactUs" },
];

const supportLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-and-conditions" },
  { label: "FAQ", href: "/faq" },
  { label: "Help center", href: "/help-center" },
];

const socialLinks = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    color: "text-[#5144e6]",
    path: "M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z",
    viewBox: "0 0 32 32",
  },
  {
    title: "Twitter",
    href: "https://x.com/",
    color: "text-[#44a3e6]",
    path: "M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z",
    viewBox: "0 0 24 24",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/",
    color: "text-orange-500",
    path: "M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z",
    viewBox: "0 0 32 32",
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background font-lato">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <Logo name={true} />
            </Link>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              Guided tours across every division of Bangladesh — booked in
              minutes, run by people who know the ground.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  rel="noopener noreferrer"
                  href={social.href}
                  target="_blank"
                  title={social.title}
                  className="flex items-center justify-center size-9 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox={social.viewBox}
                    className={`w-4 h-4 fill-current ${social.color}`}
                  >
                    <path d={social.path}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm text-foreground/70">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                Support
              </h3>
              <ul className="space-y-2.5 text-sm text-foreground/70">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
              Contact us
            </h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="tel:+880 1XXX-XXXXXX"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Phone className="size-3.5" />
                  </span>
                  +880 1XXX-XXXXXX
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="mailto:support@explorebangla.com"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Mail className="size-3.5" />
                  </span>
                  support@explorebangla.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <MapPin className="size-3.5" />
                </span>
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-10 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} TourVista. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
