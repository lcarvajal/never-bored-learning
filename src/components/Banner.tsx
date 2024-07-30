import { useEffect, useState } from "react";

export function cookieConsentGiven() {
  if (!localStorage.getItem('cookie_consent')) {
    return 'undecided';
  }
  return localStorage.getItem('cookie_consent') as string;
}

export function Banner() {
  const [consentGiven, setConsentGiven] = useState('');

  useEffect(() => {
    setConsentGiven(cookieConsentGiven());
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes');
    setConsentGiven('yes');
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no');
    setConsentGiven('no');
  };

  return (
    <>
      {consentGiven === 'undecided' && (
        <div className="bg-slate-900 text-slate-50 p-4 sticky bottom-0  w-full border-t-[1px] border-slate-700 flex flex-col sm:flex-row justify-between">
          <p className="p-5">
            We use tracking cookies to understand how you use 
            the product and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <div className="flex grow justify-end p-2 min-w-72">
            <button className="button-loud mr-2" type="button" onClick={handleAcceptCookies}>Accept cookies</button>
            <span> </span>
            <button className="button-lowkey" type="button" onClick={handleDeclineCookies}>Decline</button>
          </div>
        </div>
      )}
    </>
  )
}