import TextInputField from "../TextInputField";
import TextArea from "../TextArea";
import { useRef, useState } from "react";
import LoadingSpinner from "../Loading";
import Image from "next/image";

const LandingPageContactSection = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsCooldown(true);

      setTimeout(() => {
        setIsCooldown(false);
      }, 3000);
    }, 500);

    formRef.current.reset();
  };

  return (
    <section className="relative flex flex-col items-center gap-8 overflow-hidden p-12 px-6 lg:gap-12 lg:px-12 lg:py-28">
      <h2 className="z-10 text-xl font-bold text-primary-dark lg:text-center lg:text-5xl">
        Contact
      </h2>

      <p className="z-10 text-sm lg:px-[10%] lg:text-center lg:text-xl">
        Get in contact and try our app for free for the first month.
      </p>

      <form
        className="z-10 flex w-full max-w-[450px] flex-col gap-4"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <TextInputField
          className="w-full"
          inputType="Border"
          label="Name"
          placeholder=" "
          required
        />

        <TextInputField
          className="w-full"
          inputType="Border"
          label="Email"
          type="email"
          placeholder=" "
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />

        <TextInputField
          className="w-full"
          inputType="Border"
          label="Company"
          placeholder=" "
        />

        <TextInputField
          className="w-full"
          inputType="Border"
          label="Industry"
          placeholder=" "
        />

        <TextArea label="Message" className="w-full bg-transparent p-4" />

        <div className="flex justify-center">
          {isLoading ? (
            <button
              type="button"
              className="flex w-full justify-center rounded-[5px] border-primary-base bg-primary-base px-4 py-3 text-white hover:border-primary-base hover:bg-primary-base  active:border-primary-base active:bg-primary-base lg:w-[50%]"
            >
              <LoadingSpinner size={20} />{" "}
              <span className="px-3">Sending...</span>
            </button>
          ) : isCooldown ? (
            <button
              type="button"
              className="w-full rounded-[5px] border-secondary-dark bg-secondary-dark px-2 py-3 text-white hover:border-secondary-dark hover:bg-secondary-dark active:border-secondary-dark active:bg-secondary-dark lg:w-[50%]"
            >
              <div className="flex justify-center gap-2">
                Sent
                <span className="flex w-4 justify-center">
                  <Image
                    src="/images/icons/check.svg"
                    width={12}
                    height={12}
                    alt="check mark icon"
                  />
                </span>
              </div>
            </button>
          ) : (
            <button className="w-full rounded-[5px] border-primary-base bg-primary-base px-4 py-3 text-white hover:border-primary-base hover:bg-primary-base active:border-primary-base active:bg-primary-base lg:w-[50%] ">
              Send
            </button>
          )}
        </div>
      </form>

      {/* Subtle gradient purple background */}
      <Image
        alt="Subtle gradient purple background"
        src="/images/landing-page/feature-bg-1.svg"
        width={800}
        height={800}
        className="absolute right-[-10%] top-0 hidden lg:block"
      />

      {/* Subtle gradient purple background */}
      <Image
        alt="Subtle gradient purple background"
        src="/images/landing-page/feature-bg-2.svg"
        width={800}
        height={800}
        className="absolute bottom-[-75%] left-0"
      />
    </section>
  );
};

export default LandingPageContactSection;
