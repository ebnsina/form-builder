import { cn } from '@/lib/utils';

function StatCard({ title, helperText, value, className }) {
  return (
    <article
      className={cn(
        'bg-white px-10 py-16 rounded-2xl text-center text-slate-700 transition border-2 border-transparent hover:border-orange-300',
        className
      )}
    >
      <h2 className="text-2xl font-medium mb-2">{title}</h2>
      <p className="text-xl font-semibold my-2">{value}</p>
      <p className="text-sm">{helperText}</p>
    </article>
  );
}

export default StatCard;
