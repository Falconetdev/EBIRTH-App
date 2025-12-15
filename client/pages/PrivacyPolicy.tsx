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
						We collect personal information necessary for enrollment and certification, including:
					</p>
					<div>
						<ul className="mt-3 space-y-2 text-white/80">
							<li className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								<strong>Full Name, Email, and Phone Number</strong>
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
								<span><strong>Identity Verification:</strong> National Identity Card (NIC) Number or Passport Number (Required for official registration)</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
								<span><strong>Cookies:</strong> We use cookies to maintain your login session and track course progress</span>
							</li>
						</ul>
					</div>
				</div>
			),
		},
		{
			number: "2",
			title: "Use of Information",
			content: (
				<div className="space-y-3">
					<p>Your data is used strictly for:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"Course management and enrollment",
							"Identity verification for certification",
							"Student communication and support",
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
								{item}
							</li>
						))}
					</ul>
					<p className="mt-4 text-white font-medium">
						We do not sell or trade your personal information to third parties. Data is shared only with essential service providers (e.g., PayHere for payments, Hosting providers).
					</p>
				</div>
			),
		},
		{
			number: "3",
			title: "Live Class Recordings & Media Consent",
			content: (
				<div className="space-y-3">
					<p className="font-medium text-[#FFE500]">By enrolling in our courses, you explicitly acknowledge and agree that:</p>
					<ul className="space-y-2 text-white/80">
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
							<span><strong>Recordings:</strong> Live online sessions (Zoom/Webinar) are recorded for educational archiving</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
							<span><strong>Promotional Use:</strong> Ebirth Business Academy reserves the right to use these recordings—which may include your voice, video feed, or chat participation—for marketing and promotional purposes (e.g., social media posts, website advertisements)</span>
						</li>
					</ul>
					<p className="mt-4 text-white/70 italic">
						If you do not wish to appear in promotional materials, please keep your camera turned off during live sessions.
					</p>
				</div>
			),
		},
		{
			number: "4",
			title: "Contact Us",
			content: (
				<div className="space-y-2">
					<p>For privacy inquiries or data correction requests:</p>
					<p className="flex items-center gap-2 text-[#FFE500] font-medium">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFE500]"></span>
						Email: contact@ebirth.net
					</p>
				</div>
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
				<img
					src="/Bitcoin-PNG-removebg-preview.png"
					alt="Decorative coin"
					className="coin-float absolute left-[-90px] top-[38%] hidden md:block h-64 w-64 -rotate-[14deg] opacity-35"
					style={{ animationDelay: '0.6s' }}
				/>
				<img
					src="/coin2.webp"
					alt="Decorative coin"
					className="coin-float absolute left-[54%] top-[22%] h-16 w-16 -translate-x-1/2 rotate-[22deg] opacity-25"
					style={{ animationDelay: '1.8s' }}
				/>
				<img
					src="/coin2.webp"
					alt="Decorative coin"
					className="coin-float absolute left-[52%] bottom-[18%] h-14 w-14 -translate-x-1/2 rotate-[12deg] opacity-20"
					style={{ animationDelay: '2.2s' }}
				/>
				<img
					src="/Bitcoin-PNG-removebg-preview.png"
					alt="Decorative coin"
					className="coin-float absolute left-[6%] bottom-[30%] h-24 w-24 rotate-[26deg] opacity-18"
					style={{ animationDelay: '1.4s' }}
				/>
				<img
					src="/Bitcoin-PNG-removebg-preview.png"
					alt="Decorative coin"
					className="coin-float absolute right-[-70px] top-[80px] hidden lg:block h-40 w-40 rotate-[-12deg] opacity-40"
					style={{ animationDelay: '0.9s' }}
				/>
				<img
					src="/coin2.webp"
					alt="Decorative coin"
					className="coin-float absolute left-[0%] top-[15%] h-[180px] w-[180px]"
					style={{ animationDelay: '1.3s' }}
				/>
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
						eBirth Business Academy (Pvt) Ltd
					</p>
					<h1 className="text-4xl font-extrabold sm:text-5xl">Privacy Policy & Media Consent</h1>
					<p className="text-lg text-white/80">
						Effective Date: May 8, 2024
					</p>
					<p className="mx-auto max-w-3xl text-base text-white/75">
						At eBirth Business Academy, we are committed to protecting the privacy and
						security of your personal information. This policy outlines how we collect, use,
						and safeguard your data.
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
							If you have any questions about this Privacy Policy or wish to request data corrections:
						</p>
						<a
							href="mailto:contact@ebirth.net"
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
