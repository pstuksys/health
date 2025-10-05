import { CMSLink } from '@/components/ui/cms-link'
import { ArrowRight } from 'lucide-react'

export function CQCRatingCard() {
  return (
    <div className="w-full max-w-md border border-gray-200 overflow-hidden bg-white">
      {/* CQC Logo Header */}
      <div className="p-4 md:p-6">
        <img
          src="/care-quality.svg"
          alt="Care Quality Commission"
          className="w-32 md:w-40 h-auto"
        />
      </div>

      {/* Organization Name */}
      <div className=" p-4 md:p-6">
        <h3 className="text-ds-dark-blue font-normal text-lg md:text-xl leading-snug">
          IPDiagnostics Ltd
        </h3>
      </div>

      {/* Rating Section */}
      <div className="p-4 md:p-6 space-y-4">
        <h4 className="text-ds-dark-blue font-bold text-base md:text-lg">CQC overall rating</h4>

        <div className="flex items-center gap-3">
          {/* <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 bg-[#00703c]" /> */}
          <span className="text-[#00703c] font-bold text-3xl md:text-4xl">Good</span>
        </div>

        <p className="text-ds-dark-blue text-base md:text-lg">25 August 2022</p>

        <CMSLink
          href="https://www.cqc.org.uk/location/1-10752457342"
          variant="primary"
          size="md"
          external={true}
          className="flex items-center gap-2 bg-white text-ds-dark-blue"
        >
          See the report
          <ArrowRight className="w-4 h-4" />
        </CMSLink>
      </div>
    </div>
  )
}
