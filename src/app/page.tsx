import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Partnerships } from "@/components/home/Partnerships";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestBlog } from "@/components/home/LatestBlog";
import { FAQ } from "@/components/home/FAQ";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <FeaturedIdeas />
      <HowItWorks />
      <Testimonials />
      <LatestBlog />
      <Partnerships />
      <FAQ />
      <Newsletter />
    </div>
  );
}
