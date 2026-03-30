import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import BiasIndicator from '../features/bias/BiasIndicator';
import Button from '../components/ui/Button';
import AvatarMorph from '../components/effects/AvatarMorph';
import { useApp } from '../context/AppContext';
import { useRoleState } from '../hooks/useRoleState';
import { Mail, MessageSquare, Calendar, ArrowRight, Clock, User, Briefcase } from 'lucide-react';
import scenariosData from '../data/scenarios.json';

const EMAIL_PREVIEWS = {
  'male-manager': [
    { from: 'Mark D.', subject: 'Q3 Review — Exceptional Performance', time: '10:30 AM', unread: true, color: '#00D4FF' },
    { from: 'HR Team', subject: 'Leadership Development Opportunity', time: '9:15 AM', unread: true, color: '#C5A3FF' },
    { from: 'Emily', subject: 'Design sync tomorrow?', time: '8:45 AM', unread: false, color: '#9B59B6' },
  ],
  'female-employee': [
    { from: 'Mark D.', subject: 'Q3 Review — Performance Notes', time: '10:30 AM', unread: true, color: '#FF4D6D' },
    { from: 'David', subject: 'Re: Strategy idea', time: '9:00 AM', unread: true, color: '#FF6B9D' },
    { from: 'HR Team', subject: 'Communication Style Workshop', time: '8:30 AM', unread: false, color: '#9B59B6' },
  ],
  'intern': [
    { from: 'HR Team', subject: 'Internship Check-In', time: '10:30 AM', unread: true, color: '#9B59B6' },
    { from: 'System', subject: 'Your meeting request is pending', time: '9:00 AM', unread: false, color: '#C5A3FF' },
    { from: 'Emily', subject: 'Lunch plans?', time: '8:00 AM', unread: false, color: '#9B59B6' },
  ],
};

const CALENDAR_EVENTS = [
  { time: '9:00', title: 'Q3 Strategy Meeting', duration: '1hr', color: '#C5A3FF' },
  { time: '10:30', title: 'Performance Review Email', duration: '—', color: '#FF6B9D' },
  { time: '12:00', title: 'Team Slack Discussion', duration: 'Ongoing', color: '#00D4FF' },
  { time: '3:00', title: 'Promotion Conversation', duration: '30m', color: '#FF4D6D' },
];

const CHAT_MSGS = {
  'male-manager': [
    { sender: 'Mark', text: 'Alex, great job on the roadmap presentation!', time: '9:42 AM' },
    { sender: 'Emily', text: 'Love the direction you laid out 👏', time: '9:45 AM' },
    { sender: 'David', text: 'Fully aligned. Let\'s move fast.', time: '9:47 AM' },
  ],
  'female-employee': [
    { sender: 'David', text: 'What Sarah is trying to say is...', time: '9:42 AM' },
    { sender: 'Mark', text: 'Good point David.', time: '9:43 AM' },
    { sender: 'Emily', text: 'Hey Sarah, can you take notes?', time: '9:50 AM' },
  ],
  'intern': [
    { sender: 'Mark', text: 'Let\'s table that for the senior team.', time: '9:42 AM' },
    { sender: 'David', text: 'Interns should shadow first.', time: '9:43 AM' },
    { sender: 'Emily', text: 'Can you grab coffee for the room?', time: '9:50 AM' },
  ],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { selectedRole } = state;

  if (!selectedRole) {
    navigate('/role-select');
    return null;
  }

  const emails = EMAIL_PREVIEWS[selectedRole.id] || EMAIL_PREVIEWS['male-manager'];
  const chats = CHAT_MSGS[selectedRole.id] || CHAT_MSGS['male-manager'];
  const scenarios = scenariosData.scenarios;

  return (
    <PageWrapper>
      <div className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Identity header bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl p-4 flex items-center justify-between glass"
            style={{ border: `1px solid ${selectedRole.color}22` }}
          >
            <div className="flex items-center gap-4">
              <AvatarMorph roleId={selectedRole.id} size={48} />
              <div>
                <div className="text-xs font-display uppercase tracking-widest mb-0.5" style={{ color: selectedRole.color }}>
                  You are experiencing this day as
                </div>
                <h2 className="text-lg font-display font-bold text-white">{selectedRole.name}</h2>
                <div className="text-xs text-white/40">{selectedRole.title} · {selectedRole.pronoun}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-white/30 font-display flex items-center gap-1.5">
                <Clock size={12} />
                Monday, March 30
              </div>
              <Button variant="primary" size="sm" onClick={() => navigate('/scenario/0')} icon={<ArrowRight size={14} />} iconPosition="right">
                Start Day
              </Button>
            </div>
          </motion.div>

          {/* Main dashboard grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Email panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-12 md:col-span-4 rounded-2xl glass overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Mail size={14} className="text-primary/60" />
                <span className="text-xs font-display font-semibold text-white/60">Inbox</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-display"
                  style={{ background: 'rgba(197,163,255,0.15)', color: '#C5A3FF' }}>
                  {emails.filter(e => e.unread).length} new
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {emails.map((email, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {email.unread && <div className="w-1.5 h-1.5 rounded-full" style={{ background: email.color }} />}
                        <span className="text-xs font-display font-semibold text-white/70 group-hover:text-white transition-colors">{email.from}</span>
                      </div>
                      <span className="text-[10px] text-white/25">{email.time}</span>
                    </div>
                    <div className="text-xs text-white/40 truncate">{email.subject}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Calendar panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="col-span-12 md:col-span-4 rounded-2xl glass overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Calendar size={14} className="text-cyan/60" />
                <span className="text-xs font-display font-semibold text-white/60">Today's Schedule</span>
              </div>
              <div className="p-3 space-y-2">
                {CALENDAR_EVENTS.map((ev, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 p-2.5 rounded-xl"
                    style={{ background: `${ev.color}08`, border: `1px solid ${ev.color}18` }}
                  >
                    <div className="w-1 self-stretch rounded-full" style={{ background: ev.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-display font-semibold text-white/80 truncate">{ev.title}</div>
                      <div className="text-[10px] text-white/30">{ev.time} · {ev.duration}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="px-4 pb-3">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/scenario/0')}>
                  Begin Scenario 1 →
                </Button>
              </div>
            </motion.div>

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 md:col-span-4 rounded-2xl glass overflow-hidden flex flex-col"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <MessageSquare size={14} className="text-pink-400/60" />
                <span className="text-xs font-display font-semibold text-white/60">#product-strategy</span>
              </div>
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {chats.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                      {msg.sender[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-display font-semibold text-white/50">{msg.sender}</span>
                        <span className="text-[10px] text-white/20">{msg.time}</span>
                      </div>
                      <div className="text-xs text-white/60 bg-white/3 rounded-lg px-2.5 py-1.5" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bias indicator sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-12 md:col-span-4"
            >
              <BiasIndicator />
            </motion.div>

            {/* Scenarios todo list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="col-span-12 md:col-span-8 rounded-2xl glass p-4"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="font-display text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                Your Day — Upcoming Scenarios
              </div>
              <div className="space-y-2">
                {scenarios.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="w-6 h-6 rounded-full glass flex items-center justify-center text-[10px] font-display font-bold text-white/40">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-display font-semibold text-white/70">{s.title}</div>
                      <div className="text-[10px] text-white/30">{s.time} · {s.type}</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/scenario/${i}`)}>
                      Go →
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
