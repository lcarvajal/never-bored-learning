import axios from "axios";
import { useEffect, useState } from "react";

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
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
        className="mx-auto"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form onSubmit={createCheckoutSession} method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

interface MessageProps {
  message: string
}

const Message = (props: MessageProps) => (
  <section>
    <p>{props.message}</p>
  </section>
);

export default function CheckoutPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
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