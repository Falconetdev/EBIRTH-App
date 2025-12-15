import { Fragment, ReactNode } from "react";

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

const HighlightCard = ({ children, variant = "warning" }: { children: ReactNode; variant?: "warning" | "danger" }) => (
	<div className={`rounded-3xl border px-8 py-6 text-center text-sm font-semibold shadow-[0_16px_40px_rgba(20,5,50,0.35)] ${
		variant === "danger" 
			? "border-red-500/30 bg-red-500/10 text-red-200" 
			: "border-white/10 bg-white/10 text-white/90"
	}`}>
		{children}
	</div>
);

const TermsOfService = () => {
	const sections: PolicySectionProps[] = [
		{
			number: "1",
			title: "Membership & Access",
			content: (
				<div className="space-y-4">
					<div>
						<h3 className="font-semibold text-white mb-2">Lifetime Access:</h3>
						<p>Enrolled students are granted lifetime access to the "Live Trading Club" and course revision materials, subject to the Code of Conduct.</p>
					</div>
					<div>
						<h3 className="font-semibold text-white mb-2">Free Batch Retake:</h3>
						<p>Students are entitled to join one (1) additional batch of the same course free of charge for revision purposes.</p>
						<p className="text-white/70 text-sm mt-2">Participation beyond this second batch may be subject to a re-enrollment fee.</p>
					</div>
				</div>
			),
		},
		{
			number: "2",
			title: "Code of Conduct & Termination (Zero Tolerance)",
			content: (
				<div className="space-y-4">
					<p className="font-medium text-[#FFE500]">
						Ebirth Business Academy reserves the right to immediately terminate your membership and revoke all access (LMS, Live Classes, Groups) without refund if you engage in any of the following:
					</p>
					<ul className="space-y-3 text-white/80">
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
							<span><strong className="text-white">Illegal Activities:</strong> Using the platform for any purpose deemed unlawful under Sri Lankan law</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
							<span><strong className="text-white">Scams & Fraud:</strong> Attempting to defraud, mislead, or scam other students or staff members</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
							<span><strong className="text-white">Unauthorized Solicitation:</strong> Creating private groups (e.g., WhatsApp, Telegram) to poach students, soliciting money from students, or promoting competing services</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
							<span><strong className="text-white">Financial Misconduct:</strong> Collecting money from other students under false pretenses</span>
						</li>
					</ul>
				</div>
			),
		},
		{
			number: "3",
			title: "Payment Terms",
			content: (
				<div className="space-y-3">
					<ul className="space-y-2 text-white/80">
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
							<span><strong className="text-white">Currency:</strong> All transactions are processed in Sri Lankan Rupees (LKR)</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
							<span><strong className="text-white">Taxes:</strong> All listed prices are inclusive of applicable taxes</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
							<span><strong className="text-white">Installments:</strong> We do not offer direct installment plans. Credit card installment facilities are subject to the terms and approval of your specific bank</span>
						</li>
					</ul>
				</div>
			),
		},
		{
			number: "4",
			title: "Certification",
			content: (
				<p>
					Digital certificates or official confirmation letters are issued only upon specific request (via email or written letter) after successful course completion.
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
					<h1 className="text-4xl font-extrabold sm:text-5xl">Terms of Service & Membership</h1>
					<p className="text-lg text-white/80">
						Effective Date: May 8, 2024
					</p>
					<p className="mx-auto max-w-3xl text-base text-white/75">
						By enrolling in our courses, you agree to comply with these terms of service. Please read them carefully to understand your rights and responsibilities as a member of eBirth Business Academy.
					</p>
				</header>

				<div className="space-y-10">
					{sections.map((section, index) => (
						<Fragment key={section.number}>
							<PolicySection {...section} />
							{index === 0 && (
								<HighlightCard>
									Benefit: Lifetime access to Live Trading Club and one free batch retake included with enrollment.
								</HighlightCard>
							)}
							{index === 1 && (
								<HighlightCard variant="danger">
									⚠️ Zero Tolerance Policy: Any violation will result in immediate termination without refund.
								</HighlightCard>
							)}
						</Fragment>
					))}

					<div className="rounded-[28px] bg-white/12 px-8 py-8 text-center text-white">
						<p className="text-base font-medium text-white/85">
							If you have any questions about these terms or need clarification:
						</p>
						<div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
							<a
								href="mailto:contact@ebirth.net"
								className="inline-flex items-center justify-center rounded-full bg-[#FFE500] px-8 py-3 text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_30px_rgba(158,124,255,0.35)] transition hover:bg-[#ffdd38]"
							>
								Email Us
							</a>
							<a
								href="tel:0114492444"
								className="inline-flex items-center justify-center rounded-full border-2 border-[#FFE500] px-8 py-3 text-sm font-semibold text-[#FFE500] transition hover:bg-[#FFE500]/10"
							>
								Call: 011 449 2444
							</a>
						</div>
					</div>
				</div>
			</div>

			<WhatsAppButton />
		</PageLayout>
	);
};

export default TermsOfService;