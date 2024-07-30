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
        <div className="bg-slate-900 text-slate-50 px-12 py-6 sticky bottom-0  w-full border-t-[1px] border-slate-700 flex flex-col sm:flex-row gap-6">
          <p className="flex text-start">
            We use tracking cookies to understand how you use 
            the product and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <div className="flex flex-row min-w-fit items-center justify-end gap-2">
            <button className="button-loud" type="button" onClick={handleAcceptCookies}>Accept cookies</button>
            <button className="button-lowkey" type="button" onClick={handleDeclineCookies}>Decline</button>
          </div>
        </div>
      )}
    </>
  )
}