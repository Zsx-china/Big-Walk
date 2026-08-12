import type { ReactNode } from "react";

function Callout({
  type = "info",
  label,
  children,
}: {
  type?: "tip" | "warn" | "danger" | "info";
  label?: string;
  children: ReactNode;
}) {
  const map = {
    info: "INFO",
    tip: "TIP",
    warn: "WATCH",
    danger: "STOP",
  };
  return (
    <aside className={`callout callout--${type}`}>
      <span className="callout__icon" aria-hidden="true">
        {label ?? map[type]}
      </span>
      <div className="callout__body">{children}</div>
    </aside>
  );
}

function StepList({ children }: { children: ReactNode }) {
  return <ol className="steps">{children}</ol>;
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="step">
      <span className="step__num" aria-hidden="true" />
      <div className="step__body">
        {title && <p className="step__title">{title}</p>}
        {children}
      </div>
    </li>
  );
}

export const mdxComponents = {
  Callout,
  StepList,
  Step,
  table: (props: React.ComponentProps<"table">) => (
    <div style={{ overflowX: "auto" }}>
      <table {...props} />
    </div>
  ),
};
