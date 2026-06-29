import "./index.css";
import {
  BRAND,
  PRODUCT,
  HERO,
  PAIN_POINTS,
  SOLUTION,
  DIAGNOSIS_ITEMS,
  DELIVERABLES,
  PRICING,
  FLOW,
  AFTER_SUPPORT,
  FAQ,
  FORM,
} from "./content";
import { useState } from "react";

// ─── Shared components ───────────────────────────────────────────────────────

function CtaButton({ label, size = "md", className = "" }) {
  return (
    <a
      href="#apply"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", "YuGothic", "Noto Sans JP", sans-serif' }}
      className={`
        inline-block rounded-lg font-semibold text-white
        bg-blue-700 hover:bg-blue-800 transition-colors
        ${size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}
        ${className}
      `}
    >
      {label}
    </a>
  );
}

function SectionWrapper({ id, bg = "white", children }) {
  return (
    <section
      id={id}
      className={`py-20 px-4 ${bg === "gray" ? "bg-[#F7F7F2]" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-10 leading-snug">
      {children}
    </h2>
  );
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function HeroDashboard() {
  const items = [
    { label: "Instagram", color: "bg-pink-50 border-pink-200", dot: "bg-pink-400", status: "導線を診断" },
    { label: "ECサイト", color: "bg-orange-50 border-orange-200", dot: "bg-orange-400", status: "購入導線を確認" },
    { label: "Web / LP", color: "bg-blue-50 border-blue-200", dot: "bg-blue-400", status: "CTAを整理" },
    { label: "営業資料", color: "bg-indigo-50 border-indigo-200", dot: "bg-indigo-400", status: "構成を見直し" },
    { label: "AI活用", color: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-400", status: "活用余地を発見" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-lg p-6 w-full max-w-sm mx-auto lg:mx-0">
      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-4">診断カテゴリ</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${item.color}`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
              <span className="text-sm font-medium text-[#374151]">{item.label}</span>
            </div>
            <span className="text-xs text-[#6B7280]">{item.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-[#E5E7EB]">
        <div className="flex justify-between text-xs text-[#6B7280]">
          <span>納品まで</span>
          <span className="font-semibold text-[#1E3A8A]">{PRODUCT.delivery}</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-[#F7F7F2] pt-16 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold text-[#2563EB] mb-6 tracking-wide">{BRAND}</p>
        <div className="flex flex-col lg:flex-row lg:items-center gap-12">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] leading-tight mb-6">
              {HERO.headline}
            </h1>
            <p className="text-base md:text-lg text-[#374151] leading-relaxed mb-8 whitespace-pre-line">
              {HERO.subheadline}
            </p>
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#111827]">{PRODUCT.price}</p>
              <p className="text-sm text-[#6B7280] mt-1">納期：{PRODUCT.delivery}</p>
            </div>
            <CtaButton label={HERO.cta} size="lg" />
          </div>
          <div className="flex-shrink-0 w-full lg:w-auto">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Pain Points ───────────────────────────────────────────────────────────

function PainPoints() {
  return (
    <SectionWrapper bg="white">
      <SectionHeading>{PAIN_POINTS.heading}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAIN_POINTS.items.map((item) => (
          <div
            key={item.text}
            className="flex items-start gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-[#F7F7F2]"
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
            <p className="text-[#374151] text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton label="まず診断で原因を整理する →" />
      </div>
    </SectionWrapper>
  );
}

// ─── 3. Solution ──────────────────────────────────────────────────────────────

function Solution() {
  return (
    <SectionWrapper bg="gray">
      <div className="max-w-2xl mx-auto">
        <SectionHeading>{SOLUTION.heading}</SectionHeading>
        <div className="space-y-4 text-[#374151] text-base leading-relaxed">
          {SOLUTION.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── 4. Diagnosis Items ───────────────────────────────────────────────────────

function DiagnosisItems() {
  return (
    <SectionWrapper bg="white">
      <SectionHeading>{DIAGNOSIS_ITEMS.heading}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {DIAGNOSIS_ITEMS.items.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:shadow-sm transition-all"
          >
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <h3 className="font-bold text-[#111827] text-base mb-2">{item.title}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              <span className="font-medium text-[#374151]">見るポイント：</span>
              {item.points}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton label="6項目まとめて診断してもらう →" />
      </div>
    </SectionWrapper>
  );
}

// ─── 5. Deliverables ──────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#D6E4FF] flex items-center justify-center">
      <svg className="w-3 h-3 text-[#1E3A8A]" fill="none" viewBox="0 0 12 12">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Deliverables() {
  return (
    <SectionWrapper bg="gray">
      <div className="max-w-2xl mx-auto">
        <SectionHeading>{DELIVERABLES.heading}</SectionHeading>
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
          <ul className="space-y-4">
            {DELIVERABLES.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#374151] text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── 6. Pricing ───────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <SectionWrapper bg="white">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeading>{PRICING.heading}</SectionHeading>
        <div className="bg-[#F7F7F2] border border-[#E5E7EB] rounded-2xl p-8 text-left">
          <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
            <p className="text-sm font-semibold text-[#2563EB] mb-1">{BRAND}</p>
            <p className="text-xl font-bold text-[#111827]">{PRODUCT.name}</p>
            <p className="text-4xl font-bold text-[#111827] mt-3">{PRODUCT.price}</p>
          </div>
          <p className="text-sm font-semibold text-[#374151] mb-4">含まれるもの</p>
          <ul className="space-y-3 mb-6">
            {PRICING.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-sm text-[#374151]">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-5">
            {PRICING.note}
          </p>
        </div>
        <div className="mt-8">
          <CtaButton label="33,000円で初回診断を申し込む" size="lg" />
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── 7. Flow ─────────────────────────────────────────────────────────────────

function Flow() {
  return (
    <SectionWrapper bg="gray">
      <SectionHeading>{FLOW.heading}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {FLOW.steps.map((step) => (
          <div key={step.number} className="bg-white rounded-xl border border-[#E5E7EB] p-5">
            <span className="inline-block text-xs font-bold text-[#2563EB] bg-[#D6E4FF] rounded-full px-3 py-1 mb-3">
              STEP {step.number}
            </span>
            <p className="font-bold text-[#111827] text-sm mb-2">{step.title}</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

// ─── 8. After Support ─────────────────────────────────────────────────────────

function AfterSupport() {
  return (
    <SectionWrapper bg="white">
      <div className="max-w-2xl mx-auto">
        <SectionHeading>{AFTER_SUPPORT.heading}</SectionHeading>
        <p className="text-[#374151] mb-8">{AFTER_SUPPORT.body}</p>
        <div className="flex flex-wrap gap-3">
          {AFTER_SUPPORT.items.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full border border-[#E5E7EB] text-sm text-[#374151] bg-[#F7F7F2]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <CtaButton label="自社の導線を診断してもらう →" />
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── 9. FAQ ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E5E7EB] last:border-0">
      <button
        className="w-full text-left flex justify-between items-start gap-4 py-5"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-[#111827] text-sm leading-relaxed">{q}</span>
        <span className="flex-shrink-0 mt-0.5 text-[#6B7280] text-lg leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="text-sm text-[#374151] leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  );
}

function FaqSection() {
  return (
    <SectionWrapper bg="gray">
      <div className="max-w-2xl mx-auto">
        <SectionHeading>{FAQ.heading}</SectionHeading>
        <div className="bg-white rounded-2xl border border-[#E5E7EB] px-6 py-2">
          {FAQ.items.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── 10. Apply Form ───────────────────────────────────────────────────────────

function ApplyForm() {
  return (
    <section id="apply" className="py-20 px-4 bg-[#1E3A8A]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          {FORM.heading}
        </h2>
        <p className="text-center text-[#D6E4FF] text-sm mb-10">
          {PRODUCT.price} ／ {PRODUCT.delivery}
        </p>
        <div className="bg-white rounded-2xl p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {FORM.fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-[#374151] mb-1"
                >
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500 text-xs">必須</span>
                  )}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    rows={4}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-none"
                    placeholder={`${field.label}を入力してください`}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.id}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="">選択してください</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    placeholder={
                      field.type === "url"
                        ? "https://"
                        : `${field.label}を入力してください`
                    }
                  />
                )}
              </div>
            ))}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-lg text-base transition-colors"
              >
                {FORM.cta}
              </button>
              <p className="text-center text-xs text-[#6B7280] mt-3">
                送信後、2営業日以内にご連絡いたします
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <p className="font-bold text-[#111827] text-sm">{BRAND}</p>
        <a
          href="#apply"
          className="text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors px-4 py-2 rounded-lg"
        >
          診断を申し込む
        </a>
      </div>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#111827] text-[#9CA3AF] text-sm py-8 px-4 text-center">
      <p className="font-medium text-white mb-1">{BRAND}</p>
      <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <DiagnosisItems />
        <Deliverables />
        <Pricing />
        <Flow />
        <AfterSupport />
        <FaqSection />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
