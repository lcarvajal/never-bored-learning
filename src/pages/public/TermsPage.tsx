

export default function TermsPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row justify-between p-6">
        <h3 className="flex grow text-3xl">Terms of Service and Privacy Policy</h3>
        <button className="flex button-primary" onClick={() => window.open('./terms-and-privacy.pdf', '_blank')}>Download</button>
      </div>
      <iframe src="./terms-and-privacy.pdf" className="flex grow w-full"/>
    </div>
  );
}