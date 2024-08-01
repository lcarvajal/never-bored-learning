import axios from "axios";
import { useEffect, useState } from "react";
import fallingBooksImageURL from "../assets/falling-books.png";
import { useNavigate } from "react-router-dom";

function createCheckoutSession(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  axios.post('/subscriptions/checkout-session').then((response) => {
    console.log(response.data.redirect_url)
    const redirect_url = response.data.redirect_url
    if (redirect_url !== null) {
      window.open(response.data.redirect_url,"_self");
    }
  }).catch((error) => {
    console.log(error)
  })
}

const ProductDisplay = () => (
  <section className="flex flex-col gap-12">
    <div>
      <h1 className="p-4 font-normal">
        You hit your limit of 3 free topics a day
      </h1>
      <p>
        Subscribe to increase your limit
      </p>
    </div>
    <div className="flex flex-col bg-zinc-900 gap-10 py-12 rounded-xl w-full sm:w-2/3 lg:w-1/3 mx-auto text-slate-50  ">
      <div>
        <img src={fallingBooksImageURL} alt="Falling books" className="w-1/4 mx-auto rounded-xl -rotate-45 mb-4" />
        <h1>$5.00</h1>
        <p className="text-zinc-400">per month</p>
      </div>
      <ol className="text-xl font-medium">
        <li>Create 100 topics daily</li>
        <li>Higher quality resources</li>
        <li>Faster loading times</li>
      </ol>
      <form onSubmit={createCheckoutSession} method="POST">
        <button className="button-primary w-2/3" type="submit">
          Buy now
        </button>
      </form>
    </div>
  </section>
);

interface MessageProps {
  message: string
}

function Message(props: MessageProps) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-6 w-full md:w-2/3 lg:w-1/3 mx-auto">
    <p>{props.message}</p>
    <button className="button-primary" onClick={() => navigate('/roadmaps/')}>Get back to learning</button>
  </section>
  )
}

export default function CheckoutPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Thank you for subscribing!");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}