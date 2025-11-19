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

const HighlightCard = ({ children }: { children: ReactNode }) => (
	<div className="rounded-3xl border border-white/10 bg-white/10 px-8 py-6 text-center text-sm font-semibold text-white/90 shadow-[0_16px_40px_rgba(20,5,50,0.35)]">
		{children}
	</div>
);

const RefundPolicy = () => {
	const sections: PolicySectionProps[] = [
		{
			number: "1",
			title: "Refund Eligibility",
			content: (
				<div className="space-y-3">
					<p>Refunds are evaluated under the following conditions:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"Duration: Refunds are only applicable within 30 days of the initial purchase.",
							"Attendance: Once a student attends even one day of a physical or online class, they are ineligible for a refund.",
							"Access: If a student accesses any course materials, including but not limited to LMS or video lessons from class recordings, they are ineligible for a refund.",
						].map((item) => (
							<li key={item} className="flex items-start gap-2">
								<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			number: "2",
			title: "Refund Process",
			content: (
				<div className="space-y-3">
					<p>The refund request journey follows these steps:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"Eligible Refunds: Students eligible for refunds within the 30-day window will receive their refund to their bank account within 14 days of the refund request.",
							"Deductions: Additional charges may be deducted from the refund amount depending on the circumstances.",
							"Waiting Period: Refunds will not be processed immediately upon request. Please allow up to 14 days for processing from the date of the refund request.",
						].map((item) => (
							<li key={item} className="flex items-start gap-2">
								<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			number: "3",
			title: "Enforcement of Policy",
			content: (
				<div className="space-y-3">
					<p>We may disclose your personal information in the following circumstances:</p>
					<ul className="space-y-2 text-white/80">
						{[
							"Dispute Resolution: In the event of a dispute regarding eligibility for a refund, eBirth Business Academy Pvt Ltd reserves the right to refer to this policy for resolution.",
							"Legal Recourse: Any disputes that cannot be resolved amicably shall be subject to applicable laws and regulations.",
						].map((item) => (
							<li key={item} className="flex items-start gap-2">
								<span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE500]"></span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			number: "7",
			title: "Contact Information",
			content: (
				<p>
					If you have any questions about this refund policy or wish to exercise your rights, please
					contact us.
				</p>
			),
		},
		{
			number: "8",
			title: "Amendments",
			content: (
				<p>
					This refund policy was last updated on February 21, 2024. eBirth Business Academy Pvt Ltd
					reserves the right to amend this refund policy at any time. Any changes will be effective
					immediately upon posting on our website or notifying affected parties.
				</p>
			),
		},
	];

	return (
		<PageLayout
			className="bg-[#0C0224] text-white"
			mainClassName="relative isolate overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8"
		>
			<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#1F055C] via-[#2E0E7A] to-[#6B23FF]" />
			<div className="pointer-events-none absolute left-[-12%] top-[-10%] -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25),_transparent_65%)] blur-3xl" />
			<div className="pointer-events-none absolute right-[-8%] bottom-[-12%] -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(123,76,255,0.35),_transparent_70%)] blur-3xl" />

			<div className="mx-auto flex max-w-5xl flex-col gap-16">
				<header className="space-y-5 text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
						eBirth Business Academy
					</p>
					<h1 className="text-4xl font-extrabold sm:text-5xl">Refund Policy</h1>
					<p className="text-lg text-white/80">
						Where Dreams Take Flight and Entrepreneurs Are Born
					</p>
					<p className="mx-auto max-w-3xl text-base text-white/75">
						Thank you for choosing eBirth Business Academy Pvt Ltd for your educational needs. Please
						read our refund policy carefully to understand your rights and responsibilities.
					</p>
				</header>

				<div className="space-y-10">
					{sections.map((section) => (
						<Fragment key={section.number}>
							<PolicySection {...section} />
							{section.number === "1" ? (
								<HighlightCard>
									Important: These conditions are strictly enforced to maintain the quality and value
									of our educational programs.
								</HighlightCard>
							) : null}
							{section.number === "2" ? (
								<HighlightCard>
									Processing Time: All eligible refunds are processed within 14 business days to ensure
									proper verification and bank transfer completion.
								</HighlightCard>
							) : null}
						</Fragment>
					))}

					<div className="rounded-[28px] bg-white/12 px-8 py-8 text-center text-white">
						<p className="text-base font-medium text-white/85">
							If you have any questions about this refund policy or wish to exercise your rights,
							please contact us:
						</p>
						<a
							href="/contact"
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

export default RefundPolicy;
