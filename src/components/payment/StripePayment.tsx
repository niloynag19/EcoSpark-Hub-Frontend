"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface StripePaymentProps {
  ideaId: string;
  onSuccess: () => void;
  onCancel: () => void;
  amount: number;
}

export const StripePayment = ({ ideaId, onSuccess, onCancel, amount }: StripePaymentProps) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    const createIntent = async () => {
      try {
        const response = (await api.post("/payments/create-intent", { ideaId })) as any;
        setClientSecret(response.data.clientSecret);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to initiate payment");
        onCancel();
      }
    };

    createIntent();
  }, [ideaId]);

  if (!clientSecret) return <div className="p-8 text-center">Preparing secure payment...</div>;

  return (
    <div className="p-6">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm onSuccess={onSuccess} amount={amount} ideaId={ideaId} />
      </Elements>
      <Button variant="ghost" className="w-full mt-4" onClick={onCancel}>Cancel</Button>
    </div>
  );
};

function CheckoutForm({ onSuccess, amount, ideaId }: { onSuccess: () => void; amount: number; ideaId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        // Confirm with backend
        await api.post("/payments/confirm", { 
          paymentIntentId: paymentIntent.id, 
          ideaId 
        });
        toast.success("Payment successful!");
        onSuccess();
      } catch (err) {
        toast.error("Payment confirmed but failed to update access. Please contact support.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/20"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
}
