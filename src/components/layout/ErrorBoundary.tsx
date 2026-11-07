import { Component, type ErrorInfo, type ReactNode } from "react";

import Button from "../ui/Button";

import { BUSINESS } from "../../config/business";
import { PATHS } from "../../config/paths";

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-svh items-center justify-center px-5 py-20">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <h1 className="text-4xl font-bold">Ups, nešto je pošlo po zlu.</h1>
          <p className="font-light">
            Stranicu trenutno nije moguće prikazati. Pokušajte je osvježiti. Ako
            se problem ponovi, javite nam se na{" "}
            <a
              className="font-semibold underline"
              href={`mailto:${BUSINESS.email}`}
            >
              {BUSINESS.email}
            </a>{" "}
            ili {BUSINESS.phone.display}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Osvježi stranicu
            </Button>
            <Button variant="secondary" href={PATHS.home}>
              Na početnu
            </Button>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
