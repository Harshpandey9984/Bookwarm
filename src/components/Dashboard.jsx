// Dashboard.jsx
import FuturisticCard from './FuturisticCard';

export default function Dashboard({ balance, isConnected, accountAddress }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <FuturisticCard 
        balance={balance}
        isConnected={isConnected}
        accountAddress={accountAddress}
      />
    </div>
  );
}
