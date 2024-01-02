import StatCard from './StatCard';

function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total visits"
        helperText="Total number of visits to your form"
        value={stats?.visits ?? 0}
      />
      <StatCard
        title="Total Submissions"
        helperText="Total number of submissions to your form"
        value={stats?.submissions ?? 0}
      />
      <StatCard
        title="Total Submissions Rate"
        helperText="Total number of submissions to your form"
        value={`${stats?.submissionRate.toFixed(2)}%` ?? 0}
      />
      <StatCard
        title="Total Bounce Rate"
        helperText="Total number of bounces to your form"
        value={`${stats?.bounceRate.toFixed(2)}%` ?? 0}
      />
    </div>
  );
}

export default StatCards;
