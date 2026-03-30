import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronRight } from 'lucide-react';
import AvatarMorph from '../../components/effects/AvatarMorph';
import { useRoleState } from '../../hooks/useRoleState';

export default function RoleCard({ role, index, isSelected, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const { allRoles } = useRoleState();

  const otherRoles = allRoles.filter(r => r.id !== role.id);
  const altRoleId = otherRoles[0]?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => !role.locked && onSelect(role.id)}
      className="relative cursor-pointer group"
    >
      {/* Card */}
      <div
        className="relative rounded-3xl p-6 overflow-hidden transition-all duration-500 glass"
        style={{
          border: isSelected
            ? `2px solid ${role.color}`
            : isHovered
            ? `1px solid ${role.color}66`
            : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isSelected
            ? `0 0 40px ${role.color}44, inset 0 0 40px ${role.color}08`
            : isHovered
            ? `0 20px 60px ${role.color}22`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        {/* Identity top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl transition-all duration-500"
          style={{
            background: role.gradient,
            boxShadow: isHovered ? `0 0 20px ${role.color}88` : 'none',
            opacity: isHovered || isSelected ? 1 : 0.4,
          }}
        />

        {/* Ambient glow blob */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full transition-opacity duration-500 pointer-events-none"
          style={{ background: role.color, filter: 'blur(60px)', opacity: isHovered ? 0.1 : 0.04 }} />

        {/* Ghost layer (other identity overlay on hover) */}
        {isHovered && !role.locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${role.color}08, transparent 70%)` }}
          />
        )}

        {/* Lock overlay */}
        {role.locked && (
          <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-20">
            <Lock size={24} className="text-white/40 mb-2" />
            <span className="text-xs text-white/30 font-display">Complete another role first</span>
          </div>
        )}

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <AvatarMorph
            roleId={role.id}
            targetRoleId={altRoleId}
            isAnimating={isHovered && !role.locked}
            size={80}
            showRing={isSelected || isHovered}
          />
        </div>

        {/* Role info */}
        <div className="text-center mb-4">
          <div className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] mb-1"
            style={{ color: role.color }}>
            {role.pronoun}
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-1">{role.name}</h3>
          <div className="text-xs text-white/40 font-display">{role.title}</div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 text-center leading-relaxed mb-5">
          {role.description}
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-medium transition-all duration-300"
            style={{
              background: isSelected || isHovered ? `${role.color}20` : 'rgba(255,255,255,0.04)',
              color: isSelected || isHovered ? role.color : 'rgba(255,255,255,0.3)',
              border: `1px solid ${isSelected || isHovered ? role.color + '40' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {isSelected ? 'Selected' : 'Experience this reality'}
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
