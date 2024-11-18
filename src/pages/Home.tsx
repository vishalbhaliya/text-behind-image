import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Application</h1>
      <p className="text-lg text-muted-foreground">
      Blend text seamlessly into photos. Our AI detects objects, placing text behind them for a natural look. Perfect for social media, marketing, and creative projects. Features include real-time preview, cloud storage, and easy sharing. Transform your visuals in minutes, no design skills needed!
      </p>
      <div className="flex">
        <Button variant="destructive" size={"lg"} className="mt-4 mr-4" onClick={() => window.location.assign("/text-behind-image")}>Checkout App</Button>
        <a href="https://www.producthunt.com/posts/redesign-image?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-redesign&#0045;image" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=625488&theme=light" alt="Redesign&#0032;Image - text&#0045;behind&#0045;image&#0044;&#0032;image&#0045;editor&#0044;&#0032;add&#0045;text&#0045;to&#0045;image | Product Hunt" className="width: 250px; height: 54px; mt-2" width="250" height="54" /></a>
      </div>
    </div>
  );
}