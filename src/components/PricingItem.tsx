import { Sparkles, Check, Zap, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StripeProduct } from "@/lib/types";
type Props = {
  product: StripeProduct;
  onItemSelect: (priceId: string, planType) => void;
};
export default function PricingItem({ product, onItemSelect }: Props) {
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="flex justify-center items-center w-full p-4">
      <Card className="w-full max-w-md bg-white border-2 border-violet-200 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-white pb-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-2xl font-bold text-violet-800">
                {product.name}
              </CardTitle>
            </div>
            <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-200">
              {product.prices[1].recurring.interval}ly
            </Badge>
          </div>
          <CardDescription className="text-gray-600 mt-2">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {/* <Tabs
            defaultValue="usd"
            className="mb-6"
            //   onValueChange={setSelectedCurrency}
          > */}
          {/* <TabsList className="grid grid-cols-1 mx-auto max-w-xs bg-violet-50"> */}
          {/* <TabsTrigger
                value="usd"
                className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
              >
                USD
              </TabsTrigger> */}
          {/* <TabsTrigger value="eur" className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800">EUR</TabsTrigger> */}
          {/* </TabsList> */}
          {/* </Tabs> */}

          <div className="text-center mb-8">
            <div className="inline-flex items-baseline">
              <span className="text-5xl font-extrabold text-violet-800">
                {formatCurrency(
                  product.prices[1].unit_amount / 100,
                  product.prices[1].currency
                )}
              </span>
              <span className="ml-1 text-gray-500">
                / {product.prices[1].recurring.interval}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {product.marketing_features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center bg-violet-50 p-3 rounded-md"
              >
                <div className="h-8 w-8 rounded-full bg-violet-200 flex items-center justify-center mr-3">
                  <ArrowRight className="h-5 w-5 text-violet-700" />
                </div>
                <span className="text-gray-700 font-medium">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 bg-white">
          <Button
            className="w-full py-6 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg flex items-center justify-center gap-2"
            onClick={() => {
              onItemSelect(product.prices[1].id, product.name);
            }}
          >
            <Zap className="h-5 w-5" />
            <span>Start Creating</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
