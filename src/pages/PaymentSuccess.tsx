import { checkSessionId } from "@/redux/actions";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const PaymentSuccess = (props: Props) => {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  const checkSession = async () => {
    const response = await checkSessionId(sessionId);
    if (response.data) {
      setShowCheck(true);
      setShowContent(true);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 space-y-6">
      {/* Animated success icon */}
      <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
        <div
          className={`absolute inset-0 rounded-full bg-green-500 transition-transform duration-500 ease-out ${
            showCheck
              ? "transform scale-100 opacity-100"
              : "transform scale-0 opacity-0"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <Check className="text-white h-12 w-12" />
          </div>
        </div>
      </div>

      {/* Animated content */}
      <div
        className={`space-y-6 w-full transition-all duration-500 ease-out ${
          showContent
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-4 opacity-0"
        }`}
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Payment Successful!
          </h2>
          <p className="text-gray-500">
            Your payment has been processed successfully. A confirmation has
            been sent to your email.
          </p>
        </div>

        {/* <Alert className="bg-green-50 border-green-200">
      <AlertTitle className="font-medium text-green-800">
        Transaction ID: #39481
      </AlertTitle>
      <AlertDescription className="text-green-700 mt-2">
        Amount: $149.99
      </AlertDescription>
    </Alert> */}

        <div className="flex flex-col space-y-3">
          <Link
            to={"/dashboard"}
            className="w-full py-2 px-4 text-gray-700 hover:text-gray-900 font-medium rounded-lg border text-center border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
