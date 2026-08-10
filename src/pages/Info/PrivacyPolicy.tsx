import { Link } from "react-router";
import {
  ShieldCheck,
  Database,
  UserCheck,
  CreditCard,
  Share2,
  Lock,
  UserCog,
  Baby,
  RefreshCw,
  Mail,
} from "lucide-react";

const sections = [
  { id: "overview", label: "Overview", icon: ShieldCheck },
  {
    id: "information-we-collect",
    label: "Information we collect",
    icon: Database,
  },
  {
    id: "guide-verification",
    label: "Guide verification (NID)",
    icon: UserCheck,
  },
  { id: "payments", label: "Payment information", icon: CreditCard },
  {
    id: "how-we-use-it",
    label: "How we use your information",
    icon: RefreshCw,
  },
  { id: "sharing", label: "Sharing your information", icon: Share2 },
  { id: "security", label: "Data security", icon: Lock },
  { id: "your-rights", label: "Your rights & choices", icon: UserCog },
  { id: "children", label: "Children's privacy", icon: Baby },
  { id: "changes", label: "Changes to this policy", icon: RefreshCw },
  { id: "contact", label: "Contact us", icon: Mail },
];

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-muted/40">
        <div className="container mx-auto px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Legal
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: August 10, 2026
          </p>
        </div>
      </section>

      <div className="container mx-auto grid gap-10 px-6 py-16 lg:grid-cols-[240px_1fr] lg:gap-16">
        {/* Table of contents — sticky on desktop */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-1">
            <span className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              On this page
            </span>
            {sections.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-2xl space-y-14 text-sm leading-relaxed text-muted-foreground">
          <p className="rounded-lg border border-border bg-muted/40 p-4 text-xs">
            exploreBangla ("we," "us," or "our") connects travelers with
            verified local guides across Bangladesh. This policy explains what
            information we collect through the platform, why we collect it, and
            the choices you have. It applies to travelers, guides, and anyone
            else who uses exploreBangla.
          </p>

          <section id="overview" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              1. Overview
            </h2>
            <p>
              We collect the minimum information needed to run bookings, verify
              guides, and process payments safely. We don't sell your personal
              information, and we don't share it with advertisers.
            </p>
          </section>

          <section
            id="information-we-collect"
            className="scroll-mt-24 space-y-4"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              2. Information we collect
            </h2>
            <div>
              <h3 className="font-semibold text-foreground">
                Account information
              </h3>
              <p className="mt-1">
                When you create an account, we collect your name, email address,
                and password (or, if you sign in with a third-party provider,
                the identifier that provider gives us — we never see your
                password on that provider). You may optionally add a phone
                number, address, and profile picture.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Booking information
              </h3>
              <p className="mt-1">
                When you book a tour, we record the tour, your guest count, and
                your booking status, so both you and the guide know what's
                confirmed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Verification codes
              </h3>
              <p className="mt-1">
                When you register, we send a one-time password (OTP) to your
                email to confirm it belongs to you. We keep a record that
                verification happened, not the code itself once it expires.
              </p>
            </div>
          </section>

          <section id="guide-verification" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              3. Guide verification (National ID)
            </h2>
            <p>
              If you apply to become a guide, we ask for a photo of your
              National ID (NID) and the division you'll operate in. This is used
              only to confirm you are who you say you are before your profile
              can go live — it is not shown publicly, and it is not used for any
              purpose beyond verifying your application and maintaining trust
              and safety on the platform.
            </p>
          </section>

          <section id="payments" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              4. Payment information
            </h2>
            <p>
              Payments are processed by our third-party payment gateway
              (supporting mobile banking options such as bKash and Nagad, and
              card payments). We do not store your full card number or mobile
              banking PIN — that's handled entirely by the gateway.
            </p>
            <p>
              We do keep a record of each transaction: a transaction ID, the
              amount, the payment status, and — where the gateway provides one —
              an invoice you can download. We use this to confirm your booking,
              issue refunds if needed, and resolve payment disputes.
            </p>
          </section>

          <section id="how-we-use-it" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              5. How we use your information
            </h2>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>To create and manage your account</li>
              <li>To process bookings and payments</li>
              <li>To verify guide applications</li>
              <li>
                To send booking confirmations, payment receipts, and
                account-related emails
              </li>
              <li>To respond when you contact support</li>
              <li>To keep the platform secure and prevent fraud</li>
            </ul>
          </section>

          <section id="sharing" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              6. Sharing your information
            </h2>
            <p>
              We share information only where it's necessary to operate the
              platform:
            </p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                <span className="font-medium text-foreground">
                  With your guide:
                </span>{" "}
                your name, guest count, and contact details for a booking you've
                made
              </li>
              <li>
                <span className="font-medium text-foreground">
                  With our payment gateway:
                </span>{" "}
                the details needed to process your payment
              </li>
              <li>
                <span className="font-medium text-foreground">
                  With service providers:
                </span>{" "}
                such as our cloud storage provider, who host files like NID
                photos and invoices on our behalf
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Where required by law:
                </span>{" "}
                if we're legally required to disclose information
              </li>
            </ul>
            <p>We never sell your personal information to third parties.</p>
          </section>

          <section id="security" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              7. Data security
            </h2>
            <p>
              Passwords are stored using industry-standard hashing, and
              sensitive documents like NID photos are stored with our hosting
              provider's access controls rather than served publicly. No method
              of storage or transmission is completely secure, but we work to
              protect your information using appropriate technical and
              organizational measures.
            </p>
          </section>

          <section id="your-rights" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              8. Your rights & choices
            </h2>
            <p>You can:</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>Access and update your account information at any time</li>
              <li>
                Request a copy of the personal information we hold about you
              </li>
              <li>
                Request that we delete your account and associated data, subject
                to records we're required to keep (such as completed payment
                history)
              </li>
              <li>Contact us with any privacy question or concern</li>
            </ul>
          </section>

          <section id="children" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              9. Children's privacy
            </h2>
            <p>
              exploreBangla is not directed at children, and we don't knowingly
              collect information from anyone under 18. Some tours set a minimum
              age for guests — this reflects the nature of the activity, not our
              data practices, and bookings should be made by an adult.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              10. Changes to this policy
            </h2>
            <p>
              We may update this policy as the platform evolves. If we make
              material changes, we'll update the "last updated" date above and,
              where appropriate, notify you directly.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              11. Contact us
            </h2>
            <p>
              Questions about this policy or your data? Reach us at{" "}
              <a
                href="mailto:privacy@explorebangla.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                privacy@explorebangla.com
              </a>
              , or use our{" "}
              <Link
                to="/contactUs"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
