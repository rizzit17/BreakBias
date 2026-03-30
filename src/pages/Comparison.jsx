import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ComparisonView from '../features/comparison/ComparisonView';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { useRoleState } from '../hooks/useRoleState';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { selectedRole } = state;
  const { allRoles } = useRoleState();

  if (!selectedRole) { navigate('/role-select'); return null; }

  const otherRoles = allRoles.filter(r => r.id !== selectedRole.id);

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen flex flex-col" style={{ background: '#070a13' }}>
        {/* Header */}
        <div className="bg-black/60 px-6 py-4 flex items-center justify-between border-b border-white/5 relative z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/summary')}
              className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors">
              <ArrowLeft size={18} className="text-white/60" />
            </button>
            <div>
              <h1 className="text-xl font-display font-bold text-white">Compare Realities</h1>
              <div className="text-xs text-white/40 font-display">
                Same action, different outcome
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="primary"
              onClick={() => navigate('/intervention')}
              icon={<ShieldCheck size={18} />}
              iconPosition="left"
            >
              Take Action
            </Button>
          </div>
        </div>

        {/* Hero split comparison view */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          {/* Main comparison component */}
          <ComparisonView
            roleIdA="male-manager"
            roleIdB={selectedRole.id === 'male-manager' ? 'female-employee' : selectedRole.id}
          />

          {/* Callout explaining the gap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-sm rounded-2xl p-4 glass-strong text-center z-30"
            style={{ border: '1px solid rgba(197,163,255,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,163,255,0.1)' }}
          >
            <div className="text-xs font-display font-bold uppercase tracking-widest text-primary mb-2">
              The Reality Gap
            </div>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              When both identities do the exact same thing, the environment reacts differently. This gap — not individual performance — is the source of systemic bias.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/intervention')}
              className="w-full text-xs"
              icon={<ArrowRight size={14} />}
              iconPosition="right"
            >
              How do we fix this?
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
