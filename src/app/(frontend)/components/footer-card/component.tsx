import { CMSLink } from '@/components/ui/cms-link'
import { ArrowRight } from 'lucide-react'

export function CQCRatingCard() {
  return (
    <div className="w-full max-w-[200px] h-fit border border-gray-200 overflow-hidden bg-white">
      {/* CQC Logo Header */}
      <div className="p-2">
        <img src="/care-quality.svg" alt="Care Quality Commission" className="w-32 h-auto" />
      </div>

      {/* Organization Name */}
      <div className="p-2">
        <h3 className="text-ds-dark-blue font-normal text-base leading-tight">IPDiagnostics Ltd</h3>
      </div>

      {/* Rating Section */}
      <div className="p-2 space-y-1.5 bg-gray-100 mx-2 mb-2">
        <h4 className="text-ds-dark-blue font-bold text-sm">CQC overall rating</h4>

        <div className="flex items-center gap-4">
          <div className="w-4 h-4 rounded-full bg-[#00703c]"></div>
          <span className="text-[#00703c] font-bold text-xl">Good</span>
        </div>

        <p className="text-ds-dark-blue text-sm">25 August 2022</p>

        <CMSLink
          href="https://www.cqc.org.uk/location/1-10752457342"
          variant="primary"
          size="sm"
          external={true}
          className="flex items-center gap-1 bg-white text-ds-dark-blue text-xs"
        >
          See the report
          <ArrowRight className="w-3 h-3" />
        </CMSLink>
      </div>
    </div>
  )
}
