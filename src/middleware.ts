import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api*", "/kaos"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((req: NextRequest) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(req);

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
