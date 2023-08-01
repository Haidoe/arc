import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Check from "~/assets/icons/Check.svg";
import Image from "next/image";

const subscriptionOptions = [
  { value: "Monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "Annually", label: "Annually", priceSuffix: "/year" },
];
const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    price: { Monthly: "$15", Annually: "$144" },
    description: "A basic plan for to explore and test the product.",
    features: [
      "upto 5 productions",
      "Data remains live for 15 days after production ends",
      "Share Reports with 5 team members",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: { Monthly: "$30", Annually: "$288" },
    description: "Highly recommended for medium sized production houses",
    features: [
      "upto 50 productions",
      "Share Reports with 50 team members",
      "Data remains live forever",
      "Download Reports",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: { Monthly: "$60", Annually: "$576" },
    description:
      "Dedicated support and infrastructure for large scale production companies",
    features: [
      "Unlimited productions",
      "Share reports with anyone",
      "Advanced access control to add team members",
      "Host on your own server",
      "Privacy matters: Database Sovereignty",
      "Custom reporting tools",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pricing = () => {
  const [frequency, setFrequency] = useState(subscriptionOptions[0]);

  return (
    <div className="bg-arc">
      <section
        id="pricing"
        className="relative flex flex-col gap-8 overflow-hidden p-12 px-6 lg:items-center lg:gap-12 lg:px-12 lg:py-28"
      >
        <div className="section-description">
          <h2 className="mt-2 text-left text-xl font-bold tracking-tight text-primary-dark lg:text-center  lg:text-5xl">
            Pricing plans
          </h2>
        </div>
        <p className="z-10 text-sm lg:px-[10%] lg:text-center lg:text-xl">
          Choose an affordable plan that’s that suits your production company.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-contrast-light"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {subscriptionOptions.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? "bg-primary-base text-arc" : "text-contrast-dark",
                    "cursor-pointer rounded-full px-2.5 py-1"
                  )
                }
              >
                <span>{option.value}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-0 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "border border-primary-base text-primary-light"
                  : "border border-contrast-light text-contrast-dark",
                "rounded-3xl p-8"
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "text-primary-light"
                      : "text-contrast-dark",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-primary-trans px-2.5 py-1 text-xs font-semibold leading-5 text-primary-light">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 h-full max-h-[50px] text-sm leading-6 text-contrast-dark">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-contrast-base">
                  {tier.price[frequency.value]}
                </span>
                <span className="text-sm font-semibold leading-6 text-contrast-dark">
                  {frequency.priceSuffix}
                </span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-primary-base text-white shadow-sm hover:bg-primary-light"
                    : "text-primary-base ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base"
                )}
              >
                Buy plan
              </a>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-contrast-dark xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Image
                      className="flex-non h-6 w-5"
                      alt="Checkmark"
                      aria-hidden="true"
                      src={Check}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
