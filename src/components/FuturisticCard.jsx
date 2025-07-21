// FuturisticCard.jsx
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function FuturisticCard({ balance, isConnected, accountAddress }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white rounded-2xl p-6 shadow-xl backdrop-blur-lg border border-purple-700/40"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, boxShadow: '0 0 30px #8e2de2' }}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-purple-700/30 rounded-full">
          <Wallet className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-wide">Wallet Balance</h2>
          <p className="text-sm text-purple-300">
            {isConnected ? 'Connected via MetaMask' : 'Not Connected'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <motion.div
          className="text-3xl font-bold text-green-400"
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {isConnected ? `Ξ ${balance || '0.000'} ETH` : 'Ξ 0.000 ETH'}
        </motion.div>
        <p className="text-xs text-gray-400 mt-1">
          {isConnected ? 'Last synced: 2 mins ago' : 'Connect wallet to view balance'}
        </p>
        {accountAddress && (
          <p className="text-xs text-blue-400 mt-2 font-mono">
            {`${accountAddress.slice(0, 6)}...${accountAddress.slice(-4)}`}
          </p>
        )}
      </div>
    </motion.div>
  );
}
