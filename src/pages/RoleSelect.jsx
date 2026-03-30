import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import RoleCard from '../features/role/RoleCard';
import Button from '../components/ui/Button';
import AvatarMorph from '../components/effects/AvatarMorph';
import { useRoleState } from '../hooks/useRoleState';
import { ArrowRight, Info } from 'lucide-react';

export default function RoleSelect() {
  const navigate = useNavigate();
  const { allRoles, selectRole, selectedRole } = useRoleState();
  const [localSelected, setLocalSelected] = useState(null);

  function handleSelect(roleId) {
    const role = allRoles.find(r => r.id === roleId);
    if (!role || role.locked) return;
    setLocalSelected(roleId);
  }

  function handleConfirm() {
    if (!localSelected) return;
    selectRole(localSelected);
    navigate('/dashboard');
  }

  const selectedRoleData = allRoles.find(r => r.id === localSelected);

  return (
    <PageWrapper>
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold uppercase tracking-widest glass mb-6"
              style={{ color: '#C5A3FF', border: '1px solid rgba(197,163,255,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Step 1 of 4
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Choose your{' '}
              <span className="text-gradient-primary">identity</span>
            </h1>
            <p className="text-white/40 max-w-lg mx-auto">
              You'll experience the same workday, the same scenarios — from inside a different identity.
              Who lives the equitable reality? Who doesn't?
            </p>
          </motion.div>

          {/* Role cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {allRoles.map((role, i) => (
              <RoleCard
                key={role.id}
                role={role}
                index={i}
                isSelected={localSelected === role.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Info note about intern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 justify-center mb-10"
          >
            <Info size={12} className="text-white/20" />
            <p className="text-xs text-white/25 font-display">
              The Intern role unlocks after completing any other identity's replay
            </p>
          </motion.div>

          {/* Confirm button */}
          <AnimatePresence>
            {localSelected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-center gap-4"
              >
                {/* Selected preview */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass"
                  style={{ border: `1px solid ${selectedRoleData?.color}33` }}>
                  <AvatarMorph roleId={localSelected} size={36} />
                  <div>
                    <div className="text-sm font-display font-semibold text-white">{selectedRoleData?.name}</div>
                    <div className="text-xs text-white/40">{selectedRoleData?.pronoun} · {selectedRoleData?.title}</div>
                  </div>
                  <div className="ml-2 text-xs font-display px-2 py-1 rounded-lg"
                    style={{ background: `${selectedRoleData?.color}18`, color: selectedRoleData?.color }}>
                    Selected
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleConfirm}
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Begin as {selectedRoleData?.name}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
