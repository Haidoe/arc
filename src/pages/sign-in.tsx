import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Button from "~/components/Button";
import TextInputField from "~/components/TextInputField";
import MainPageLayout from "~/components/layouts/MainPageLayout";

const SignInPage = () => {
  return (
    <MainPageLayout hideHeader>
      <div className="flex flex-1 bg-arc">
        <div className="relative hidden flex-[35] lg:block">
          <Image
            src={"/images/sign-in-page/sign-in-bg.png"}
            alt="Sign In Artistic Hero Image"
            fill
          />
        </div>

        <div className="flex  flex-[29] flex-col px-4 py-[100px] lg:pr-[100px]">
          <header className="flex justify-center lg:pt-[40px]">
            <Image
              alt="Arc app logo"
              src="/images/arc-logo.svg"
              width={230}
              height={97}
            />
          </header>

          <section className="bg mt-[64px] flex flex-col items-center ">
            <form
              action="#"
              className="flex w-full max-w-[450px] flex-col gap-8"
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

            <div className="meta mt-12 flex flex-col items-center gap-5 text-primary-dark">
              <a href="#">Forgot Password?</a>

              <span>or</span>

              <a href="#">{`Don't have an account? Create one`}</a>

              <div className="mt-12 flex justify-center">
                <Button
                  buttonType="Secondary"
                  className="w-full max-w-[290px] px-4 py-[10px]"
                >
                  <SignInButton mode="modal">
                    <span className=" text-base"> Sign in with Google </span>
                  </SignInButton>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainPageLayout>
  );
};

export default SignInPage;
