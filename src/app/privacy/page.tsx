"use client";

import React from "react";
import { Container } from "@/components/ui/container";

export default function PolicyPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-green dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy & Terms</h1>
          <p className="text-lg text-muted-foreground mb-8">Last Updated: May 2024</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">1. Data Collection</h2>
          <p>At EcoSpark Hub, we prioritize your privacy. We collect only the information necessary to provide you with a secure platform for innovation, including your name, email, and payment details via Stripe.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">2. Intellectual Property</h2>
          <p>Innovators retain full ownership of their ideas. By publishing on EcoSpark Hub, you grant us the right to display your content to the community according to your selected visibility settings (Public or Premium).</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">3. Monetization</h2>
          <p>Premium ideas are protected by our payment gateway. Sharing premium content outside the platform is a violation of our terms of service.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">4. Community Standards</h2>
          <p>We do not tolerate harassment, plagiarism, or malicious content. Admins reserve the right to remove any content or user that violates these standards.</p>
        </div>
      </Container>
    </div>
  );
}
