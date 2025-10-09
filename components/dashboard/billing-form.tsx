"use client";

import * as React from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { UserSubscriptionPlan } from "@/types/subscribe";
import { UserInfo } from "@/types/user";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
  user: UserInfo;
}

export function BillingForm({
  subscriptionPlan,
  user,
  className,
}: BillingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function updatePayment(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(!isLoading);
    if (subscriptionPlan.isPro && subscriptionPlan.updatePaymentMethodURL) {
      window.location.href = subscriptionPlan.updatePaymentMethodURL;
    }
  }
  async function upgrade(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(!isLoading);
    window.location.href = "/#subscription-card";
  }

  return (
    <div className={cn(className)}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <div className="flex gap-4">
            {subscriptionPlan.isPro ? (
              <Button onClick={updatePayment}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Payment
              </Button>
            ) : (
              <Button onClick={upgrade}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Upgrade to PRO
              </Button>
            )}

          </div>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              "Your plan renews on "
              {dayjs(subscriptionPlan.membershipExpire).format(
                "YYYY-MM-DD HH:mm"
              )}
              .
            </p>
          ) : null}
        </CardFooter>
      </Card>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}
