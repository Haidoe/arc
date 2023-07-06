import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Button from "~/components/Button";
import TextInputField from "~/components/TextInputField";
import MainPageLayout from "~/components/layouts/MainPageLayout";

const SignInPage = () => {
  return (
    <MainPageLayout hideHeader>
      <div className="relative flex min-w-[320px] flex-1 overflow-hidden bg-arc">
        <div className="relative hidden flex-[35] lg:block">
          <Image
            src={"/images/sign-in-page/desktop.png"}
            alt="Sign In Artistic Hero Image"
            fill
          />
        </div>

        <div className="z-10 flex flex-[29] flex-col px-4 py-[100px] pt-[2rem] sm:py-[100px] lg:pr-[100px]">
          <header className="flex justify-center lg:pt-[40px]">
            <div>
              <Image
                alt="Arc app logo"
                src="/images/arc-logo.svg"
                width={230}
                height={97}
                className="hidden lg:block"
              />

              <Image
                alt="Arc app logo"
                src="/images/mobile-logo.svg"
                width={96}
                height={96}
                className="block lg:hidden"
              />
            </div>
          </header>

          <section className="bg mt-[64px] flex flex-col items-center ">
            <form
              action="#"
              className="flex w-full max-w-[450px] flex-col gap-6 sm:gap-8"
            >
              <TextInputField label="Email" inputType="Border" />

              <TextInputField label="Password" inputType="Border" />

              <div className="flex justify-center">
                <Button
                  buttonType="Primary"
                  className="w-full max-w-[290px] px-4 py-[10px]"
                >
                  <span className=" text-base"> Login </span>
                </Button>
              </div>
            </form>

            <div className="meta mt-8 flex flex-col items-center gap-4 text-primary-dark xs:mt-12 xs:gap-5">
              <a href="#">Forgot Password?</a>

              <span className="text-black">or</span>

              <a href="#">{`Don't have an account? Create one`}</a>

              <div className="mt-12 flex justify-center">
                <SignInButton mode="modal">
                  <Button
                    buttonType="Secondary"
                    className="w-full max-w-[290px] px-4 py-[10px]"
                  >
                    <span className=" text-base"> Sign in with Google </span>
                  </Button>
                </SignInButton>
              </div>
            </div>
          </section>
        </div>

        <div className="absolute bottom-0 left-[-220px]  h-[45vh] w-[700px] xs:hidden ">
          <img
            src={"/images/sign-in-page/mobile.png"}
            alt="Sign In Artistic Hero Image"
            className="rotate-[-27deg]"
          />
        </div>
      </div>
    </MainPageLayout>
  );
};

export default SignInPage;
