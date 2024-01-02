import Link from 'next/link';
import { useEffect, useState } from 'react';

function ShareInfo({ shareUrl }) {
  const [urlToShare, setUrlToShare] = useState('');

  useEffect(() => {
    setUrlToShare(`${window.location.origin}/submit/${shareUrl}`);
  }, [shareUrl]);

  return (
    <div className="flex space-x-4 items-center">
      <input
        className="disabled:bg-slate-200 disabled:text-slate-400 disabled:border-none disabled:rounded-md w-[400px]"
        type="text"
        value={urlToShare}
        disabled
      />

      <div className="flex space-x-1 items-center">
        <Link
          className="btn btn-primary rounded-md"
          href={`/submit/${shareUrl}`}
        >
          Visit Form
        </Link>
        <button
          type="button"
          className="btn btn-primary rounded-md"
          onClick={() => {
            navigator.clipboard.writeText(urlToShare);
          }}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
}

export default ShareInfo;
