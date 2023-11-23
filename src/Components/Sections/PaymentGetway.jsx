import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ChekoutForm from "../Shared/ChekoutForm";
import SectionWrapper from "../Shared/SectionWrapper";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PaymentGetway = () => {
  return (
    <section>
      <SectionWrapper>
        <h3 className="text-3xl md:text-4xl font-semibold text-title-color text-center uppercase mt-14 md:mt-20">
          Payment
        </h3>
        <Elements stripe={stripePromise}>
          <ChekoutForm />
        </Elements>
      </SectionWrapper>
    </section>
  );
};

export default PaymentGetway;
