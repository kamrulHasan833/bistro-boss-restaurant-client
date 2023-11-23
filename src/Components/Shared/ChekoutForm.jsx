import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCart from "../../hooks/useCart";
const ChekoutForm = () => {
  const [transactionID, setTransactionID] = useState();
  const { user } = useAuth();
  const { email, displayName } = user ? user : {};
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();
  const { data, refetch } = useCart();
  const totalPrice = data ? data.reduce((ac, ci) => ac + ci.price, 0) : 0;
  const price = parseFloat(totalPrice.toFixed(2));

  //   get payment intent
  useEffect(() => {
    if (price) {
      axiosPrivate
        .post("/create-payment-intent", {
          price: price,
        })
        .then(({ data }) => setClientSecret(data.clientSecret))
        .catch((err) => console.log(err));
    }
  }, [axiosPrivate, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (elements === null) {
      return;
    }
    const card = elements.getElement(CardElement);
    // ceate payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment method error", error);
    } else {
      console.log("payment method", paymentMethod);
    }

    // confirm card payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm erro", confirmError);
    } else {
      const transaction_id = paymentIntent.id;
      setTransactionID(transaction_id);
      const cart_ids = data ? data.map(({ _id }) => _id) : [];
      const food_ids = data ? data.map(({ food_id }) => food_id) : [];
      const food_names = data ? data.map(({ name }) => name) : [];

      // save pament history in database
      const paymentInfo = {
        cart_ids,
        food_ids,
        food_names,
        transaction_id,
        payment_date: new Date(),
        price,
        consumer_email: email,
        consumer_name: displayName,
      };

      const res = await axiosPrivate.post(
        "/bistro-boss-restaurant/v1/payments",
        paymentInfo
      );

      if (res.data.postResult.insertedId) {
        refetch();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "You have made payment successfully",
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="btn bg-primary-color mt-6"
        type="submit"
        disabled={!stripe || !elements || !clientSecret}
      >
        Pay
      </button>

      <p className="text-green-500">
        {" "}
        Transation id: {transactionID && transactionID}
      </p>
    </form>
  );
};

export default ChekoutForm;
