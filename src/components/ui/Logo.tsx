
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className, textClassName }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <h1 className={cn("font-serif italic text-2xl font-bold", textClassName)}>
        KatCakes
      </h1>
    </div>
  );
};

export default Logo;
