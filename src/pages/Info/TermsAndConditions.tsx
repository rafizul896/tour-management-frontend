import { Link } from "react-router";
import {
  FileText,
  UserCheck,
  Wallet,
  RefreshCw,
  ShieldCheck,
  Ban,
  MountainSnow,
  Copyright,
  ScaleIcon,
  XCircle,
  Gavel,
  Mail,
} from "lucide-react";

const sections = [
  { id: "acceptance", label: "Acceptance of terms", icon: FileText },
  { id: "accounts", label: "Accounts & eligibility", icon: UserCheck },
  { id: "bookings", label: "Bookings & payments", icon: Wallet },
  { id: "cancellations", label: "Cancellations & refunds", icon: RefreshCw },
  { id: "guides", label: "Guide obligations", icon: ShieldCheck },
  { id: "conduct", label: "Acceptable use", icon: Ban },
  { id: "risk", label: "Travel risk & liability", icon: MountainSnow },
  { id: "ip", label: "Intellectual property", icon: Copyright },
  { id: "termination", label: "Suspension & termination", icon: XCircle },
  { id: "law", label: "Governing law", icon: Gavel },
  { id: "changes", label: "Changes to these terms", icon: ScaleIcon },
  { id: "contact", label: "Contact us", icon: Mail },
];

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-muted/40">
        <div className="container mx-auto px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <FileText className="h-3.5 w-3.5 text-primary" />
            Legal
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms & Conditions
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
            These Terms & Conditions ("Terms") govern your use of exploreBangla,
            a platform connecting travelers with verified local guides across
            Bangladesh. By creating an account, booking a tour, or applying as a
            guide, you agree to these Terms. If you don't agree, please don't
            use the platform.
          </p>

          <section id="acceptance" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              1. Acceptance of terms
            </h2>
            <p>
              By accessing or using exploreBangla, you confirm that you can form
              a binding contract, that you've read and understood these Terms,
              and that you agree to be bound by them. These Terms apply equally
              to travelers booking tours and to guides listing them.
            </p>
          </section>

          <section id="accounts" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              2. Accounts & eligibility
            </h2>
            <p>
              You need an account to book a tour or apply as a guide. You're
              responsible for keeping your login details secure and for all
              activity that happens under your account. Let us know right away
              if you think your account has been accessed without your
              permission.
            </p>
            <p>
              You must provide accurate information when registering, including
              a working email address — we use it to verify your account with a
              one-time password before you can sign in.
            </p>
          </section>

          <section id="bookings" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              3. Bookings & payments
            </h2>
            <p>
              When you book a tour, you're agreeing to pay the listed price for
              the guest count you select. Some tours set a maximum guest count
              or a minimum age — your booking must fall within those limits.
            </p>
            <p>
              A booking is held as pending until payment is confirmed by our
              payment gateway. Once payment clears, your booking status updates
              to confirmed and you'll receive a transaction ID and invoice.
              exploreBangla isn't the merchant of record for the underlying
              travel service — the guide is — but we facilitate the payment and
              hold the record of the transaction.
            </p>
          </section>

          <section id="cancellations" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              4. Cancellations & refunds
            </h2>
            <p>
              Cancellation and refund terms can vary by tour and guide. Where a
              specific tour doesn't state its own cancellation policy, contact
              the guide or our support team as early as possible — refunds for a
              payment that's already cleared are processed back through the
              original payment method and may take time to appear, depending on
              the gateway.
            </p>
            <p>
              If a guide cancels a confirmed booking, you're entitled to a full
              refund of what you paid for that booking.
            </p>
          </section>

          <section id="guides" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              5. Guide obligations
            </h2>
            <p>
              If you apply to become a guide, you must submit a valid National
              ID for verification. Your profile stays inactive until we've
              reviewed and approved your application.
            </p>
            <p>As an approved guide, you agree to:</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                List tours accurately — what's included, what's excluded, the
                real cost, and any age or group-size limits
              </li>
              <li>
                Honor confirmed bookings and communicate promptly if something
                changes
              </li>
              <li>
                Conduct tours safely and in line with any applicable local
                regulations
              </li>
              <li>Keep your division and contact information current</li>
            </ul>
            <p>
              exploreBangla can suspend or remove a guide's listings if they're
              found to be inaccurate, unsafe, or in violation of these Terms.
            </p>
          </section>

          <section id="conduct" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              6. Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>Use the platform for any unlawful purpose</li>
              <li>
                Impersonate another person or misrepresent your identity,
                including in a guide application
              </li>
              <li>
                Attempt to bypass guide verification or payment processing
              </li>
              <li>
                Scrape, copy, or resell tour listings or guide information
                without permission
              </li>
              <li>
                Interfere with the platform's normal operation or security
              </li>
            </ul>
          </section>

          <section id="risk" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              7. Travel risk & limitation of liability
            </h2>
            <p>
              Travel — especially outdoor and adventure activities like hiking,
              camping, or boat trips — carries inherent risk. You participate in
              any tour booked through exploreBangla at your own discretion and
              assume the associated risks. Follow your guide's safety
              instructions and use reasonable judgment.
            </p>
            <p>
              exploreBangla connects travelers with independent local guides; we
              don't operate the tours ourselves. To the fullest extent permitted
              by law, exploreBangla isn't liable for injury, loss, or damage
              arising from a tour, a guide's conduct, or circumstances outside
              our reasonable control (such as weather, transport delays, or
              third-party actions).
            </p>
          </section>

          <section id="ip" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              8. Intellectual property
            </h2>
            <p>
              The exploreBangla name, logo, and platform design belong to us.
              Tour descriptions and photos you upload as a guide remain yours,
              but by publishing them on exploreBangla you grant us a license to
              display them on the platform for the purpose of listing and
              promoting your tours.
            </p>
          </section>

          <section id="termination" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              9. Suspension & termination
            </h2>
            <p>
              We may suspend or terminate your account if you violate these
              Terms, provide false verification information, or engage in
              behavior that puts other users at risk. You can close your account
              at any time by contacting support; some records, like completed
              payment history, may be retained as required by law.
            </p>
          </section>

          <section id="law" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              10. Governing law
            </h2>
            <p>
              These Terms are governed by the laws of the People's Republic of
              Bangladesh, without regard to conflict-of-law principles. Any
              dispute arising from these Terms or use of the platform is subject
              to the exclusive jurisdiction of the courts of Bangladesh.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              11. Changes to these terms
            </h2>
            <p>
              We may update these Terms as the platform evolves. If we make
              material changes, we'll update the "last updated" date above and,
              where appropriate, notify you directly. Continuing to use
              exploreBangla after changes take effect means you accept the
              updated Terms.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              12. Contact us
            </h2>
            <p>
              Questions about these Terms? Reach us at{" "}
              <a
                href="mailto:support@explorebangla.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                support@explorebangla.com
              </a>
              , or use our{" "}
              <Link
                to="/contactUs"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                contact page
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
