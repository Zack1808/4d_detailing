import { useInView } from "../../hooks/useInView";

type RevealProps = {
  children: React.ReactNode;
  transitionFrom?: string;
  transitionTo?: string;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
  delay?: number;
};

const Reveal: React.FC<RevealProps> = ({
  children,
  transitionFrom = "opacity-0 translate-y-6",
  transitionTo = "opacity-100 translate-y-0",
  className = "",
  threshold = 0.15,
  style,
  delay = 0,
}) => {
  const { ref, isVisibile, isInitiallyVisible } = useInView(threshold);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: isInitiallyVisible ? `${delay}ms` : "100ms",
      }}
      className={`transition-all duration-1000 ease-out motion-reduce:transition-opacity! ${isVisibile ? transitionTo : transitionFrom} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
