import Check from "~/assets/icons/Check.svg";
import Image from "next/image";

const tiers = [
  {
    name: "Basic",
    id: "tier-freelancer",
    href: "#pricing",
    price: { Monthly: "Free"},
    description:
      "A basic plan for small production companies and students to explore and test the product.",
    features: [
      "Upto 3 productions",
      "Live data for 15 days after production ends",
      "Share reports with 5 team members",
    ],
    mostPopular: false,
    btn: "Try for free",
  },
  {
    name: "Studio",
    id: "tier-startup",
    href: "#pricing",
    price: { Monthly: "$1,199"},
    description:
      "Highly recommended for medium size production houses and growing independent companies.",
    features: [
      "Upto 50 productions",
      "Live data forever",
      "Share reports with 50 team members",
      "Download unlimited reports",
    ],
    mostPopular: true,
    btn: "Buy now",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#pricing",
    price: { Monthly: "Custom"},
    description:
      "Dedicated support and infrastructure for large scale production companies. A customized experience and solution.",
    features: [],
    mostPopular: false,
    btn: "Contact us",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pricing = () => {
  return (
    <div className="xl:flex xl:justify-center xl:items-center bg-arc">
      <div className="xl:w-[1280px]">
        <section
          id="pricing"
          className="relative flex flex-col gap-8 overflow-hidden p-12 px-6 lg:items-center lg:gap-12 lg:py-28 lg:px-10 xl:px-0"
        >
          <div className="section-description">
            <h2 className="mt-2 text-left text-xl font-bold tracking-tight text-primary-dark lg:text-center  lg:text-5xl">
              Pricing plans
            </h2>
          </div>
          <p className="z-10 text-sm lg:px-[10%] lg:text-center lg:text-xl">
            Choose an affordable plan that’s that suits your production company.
          </p>
          <div className="isolate mx-auto mt-20 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier, idx) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "border border-primary-light text-primary-light"
                    : "border border-contrast-light text-contrast-dark",
                  "rounded-3xl p-8",
                  idx === 2 ? "pb-8" : "pb-14"
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
                <p className="mt-10 lg:mt-20 [@media(min-width:1100px)]:mt-10 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-contrast-base">
                    {tier.price["Monthly"]}
                  </span>
                  {tier.mostPopular && (
                    <span className="text-sm font-semibold leading-6 text-contrast-dark">
                      /month
                    </span>
                  )}
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
                  {tier.btn}
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
    </div>
  );
};

export default Pricing;
