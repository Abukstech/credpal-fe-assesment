

import { Scale, ShieldCheck, BadgeCheck } from 'lucide-react';

export function AuthSidebar() {
  return (
    <div className="bg-beam-dark text-white h-full flex flex-col justify-between p-8 relative overflow-hidden">
      {/* Mesh background pattern */}
      <div className="absolute inset-0 z-0 opacity-80">
        <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
          <g transform="translate(0,0)">
            <path
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,154.7C672,171,768,181,864,181.3C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="rgba(60, 207, 94, 0.1)"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
            <path
              d="M0,96L60,112C120,128,240,160,360,186.7C480,213,600,235,720,218.7C840,203,960,149,1080,122.7C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="rgba(60, 207, 94, 0.05)"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
            <path
              d="M0,32L40,42.7C80,53,160,75,240,90.7C320,107,400,117,480,117.3C560,117,640,107,720,112C800,117,880,139,960,154.7C1040,171,1120,181,1200,176C1280,171,1360,149,1400,138.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              fill="rgba(60, 207, 94, 0.1)"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </g>
        </svg>
      </div>

      <div className="z-10">
        {/* Logo */}
        <div className="mb-12">
          <div className="h-12 w-12 rounded-full bg-beam-gold text-beam-dark flex items-center justify-center font-bold text-2xl">
            B.
          </div>
        </div>

        {/* Hero Text */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Unlock High Returns with Collateralized Equity Asset
          </h1>
        </div>
      </div>

      {/* Features */}
      <div className="z-10">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Scale className="w-6 h-6 text-beam-green" />
            <span>Collateralized</span>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-beam-green" />
            <span>Secured</span>
          </div>
          <div className="flex items-center space-x-3">
            <BadgeCheck className="w-6 h-6 text-beam-green" />
            <span>Licensed & regulated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
