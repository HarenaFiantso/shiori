import { useAuth } from '@/hooks';
import { motion } from 'motion/react';

import { getDate } from './utils/get-date';
import { getGreeting } from './utils/get-greeting';

export function WelcomeHeader() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-8"
    >
      <p className="text-muted-foreground mb-1 text-sm">{getDate()}</p>
      <h1 className="text-foreground text-3xl font-semibold">
        {getGreeting()} {user?.user_metadata.display_name.split(' ')[0]},{' '}
        <span className="text-primary">welcome back</span>
      </h1>
      <p className="text-muted-foreground mt-2">Here's what's on your mind today.</p>
    </motion.div>
  );
}

export default WelcomeHeader;
