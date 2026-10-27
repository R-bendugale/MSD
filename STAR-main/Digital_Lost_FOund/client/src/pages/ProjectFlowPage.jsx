import React from 'react';
import { GitBranch, Layers, ArrowDown, Server, Database, Code, Lock } from 'lucide-react';

const Arrow = () => (
  <div className="flex flex-col items-center -my-1">
    <span className="w-0.5 h-3 bg-ink" />
    <ArrowDown className="w-4 h-4 -mt-1" />
  </div>
);

const Node = ({ children, className = '' }) => (
  <div className={`border-2 border-ink px-5 py-3 w-full text-center shadow-[3px_3px_0_#15130e] ${className}`}>{children}</div>
);

const ProjectFlowPage = () => {
  return (
    <div className="space-y-10">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-moss"><GitBranch className="w-3 h-3" />Blueprint</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Project Architecture & System Flow</h1>
        <p className="text-ink-soft mt-3 max-w-3xl">
          Complete workflow diagram and MERN tech stack specifications as defined in project documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Stack — now on the left */}
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <h3 className="font-display font-bold text-2xl flex items-center gap-2 border-b-2 border-ink pb-3">
            <Code className="w-5 h-5 text-plum" />
            <span>MERN Technology Stack</span>
          </h3>

          <div className="space-y-4">
            {[
              { Icon: Code, t: 'Frontend Layer', d: 'React.js, React Router DOM v6, Tailwind CSS, Lucide Icons', bg: 'bg-clay-soft', n: 'L1' },
              { Icon: Server, t: 'Backend API Layer', d: 'Node.js, Express.js RESTful routes, Controller pattern', bg: 'bg-moss-soft', n: 'L2' },
              { Icon: Database, t: 'Database Layer', d: 'MongoDB with Mongoose Schemas (User, Item, Claim, Notification)', bg: 'bg-plum-soft', n: 'L3' },
              { Icon: Lock, t: 'Security & Uploads', d: 'JSON Web Tokens (JWT), bcryptjs password hashing, Multer image upload', bg: 'bg-saffron-soft', n: 'L4' },
            ].map(({ Icon, t, d, bg, n }) => (
              <div key={t} className={`${bg} border-2 border-ink shadow-[4px_4px_0_#15130e] flex`}>
                <div className="w-14 shrink-0 bg-ink text-paper flex flex-col items-center justify-center gap-1 py-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-mono text-[10px]">{n}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-display font-bold text-lg leading-tight">{t}</h4>
                  <p className="text-sm text-ink-soft mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-ink text-paper p-6 border-2 border-ink shadow-[6px_6px_0_#f2b630] space-y-2">
            <h4 className="font-display font-bold text-xl text-saffron italic">DYPCET Academic Project</h4>
            <p className="text-sm text-paper/75 leading-relaxed">
              Designed for D. Y. Patil College of Engineering & Technology, Kolhapur. Student Shweta Tanaji Kolekar (CSE, B.Tech, Roll 29, Batch B2).
            </p>
          </div>
        </div>

        {/* Flowchart */}
        <div className="lg:col-span-7 sheet p-6 sm:p-8 space-y-6 order-1 lg:order-2">
          <h3 className="font-display font-bold text-2xl flex items-center gap-2 border-b-2 border-ink pb-3">
            <Layers className="w-5 h-5 text-clay" />
            <span>System Execution Flowchart</span>
          </h3>

          <div className="flex flex-col items-center gap-3 font-mono text-xs uppercase tracking-wider">

            <span className="bg-ink text-paper px-6 py-1.5 border-2 border-ink">START</span>
            <Arrow />

            <Node className="bg-card">User Registration / Login (JWT Authentication)</Node>
            <Arrow />

            <Node className="bg-saffron font-medium">User Accesses Dashboard</Node>
            <Arrow />

            <div className="grid grid-cols-2 gap-4 w-full">
              <Node className="bg-clay text-card !px-3">Report Lost Item</Node>
              <Node className="bg-moss text-card !px-3">Report Found Item</Node>
            </div>
            <Arrow />

            <Node className="bg-plum text-card">Store Item Details in MongoDB</Node>
            <Arrow />

            <Node className="bg-paper-deep">Search & Filter Campus Items Feed</Node>
            <Arrow />

            {/* Decision */}
            <div className="relative w-full flex justify-center py-2">
              <div className="bg-saffron border-2 border-ink px-8 py-5 font-display normal-case tracking-normal font-extrabold text-lg rotate-0 [clip-path:polygon(8%_0,92%_0,100%_50%,92%_100%,8%_100%,0_50%)]">
                Possible Match Found?
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2 normal-case tracking-normal font-body">

              {/* YES */}
              <div className="bg-moss-soft border-2 border-ink p-4 space-y-3">
                <span className="block font-mono text-xs uppercase tracking-widest font-medium text-center text-moss">● YES</span>
                <div className="bg-card p-2.5 border-2 border-ink text-center text-sm">View Item & Submit Claim Request</div>
                <div className="flex justify-center"><ArrowDown className="w-4 h-4" /></div>
                <div className="bg-card p-2.5 border-2 border-ink text-center text-sm">Admin Ownership Verification</div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-moss text-card p-2 border-2 border-ink text-center font-mono text-[10px] uppercase tracking-wider">
                    Approved <br />
                    <span className="normal-case tracking-normal opacity-80">Item Returned</span>
                  </div>
                  <div className="bg-clay text-card p-2 border-2 border-ink text-center font-mono text-[10px] uppercase tracking-wider">
                    Rejected <br />
                    <span className="normal-case tracking-normal opacity-80">Claim Closed</span>
                  </div>
                </div>
              </div>

              {/* NO */}
              <div className="bg-paper-deep border-2 border-ink p-4 flex flex-col justify-between gap-3">
                <div>
                  <span className="block font-mono text-xs uppercase tracking-widest font-medium text-center text-ink-soft">○ NO</span>
                  <div className="bg-card p-3 border-2 border-dashed border-ink text-center text-sm mt-2">
                    Continue Search & Wait for Notification Match
                  </div>
                </div>
                <div className="text-center font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                  Keep monitoring item feeds
                </div>
              </div>

            </div>

            <span className="bg-ink text-paper px-6 py-1.5 border-2 border-ink mt-4">END PROCESS</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProjectFlowPage;
