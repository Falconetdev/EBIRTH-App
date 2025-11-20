import { ReactNode } from "react";

import PageLayout from "@/components/layout/PageLayout";
import WhatsAppButton from "@/components/home/WhatsAppButton";

type PolicySectionProps = {
	number: string;
	title: string;
	content: ReactNode;
};

const PolicySection = ({ number, title, content }: PolicySectionProps) => {
	return (
		<div className="relative overflow-hidden rounded-[32px] bg-white/5 px-6 py-10 shadow-[0_24px_60px_rgba(28,5,71,0.35)] backdrop-blur">
			<div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_65%)]" />
			<div className="flex flex-col gap-6 sm:flex-row sm:items-start">
				<div className="relative isolate flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE500] via-[#FFBD00] to-[#F89000] text-lg font-bold text-[#1B0B2E] shadow-[0_18px_32px_rgba(255,195,18,0.35)]">
					{number}
				</div>
				<div className="relative z-10 space-y-4 text-sm text-white/90 sm:text-base">
					<h2 className="text-xl font-semibold text-white sm:text-2xl">{title}</h2>
					{content}
				</div>
			</div>
		</div>
	);
};

const PrivacyPolicy = () => {
	const sections: PolicySectionProps[] = [
		{
			number: "1",
			title: "Information We Collect",
			content: (
				<div className="space-y-4">
					<p>
						We may collect personal information when you register for our courses, make purchases,
						contact us for support or inquiries, or participate in surveys and promotions.
					</p>
					<div>
						<p className="font-medium text-white">The types of personal information we may collect include:</p>
						<ul className="mt-3 space-y-2 text-white/80">
							<li className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								Name
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								Contact information (email address, phone number)
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								Payment details
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								Course preferences
							</li>
						</ul>
					</div>
				</div>
			),
		},
		{
			number: "2",
			title: "How We Use Your Information",
			content: (
				<div className="space-y-3">
					<p>We use the information we collect for the following purposes:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"To provide and personalize our services",
							"To process payments and fulfill orders",
							"To communicate with you regarding your account and our services",
							"To send promotional offers and updates (you may opt out at any time)",
							"To conduct research and improve our products and services",
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								{item}
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			number: "3",
			title: "Disclosure of Your Information",
			content: (
				<div className="space-y-3">
					<p>We may disclose your personal information in the following circumstances:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"To our trusted service providers who assist us in operating our website and delivering our services",
							"To comply with legal obligations or protect our rights",
							"With your consent",
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								{item}
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			number: "4",
			title: "Data Security",
			content: (
				<p>
					We have implemented appropriate security measures to protect your personal information
					from unauthorized access, alteration, disclosure, or destruction. However, no method of
					transmission over the internet or electronic storage is 100% secure, and we cannot
					guarantee absolute security.
				</p>
			),
		},
		{
			number: "5",
			title: "Your Choices",
			content: (
				<div className="space-y-3">
					<p>You have the right to:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"Access, update, or delete your personal information",
							"Opt out of receiving promotional communications",
							"Disable cookies through your browser settings",
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								{item}
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			number: "6",
			title: "Changes to This Privacy Policy",
			content: (
				<p>
					This Privacy Policy was last updated on February 21, 2024. We reserve the right to update
					or modify this Privacy Policy at any time. Any changes will be effective immediately upon
					posting on our website. We encourage you to review this Privacy Policy periodically for any
					updates.
				</p>
			),
		},
		{
			number: "7",
			title: "Contact Information",
			content: (
				<p>
					If you have any questions about this Privacy Policy or wish to exercise your rights,
					please contact us.
				</p>
			),
		},
		{
			number: "8",
			title: "Acceptance of This Policy",
			content: (
				<p>
					By using our services or interacting with our website, you signify your acceptance of this
					Privacy Policy. If you do not agree to this policy, please do not use our services or
					provide us with your personal information.
				</p>
			),
		},
	];

	return (
		<PageLayout
			className="bg-[#0C0224] text-white"
			mainClassName="relative isolate overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8"
		>
			<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#2f0c54] via-[#190636] to-[#0a021c]" />
			<div className="pointer-events-none absolute left-[-12%] top-[-10%] -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25),_transparent_65%)] blur-3xl" />
			<div className="pointer-events-none absolute right-[-8%] bottom-[-12%] -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(123,76,255,0.35),_transparent_70%)] blur-3xl" />
			 {/* Decorative background coins */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Left large peeking coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute left-[-90px] top-[38%] hidden md:block h-64 w-64 -rotate-[14deg] opacity-35"
          style={{ animationDelay: '0.6s' }}
        />
        {/* Mid-right floating coin */}
        
        {/* Small accent above tabs */}
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute left-[54%] top-[22%] h-16 w-16 -translate-x-1/2 rotate-[22deg] opacity-25"
          style={{ animationDelay: '1.8s' }}
        />
        {/* Bottom subtle coin near parachute */}
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute left-[52%] bottom-[18%] h-14 w-14 -translate-x-1/2 rotate-[12deg] opacity-20"
          style={{ animationDelay: '2.2s' }}
        />
        {/* Lower-left faint coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute left-[6%] bottom-[30%] h-24 w-24 rotate-[26deg] opacity-18"
          style={{ animationDelay: '1.4s' }}
        />
        {/* Top-right corner large coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute right-[-70px] top-[80px] hidden lg:block h-40 w-40 rotate-[-12deg] opacity-40"
          style={{ animationDelay: '0.9s' }}
        />
       
        {/* Top-left medium coin */}
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute left-[0%] top-[15%] h-[180px] w-[180px]  "
          style={{ animationDelay: '1.3s' }}
        />
        {/* Top center subtle small coin */}
        <img
          src="/coin4.webp"
          alt="Decorative coin"
          className="coin-float absolute left-1/2 top-[40%] h-25 w-25 -translate-x-1/2 rotate-[8deg] opacity-22"
          style={{ animationDelay: '1.9s' }}
        />

        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute right-[-70px] bottom-[70%] hidden lg:block h-60 w-60 rotate-[-12deg] opacity-40"
          style={{ animationDelay: '0.9s' }}
        />
      </div>
			<div className="mx-auto flex max-w-5xl flex-col gap-16">
				<header className="space-y-5 text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
						eBirth Business Academy
					</p>
					<h1 className="text-4xl font-extrabold sm:text-5xl">Privacy Policy</h1>
					<p className="text-lg text-white/80">
						Where Dreams Take Flight and Entrepreneurs Are Born
					</p>
					<p className="mx-auto max-w-3xl text-base text-white/75">
						At eBirth Business Academy Pvt Ltd, we are committed to protecting the privacy and
						security of your personal information. This Privacy Policy outlines how we collect, use,
						disclose, and safeguard your information when you use our services or interact with our website.
					</p>
				</header>

				<div className="space-y-10">
					{sections.map((section) => (
						<PolicySection key={section.number} {...section} />
					))}

					<div className="rounded-3xl border border-white/10 bg-white/10 px-8 py-6 text-center text-sm font-semibold text-white/90 shadow-[0_16px_40px_rgba(20,5,50,0.35)]">
						Important: We never sell, trade, or rent your personal information to third parties for
						marketing purposes.
					</div>

					<div className="rounded-[28px] bg-white/12 px-8 py-8 text-center text-white">
						<p className="text-base font-medium text-white/85">
							If you have any questions about this Privacy Policy or wish to exercise your rights,
							please contact us:
						</p>
						<a
							href="/contact-us"
							className="mt-6 inline-flex items-center justify-center rounded-full bg-[#FFE500] px-8 py-3 text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_30px_rgba(158,124,255,0.35)] transition hover:bg-[#ffdd38]"
						>
							Contact eBirth Academy
						</a>
					</div>
				</div>
			</div>

			<WhatsAppButton />
		</PageLayout>
	);
};

export default PrivacyPolicy;
