import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { ArrowRight, Eye, Zap, BarChart3, Heart } from 'lucide-react';

const STEPS = [
  {
    icon: <Eye size={20} />,
    color: '#00D4FF',
    title: 'Choose Your Identity',
    description: 'Select which role you\'ll inhabit today. Each identity shares the same job title and skills — only their identity changes.',
  },
  {
    icon: <Zap size={20} />,
    color: '#C5A3FF',
    title: 'Live the Workday',
    description: 'Navigate real workplace scenarios: meetings, emails, chats. The same action leads to different outcomes depending on who you are.',
  },
  {
    icon: <BarChart3 size={20} />,
    color: '#FF6B9D',
    title: 'See the Dual Reality',
    description: 'At the end, two realities are revealed side by side. Same actions, same quality — radically different treatment.',
  },
  {
    icon: <Heart size={20} />,
    color: '#FF4D6D',
    title: 'Choose to Intervene',
    description: 'Toggle fairness policies and watch the UI heal. Then reflect on what systemic change looks like in practice.',
  },
];

export default function Intro() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold uppercase tracking-widest glass mb-6"
            style={{ color: '#C5A3FF', border: '1px solid rgba(197,163,255,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            How This Works
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Two realities.{' '}
            <span className="text-gradient-primary">One workplace.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            The bias isn't always visible. It lives in the gap between what you experience and what others take for granted.
            This replay makes that gap visible.
          </p>
        </motion.div>

        {/* Step cards - layered depth effect */}
        <div className="relative max-w-3xl w-full mb-16">
          {/* Ghost layer behind - creates depth */}
          <div className="absolute top-3 left-3 right-3 bottom-0 rounded-3xl opacity-20"
            style={{ background: 'linear-gradient(135deg, rgba(197,163,255,0.1), rgba(0,212,255,0.05))', border: '1px solid rgba(255,255,255,0.05)' }} />
          <div className="absolute top-1.5 left-1.5 right-1.5 bottom-0 rounded-3xl opacity-40"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }} />

          <div className="relative glass rounded-3xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                className="flex items-start gap-5 px-8 py-6 group"
                style={{ borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                {/* Step number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}33`, color: step.color }}>
                    {step.icon}
                  </div>
                  <div className="text-[10px] font-display font-bold"
                    style={{ color: step.color, opacity: 0.6 }}>
                    0{i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-gradient-primary transition-all">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line */}
                <div className="flex-shrink-0 w-1 h-full self-center opacity-20"
                  style={{ background: step.color, borderRadius: 1 }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Warning notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-10 max-w-lg text-center"
        >
          <div className="glass rounded-2xl px-6 py-4"
            style={{ border: '1px solid rgba(255,77,109,0.15)', background: 'rgba(255,77,109,0.03)' }}>
            <p className="text-sm text-white/50 leading-relaxed">
              <span className="text-accent font-semibold">Content note: </span>
              This simulation depicts real workplace bias — including interruption, credit theft, and gendered language.
              These scenarios reflect documented workplace inequities.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Button
            variant="primary"
            size="xl"
            onClick={() => navigate('/role-select')}
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Choose Your Identity
          </Button>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
