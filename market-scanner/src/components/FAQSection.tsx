import { FAQ } from '@/types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 relative">
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
