import React from 'react';
import { IncidentMap } from './components/IncidentMap';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import svgPaths from './imports/svg-yragh2w9z4';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[955px] bg-[#1a1a1a] rounded-2xl p-12 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* Title */}
        <h1 className="text-[#7ee5ff] mb-12 tracking-[0.4px] text-[36px] leading-[36px] font-medium">
          Incident Detail View
        </h1>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* User Updated Photo */}
          <div className="bg-[#2a2a2a] rounded-[14px] border border-[#3a3a3a] shadow-lg overflow-hidden aspect-video">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1639369488374-561b5486177d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGZpcmUlMjBzbW9rZXxlbnwxfHx8fDE3NjEzMjQzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="User Updated Photo - Fire Incident"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detail Map */}
          <div className="bg-[#2a2a2a] rounded-[14px] border border-[#3a3a3a] shadow-lg overflow-hidden aspect-video">
            <IncidentMap />
          </div>
        </div>

        {/* Details and Action Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Detail Information */}
          <div className="bg-[#252525] rounded-[14px] p-6 border border-[#3a3a3a] flex-1 max-w-[408px]">
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p15268c80} stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M12.5 4.80334V17.3033" stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M7.5 2.69666V15.1967" stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Location</div>
                  <div className="text-white">Detail Map</div>
                </div>
              </div>
              
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p2cf60600} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Category</div>
                  <div className="text-white">Fire</div>
                </div>
              </div>
              
              {/* Reported */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <clipPath id="clip0_clock">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                    <g clipPath="url(#clip0_clock)">
                      <path d="M10 5V10L13.3333 11.6667" stroke="#05DF72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p14d24500} stroke="#05DF72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Reported</div>
                  <div className="text-white">2m ago</div>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <clipPath id="clip0_alert">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                    <g clipPath="url(#clip0_alert)">
                      <path d={svgPaths.p14d24500} stroke="#FDC700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M10 6.66667V10" stroke="#FDC700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M10 13.3333H10.0083" stroke="#FDC700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Status</div>
                  <div className="bg-[rgba(240,177,0,0.1)] border border-[rgba(240,177,0,0.3)] rounded-lg px-[8.8px] py-[1.8px] inline-block mt-1">
                    <span className="text-[#fdc700] text-xs">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="bg-[#2a2a2a] hover:bg-[#333333] text-white px-8 py-3 rounded-[10px] transition-colors duration-200 shadow-lg border border-[#3a3a3a] md:self-end">
            Set Status
          </button>
        </div>
      </div>
    </div>
  );
}
