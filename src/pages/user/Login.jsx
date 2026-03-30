import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import GameCard from '../../components/ui/GameCard';
import GameButton from '../../components/ui/GameButton';
import { useAuth } from '../../features/user/useAuth';
import { useMode } from '../../context/ModeContext';
import { Key } from 'lucide-react';
import StatBadge from '../../components/ui/StatBadge';

export default function Login() {
  const navigate = useNavigate();
  const { setMode } = useMode();
  const { loginWithGoogle, loading } = useAuth();

  const handleLogin = async () => {
    try {
      if (!loading) {
        setMode('personal');
        await loginWithGoogle();
        navigate('/setup');
      }
    } catch (error) {
      console.error(error);
      alert('Login Failed: ' + error.message);
    }
  };

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen pt-24 pb-16 px-6 bg-game-dark flex flex-col items-center justify-center">
        
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md">
          <GameCard hover={false} className="p-8 border-4 border-accent text-center bg-[#151928] shadow-[0_10px_30px_rgba(255,77,109,0.2)]">
            
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl border-4 border-accent bg-[#900021] flex items-center justify-center shadow-game">
                <Key size={32} className="text-accent" />
              </div>
            </div>

            <StatBadge value="AUTHENTICATION" color="#xFF4D6D" className="mb-4" />
            
            <h1 className="text-4xl font-display font-black text-white uppercase mb-4 text-game-shadow">
              SYSTEM <span className="text-accent">LOGIN</span>
            </h1>
            
            <p className="text-white/60 font-display font-medium text-sm leading-relaxed mb-8">
              Personal Mode requires creating a profile. We use Google Auth to securely log you in before analyzing your career demographics.
            </p>

            <GameButton
              variant="accent"
              size="xl"
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'INITIALIZING...' : 'LOGIN WITH GOOGLE'}
            </GameButton>

            <button 
              onClick={() => navigate('/mode-select')}
              className="mt-6 text-xs font-display text-white/40 hover:text-white uppercase font-bold tracking-widest underline decoration-white/20 underline-offset-4"
            >
              RETREAT TO MENU
            </button>
          </GameCard>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
